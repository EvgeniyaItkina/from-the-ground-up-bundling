# 03 Adding ESLint Exercises

## 1 What is a linter

- Scans the code for problems (lint is the cotton fluff in your pockets!)
- There are lots of linters, but the main one in use today is ESLint

## 2 Installing ESLint

- Installing ESlint is as simple as `npm install --save-dev eslint`
- An alternative would be to use `npm init @eslint/config`, which also creates a lint configuration for you

## 3 Configuring ESLint

**Important note**: ESLint is in a transition phase in how to configure it. The new configuration way is
_very_ different from the old one, and is called FlatConfig. ESLint v8 uses the legacy configuration, but supports
the flat configuration, but version 9 will switch the two and support FlatConfig by default. I chose to use
the flat configuration in this course because (i) it really is nicer, and (ii) to be forward looking.

- The configuration for ESLint resides in a file named `eslint.config.js`. The existence of this file
  implies FlatConfig.
- ESLint is a Node.js program. As such, it supports two module systems—CommonJS and ESM—just like any Node.js
  program.
- Remember: CommonJS files use `require/module.exports` and ESM files use `import/export`.
- In Node.js, a `.mjs` file means that it is ESM, and a `.cjs` file means that it is a CommonJS file, and `.js`
  is by default CommonJS, unless the `package.json` has a `type: module` property.
- Ours has `type: module`, because this is the recommended way (by me!) to start new code in Node.js (and, as
  we'll see, browser code). Why? Because it bares the most resemblance to how browsers see modules.
- So our `eslint.config.js` is an ESM file, and so uses `export default` to export the configuration, and uses
  `import` to import various things it needs for configuration.
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

## Note

- If you're using the VSCode ESLint plugin (and you should!) you have to turn on the FlatConfig check box:
  - Press `Cmd+,` or `Ctrl+,` to open the settings
  - Write "flat config" in the search
  - Check the checkbox of the found option to enable it

## 4 Building Frontend ESLint configurations

- First off, let's make it plain: _all_ frontend apps include both Browser code and Node.js code!
- Huh? Yes! The `eslint.config.js` is a _Node.js_ file and so needs to be linted with Node.js rules
- Another example: Playwright tests are Node.js files.
- So have at least two configurations: one for Node.js with Node.js globals and one for Browser files
  with browser globals
  - You can see this in our ESlint
- But many times you have more than one of these: for example, Jest files need their own configuration and rules

## 5 ESLint is a test

- The way I view it, there is nothing different between Prettier, ESLint, PlayWright, and Jest. They are all
  tests. Which is why I want `npm test` to run them.
- The way I do it is simple:
  - Have `test:eslint` and `test:playwright` and others
  - Use `concurrently` to run all the "test:*" scripts
  - Voila! Instant and simple build system


## Exercises

Find the exercises [here](../../exercises/03-adding-lint-ex/README.md)
