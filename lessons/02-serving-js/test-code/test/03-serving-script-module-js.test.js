import {test, expect} from '@playwright/test'
import killPort from 'kill-port'
import {$} from 'execa'
import retry from 'p-retry'

const $$ = $({stdio: 'ignore', cwd: '../code'})

test.beforeAll(() => $$`npm install`)

test.beforeAll(async () => {
  await killPort(3000).catch(() => {})
  $$`npm run start:03`.catch(() => {})

  // wait till it's listening
  await retry(() => fetch('http://localhost:3000').then((res) => res.text()), {minTimeout: 50})
})

test('03-serving-script-module-js', async ({page}) => {
  await page.goto('/')

  await expect(page.locator('h1')).toHaveText('Page that renders (type=module script tag)')
  await expect(page.locator('canvas')).toHaveCSS('width', '300px')
  await expect(page.locator('canvas')).toHaveCSS('height', '300px')
})
