# 03 Adding ESLint

## 1 What is a linter

- Scans the code for problems (lint is the cotton fluff in your pockets!)
- There are lots of linters, but the main one in use today is ESLint

## 2 Installing ESLint

- Installing ESlint is as simple as `npm install --save-dev eslint`
- An alternative would be to use `npm init @eslint/config`, which also creates a lint configuration for you
  - What is `npm init`? It is a way to create a new project with a specific template. For example, `npm init @vitejs/app`
    creates a new Vite project. `npm init @eslint/config` creates a new ESLint configuration.
  - How does it work? It downloads the package you specify and executes it. In our case, it downloads
    `@eslint/create-config` and runs it (the `create` is added by the `npm init`). Nothing magical here.

## 3 Configuring ESLint

**Important note**: ESLint is in a transition phase in how to configure it. The new configuration way is
_very_ different from the old one, and is called FlatConfig. ESLint v8 uses the legacy configuration, but supports
the flat configuration, but version 9 will switch the two and support FlatConfig by default. I chose to use
the flat configuration in this course because (i) it really is nicer, and (ii) to be forward looking.

- The configuration for ESLint resides in a file named `eslint.config.js`. The existence of this file
  implies FlatConfig.

## 4 How FlatConfig works

- The idea behind flat config is this:
  - You export an array of "configuration objects".
  - The most important field in a configuration object is `files`, which specify which files this configuration applies
    to.
  - You can use `ignore` to exclude some files from this.
  - Other configuration options are the all important `rules` to specify which Lint rules to apply.
  - You can _not_ specify a file to indicate a configuration object that applies to all files
  - If two or more configuration objects apply to a file that is being checked, then the configurations are "merged",
    where the later one overrides the earlier ones
  - Simple, right? Much simpler than the older configuration
- ESLint has "recommended" rules. How does that work? Easy! You `import js from '@eslint/js'` and that contains
  lots of rule recommendations. Add `js.config.recommended` at the first configuration object, and you're good to go
- What about "environments", e.g. Node or Browser, which define a set of global variables that ESlint should know about?
  Easy! Use `languageOptions: {globals: <list-of-globals>}` to specify them.
- But how do you know what globals are needed by Node.js or Browser? Easy `import globals from 'globals'` and use
  `globals.node` or `globals.browser`
- Really nice! They use standard import/export and a very simple definition of configuration to do everything
  the old system did in a complex way ("plugins" and "overrides" and "parserOptions" and others).

## 4 Building Frontend ESLint configurations

- First off, let's make it plain: _all_ frontend apps include both Browser code and Node.js code!
- Huh? Yes! The `eslint.config.js` is a _Node.js_ file and so needs to be linted with Node.js rules
- Another example: Playwright tests are Node.js files.
- So have at least two configurations: one for Node.js with Node.js globals and one for Browser files
  with browser globals
  - You can see this in our ESlint
- But many times you have more than one of these: for example, Jest files need their own configuration and rules,
  and Playwight tests are Node.js tests

## 5 ESLint is a test

- The way I view it, there is nothing different between Prettier, ESLint, PlayWright, and Node:test. They are all
  tests. Which is why I want `npm test` to run them.
- The way I do it is simple:
  - Have `test:eslint` and `test:playwright` and others
  - Use `concurrently` to run all the "test:*" scripts
  - Voila! Instant and simple build system

## Exercises

## 1 - Solve the ESlint problems

If you run `npm test` you will see that it fails because of linter bugs. (To focus on the eslint bugs, you can
run just `npm run test:eslint`).

To fix them, you should:

1. In `playwright.config.ts`, remove the unused variable
1. In `store.js`, by telling yourself that the rule of no return in constructor is stupid and you want to allow it,
   so disable it in the configuration.
1. In `app.js`, by changing the `e` variable to `_e` and adding a rule that allows unused variables with `_`
   - Hint: configure the `no-unused-vars` rule in the `rules` part of the configuration

## 2 - Add Prettier to ESLint

Make it so that all prettier problems are eslint problems and can be "ESlint: fix all autofixed problems" (in VSCode).
You can use the package `eslint-plugin-prettier` for that. Read its readme to see what to do.

## 3 - Alternatively, add Prettier as another type of test to `npm test`

Remove the previous plugin and make it so that `npm test` checks that all files conform to prettier using
`prettier --check .` (don't forget to `npm install --save-dev prettier`).
