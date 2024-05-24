// .js -> por defecto utiliza commonJS
// .mjs -> para utilizar ES modules
// .cjs -> para utilizar CJS (Forzandolo)

// Sistema de modulos recomendado que se recomienda usar siempre
import { sum, sub, mul } from './sum.mjs';

console.log(sum(1, 2));
console.log(sub(1, 2));
console.log(mul(1, 2));
