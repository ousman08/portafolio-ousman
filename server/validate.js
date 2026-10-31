/**
 * La validación es compartida con el cliente (src/lib/huellas.js) para que
 * las mismas reglas se apliquen en el navegador y en el servidor.
 * El servidor siempre vuelve a validar: nunca se confía en el cliente.
 */
export * from '../src/lib/huellas.js'
