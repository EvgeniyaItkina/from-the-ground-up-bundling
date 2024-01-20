# Frontend from the ground up

A workshop teaching frontend from first principles

## Lessons

1. [Serving HTML](./lessons/01-serving-html/README.md): how a browser shows an HTML page and how a server serves it.
1. [Serving JavaScript](./lessons/02-serving-js/README.md): the various ways a browser loads and executes JavaScript.
1. [Adding ESLint](./lessons/03-adding-lint/README.md): add static analysis testing to our code.

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

2. **Solved exercises**: `nn-<lesson-name>-exs`, e.g. `01-serving-html-exs`
   * if you're a lazy bum, you can just view the solved exercises here and verify
     that they work by running `npm install && npm test`
