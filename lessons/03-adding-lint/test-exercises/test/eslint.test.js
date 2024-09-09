import fs from 'node:fs/promises'
import {test, before, after} from 'node:test'
import {$} from 'execa'
import {expect} from 'expect'

const exerciseDir = `../${process.env.EX_DIR ?? 'exercises'}`
const $$ = $({stdio: 'ignore', cwd: exerciseDir})

before(async () => {
  await $$`npm install`
  await $$`npx playwright install --with-deps chromium`
})

test('npm test works', async () => {
  console.log('*********************************** running NPM TEST')
  await $$({stdio: 'inherit'})`npm test`
  console.log('*********************************** done NPM TEST')
})

test('should run prettier with eslint', async () => {
  await fs.writeFile(`${exerciseDir}/public/bad-file.js`, 'console.log(   1   )\n')

  const {stdout} = await $$({reject: false, stdio: 'pipe'})`npm run test:eslint`

  expect(stdout).toContain('prettier/prettier')
})

after(async () => {
  await fs.rm(`${exerciseDir}/public/bad-file.js`).catch(() => {})
})
