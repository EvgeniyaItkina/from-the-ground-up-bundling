import {before, describe, it} from 'node:test'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {expect} from 'expect'
import {$} from 'execa'
import retry from 'p-retry'
import killPort from 'kill-port'

const exerciseDir = `../${process.env.EX_DIR ?? 'exercises'}`
const $$ = $({stdio: 'ignore', all: true, cwd: exerciseDir})

describe(`exercise ${exerciseDir}`, () => {
  before(() => $$`npm ci`)

  before(async () => {
    await killPort(3000).catch(() => {})
    $$`npm start`

    // wait till it's listening
    await retry(() => fetch('http://localhost:3000').then((res) => res.text()), {minTimeout: 50})
  })

  it('should serve the correct home page when serving root', async () => {
    const html = await fetch('http://localhost:3000').then((res) => res.text())

    expect(html).toMatch(/html.*body.*h1.*Home page.*a href.*\/other.html"/s)
  })

  it('should serve the correct home page when serving index.html', async () => {
    const html = await fetch('http://localhost:3000/index.html').then((res) => res.text())

    expect(html).toMatch(/html.*body.*h1.*Home page.*a href.*\/other.html"/s)
  })

  it('should serve the correct other page', async () => {
    const html = await fetch('http://localhost:3000/other.html').then((res) => res.text())

    expect(html).toMatch(/html.*body.*h1.*Other page.*a href.*\/"/s)
  })

  it('should serve the correct image', async () => {
    const catBuffer = await fetch('http://localhost:3000/cat.webp')
      .then((res) => res.blob())
      .then((blob) => blob.arrayBuffer())

    expect(new Uint8Array(catBuffer).slice(0, 10)).toStrictEqual(
      new Uint8Array(await readFile(join(exerciseDir, 'public/cat.webp'))).slice(0, 10)
    )
  })

  it('should serve a 404 for non-existing files', async () => {
    const html = await fetch('http://localhost:3000/favicon.ico').then((res) => res.status + res.statusText)

    expect(html).toMatch(/404Not Found/s)
  })
})
