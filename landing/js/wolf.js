// Robot 3D hero de FUXIA — movimientos orgánicos, cabeza domada + manos vivas (Three.js + GLTF).
// Base: Idle del GLB (piernas/cuerpo) + capa procedural suave (mirada, brazos, saludo en click).
import * as THREE from "three";
import { GLTFLoader } from "./loaders/GLTFLoader.js";

export function initWolf(canvas) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch { return false; }
  const isMobile = window.innerWidth < 900;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(0, 0.9, 9.2);
  camera.lookAt(0, 0.35, 0);

  scene.add(new THREE.AmbientLight(0x9a9ab0, 1.0));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(2.5, 4, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xcc00ff, 2.2);
  rim.position.set(-3.5, 2, -3);
  scene.add(rim);
  const glow = new THREE.PointLight(0xcc00ff, 20, 14);
  glow.position.set(0, 1.2, 2.6);
  scene.add(glow);

  function size() {
    const w = canvas.clientWidth || (canvas.parentElement && canvas.parentElement.clientWidth) || 0;
    const h = canvas.clientHeight || (canvas.parentElement && canvas.parentElement.clientHeight) || 0;
    if (!w || !h) return false;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    return true;
  }
  if (!size()) {
    let tries = 0;
    const iv = setInterval(() => {
      tries++;
      if (size() || tries > 40) clearInterval(iv);
    }, 250);
  }
  window.addEventListener("resize", size);
  window.addEventListener("load", size);
  if ("ResizeObserver" in window && canvas.parentElement) {
    new ResizeObserver(() => size()).observe(canvas.parentElement);
  }

  // ── Cursor: normalizado [-1,1] respecto al viewport (sigue en toda la página) ──
  let mx = 0, my = 0, tx = 0, ty = 0, run = true, mixer = null, model = null;
  let lastPointer = 0;
  let wave = 0; // impulso de saludo (click/tap)
  let shown = false; // fade-in del canvas en el primer frame con modelo
  if (!reduce) {
    window.addEventListener("pointermove", (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      lastPointer = performance.now();
    }, { passive: true });
    const hero = canvas.closest(".slide-hero");
    if (hero) {
      hero.addEventListener("pointerdown", () => { wave = 1; });
    }
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => { es.forEach((e) => { run = e.isIntersecting; }); }, { threshold: 0.05 }).observe(canvas);
  }

  // ── Huesos que vamos a animar por código ──
  const B = { head: null, neck: null, shL: null, shR: null, upL: null, upR: null, lowL: null, lowR: null };
  const base = new Map(); // Object3D -> Euler base clonado
  function remember(o) { if (o && !base.has(o)) base.set(o, o.rotation.clone()); }

  function findBones() {
    model.traverse((o) => {
      if (!o.isBone) return;
      const n = (o.name || "").toLowerCase();
      if (n === "head") B.head = B.head || o;
      else if (n === "neck") B.neck = B.neck || o;
      else if (n === "shoulder.l") B.shL = B.shL || o;
      else if (n === "shoulder.r") B.shR = B.shR || o;
      else if (n === "upperarm.l") B.upL = B.upL || o;
      else if (n === "upperarm.r") B.upR = B.upR || o;
      else if (n === "lowerarm.l") B.lowL = B.lowL || o;
      else if (n === "lowerarm.r") B.lowR = B.lowR || o;
    });
    Object.values(B).forEach(remember);
  }

  new GLTFLoader().load(
    "./js/robot.glb",
    (gltf) => {
      if (!document.body.contains(canvas)) return;
      model = gltf.scene;
      model.scale.setScalar(0.6);
      model.position.set(0, -2.0, 0);
      model.rotation.y = -0.25;
      // Marca FUXIA: oscurecer conservando texturas + metalizar
      model.traverse((o) => {
        if (o.isMesh && o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            if (m.color) m.color.multiplyScalar(0.9);
            if ("metalness" in m) m.metalness = Math.max(m.metalness || 0, 0.55);
            if ("roughness" in m) m.roughness = Math.min(m.roughness == null ? 0.5 : m.roughness, 0.55);
          });
        }
      });
      scene.add(model);
      findBones();
      if (gltf.animations && gltf.animations.length && !reduce) {
        const idle = gltf.animations.find((a) => /idle/i.test(a.name)) || gltf.animations[0];
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(idle).play();
      }
      window.__splineOk = true;
    },
    undefined,
    () => {
      const bg = document.querySelector(".spline-bg");
      if (bg) bg.style.display = "none";
    }
  );

  const clock = new THREE.Clock();
  const baseRotY = -0.25;
  const clamp = THREE.MathUtils.clamp;
  const lerp = THREE.MathUtils.lerp;
  (function loop() {
    requestAnimationFrame(loop);
    if (!run || document.hidden || !model) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (mixer) mixer.update(dt);
    if (reduce) { renderer.render(scene, camera); return; }

    // Si no hay mouse (móvil quieto), el robot mira al vacío con vida propia (lento)
    if (performance.now() - lastPointer > 3000) {
      tx = Math.sin(t * 0.25) * 0.45;
      ty = Math.cos(t * 0.2) * 0.28;
    }
    // Suavizado lento = movimiento orgánico, sin latigazos
    mx += (tx - mx) * 0.045;
    my += (ty - my) * 0.045;
    wave *= 0.965; // decae el saludo

    // Cuerpo: giro suave hacia el cursor + respiración + leve balanceo de peso
    model.rotation.y = baseRotY + Math.sin(t * 0.25) * 0.07 + mx * 0.28;
    model.rotation.z = Math.sin(t * 0.4) * 0.018;
    model.position.y = -2.0 + Math.sin(t * 0.9) * 0.05;

    // Cabeza: el Idle trae tirones (hasta ~28°); lo mezclamos 80% hacia la mirada
    // procedural para que quede suave pero con un resto de vida del Idle.
    if (B.head) {
      const lookY = clamp(mx * 0.45, -0.55, 0.55) + Math.sin(t * 0.45) * 0.05;
      const lookX = clamp(my * 0.3, -0.35, 0.35) + Math.sin(t * 0.6) * 0.035;
      B.head.rotation.y = lerp(B.head.rotation.y, lookY, 0.8);
      B.head.rotation.x = lerp(B.head.rotation.x, lookX, 0.8);
      B.head.rotation.z = lerp(B.head.rotation.z, Math.sin(t * 0.5) * 0.03, 0.8);
    }
    // Cuello: acompaña con menor amplitud (pose absoluta sobre su base)
    if (B.neck && base.has(B.neck)) {
      const b = base.get(B.neck);
      B.neck.rotation.y = b.y + clamp(mx * 0.16, -0.28, 0.28) + Math.sin(t * 0.5) * 0.02;
      B.neck.rotation.x = b.x + clamp(my * 0.11, -0.2, 0.2);
    }

    // Manos/brazos: balanceo amplio y lento (visible) + siguen el cursor + saludo en click.
    // Brazos en contrafase = caminar/respirar natural.
    const swingL = Math.sin(t * 0.9) * 0.15;
    const swingR = Math.sin(t * 0.9 + Math.PI) * 0.15;
    const fwd = Math.cos(t * 0.7) * 0.09;
    const elbowL = Math.sin(t * 1.05 + 0.6) * 0.13;
    const elbowR = Math.sin(t * 1.05 + Math.PI + 0.6) * 0.13;
    const greet = wave * Math.sin(t * 10) * 0.4; // vibración del saludo (más lenta)

    if (B.shL && base.has(B.shL)) {
      const b = base.get(B.shL);
      B.shL.rotation.z = b.z + (-mx * 0.22) + swingL;
      B.shL.rotation.x = b.x + (my * 0.18) + fwd;
    }
    if (B.shR && base.has(B.shR)) {
      const b = base.get(B.shR);
      B.shR.rotation.z = b.z + (-mx * 0.22) + swingR + wave * 0.5;
      B.shR.rotation.x = b.x + (my * 0.18) - fwd;
    }
    if (B.upL && base.has(B.upL)) {
      const b = base.get(B.upL);
      B.upL.rotation.z = b.z + (-mx * 0.14) + swingL * 0.6;
      B.upL.rotation.x = b.x + (my * 0.12) + fwd * 0.6;
    }
    if (B.upR && base.has(B.upR)) {
      const b = base.get(B.upR);
      B.upR.rotation.z = b.z + (-mx * 0.14) + swingR * 0.6 + wave * 0.3;
      B.upR.rotation.x = b.x + (my * 0.12) - fwd * 0.6;
    }
    if (B.lowL && base.has(B.lowL)) {
      const b = base.get(B.lowL);
      B.lowL.rotation.x = b.x + (my * 0.22) + elbowL - 0.08;
      B.lowL.rotation.y = b.y + (mx * 0.15);
      B.lowL.rotation.z = b.z + Math.sin(t * 0.8) * 0.05;
    }
    if (B.lowR && base.has(B.lowR)) {
      const b = base.get(B.lowR);
      B.lowR.rotation.x = b.x + (my * 0.22) + elbowR - 0.08;
      B.lowR.rotation.y = b.y + (mx * 0.15);
      B.lowR.rotation.z = b.z + greet - Math.sin(t * 0.8) * 0.05;
    }

    renderer.render(scene, camera);
    if (!shown) { shown = true; canvas.style.opacity = "1"; } // fade-in suave
  })();
  return true;
}
