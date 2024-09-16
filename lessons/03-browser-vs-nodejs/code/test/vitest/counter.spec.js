import {expect, test} from 'vitest'
import {createCounterComponent} from '../../public/script.js'

test('counter works', () => {
  createCounterComponent(document.body)

  const count = document.querySelector('.count');
  /**@type {HTMLElement | null} */
  const inc = document.querySelector('.inc')

  expect(count?.textContent).toBe('0')

  inc?.click()

  expect(count?.textContent).toBe('1')
})
