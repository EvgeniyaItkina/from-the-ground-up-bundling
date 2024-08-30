import {once} from 'node:events'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import net from 'node:net'

const server = net.createServer(async (socket) => {
  const request = await once(socket, 'data')
  console.log(request.toString())

  const statusLine = request.toString().split('\n')[0]
  const requestPath = statusLine.split(' ')[1]
  const finalPath = requestPath === '/' ? 'index.html' : requestPath

  try {
    const fileBuffer = readFileSync(join('public', finalPath))

    socket.write(
      `
HTTP/1.0 200 OK
Content-Type: text/html

`
        .trimStart()
        .split('\n')
        .join('\r\n')
    )

    socket.write(fileBuffer)
  } catch (err) {
    if (err.code === 'ENOENT') {
      socket.write(`HTTP/1.0 404 Not Found\n\r\n\rFile not found`)
    } else {
      throw err
    }
  }

  socket.end()
})

server.listen(3000, () => console.log('listening on port 3000'))
