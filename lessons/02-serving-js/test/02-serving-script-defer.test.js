import {test, expect} from '@playwright/test'

test('02-serving-script-defer-js', async ({page}) => {
  await page.goto('/02-serving-script-defer-js/')

  await expect(page.locator('h1')).toHaveText('Page that waits (defer script tag)')
  await expect(page.locator('p')).toHaveText(/6666/)
})
