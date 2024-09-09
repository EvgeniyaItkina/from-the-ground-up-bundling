import {test, before} from 'node:test'
import {$} from 'execa'

const $$ = $({stdio: 'inherit', cwd: '../code'})

before(async () => {
  console.log('*********************************** running NPM INSTALL')
  await $$`npm install`;
  console.log('*********************************** done NPM INSTALL')
})

test('npm test works', async () => {
  console.log('*********************************** running NPM TEST')
  await $$`npm test`
  console.log('*********************************** done NPM TEST')
})
