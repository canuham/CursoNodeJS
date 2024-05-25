const http = require('node:http');
const dittoJson = require('./pokemon/ditto.json');
// CommonJS -> se puede importar json directamente

const processRequest = (req, res) => {
  const { url, method } = req;
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify(dittoJson));
        case '/about':
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('<h1>Sobre Nosotros</h1>');
          break;
        default:
          res.status = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404</h1>');
      }
      break;
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '';
          // escuchar el evento data
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            const data = JSON.parse(body);
            data.timestamp = Date.now();
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
          break;
        }
        default:
          res.status = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end('404 Not Found');
      }
      break;
    case 'PUT':
      break;
    case 'DELETE':
      break;
    default:
      break;
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log('Servidor corriendo en el puerto http://localhost:1234');
});
