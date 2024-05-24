const path = require('node:path');

// esto esta prohibido por las barras en los sistemas operativos
// `./content/subfolder/test.txt`;

// windows -> \
// linux -> /

console.log(path.sep); // nos muestra el separador del sistema operativo -> / o \

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log({ filePath });

// obtener nombre del archivo de una ruta
const base = path.basename('/tmp/caraham-secret-files/password.txt');
console.log({ base });

const fileName = path.basename('/tmp/caraham-secret-files/password.txt', '.txt'); // Le decimos que quite el .txt
console.log({ fileName });

const extension = path.extname('my.super.image.jpg');
console.log({ extension });
