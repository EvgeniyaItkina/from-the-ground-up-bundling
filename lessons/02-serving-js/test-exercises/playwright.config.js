import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './test',
  reporter: 'list',
  workers: 1,
  use: {baseURL: 'http://127.0.0.1:3000/'},
})
