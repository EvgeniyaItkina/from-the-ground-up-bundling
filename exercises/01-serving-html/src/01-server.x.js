import {once} from 'node:events'
import net from 'node:net'

const server = net.createServer(async (socket) => {
  const request = await once(socket, 'data')
  console.log(request.toString())

  // Instead of writing to the socket directly, do this:
  // 1. Get the request's first line
  // 2. Get the path in that first line
  // 3. Read the file from that path. You can use `fs.readFileSync(path.join('public', _THE_FILE_NAME_))`.
  // 4. Use `import fs from 'node:fs' and `import path from 'node:path'` for `fs` and `path`
  // 5. Write the file to the socket. Don't forget writing the status line and headers first, with the correct
  //    line endings.
  // 6. If the file doesn't exist, just write a 404 status line

  socket.write(
    `
HTTP/1.0 200 OK
Content-Type: text/html

<html>
  <body>Hello, world: <img src="https://http.cat/images/200.jpg"></body>
</html>
  `
      .trim()
      .split('\n')
      .join('\r\n')
  )

  socket.end()
})

server.listen(3000, () => console.log('listening on port 3000'))
