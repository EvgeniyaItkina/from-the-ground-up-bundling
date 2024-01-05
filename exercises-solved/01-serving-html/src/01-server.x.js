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
    const html = readFileSync(join('public', finalPath), 'utf8')

    socket.write(
      `
HTTP/1.0 200 OK
Content-Type: text/html

${html}`
        .trim()
        .split('\n')
        .join('\r\n')
    )
  } catch (err) {
    socket.write(`HTTP/1.0 404 Not Found\n\r\n\rFile not found`)
  }

  socket.end()
})

server.listen(3000, () => console.log('listening on port 3000'))
