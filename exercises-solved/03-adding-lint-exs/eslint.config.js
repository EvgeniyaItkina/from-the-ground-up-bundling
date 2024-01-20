import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {},
  {
    files: ['public/**/*.js'],
    rules: {
      'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    },
    languageOptions: {globals: globals.browser},
  },
  {
    files: ['eslint.config.js', 'playwright.config.js', 'test/**/*.js'],
    languageOptions: {globals: globals.node},
  },
]
