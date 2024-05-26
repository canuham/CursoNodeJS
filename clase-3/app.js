const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();

app.use(express.json());
// app.use(cors()); Tambien se puede usar para solucionar el cors pero pone cors con * entonces deja entrar todas las paginas, se instala con npm i cors, tambien se pueden poner los accepted origins
app.disable('x-powered-by');

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-FLIGHT para los metodos complejos
// antes llega una peticion OPTIONS

const ACCEPTED_ORIGINS = [
  'http://localhost:1234',
  'http://localhost:8080',
  'https://movies.com',
  'https://caraham.dev'
];

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  const origin = req.header('origin');
  // Cuando la peticion es del mismo ororigin no se envia el header
  // https://localhost:1234 --> https://localhost:1234 (No lo enviaria)
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { genre, page } = req.query;
  const MOVIES_PER_PAGE = 5;
  const pageInt = parseInt(page);
  if (page) {
    const pageOfMovies = movies.slice(MOVIES_PER_PAGE * pageInt, MOVIES_PER_PAGE * (pageInt + 1));
    return res.json(pageOfMovies);
  }
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    // 422 Unprocessable Entity (Tambien se puede usar en vez del 400)
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(), // crea un random uuid v4
    ...result.data
  };
  // Esto no seria REST xq estamos guardando el estado en memoria, de momento se hara asi hasta crear una BD
  movies.push(newMovie);
  res.status(201).json(newMovie); // actualizar la cache del cliente
});

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  movies.splice(movieIndex, 1);
  return res.json({ message: 'Movie deleted' });
});

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  };

  movies[movieIndex] = updateMovie;
  return res.json(updateMovie);
});

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  }
  res.send();
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
