const {mdLinks} = require("./index.js")
const { argv }  = require('node:process');

const path      = argv[2];
const validate = process.argv.includes("--validate");
const stats = process.argv.includes("--stats");

console.log(path, validate, stats);


// Ejemplo de uso de mdLinks
mdLinks(path, validate,stats)
  .then(result => {
    // Hacer algo con el resultado
    
    console.log(result);
  })
  .catch(error => {
    // Manejar errores
    console.error(error);
  });
