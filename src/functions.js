const path = require("path");
const fs = require("fs");
const { readFile } = require("fs/promises");
const { error, clear } = require("console");
const axios = require('axios');


//Funcion para saber si es absoluta la dirreción con path https://nodejs.org/api/path.html#pathisabsolutepath
exports.esAbsoluto = (relativePath) => {
    return path.isAbsolute(relativePath);
  };
  
  //Funcion para cambiar una direccion relativa a una dirección absoluta con path https://nodejs.org/api/path.html#pathresolvepaths
  exports.convertirAbsoluto = (relativePath) => {
    return path.resolve(relativePath);
  };

  //Funcion para saber si se logro leer el archivo https://nodejs.org/docs/latest/api/fs.html#fsexistssyncpath
  exports.verificarExistencia = (absolutePath) => {
    return fs.existsSync(absolutePath);
  };

  //Funcion para saber si la extension del archivo es de markdown https://nodejs.org/api/path.html#pathextnamepath
  exports.esMarkdown = (absolutePath) => {
    const direccion = path.extname(absolutePath);
    const extensiones = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];
    if (direccion == ""){
        return direccion = "error";
    }else{
        return extensiones.includes(direccion);
    }
  };

 // leer archivo https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
  exports.leerArchivo = (absolutePath) => {
    return readFile(absolutePath, { encoding: 'utf8' })
    .then(contents => {
      return contents;
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    });
}

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  //https://regex101.com
  exports.buscarlinks = (valor, absolutePath) => {
    const ubicacion = path.basename(absolutePath);
    const regex1 = /(?=\[([^\]]*)\]\((http?:\/\/[^\s)]+)\))/g;
  
    const linkes = [];
    let resultado;
  
    while ((resultado = regex1.exec(valor)) !== null) {
      const objeto = {
        href: resultado[2],
        text: resultado[1],
        file: ubicacion,
      };
  
      linkes.push(objeto);
  
      if (resultado[0] === '') {
        regex1.lastIndex++;
      }
    }
  
    return linkes;
  };
  
  exports.obtenerCodigosDeEstado = (urls) => {
    const promesas = urls.map(function(objeto){
      return axios.head(objeto.href)
        .then(response => {
          objeto.status = response.status;
          objeto.ok = "Ok";
           if(response.status === 200){
            objeto.ok == "Ok";
          }else{
            objeto.ok = "Fail";
          }
          return objeto;
         // return { url: objeto.url, statusCode: response.status };
        })
        .catch(error => {
          objeto.status = error.response.status;
          objeto.ok = "Fail";
          //return { url: objeto.url, statusCode: undefined, error: error.message };
          return objeto;
        });
    });
  
    return Promise.all(promesas);
  };

  exports.estadisticas = (urls) => {

    const noRepetidos = urls.filter((elemento, index, arreglo) =>
    arreglo.findIndex(e => e["href"] === elemento["href"]) === index);

    const unicos = noRepetidos.length; 
    const total = urls.length;

    return {
      Total: total,
      Unique: unicos
    }
  }

  exports.estadisticasValidadas = (urlsV) => {
    const rotos = urlsV.filter((link) => link.ok === "Fail");

    return{
      ...this.estadisticas(urlsV),
      Broken: rotos.length
    }
  }
  
