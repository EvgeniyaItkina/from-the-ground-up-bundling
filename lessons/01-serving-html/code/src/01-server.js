import {once} from 'node:events'
import net from 'node:net'

const server = net.createServer(async (socket) => {
  const request = await once(socket, 'data')
  console.log(request.toString())

  socket.write(
    `
HTTP/1.0 200 OK
Content-Type: text/html

  `
      .trimStart()
      // translate to HTTP protocol line terminator (we're assuming Linux OS here)
      .split('\n')
      .join('\r\n')
  )

  socket.write(
    `
<html>
  <body><h1>Hello, world</h1><img src="https://http.cat/images/200.jpg"></body>
</html>
`.trim()
  )

  socket.end()
})

server.listen(3000, () => console.log('listening on port 3000'))
