import {test, before} from 'node:test'
import {$} from 'execa'

const $$ = $({stdio: 'inherit', cwd: '../code'})

before(() => $$`npm install`)

test('npm test works', async () => {
  await $$`npm test`
})
