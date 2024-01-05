
const { esAbsoluto, convertirAbsoluto, verificarExistencia, leerArchivo, buscarlinks, esMarkdown,obtenerCodigosDeEstado, estadisticas, estadisticasValidadas } = require("./functions.js");
const process = require('process'); 

exports.mdLinks = (path, validate, stats) => {
  return new Promise((resolve, reject) => {
    let pathAbsoluto;
    if (esAbsoluto(path) == true) {
        pathAbsoluto = path;
    } else {
        pathAbsoluto = convertirAbsoluto(path);
    }

    if (verificarExistencia(pathAbsoluto) == false) {
        console.log("La Ruta no existe. Por favor, intente de nuevo.");
        return reject("La Ruta no existe. Por favor, intente de nuevo.");
    }

    if (esMarkdown(pathAbsoluto) == false) {
        console.log("El archivo no es un archivo Markdown");
        return reject("El archivo no es un archivo Markdown");
    }

    // Se usa la función leerArchivo previamente importada.
    leerArchivo(pathAbsoluto).then((res) => {
        // Hacer algo después de leer el archivo
        const array = buscarlinks(res,pathAbsoluto);
        if( validate == true && stats == false){
        obtenerCodigosDeEstado(array)
        .then(resultados => {
          //console.log(resultados);
          return resolve(resultados);
        })
        .catch(error => {
          return ('Error al obtener códigos de estado:', error.message);
        });
      }else if (stats == true && validate == false){
        const valores = estadisticas(array);
       // console.log(array); 
       // console.log(valores);
        return resolve(valores);
      }else if(validate == true && stats == true){
        obtenerCodigosDeEstado(array)
        .then(result => {
         const final = estadisticasValidadas(result);
          //console.log(final);
          return resolve(final);
        })
        .catch(error => {
          return resolve('Error al obtener códigos de estado:', error.message);
        });
      }else{
       return resolve(array); 
       //console.log(array);
      }
    }) 
    .catch((error) => {
        // Manejar errores si ocurren durante la lectura del archivo
        console.error(error);
        reject(error);
    });
  }) 
  //.then((result) => resolve(result));
};
