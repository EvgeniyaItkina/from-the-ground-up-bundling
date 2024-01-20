# 03 Adding ESLint Exercises

## 1 - Solve the ESlint problems

1. In `playwright.config.ts` by removing the unused variable
2. In `app.js`, by changing the `e` variable to `_e` and adding a rule that allows unused variables with `_`
   - Hint: configure the `no-unused-vars` rule in the `rules` part of the configuration

## 2 - Add Prettier to ESLint

Make it so that all prettier problems are eslint problems and can be autofixed with `Ctrl+Shift+.`

## 3 - Alternatively, add Prettier to `npm test`

Remove the previous plugin and make it so that `npm test` checks that all files conform to prettier using
`prettier --check .` (don't forget to `npm install --save-dev prettier`).
