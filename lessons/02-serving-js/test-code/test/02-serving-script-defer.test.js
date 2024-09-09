import {test, expect} from '@playwright/test'
import killPort from 'kill-port'
import {$} from 'execa'
import retry from 'p-retry'

const $$ = $({stdio: 'ignore', cwd: '../code'})

test.beforeAll(() => $$`npm ci`)

test.beforeAll(async () => {
  await killPort(3000).catch(() => {})
  $$`npm run start:02`.catch(() => {})

  // wait till it's listening
  await retry(() => fetch('http://localhost:3000').then((res) => res.text()), {minTimeout: 50})
})

test('02-serving-script-defer-js', async ({page}) => {
  await page.goto('/')

  await expect(page.locator('h1')).toHaveText('Page that waits (defer script tag)')
  await expect(page.locator('p')).toHaveText(/6666/)
})
