# Serving JavaScript

* TodoMVC code copied (and modified) from [1Marc](https://github.com/1Marc/modern-todomvc-vanillajs). Thanks!

## 1 - How does serving JavaScript work?

1. The browser parses the HTML, displaying it incrementally
1. The browser finds a `<script src="..."></script>`
1. The browser fetches the code, parses it, and executes it
1. When the execution is done, the browser continues parsing the HTML
1. This is usually not what we want, so we can add `defer` or `async` to the `<script>` to make the browser
   do them asynchronously.
   * `async`: download and parse it asyncronously, and execute when ready
   * `defer`: same, but execute only after DOM is downloaded and ready. This is probably what you usually want

This is for "script" code, which is the old code that does not support ESM.
This code is not allowed to use ESM `import/export`. For ESM, we have a new type of script: "module".

## 1 - How does serving ESM JavaScript work?

1. The script should be `<script type="module"></script>`
1. Same as "script", but `defer` is implied.
1. Now this JavaScript can use `import` and `export`
