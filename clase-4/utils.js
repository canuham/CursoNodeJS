import { createRequire } from 'node:module';

// ?como leer un json en ESmodules recomendado por ahora (Creamos un require local en ESmodules)
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);
