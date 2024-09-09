# 1 - Serving HTML

## 1 - How does a web browser work?

1. Gets a URL: `http://localhost:3000/`
1. Resolves the DNS name (`localhost`) to `127.0.0.1`
1. Opens a TCP connection to `127.0.0.1`, to port `3000`
1. Writes an HTTP request to it:

```
GET / HTTP/1.1
Header1: ...
Header2: ...

```

1. The first line is the "status" line, consisting of three fields, divided by spaces:
   - The method: in this case `GET`
   - The path: in this case `/`
   - The protocol: in this case `HTTP/1.1` (or `HTTP/2.0` or `HTTP/3.0` these days)
1. The HTTP headers are key-value pairs, separated by a colon.
   The key is the name of the header, and the value is the value of the header. These are optional.
1. Notice the empty line, which says that the next line after it is the body of the request.
   In this case, there is no body, because `GET` requests don't have bodies, but the empty line is needed to signify
   the end of the request and to tell the server that it can serve the response.
1. The lines in the HTTP protocol are separated by `\r\n` (CR=carriage return, LF=line feed) for historical reasons.
1. The server responds with a response whose body includes HTML:

```
HTTP/1.1 200 OK
Content-Length: nnn

<html><body>Hello, world<img src="cat.webp"></body></html>
```

1. The first line is the status line, consisting of three fields, divided by space:
   - The protocol: in this case `HTTP/1.1`
   - The status code: in this case `200` (we all know what these mean, right?)
   - The status message: in this case `OK` (can have spaces in it)
1. As usual, we have headers ending in a blank line, and then comes the body
1. The body is the HTML that the browser will render.
1. How will the browser know when the body ends? There are multiple ways:
   1. In HTTP/1.0, the browser knows that the server will close the connection when the body ends
   1. In HTTP/1.1, the browser knows that the body ends when the `Content-Length` header says it ends
   1. But there are other ways, like the `Transfer-Encoding: chunked` header, which is a way to send the body in chunks
1. In the exercise, we'll use the simplest way, which is to use HTTP/1.0.

## 2 - Writing a web server (`01-server.js`)

This server always returns the same HTML to the browser

### 3 ESM vs CommonJS

- The server `01-server.js` is a Node.js program.
  As such, it supports two module systems—CommonJS and ESM—just like any Node.js program.
- Remember: CommonJS files use `require/module.exports` and ESM files use `import/export`.
- In Node.js, a `.mjs` file means that it is ESM, and a `.cjs` file means that it is a CommonJS file, and `.js`
  is by default CommonJS, unless the `package.json` has a `type: module` property.
- Ours has `type: module`, because this is the recommended way today to start new code in Node.js (and, as
  we'll see, browser code). Why? Because it bears the most resemblance to how browsers see modules.
- So our `01-server.js` is an ESM file, and so uses `import` to import various packages.

## Exercises

##$ 1 - Write a web server that serves files

1. Goto `exercise/src/01-server.ex.js` and modify it so that it will serve the files under public, based
   on the path in HTTP
1. While you can test it using `npm test`, the best way to initially test it is to run
   `node ./src/01-server.ex.js` and goto `http://localhost:3000/` in the browser to see if the two
   pages are being served correctly.
1. You can add `--watch` (after `node`) to the command line
   to make the server restart every time you change the source code
1. Finally, run `npm test` to ensure that the code is correct
