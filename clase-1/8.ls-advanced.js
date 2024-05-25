const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors'); // Dependencia para poner color al output

const folder = process.argv[2] ?? '.'; // Ejecutar como: node 8.ls-advanced.js ./cjs <-Nos permite pasarle la carpeta que queremos ver por argumentos en la entrada

async function ls (folder) {
  let files = [];
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(pc.red(`❌ No se ha podido leer el directorio ${folder}`));
    process.exit(1);
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath); // Informacion del archivo
    } catch {
      console.error(`No se ha podido leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileSize = stats.size.toString();
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${pc.blue(file.padEnd(30))} ${pc.green(
      fileSize.padStart(10)
    )} ${pc.yellow(fileModified)}`;
  });

  const filesInfo = await Promise.all(filePromises);
  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
