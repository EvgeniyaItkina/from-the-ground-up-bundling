# 01 - Serving JavaScript Exercises

## 1 - Make the TodoMVC code load in parallel

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


## 2 - Be a bundler

1. Let's be a bundler! Let's have the app be in one JS file.
1. Do that, in whatever way you want, and change the `index.html` to use that
   * Can you make it so that you can use either with bundling and
     without bundling by adding a query parameter `?bundled`?
1. That's it! You're doing exactly what a bundler does.
1. Check yourself by running `npm start` or `npm test`
