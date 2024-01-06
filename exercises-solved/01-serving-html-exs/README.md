# Serving HTML

## 1 How does a web browser work?

1. Gets a URL: `http://localhost:3000/`
2. Resolves the DNS name (`localhost`) to `127.0.0.1`
3. Opens a TCP connection to `127.0.0.1`, to port `3000`
4. Writes an HTTP request to it:

```
GET / HTTP/1.1
Header1: ...
Header2: ...

```
5. Notice the empty line, which says that it's time to respond
6. The server responds with a response whose body includes HTML:

```
HTTP/1.1 200 OK
Content-Length: nnn

<html><body>Hello, world</body></html>
```

## 2 Writing a web server (`01-web-server.js`)

This server always returns the same HTML to the browser
