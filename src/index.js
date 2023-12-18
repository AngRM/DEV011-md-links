const { esAbsoluto, convertirAbsoluto, verificarExistencia, leerArchivo, buscarlinks, esMarkdown } = require("./functions.js");
const process = require('process'); 

exports.mdLinks = (path, validate = false) => {
  return new Promise((resolve, reject) => {
    let pathAbsoluto;
    if (esAbsoluto(path) == true) {
        pathAbsoluto = path;
    } else {
        pathAbsoluto = convertirAbsoluto(path);
    }
console.log(pathAbsoluto)
    if (verificarExistencia(pathAbsoluto) == false) {
        console.log("La Ruta no existe. por favor intente de nuevo");
        return reject("La Ruta no existe. por favor intente de nuevo");
    }

    if (esMarkdown(pathAbsoluto) == false) {
        console.log("El archivo no es un archivo markdown");
        return reject("El archivo no es un archivo markdown");
    }

    // Aquí debes utilizar la función leerArchivo importada
    leerArchivo(pathAbsoluto).then((res) => {
        // Hacer algo después de leer el archivo
        const array = buscarlinks(res,pathAbsoluto);
        console.log(array);
        console.log(array.length);
    })
    .catch((error) => {
        // Manejar errores si ocurren durante la lectura del archivo
        console.error(error);
        reject(error);
    });
  });
};


