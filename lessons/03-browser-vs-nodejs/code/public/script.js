/**
 * @param {HTMLElement} component
 */
export function createCounterComponent(component) {
  if (!component) throw new Error('Component not found')

  component.innerHTML = `
    <button class='dec'>-</button>
    <span class='count'>0</span>
    <button class='inc'>+</button>
    `

  component.querySelector('.dec')?.addEventListener('click', () => {
    const count = component.querySelector('.count')
    if (!count) throw new Error('Count not found')

    count.textContent = String(Number(count.textContent) - 1)
  })

  component.querySelector('.inc')?.addEventListener('click', () => {
    const count = component.querySelector('.count')
    if (!count) throw new Error('Count not found')

    count.textContent = String(Number(count.textContent) + 1)
  })
}
