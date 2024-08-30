import {test, expect} from '@playwright/test'

// This test passes even here because it's very difficult to test parallelism
test('06-todomvc', theTest(false))
test('06-todomvc (bundled)', theTest(true))

function theTest(isBundled) {
  return async ({page}) => {
    const networkEvents = [];
    page.on('request', request => networkEvents.push(request.url()))

    await page.goto(`http://localhost:3000/06-todomvc/${isBundled ? '?bundled' : ''}`)

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

    if (isBundled) {
      expect(networkEvents).not.toContainEqual(expect.stringMatching(/app\.js/))
    } else {
      expect(networkEvents).toContainEqual(expect.stringMatching(/app\.js/))
    }
  }
}

