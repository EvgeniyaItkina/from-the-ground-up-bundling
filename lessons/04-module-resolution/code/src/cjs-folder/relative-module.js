//@ts-expect-error didnt supply a d.ts file
const imported = require('bare-specifier-with-main')
//@ts-expect-error didnt supply a d.ts file
const imported2 = require('bare-specifier-with-main/src/deeply-linked')
//@ts-expect-error didnt supply a d.ts file
const imported3 = require('bare-specifier-with-exports/deeply-linked')

console.log('cjs-folder/relative-module.js');

module.exports = 'cjs-folder/relative-module.js';
