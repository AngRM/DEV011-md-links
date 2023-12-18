const {mdLinks} = require("./index.js")
// Ejemplo de uso de mdLinks
mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/README.md", false)
  .then(result => {
    // Hacer algo con el resultado
    console.log(result);
  })
  .catch(error => {
    // Manejar errores
    console.error(error);
  });
