import fs from 'node:fs/promises'
import {it} from 'node:test'
import {expect} from 'expect'
import {$} from 'execa'

it('should run prettier with eslint', async () => {
  await makePrettierError(async () => {
    const {stdout} = await $({
      reject: false,
      stdio: 'pipe',
    })`npm run test:eslint`

    expect(stdout).toContain('bad-prettier')
    expect(stdout).toContain('prettier/prettier')
    expect(stdout).toMatch(/"Hello,.world!".\)/)
  })
})

async function makePrettierError(fn) {
  const fileWithPrettierError = new URL('../../public/js/bad-prettier.js', import.meta.url)

  try {
    const prettierErrorContent = `console.log(      "Hello, world!" );`

    // Replace it with the one that has a prettier error
    await fs.writeFile(fileWithPrettierError, prettierErrorContent, 'utf8')

    await fn()
  } finally {
    // Write the original content back to app.js
    await fs.unlink(fileWithPrettierError)
  }
}
