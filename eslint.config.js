import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'fuxia-pdfs/**',
      '*.jsx',
      'desde-Documents-FUXIA/**',
      'landing/js/loaders/**',
      '**/three.module.min.js'
    ]
  },
  js.configs.recommended,
  {
    files: ['landing/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['landing/api/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['scripts/**/*.mjs', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.node }
    },
    rules: {
      'no-console': 'off'
    }
  }
];
