import express, { json } from 'express';
// import movies from './movies.json'; //! Esto no es valido, no se puede importar json directamente en ESmodules
// import movies from './movies.json' assert { type: 'json' }; //! Esta sintaxis no existe, es experimental y ya ha cambiado, ahora cambio a "with"
// import movies from './movies.json' with { type: 'json' }; //? EN EL FUTURO
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

// ?como leer un json en ESmodules (ver recomendado en './utils.js')
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

const app = express();

app.use(json());
app.disable('x-powered-by');

app.use(corsMiddleware());

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
