// process: objeto global que proporciona informacion y control sobre el proceso actual de ejecucion

// argumentos de entrada de la terminal
/* console.log(process.argv); */ // Ejecutar como: node 7.process.js hola camilo como estas ???

// controlar el proceso y su salida

/* process.exit(0) // Todo a ido bien y tiene que terminar ahi
process.exit(1) // Ha habido un error y necesitamos que salga */

// podemos controlar eventos del proceso

process.on('exit', () => {
  // limpiar los recursos
  console.log('Saliendo del proceso...');
});

// current working directory
console.log(process.cwd()); // Nos dice desde que carpeta estamos ejecutando el proceso

// variables de entorno
console.log(process.env.PEPITO); // Ejecutar como: PEPITO=hola node 7.process.js
