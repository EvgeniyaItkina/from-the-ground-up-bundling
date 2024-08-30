import {before, describe, it} from 'node:test'
import {expect} from 'expect'
import {$} from 'execa'
import retry from 'p-retry'
import {readFile} from 'node:fs/promises'

describe('01-server.ex.js', () => {
  before(async () => {
    const serverProcess = $$`node ./src/01-server.ex.js`
    serverProcess.unref()

    // wait till it's listening
    await retry(() => fetch('http://localhost:3000').then((res) => res.text()), {
      retries: 20,
      minTimeout: 100,
      factor: 10,
    })
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
      new Uint8Array(await readFile('public/cat.webp')).slice(0, 10)
    )
  })

  it('should serve a 404 for non-existing files', async () => {
    const html = await fetch('http://localhost:3000/favicon.ico').then((res) => res.status + res.statusText)

    expect(html).toMatch(/404Not Found/s)
  })
})

const $$ = $({stdio: 'ignore'})
