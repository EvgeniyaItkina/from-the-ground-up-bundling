import {it} from 'node:test'
import {expect} from 'expect'
import {$} from 'execa'

it('should run prettier with eslint', async () => {
  const {stdout} = await $({reject: false, stdio: 'pipe'})`npm run test:eslint`

  expect(stdout).toContain('prettier')
})
