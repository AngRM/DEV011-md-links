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
    const result = [];
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md")
      .then((res) => {
        expect(res).toEqual(result);
      });
  });

  it('mdLinks should reject with an error for a non-existing file', () => {
    return mdLinks("nonexistent-file.md")
      .catch((error) => {
        expect(error).toEqual("La Ruta no existe. por favor intente de nuevo");
      });
  });

  it('mdLinks should reject with an error for a non-markdown file', () => {
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md")
      .catch((error) => {
        expect(error).toEqual("El archivo no es un archivo markdown");
      });
  });

  it('mdLinks with stats should resolve statistics object', () => {
    const resultStats = {
      Total: 3,
      Unique: 2
    };
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", false, true)
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
    return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", true, true)
      .then((res) => {
        expect(res).toEqual(resultValidateStats);
      });
  });
  describe('mdLinks', () => {

    it('mdLinks should reject with an error for an invalid markdown file', () => {
      return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md")
        .catch((error) => {
          expect(error).toEqual("El archivo no es un archivo markdown");
        });
    });
  
    it('mdLinks should reject with an error for a non-existent file', () => {
      return mdLinks("nonexistent-file.md")
        .catch((error) => {
          expect(error).toEqual("La Ruta no existe. por favor intente de nuevo");
        });
    });
  
    it('mdLinks with stats should resolve statistics object with zero Total and Unique for an empty markdown file', () => {
      const resultEmptyStats = {
        Total: 0,
        Unique: 0
      };
      return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", false, true)
        .then((res) => {
          expect(res).toEqual(resultEmptyStats);
        });
    });
  
    it('mdLinks with validate and stats should resolve statistics object with zero Total, Unique, and Broken for an empty markdown file', () => {
      const resultEmptyStatsValidate = {
        Total: 0,
        Unique: 0,
        Broken: 0
      };
      return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", true, true)
        .then((res) => {
          expect(res).toEqual(resultEmptyStatsValidate);
        });
    });
  
    it('mdLinks with stats should resolve statistics object for a markdown file with no links', () => {
      const resultStatsNoLinks = {
        Total: 0,
        Unique: 0
      };
      return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", false, true)
        .then((res) => {
          expect(res).toEqual(resultStatsNoLinks);
        });
    });
  
    it('mdLinks with validate should resolve array of objects with "Fail" status for broken links in a markdown file', () => {
      const resultBrokenLinks = [
        {
          href: 'https://broken-link.com',
          text: 'Broken Link',
          file: 'test.md',
          status: undefined,
          ok: 'Fail'
        }];
      return mdLinks("C:/Users/HP/Desktop/mdLinks/DEV011-md-links/test/test.md", true)
        .then((res) => {
          expect(res).toEqual(resultBrokenLinks);
        });
    });
  
    // Add more test cases based on your specific scenarios and edge cases.
  
  });
  
});
