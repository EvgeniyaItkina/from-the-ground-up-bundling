# Frontend Tooling From the Ground Up

A workshop teaching frontend from first principles

## Lessons

1. [Serving HTML](./lessons/01-serving-html/README.md): how a browser shows an HTML page and how a server serves it
1. [Serving JavaScript](./lessons/02-serving-js/README.md): the various ways a browser loads and executes JavaScript
1. [Serving CSS and images](./lessons/03-serving-resources/README.md): how a browser loads and applies CSS
1. [Adding ESLint](./lessons/04-adding-lint/README.md): add static analysis testing to our code
1. [Supporting Typescript](./lessons/05-supporting-ts/README.md): add TypeScript to our project
1. [Bundling code](./lessons/06-bundling/README.md): how to bundle our code for the browser, as an alternative
   to native ESM modules
1. [CSS Modules](./lessons/07-css-modules/README.md): how to use CSS modules to scope our CSS
1. [Bundling resources](./lessons/08-bundling-resources/README.md): how to bundle our resources (images, fonts, etc.)
   using bundlers
1. [Node.js and modules](./lessons/09-node-modules/README.md): how Node.js runs code and imports ESM and CJS
1. [Node.js and JSDOM](./lessons/10-node-jsdom/README.md): how to use JSDOM to run frontend code in Node.js
1. [Unit testing](./lessons/11-unit-testing/README.md): how to write and run unit tests for our code, using Node:test
1. [Vitest](./lessons/12-vitest/README.md): Vitest and why use it
1. [integration testing](./lessons/12-integration-testing/README.md): how to write and run integration
   tests using Playwright

## Navigating the VSCode workspace

The VSCode workspace has a folder for each lesson, exercise, and solved exercises. You can figure out
which folder is what based on their names:

1. **Lessons**: `nn-<lesson-name>`, e.g. `01-serving-html`

   1. Install the package via `npm install`
   1. Read the README of the lesson and run whatever is there according to the README
   1. Run the tests via `npm test`

2. **Exercises**: `nn-<lesson-name>-ex`, e.g. `01-serving-html-ex`

   1. Install the package via `npm install`
   1. Read the README of the folder to understand the exercise
   1. Do the exercise
   1. Check if you're right by running the tests via `npm test`

3. **Solved exercises**: `nn-<lesson-name>-exs`, e.g. `01-serving-html-exs`
   - if you're a lazy bum, you can just view the solved exercises here and verify
     that they work by running `npm install && npm test`
