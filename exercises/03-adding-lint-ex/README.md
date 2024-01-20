# 03 Adding ESLint Exercises

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

Make it so that all prettier problems are eslint problems and can be autofixed with `Ctrl+Shift+.`. You
can use the package `eslint-plugin-prettier` for that. Read it's readme to see what to do.

## 3 - Alternatively, add Prettier as another type of test to `npm test`

Remove the previous plugin and make it so that `npm test` checks that all files conform to prettier using
`prettier --check .` (don't forget to `npm install --save-dev prettier`).
