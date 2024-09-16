import {test, expect} from '@playwright/test'

test('counter works', async ({page}) => {
  await page.goto('/')

  const count = page.locator('.count')
  const inc = page.locator('.inc')
  const dec = page.locator('.dec')

  await expect(count).toHaveText('0')
  await inc.click()
  await expect(count).toHaveText('1')

})
