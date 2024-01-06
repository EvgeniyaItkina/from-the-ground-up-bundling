import {test, expect} from '@playwright/test'

test('03-serving-script-module-js', async ({page}) => {
  await page.goto('/03-serving-script-module-js/')

  await expect(page.locator('h1')).toHaveText('Page that renders (type=module script tag)')
  await expect(page.locator('canvas')).toHaveCSS('width', '300px')
  await expect(page.locator('canvas')).toHaveCSS('height', '300px')
})
