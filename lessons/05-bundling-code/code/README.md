# Bundling Code

## What is a bundler and why do we need it?

* We saw how we can build an entire app using ESM that the browser understands
* But there are a few problems that make us unable to use this:
  * Browsers don't understand bare specifiers (e.g. `import 'lodash'`)
  * Browsers don't understand commonjs and lost of NPM pacakges are still commonjs
  * This can result in hundreds of requests to the server, and browsers are very good at this, but not _that_ good
* The first problem can be easily solved with "import maps"
  (Read [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) if you're interested)
  but the other two problems can't really be solved.
* The solution - bundle it into a single file
* Let's try it on our "quick brown fox" code
* We'll use the simplest bundler I know of - esbuild
* We'll also use the simplest bundler I know of - esbuild
* `npx esbuild --bundle --outdir=dist src/the-quick-brown-fox/index.mjs`
* Now let's run it! `node dist/index.js`
  * It works! I outputs "the quick brown fox jumped over the lazy dog"
* Let's look inside
  * You can see that all the modules are inside `commonjs/esm` scopes, except for the top one
  * It knows how to deal with CommonSJ and ESM
  * It knows how to deal with all the Node.js resolutions as we defined them
* In the exercise, you will do the same with a browser app - the TodoMVC we showed in previous lessons.

## Exercises

* Bundle and run the todomvc code in the browser
  * Manually (in folder `manual`)
  * Using esbuild (in folder `dist`)
* See how simpler everything is when everything is ESM
  * Why? Because `require` is a function
* Add function to two places and see how esbuild deals with it
* Add an unused function and see how esbuild deals with it (treeshaking)
