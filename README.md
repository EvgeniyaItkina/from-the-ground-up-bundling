# Bundling From the Ground Up

A workshop teaching bundling from first principles

## Lessons

1. [Serving HTML](./lessons/01-serving-html/README.md): how a browser shows an HTML page and how a server serves it
1. [Serving JavaScript](./lessons/02-serving-js/README.md): the various ways a browser loads and executes JavaScript
1. [Browser code vs Node.js code](./lessons/03-browser-vs-nodejs): the difference between browser and Node.js code
1. [Module resolution in Node.js](./lessons/04-module-resolution/README.md): how Node.js runs code and imports ESM and CJS
1. [Bundling code](./lessons/05-bundling/README.md): how to bundle our code for the browser, as an alternative
   to native ESM modules
1. [Module resolution in bundlers](./lessons/06-module-resolution-bundlers): non-modern packages and how
   bundlers treat them
1. [Supporting Typescript](./lessons/07-typescript/README.md): add TypeScript to our project
1. [Module resolution in Typescript](./lessons/08-module-resolution-typescript/README.md): how TypeScript resolves modules
1. [Supporting JSX](./lessons/09-jsx/README.md): add JSX to our project
1. [CSS Modules](./lessons/10-css-modules/README.md): how to use CSS modules to scope our CSS
1. [Bundling resources](./lessons/11-bundling-resources/README.md): how to bundle our resources (images, fonts, etc.)
   using bundlers
1. [Module resolution in monorepos](./lessons/12-module-resolution-monorepos/README.md): how bundlers resolve modules
   in monorepos
1. [Chunking](./lessons/01-serving-html/README.md): splitting the bundle into chunks

## Using this repo

1. Fork it, clone the fork, and open VS Code on it (you can use WebStorm or any other IDE too).
1. For best results, install the ESLint extension
   ([see here for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
   and the Prettier extension
   ([see here for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
1. This repo does not work under Windows! You can either use MacOS, Linux, or WSL in Windows.

## Navigating the VSCode workspace

The VSCode workspace has a folder for each lesson, exercise, and solved exercises. You can figure out
which folder is what based on their names:

1. **Lessons**: `nn-<lesson-name>/code`, e.g. `01-serving-html`

   1. Read the README of the lesson and run whatever is there according to the README
   1. The README also includes the exercises that need to be done for the lesson (see below for exercises)

1. **Lesson code**: `nn-<lesson-name>/code`, e.g. `01-serving-html/code`

   1. Install the package using `npm install`
   1. See and run the sample code that you saw in the lesson, all available in the `src` folder

1. **Exercises**: `nn-<lesson-name>/exercises`, e.g. `01-serving-html/exercises`

   1. Install the package via `npm install`
   1. The exercises themselves are in the lesson README
   1. Do the exercise on the folder itself
   1. To make sure that the exercises were solved correctly, use `test-exercises` (see below)

1. **Solved exercises**: `nn-<lesson-name>-exs`, e.g. `01-serving-html-exs`

If you're a lazy bum, you can just view the solved exercises here

1. **Tests for Exercises**

These are tests that you can run to ensure that you solved the exercises correctly

   1. `npm install` the package
   1. Run the tests using `npm test`
   1. You can view the tests in the `test` folder

If you want to run the tests on the _solved_ exercises, run `EX_DIR=solutions npm test`

1. **Tests for Lesson code**: `nn-<lesson-name>/test-code`, e.g. `01-serving-html/test-code`

These are for internal use. They are there for me to just check that the lesson code runs correctly,
but feel free to run them using `npm install && npm test`.
