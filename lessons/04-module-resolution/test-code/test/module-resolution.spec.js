import {test, before} from 'node:test'
import {expect} from 'expect'
import {$} from 'execa'

const $$ = $({stdio: 'pipe', cwd: '../code'})

before(() => $$`npm install`)

test('npm start works', async () => {
  const {stdout} = await $$`node --run start`

  expect(stdout).toEqual(`
cjs-folder/node_modules/bare-specifier-with-main/src/index.js
cjs-folder/node_modules/bare-specifier-with-main/src/deeply-linked.js
cjs-folder/node_modules/bare-specifier-with-main/src/deeply-linked.cjs
cjs-folder/relative-module.js
cjs-folder/relative-module-with-extension.js
cjs-folder/realtive-folder/index.js
esm-folder/node_modules/bare-specifier-with-main/src/index.js
esm-folder/node_modules/bare-specifier-with-main/src/deeply-linked.js
esm-folder/node_modules/bare-specifier-with-main/src/deeply-linked.js
esm-importing-cjs.cjs
cjs-folder/relative-module.js
    `.trim())
})
