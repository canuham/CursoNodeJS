import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os';

console.log('Informacion del sistema operativo:');
console.log('---------------------------------------');

console.log('Nombre del sistema operativo', platform());
console.log('version del sistema operativo', release());
console.log('Arquitectura del sistema operativo', arch());
console.log('CPUs', cpus()); // <--- vamos a poder escalar procesos en node
console.log('Memoria libre', freemem() / 1024 / 1024);
console.log('Memoria total', totalmem() / 1024 / 1024); // En MB
console.log('Uptime', uptime() / 60 / 60);
