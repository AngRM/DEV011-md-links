const { mdLinks } = require('../src/index.js');


describe('mdLinks', () => {

  it('mdLinks should resolve array of objects', () => {
    const result = [
      {
        href: 'https://nodejs.org',
        text: 'node',
        file: 'test.md'
      }]
   mdLinks('./test.md')
   .then((res) => {
    expect(res).toEqual(result)
   })
  });

});
