# 4 - Module resolution in Node.js

## Motivation

- Why are we looking at module resolution in Node.js, when this is a course about Bundlers in Frontend?
- Because, as we'll see, all bundlers (and TypeScript) use the same module resolution as Node.js does.
- While they also add more stuff, the basics are the same.
- So to understand bundlers, one must understand how Node.js resolves modules.

## Module specifiers

- Importing a module in Node.js is done using the `import` statement
- `import _stuff_ from '_specificer_';`
- The specifier is the what needs to be resolved to the module file
- There are three kinds of specifiers -
  - **Relative specifiers**: start with `./` or `../`, .e.g, './utils.js' They are resolved relative to the importing file.
  - **Absolute specifiers**: start with `/`, e.g. '/home/giltayar/project/foo.jfs'.
    They are absolute paths on disk. Very rarely used. Never really used them except in troubleshooting scenarios.
  - **Bare specifiers**: do not start with `./` or `../`, e.g. `'lodash'`.
    They are resolved using the Node.js module resolution, via `node_modules`.

## Module systems - ESM and CommonJS

- There are two module systems in Node.js - ESM (ECMAScript Modules) and CommonJS (CJS)
- The original one is CJS, and it uses `require` and `module.exports` to import and export modules.
- The newer one is ESM, and it uses `import` and `export` to import and export modules.
- Because Frontend JavaScript uses ESM, and because ESM is the newer one, we will be concentrating on that, but I
  will also discuss CJS because sometimes you see this in the wild.

## How does Node.js know whether a file is ESM or CJS?

- Node.js uses the file extension to determine whether a file is ESM or CJS (after file resolution)
- If the file extension is `.mjs`, then it's ESM.
- If the file extension is `.cjs`, then it's CJS.
- If the file extension is `.js`, then it's CJS, unless the `type` field in
  the "closest" `package.json` is set to `module`, in which case it's ESM.
- Node.js uses _only_ the file extension. It does not look in the file and say - "ooh, there's an `import` so it
  must be ESM". It's all about the file extension.

- Examples:
- [Resolving `require` via `.cjs` extension (line #10)](./code/src/esm-folder/relative-module.mjs#10)
- [Resolving `require` via `.mjs` extension (line #6)](./code/src/module-resolution.js#6)
- [Resolving `import` via `.js` and `type: module` (line #3)](./code/src/esm-folder/node_modules/bare-specifier-with-main/package.json#3)


  - Bare specifiers
    - [Resolving `require` via bare-specifier and `main` field (line #2)](./code/src/cjs-folder/relative-module.js#2)
    - [Resolving deeply-linked `require` via bare-specifier and `main` field (line #4)](./code/src/cjs-folder/relative-module.js#4)
    - [Resolving deeply-linked `require` via bare-specifier and `exports` field (line #6)](./code/src/cjs-folder/relative-module.js#6)

## Module resolution for relative specifiers when using `import`

- This is easy. You just resolve the path using the regular path resolution, and voila!
- Note that the file extension is _not_ optional. If you don't have a file extension, Node.js will not try and guess
  it!
- Also note that the trick with specifying a folder, and Node.js accessing `index.js` in the folder, won't work!
- These guessing games that Node.js is doing, work only in CJS (which we will talk about shortly)
- Relative specifiers in ESM are simple - resolve the file and you're done!
- This is by design and is meant to be browser compatible
- But, you say! When I use ESM in my frontend code, then it's not like that! I can use specifiers without extensions!
- That's true, but that's because the _bundler_ is doing the resolution, not Node.js. The module resolution there
  is _different_ than what Node.js does. We will be talking about module resolution in browsers in a separate
  lesson. For now, let's concentrate on Node.js.

- Example: [Importing via relative specifier (line #10)](./code/src/esm-folder/relative-module.mjs#10)

## Module resolution for absolute specifiers when using `import`

- Not very important, but for completeness sake, let's talk about it.
- It's even easier than relative specifiers. The path is the path to the module file! No resolution needed.

## Module resolution for bare specifiers when using `import`

- This is the weird one. Let's use `import {cloneDeep} from 'lodash';` as an example.
- It will look in the current directory of the importing file, and search for a folder named `node_modules`.
- In `node_modules` it will look for the `package.json` file.
- In it, it will look either for the `exports` or, if not present, the `main` field
- We will devote a whole thing for `exports`, so for now, let's concentrate on `main`.
- The `main` field is the path to the main file of the module, and this is how it resolves the bare specifier.
- If the folder does not exist, it will go up one level and look for `node_modules` there, and so on, all the
  way to the root of the filesystem.
- What happens if the specifier is `lodash/src/cloneDeep.js`? This will work by ignoring the `main` field
  in the `package.json`. But it will _not_ work once there is an `exports` field, which blocks such deep links.

- Example: [Importing via bare-specifier and `main` field (line #2)](./code/src/esm-folder/relative-module.mjs#2)
- Example: [Importing deeply-linked module via bare-specifier and `main` field (line #4)](./code/src/esm-folder/relative-module.mjs#4)

### `exports`

- The `exports` field is a new field in `package.json` that allows you to specify how to resolve a module. Let's
  use the `lodash/cloneDeep` example.
- If this specifier is used, it finds the appropriate `node_modules` folder and it's `packgage.json` and looks
  for its `exports` field. Let's see:

```json
{
  "exports": {
    ".": "./src/index.js",
    "./cloneDeep": "./src/cloneDeep.js"
  }
}
```

- This tells Node.js that when it sees `lodash/cloneDeep`, it should look in `node_modules/lodash/src/cloneDeep.js`.
- The `"."` thingie is a replacement for the `main` field. If you have an `exports` field, you should not have a
  `main` field. `exports` always wins, BTW.
- You will also see the exports used with "conditions":

```json
{
  "exports": {
    "./cloneDeep": {
      "import": "./src/cloneDeep.js",
      "require": "./dist/cjs/cloneDeep.cjs"
    }
  }
}
```

- The "condition" tells Node.js - if you're "require"-ing the module, then use the `require` entry, and if you're
  "import"-ing the module, then use the `import` entry.
- Remember this, because bundlers use this "condition" thingie. But if you're only using ESM in Node.js,
  then you don't need it.

- Example: [Importing deeply-linked module via bare-specifier and `exports` field (line #6)](./code/src/esm-folder/relative-module.mjs#6)


## Module resolution for relative specifiers when using `require`

- Very similar to ESM, but the file extension is optional. If you don't have a file extension, Node.js will try
  to guess it. It will look for `.cjs`, then `.js`, then `.json`, then `.node`.
- Done? Ha!
- It will also look for a folder with the same name, and look for `index.cjs/js/json`.

- Example: [Requiring module via relative specifier without extension (line #3)](./code/src/module-resolution.js#3)
- Example: [Requiring module via relative specifier with extension (line #4)](./code/src/module-resolution.js#4)
- Example: [Requiring module via relative specifier of a folder with `index.js` (line #5)](./code/src/module-resolution.js#5)

## Module resolution for absolute specifiers when using `require`

- Not really used, but for completeness sake, it will do the same as relative specifiers, except that it will not
  absolutize the path.

## Module resolution for bare specifiers when using `require`

- This is exactly the same as for ESM! Including the use of `exports`.

- Example: [Requiring via bare-specifier and `main` field (line #2)](./code/src/cjs-folder/relative-module.js#2)
- Example: [Requiring deeply-linked module via bare-specifier and `main` field (line #4)](./code/src/cjs-folder/relative-module.js#4)
- Example: [Requiring deeply-linked module via bare-specifier and `exports` field (line #6)](./code/src/cjs-folder/relative-module.js#6)

## Summary

- Module resolution when doing `import` and `require` is different
- For relative specifiers, `import` resolution means just resolving the path and finding the file. Very simple.
  The extension MUST be specified
- For `require`, it's a bit more complicated, because the extension is optional Node.js tries to guess the extension
  or look for a folder with the same name and an `index.js` in it.
- For bare specifiers, the resolution is the same. It goes up the folder tree, looking `node_modules/bare-specifier`.
- If it finds one, it will look for an `exports` field (or a `main` field if not `exports`), and use that
  to resolve the module.
- If there is an `exports` field, deep linking not via `exports` is not allowed, otherwise it is.
- The `exports` can specify a set of paths and the resolution to them, and can use "conditions" to specify different
  resolutions based on whether we are `import`-ing or `require`-ing the module.

## Exercises

- Look at the code in `resolve.js`. Make it work.
  (it should use ESM and CJS and .cjs and .mjs and all sorts of everything...)
