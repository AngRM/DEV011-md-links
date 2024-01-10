const { mdLinks } = require('../src/index.js');


describe('mdLinks', () => {

  it('mdLinks should resolve array of objects', () => {
    const result = [
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'test.md'
      }]
   mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md")
   .then((res) => {
    expect(res).toEqual(result)
   })
  });

  it('mdLinks with validate should resolve array of objects', () => {
    const resultValidate = [
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'test.md',
        status: 200,
        ok: 'Ok'
      }]
   mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", true)
   .then((res) => {
    expect(res).toEqual(resultValidate)
   })
  });
  
  it('mdLinks should resolve empty array for a file with no links', () => {
    const result0 = [];
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/README.md")
      .then((res) => {
        expect(res).toEqual(result0);
      });
  });

  it('mdLinks should reject with an error for a non-existing file', () => {
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.m")
      .catch((error) => {
        expect(error).toEqual("La Ruta no existe. Por favor, intente de nuevo.");
      });
  });

  it('mdLinks should reject with an error for a non-markdown file', () => {
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/md-links.spec.js")
      .catch((error) => {
        expect(error).toEqual("El archivo no es un archivo Markdown");
      });
  });

  it('mdLinks with stats should resolve statistics object', () => {
    const resultStats = {
      Total: 3,
      Unique: 2
    };
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/prueba.md", false, true)
      .then((res) => {
        expect(res).toEqual(resultStats);
      });
  });

  it('mdLinks with validate and stats should resolve validated statistics object', () => {
    const resultValidateStats = {
      Total: 3,
      Unique: 2,
      Broken: 1
    };
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/prueba.md", true, true)
      .then((res) => {
        expect(res).toEqual(resultValidateStats);
      });
  });
 
  
});
