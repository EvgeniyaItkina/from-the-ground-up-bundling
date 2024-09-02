import {test, expect} from '@playwright/test'
import killPort from 'kill-port'
import {$} from 'execa'
import retry from 'p-retry'

const $$ = $({stdio: 'ignore', cwd: '../code'})

test.beforeAll(() => $$`npm ci`)

test.beforeAll(async () => {
  await killPort(3000).catch(() => {})
  $$`npm run start:04`.catch(() => {})

  // wait till it's listening
  await retry(() => fetch('http://localhost:3000').then((res) => res.text()), {minTimeout: 50})
})

test('04-serving-common-js-badly', async ({page}) => {
  /**@type {string[]} */
  const logs = []
  page.on('pageerror', (e) => logs.push(e.message))

  await page.goto('/')

  await expect(page.locator('h1')).toHaveText('Random Quote (script tag that fails to import Common JS)')
  await expect(page.locator('p')).toBeEmpty()

  await expect
    .poll(async () => logs)
    .toContainEqual(expect.stringMatching(/does not provide an export named 'default'/))
})
