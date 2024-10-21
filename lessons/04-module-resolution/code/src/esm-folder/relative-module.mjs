//@ts-expect-error didnt supply a d.ts file
import imported from 'bare-specifier-with-main'
//@ts-expect-error didnt supply a d.ts file
import imported2 from 'bare-specifier-with-main/src/deeply-linked.js'
//@ts-expect-error didnt supply a d.ts file
import imported3 from 'bare-specifier-with-exports/deeply-linked'

console.log('cjs-folder/relative-module.js');

export default 'cjs-folder/relative-module.js';
