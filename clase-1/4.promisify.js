const fs = require('node:fs');
const { promisify } = require('node:util'); // <--- Se usa para crear promesas en funciones que solo funcionan con callbacks y no con /promesas

const readFilePromise = promisify(fs.readFile);
//! Esto es un ejemplo ya que readfile si tiene su version con promesas, siempre usar el nativo cuando ya esta preparado ver 4.fs-promises.js

console.log('Leyendo el primer archivo...');
readFilePromise('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('primer texto: ', text);
  });

console.log('Hacer cosas mientras lee el archivo...');

console.log('Leyendo el segundo archivo...');
readFilePromise('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('segundo texto: ', text);
  });
