import {before, describe, it} from 'node:test'
import {expect} from 'expect'
import {$} from 'execa'
import retry from 'p-retry'
import killPort from 'kill-port'

const $$ = $({stdio: 'ignore', cwd: '../code'})

describe('code', () => {
  before(() => $$`npm install`)

  before(async () => {
    await killPort(3000).catch(() => {})
    $$`node ./src/01-server.js`

    // wait till it's listening
    await retry(() => fetch('http://localhost:3000').then((res) => res.text()), {minTimeout: 50})
  })

  it('should serve the correct HTML when getting root', async () => {
    const html = await fetch('http://localhost:3000').then((res) => res.text())

    expect(html).toMatch(/html.*body.*Hello.*cat/s)
  })

  it('should serve the same HTML when getting non-root as root', async () => {
    const rootHtml = await fetch('http://localhost:3000').then((res) => res.text())
    const nonRootHtml = await fetch('http://localhost:3000/ceci-nest-pas-root').then((res) => res.text())

    expect(rootHtml).toEqual(nonRootHtml)
  })
})
