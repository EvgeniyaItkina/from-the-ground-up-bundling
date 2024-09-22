# Browser code vs Node.js code

This lesson is important. It may seem trivial, and it is, but when we work in frontend, we tend to forget that code
we write is sometimes browser code and sometimes Node.js code. And sometimes it's both!

Let's discuss this. This lesson is mostly a theoretical lesson.

## When is code Node.js code and when is it browser code

Let's look at some code that serves frontend code.

## Node.js serving code

- When running `npm start`, we're actually running `node src/server.js`
- This is Node.js code
- It's running Fastify, which is serving the resources in `public`
- When is it serving it?
- When we run `curl http://localhost:3000/` it is serving `index.html`, which `curl` is
  just outputting to the console
- The output includes a script, but `curl` doesn't run it. Who runs it? The browser.
- Can I use `window` here? Ot `document`? No, because this is Node.js code, and it doesn't run in the browser
- Can I use `process.env.SOMETHING` here? Yes, because this is Node.js code, and it runs in Node.js

## Public browser HTML

- Now let's open a browser, and navigate to `http://localhost:3000/`
- The browser will HTTP GET `http://localhost:3000/` from the server and will receive `index.html`
- It is our Node.js code (using Fastify) that serves the `index.html` file
- But it is the browser that receives the `index.html` and _interprets_ it
- The browser will see the script tag and will run the JavaScript code in it, not after
  showing all the HTML on the page
- This is because the script is `type="module"`, which tells the browser to run the code after the page is loaded
- The browser will run the JavaScript code in the script tag

## Public browser JavaScript

- So now we have JavaScript code that is running in the browser
- Can I use `window` here? Yes, because this is browser code, and it runs in the browser
- Can I use `process.env.SOMETHING` here? No, because this is browser code, and it doesn't run in Node.js
  - Some of you have seen the user of `process.env` in the browser, but that's because of the bundler, which
    replaces `process.env` with the actual value during the build process
  - But we'll get to that later
- And we see the browser code importing another browser code, for the component
- What does the `import from './script.js'` do? It fetches the `script.js` file from the server
  and runs it in the browser.
- So when fetching the `script.js`, our server Node.js code is waking up and running, and respoding
  with the `script.js` file
- While the browser receives this JavaScript code and runs it as browser code, i.e. it has access to `window`
  but not to `process.env`.

## Playwright code

- Now let's look at what happens when we run `npm run test:playwright`
- We are actually running `playwright test`, and `playwright` is Node.js code
- What it does is first import `playwright.config.ts`

### `playwright.config.ts`

- So this is also Node.js code
- Does it have access to `process.env`? Yes, because this is Node.js code
- Does it have access to `window`? No, because this is Node.js code
- First Playwright runs the command under `webserver`
- We've already seen how `npm start` is running (Fastify) Node.js code that serves the HTML and JavaScript
- Now Playwright runs the tests, and the first thing in the test is `page.goto('/')`, which makes Playwright
  open the browser and navigate to `http://localhost:3000/`
- The browser will send a request to our server code, and the whole process as defined above happens:
  - Node.js server code (running under Node.js) returns the `index.html`
  - The browser parses the HTML and runs the code in the `<script>` (browser code)
  - The browser fetches the `script.js` file and runs it (browser code)
- Once Playwright notices that the page has loaded, it continues running the test code
- This test code, again, is Node.js code
- When the test code clicks on the "+" button, the browser simulates a click, which
  makes the browser run the JavaScript code that is in the `script.js` file, in the event listener.

## Vitest code

- Now let's look at what happens when we run `npm run test:vitest`
- We are actually running `vitest`, which is Node.js code
- Vitest imports `vitest.config.js`, which is also Node.js code
- Vitest runs the test in `test/vitest/counter.spec.js`. The test runs under Node.js
- But, wait, what do I see in the test code? Is it using `document.querySelector`? Yes!
- How is that possible? Because Vitest is running the test code in a browser-like environment
  - If we'll look at `vitest.config.js`, we'll see `environment: "jsdom"`. This tells Vitest
    to call JSDOM to create a browser-like environment.
  - What JSDOM does is it creates a `window` object that simulates lots of the `window` functions.
  - For example, it has a `document` that has a `querySelector` function, which behaves exactly like the browser's.
  - And the DOM elements it returns have `innerHTML`, `textContent`, etc.
  - Most frontend code won't know the difference between the real browser and JSDOM.
  - Once it has this `window` object, it sets the `globalThis.window` to this object, so code that refers
    to `window` will just work. Same for `globalThis.document = window.document`.
- This means that the test code can use `document.querySelector` and other browser functions, and so it can
  import the `script.js` file and run the code in it, just like the browser does.
- Which is what it does.
- And it can click on the "+" button, which will run the JavaScript code in the `script.js` file, just like
  the browser does.
- But it's all running in Node.js, and the "browser" is a simulator that is also running in Node.js.

## Exercises

### Recreate the path between browser code and Node.js code

Just like we did in the lesson. Do it for:

1. Running `npm start` and navigating in the browser to `http://localhost:3000/`
1. Running `npm run test:playwright`
1. Running `npm run test:vitest`

The solution should be a list where each item has the format - <filename> - what it does - Node.js/Browser,
e.g.

- `npm` - runs start - Node.js
- `src/serve.js` - runs and listens on localhost:3000 - Node.js

Browser navigates to `htttp://localhost:3000/`

- `src/serve.js` - serves `index.html` - Node.js`
- `public/index.html` - browser receives `index.html` - Browser
  ...
