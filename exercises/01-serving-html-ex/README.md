# 01-  Serving HTML Exercises

## 1 - Write a web server that serves files

1. Goto `src/01-server.x.js` and modify it so that it will serve the files under public, based
   on the path in HTTP
1. While you can test it using `npm test`, the best way to initially test it is to run
   `node ./src/01-server.x.js` and goto `http://localhost:3000/` in the browser to see if the two
   pages are being served correctly.
1. You can add `--watch` to the command line to make the server restart every time you change the source code
1. Finally, run `npm test` to ensure that the code is correct
