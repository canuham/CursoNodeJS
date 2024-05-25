const fs = require('node:fs');

console.log('Leyendo el primer archivo...');
fs.readFile('./archivo.txt', 'utf-8', (_err, text) => { // <--- cuando la funcion readFile termina se ejecuta el callback, mientras el codigo sigue corriendo el hilo principal
  console.log(text);
});

console.log('Hacer cosas mientras lee el archivo...');

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivo2.txt', 'utf-8', (_err, text) => {
  console.log(text);
});

// ? callback: funcion que se ejecuta cuando termina una tarea asincrona
