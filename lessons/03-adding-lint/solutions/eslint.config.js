import globals from 'globals'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['public/**/*.js'],
    languageOptions: {globals: globals.browser},
    rules: {
      'no-constructor-return': 'error',
      'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    },
  },
  {
    files: ['eslint.config.js', 'playwright.config.js', 'test/**/*.js'],
    languageOptions: {globals: globals.node},
  },
]
