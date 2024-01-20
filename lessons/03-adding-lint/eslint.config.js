import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['public/**/*.js'],
    languageOptions: {globals: globals.browser},
    rules: add at least one rule here to make it clear how this works
  },
  {
    files: ['eslint.config.js', 'playwright.config.js', 'test/**/*.js'],
    languageOptions: {globals: globals.node},
  },
]
