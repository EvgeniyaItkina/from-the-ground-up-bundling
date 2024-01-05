import {once} from 'node:events'
import net from 'node:net';

const server = net.createServer(async socket => {
  const request = await once(socket, 'data');
  console.log(request.toString());

  socket.write(`
HTTP/1.0 200 OK
Content-Type: text/html

<html>
  <body><h1>Hello, world</h1><img src="https://http.cat/images/200.jpg"></body>
</html>
  `.trim().split('\n').join('\r\n'));

  socket.end();
})

server.listen(3000, () => console.log('listening on port 3000'))
