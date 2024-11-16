import { once } from 'node:events'
import net from 'node:net'
import { readFile } from 'node:fs/promises';

const server = net.createServer(async (socket) => {
  const request = await once(socket, 'data')
  console.log(request.toString())

  const rows = request.toString().split('\r\n');
  const statusline = rows[0];
  const statuslinefilds = statusline.split(' ');
  const path = statuslinefilds[1].slice(1);
  
  const extension = path.split('.')[1]
  console.log(extension);
  

  let contentType = 'application/octet-stream'
  
  if (extension === 'html') {
    contentType = 'text/html'
  } else if (extension === 'webp') {
    contentType = 'image/webp'
  }

  let contents
  try {
    contents = await readFile('public/' + path);
    console.log('********', path, contents.length)
  } catch {
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
    socket.write('hi')
    socket.end();
    return
  }
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
Content-Type: ${contentType}

  `
      .trimStart()
      // translate to HTTP protocol line terminator (we're assuming Linux OS here)
      .split('\n')
      .join('\r\n')
  )

  socket.write(contents)

  socket.end()
})

server.listen(3000, () => console.log('listening on port 3000'))