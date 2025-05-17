const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from Node!');
}).listen(3001, () => console.log('🧪 Test server on port 3001'));
