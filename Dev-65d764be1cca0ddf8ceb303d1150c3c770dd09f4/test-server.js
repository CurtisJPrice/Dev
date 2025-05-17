const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from Node!');
}).listen(3000, () => console.log('🧪 Test server on port 3000'));
