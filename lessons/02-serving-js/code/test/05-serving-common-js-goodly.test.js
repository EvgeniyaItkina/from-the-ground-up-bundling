import {test, expect} from '@playwright/test'

test('05-serving-common-js-goodly', async ({page}) => {
  await page.goto('/05-serving-common-js-goodly/')

  await expect(page.locator('h1')).toHaveText(
    'Random Quote (script tag that succesfully imports Common JS using esm.sh)'
  )

  // A quote should have at least three words
  await expect(page.locator('p')).toHaveText(/[\w,\.\!\?] [\w,\.\!\?]+ [\w,\.\!\?]+/)
})
