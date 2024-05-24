import { readFile } from 'node:fs/promises';

console.log('Leyendo el primer archivo...');
console.log('Leyendo el segundo archivo...');

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('primer texto: ', text);
  console.log('segundo texto: ', text2);
});

console.log('Hacer cosas mientras lee el archivo...');

//! ! EXPLICACION DE TODAS LAS ASINCRONIAS: https://youtu.be/yB4n_K7dZV8?si=IMTfs8yCciu_Wdeu&t=3988
