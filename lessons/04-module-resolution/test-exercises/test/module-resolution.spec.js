import {test, before} from 'node:test'
import {expect} from 'expect'
import {$} from 'execa'

const exerciseDir = `../${process.env.EX_DIR ?? 'exercises'}`

const $$ = $({stdio: 'pipe', cwd: exerciseDir})

before(() => $$`npm install`)

test('npm start works', async () => {
  const {stdout} = await $$`node --run start`

  expect(stdout).toEqual('the quick brown fox jumped over the lazy dog')
})
