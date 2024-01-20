import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['public/**/*.js'],
    languageOptions: {globals: globals.browser},
    rules: {
      'no-constructor-return': 'error',
    },
  },
  {
    files: ['eslint.config.js', 'playwright.config.js', 'test/**/*.js'],
    languageOptions: {globals: globals.node},
  },
]
