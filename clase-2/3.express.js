const express = require('express');
const dittoJSON = require('./pokemon/ditto.json');

const PORT = process.env.PORT ?? 1234;

const app = express();

app.disable('x-powered-by'); // desactuivar el header "X-Powered-By": "Express"

// Creamos el middleware, todas las peticiones pasan antes por aqui, o podemos especificar que peticion pasara por el middleware ejm: '/Pokemon/*'
// Tambien podemos especificar que sea para un tipo de peticion ejm: 'POST', 'GET', 'PUT', 'DELETE'
/* app.use((req, res, next) => {
  console.log('Mi primer middleware');
  // Trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  next();
}); */

// Middleware para leer el body de un POST
/* app.use((req, res, next) => {
  if (req.method !== 'POST') next();
  if (req.headers['content-type'] !== 'application/json') next();

  // Solo llegan metodos post y tienen el header de json

  let body = '';
  // escuchar el evento data
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    // Mutar la request y meter la informacion en el req.body
    req.body = data;
    next();
  });
}); */

// Mismo middleware anterior pero con express
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Mi página</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  // req.body deberiamos almacenar en la base de datos
  res.status(201).json(req.body);
});

// La ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
