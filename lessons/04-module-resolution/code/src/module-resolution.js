// This is a CJS file

const imported = require('./cjs-folder/relative-module')
const imported2 = require('./cjs-folder/relative-module-with-extension.js')
const imported3 = require('./cjs-folder/relative-folder')

import('./esm-folder/relative-module.mjs').catch(console.error)
