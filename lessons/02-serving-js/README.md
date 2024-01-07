# 02 - Serving JavaScript

* TodoMVC code copied (and modified) from [1Marc](https://github.com/1Marc/modern-todomvc-vanillajs). Thanks!

## 1 - How does serving script JavaScript work?

1. Run `npm run start:01` to see this in action. Code is in `public/01-serving-script-js`.
1. The browser parses the HTML, displaying it incrementally
1. The browser finds a `<script src="..."></script>`
1. The browser fetches the code, parses it, and executes it
1. When the execution is done, the browser continues parsing the HTML

## 2 - Serving script using `defer`

1. Run `npm run start:02` to see this in action. Code is in `public/01-serving-script-defer`
1. This is usually not what we want, so we can add `defer` or `async` to the `<script>` to make the browser
   do them asynchronously.
   * `async`: download and parse it asyncronously, and execute when ready
   * `defer`: same, but execute only after DOM is downloaded and ready. This is probably what you usually want

This is for "script" code, which is the old code that does not support ESM.
This code is not allowed to use ESM `import/export`. For ESM, we have a new type of script: "module".

## 3 - How does serving ESM JavaScript work?

1. Run `npm run start:03` to see this in action. Code is in `public/03-serving-script-module-js`.
1. The script should be `<script [src=...] type="module"></script>`
1. Same as "script", but `defer` is implied.
1. Now this JavaScript can use `import` and `export`
1. Note how the `script` tag imports a local file, and this one imports from `node_modules`, because 3D
   is tough!
1. Importantly, the NPM package `three` is also an ESM package! This is getting less and less rare.
1. How did I know to import this particular file (`/build/three.module.js`)? Did I geuess it?
1. No! I looked in the `package.json` of the package, and saw these:
   *
   ```js
      "main": "./build/three.js",
      "module": "./build/three.module.js",
      "exports": {
      ".": {
         "import": "./build/three.module.js",
         "require": "./build/three.cjs"
      },
   ```

   * `main` is the old way to say what file is the entry point. Note that it points to a different (non-ESM) file
   * `module` is also the old way to say what file is the entry point for _ESM_.
   * `exports` is the new way to do things, and there you can specify for each entry point
     (yes, you can have multiple of those!) what is the entry point
   * So I looked at `exports`, and chose the `import` condition, and... voila!
   * Who else looks at these fields? Node.js ignores `module` but does look at the others. Also Parcel and WebPack and
     Vite.

## 4 - Failing to serve a CommonJS package

1. Run `npm run start:04` to see this in action. Code is in `public/04-serving-script-common-js-badly`.
1. Most packages in NPM are _not_ ESM. They are "CommonJS", which means they don't use `import/export` but
   rather `require/exports`:

   ```js
   // file-to-import.js
   module.exports.answerToLife = 42

   // importing-file.js
   const {answerToLife} = require('./file-to-import')
   ```

1. Browsers don't understand CJS, which is one reason we're all migrating to ESM.
1. Note how CJS does not require file extensions, while browser ESM does.
1. If we try to use a CJS package, we will get an error.
1. The error is interesting, because we're not getting a runtime error that `module.exports` doesn't exist.
   * THe CJS code isn't even run!
   * THis is because ESM parses the file and binds the import/exports even before the execution of the code.
1. If you w

## 5 - Serving a CommonJS package

1. Run `npm run start:05` to see this in action. Code is in `public/05-serving-script-common-js-goodly`.
1. So if most packages in NPM are CJS, then we can't use most of NPM? Yes we can! How?
1. One way is to use on the CDNs. I like `esm.sh`: if you do `import ... from 'https://esm.sh/randoquoter` then
   you get the NPM package converted from CJS to ESM. It mostly works!
   * Note that you can choose a specific version or range of /home/giltayar/code/frontend-from-the-ground-up/exercises/01-serving-html-exversion in `esm.sh` by changing the URL a bit
1. And, yes, browsers can import from HTTPS. Of course they can!
1. The other way is to use bundlers, who can also use CJS packages. We'll talk about those later.

## 6 - TodoMVC

1. Run `npm run start:06` to see this in action. Code is in `public/06-todomvc`.
1. This is a "real" application that uses JavaScript with ESM. It's Vanilla JS, so it can just work in the browser
   without any tooling. Next lesson, we'll translate this to TypeScript and see how to deal with that!
1. Note also the network tab: it first loads the HTML and then `app.js` and
   then simultaneously `helper.js` and `store.js`.
1. So `import`-s are not "executed" serially: if they were, we would have seen them load sequentially.
1. What actually happens is this:
   1. `app.js` is loaded and parsed. It notices that it imports `helper.js` and `store.js`
   1. `helper.js` and `store.js` are loaded and parsed in parallel. If they would have imported stuff, this
      would have continued recursively.
   1. Once all modules in the tree have been loaded, then _and only then_ is the JS in the modules executed,
      in depth-first order.
   1. So if you have:

      ```js
      console.log('importing...')
      import something from './somewhere.js'

      // somewhere.js
      console.log('somewhere...')
      // ...
      ```

      Then the log would be:

      ```log
      somewhere...
      importing...
      ```

      and not the other way around.

## Exercises

Find the exercises [here](../../exercises/02-serving-js-ex/README.md)
