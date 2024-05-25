// Para usar async await en un archivo .js necesitamos una funcion autoinvocada ya que no tiene el contexto global del await como si lo tienen los .mjs

const { readFile } = require('node:fs/promises');

// IIFE (Immediately Invoked Function Expression)
(
  async () => {
    console.log('Leyendo el primer archivo...');
    const text = await readFile('./archivo.txt', 'utf-8');
    console.log('primer texto: ', text);

    console.log('Hacer cosas mientras lee el archivo...');

    console.log('Leyendo el segundo archivo...');
    const text2 = await readFile('./archivo2.txt', 'utf-8');
    console.log('segundo texto: ', text2);
  }
)(); // ? <--- Funcion autoinvocada: se ejecuta justo cuando se crea la funcion
