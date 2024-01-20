import {test, expect} from '@playwright/test'

test('06-todomovc', async ({page}) => {
  await page.goto('http://localhost:3000/')

  await expect(page.getByRole('heading')).toContainText('todos')

  await page.getByPlaceholder('What needs to be done?').click()
  await page.getByPlaceholder('What needs to be done?').fill('Clean dishes')
  await page.getByPlaceholder('What needs to be done?').press('Enter')

  await expect(page.getByText('Clean dishes')).toBeVisible()

  await page.getByPlaceholder('What needs to be done?').fill('Do laundry')
  await page.getByPlaceholder('What needs to be done?').press('Enter')

  await expect(page.getByText('Clean dishes')).toBeVisible()
  await expect(page.getByText('Do laundry')).toBeVisible()

  await page.getByPlaceholder('What needs to be done?').fill('Be good')
  await page.getByPlaceholder('What needs to be done?').press('Enter')

  await expect(page.getByText('Clean dishes')).toBeVisible()
  await expect(page.getByText('Do laundry')).toBeVisible()
  await expect(page.getByText('Be good')).toBeVisible()

  await page.locator('div').filter({hasText: 'Do laundry'}).getByRole('checkbox').check()
  await expect(page.getByText('Do laundry')).toHaveCSS('text-decoration-line', 'line-through')

  await page.getByRole('button', {name: 'Clear completed'}).click()

  await expect(page.getByText('Clean dishes')).toBeVisible()
  await expect(page.getByText('Do laundry')).toHaveCount(0)
  await expect(page.getByText('Be good')).toBeVisible()
})
