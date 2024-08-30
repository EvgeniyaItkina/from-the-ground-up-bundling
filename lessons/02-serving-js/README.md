# 02 - Serving JavaScript

* TodoMVC code copied (and modified) from [1Marc](https://github.com/1Marc/modern-todomvc-vanillajs). Thanks!

## 1 - How does serving script JavaScript work?

1. Run `npm run start:01` to see this in action. Code is in `public/01-serving-script-js`.
1. The browser parses the HTML, displaying it incrementally
1. The browser finds a `<script src="..."></script>`
1. The browser fetches the code, parses it, and executes it
1. In this case, the execution is very slow because it's doing some horrible math calculation
1. During that time, nothing is displayed because the HTML isn't done parsing
1. When the execution is done, the browser continues parsing the HTML and renders the page

## 2 - Serving script using `async` or `defer`

1. Run `npm run start:02` to see this in action. Code is in `public/01-serving-script-defer`
1. This is usually not what we want, so we can add `defer` or `async` to the `<script>` to make the browser
   do them asynchronously.
   * `async`: download and parse it asyncronously, and execute when ready.
     Make sure that when you need to manipulate the DOM, you do it after the DOM is ready.
   * `defer`: same, but execute only after DOM is downloaded and ready.
     The script will not block the parsing of the HTML but will still block the rendering of the page
     until it's done, so if you have a slow script, you might want to run it under a `setTimeout(..., 0)`.
1. The sample code uses `defer`.

This is for "script" code, which is the old code that does not support ESM.
This code is not allowed to use ESM `import/export`. For ESM, we have a new type of script: "module".

## 3 - How does serving ESM JavaScript work?

1. Run `npm run start:03` to see this in action. Code is in `public/03-serving-script-module-js`.
1. The script should be `<script [src=...] type="module"></script>`
1. Same as "script", but `defer` is implied.
1. Now this JavaScript can use `import` and `export`
1. Note how the `script` tag imports a local file, and this one imports from `node_modules`, because 3D
   is tough!
1. Importantly, the NPM package `three` is also an ESM package, so it can also be served by the browser!
1. This is getting less and less rare.

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
1. The error is because the `index.js` we're importing does not get the `export` that the browser needs
1. It doesn't because it's a CJS script that does not use `export` but rather `module.exports`.
1. The error is interesting, because we're not getting a runtime error that `module.exports` doesn't exist.
   * THe CJS code isn't even run!
   * THis is because ESM parses the file and binds the import/exports even before the execution of the code.

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
   without any tooling.
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

### 1 - Make the TodoMVC code load in parallel

1. First, let's see how the code is loaded and parsed serially:
   1. Run `npm start` and navigate to `http://localhost:3000`
   1. Goto the "Performance" tab in the devtools and hit the reload button there to start recording performance
   1. Stop the recording after a few seconds and view the result
   1. Notice how the `app.js` is loaded and then in parallel the `helper.js` and `store.js` are loaded

1. Now let's change it to serial execution. How? By changing all `import` declarations to use `await import`
   1. Change all imports to use `await import`. So `import {TodoStore} from './store.js'` becomes
      `const {TodoStore} = await import('./store.js')`.
   1. Check yourself by running `npm start` or `npm test`
   1. Now run the performance check again and see that the load is executed _serially_


### 2 - Be a bundler

1. Let's be a bundler! Let's have the app be in one JS file.
1. Do that, in whatever way you want, and change the `index.html` to use that
   * Can you make it so that you can use either with bundling and
     without bundling by adding a query parameter `?bundled`?
1. That's it! You're doing exactly what a bundler does.
1. Check yourself by running `npm start` or `npm test`

