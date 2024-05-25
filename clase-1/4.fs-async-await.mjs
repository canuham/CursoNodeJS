import { readFile } from 'node:fs/promises';

//! Esto es secuencial aunque sea asincrono, por lo que el codigo libera el proceso, pero espera en cada await, por eso nunca se escribiria el text2 antes de que el text

console.log('Leyendo el primer archivo...');
const text = await readFile('./archivo.txt', 'utf-8');
console.log('primer texto: ', text);

console.log('Hacer cosas mientras lee el archivo...');

console.log('Leyendo el segundo archivo...');
const text2 = await readFile('./archivo2.txt', 'utf-8');
console.log('segundo texto: ', text2);
