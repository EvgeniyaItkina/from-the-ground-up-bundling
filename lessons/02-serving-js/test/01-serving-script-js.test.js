import {test, expect} from '@playwright/test'

test('01-serving-script-js', async ({page}) => {
  await page.goto('/01-serving-script-js/')

  await expect(page.locator('h1')).toHaveText('Page that waits (regular script tag)')
  await expect(page.locator('p')).toHaveText('Waiting is over')
  await expect(page.locator('b')).toHaveText(/6666/)
})
