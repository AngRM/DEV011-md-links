# mdLinks

## Descripción
mdLinks es una herramienta para analizar archivos Markdown y extraer información sobre los enlaces presentes en ellos, incluyendo estadísticas y validación del estado de los enlaces utilizando Axios.

## Instalación
Para utilizar mdLinks, sigue estos pasos:

1. Clona el repositorio desde GitHub:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git

Navega al directorio del proyecto:

bash
Copy code
cd tu-repositorio
Instala las dependencias usando npm:

bash
Copy code
npm install

## Uso
Una vez que hayas instalado las dependencias, puedes utilizar mdLinks desde la consola de la siguiente manera:

bash
Copy code
node cli.js ruta-del-archivo [--validate] [--stats]
ruta-del-archivo: Ruta al archivo Markdown que deseas analizar.

## Opciones adicionales (puedes combinarlas):

--validate: Habilita la validación de los enlaces, mostrando el estado y si están rotos.
--stats: Muestra estadísticas sobre los enlaces, incluyendo el total y los únicos.

## Ejemplos:

bash
Copy code
node cli.js ./ruta/a/tu/archivo.md
bash
Copy code
node cli.js ./ruta/a/tu/archivo.md --validate --stats

## Ejemplos de Resultados
Resolución de enlaces:

json
Copy code
[
  {
    "href": "https://nodejs.org/",
    "text": "Node.js",
    "file": "archivo.md"
  },
  // Otros enlaces...
]

## Validación de enlaces:

json
Copy code
[
  {
    "href": "https://nodejs.org/",
    "text": "Node.js",
    "file": "archivo.md",
    "status": 200,
    "ok": "Ok"
  },

]

## Estadísticas de enlaces:

json
Copy code
{
  "Total": 10,
  "Unique": 8
}

## Estadísticas validadas:

json
Copy code
{
  "Total": 10,
  "Unique": 8,
  "Broken": 2
}

El código está dividido en tres archivos principales:

index.js: Este archivo actúa como el punto de entrada y define la función mdLinks. Esta función toma una ruta de archivo, así como opciones adicionales para validar los enlaces (validate) y obtener estadísticas (stats). Utiliza funciones del archivo functions.js para realizar tareas como verificar la existencia del archivo, leer su contenido, buscar enlaces y, en caso necesario, validar los enlaces y proporcionar estadísticas.

functions.js: Este archivo contiene funciones auxiliares utilizadas por mdLinks. Incluye funciones para verificar si una ruta es absoluta, convertir una ruta relativa en absoluta, verificar la existencia de un archivo, determinar si un archivo es de tipo Markdown, leer el contenido de un archivo y buscar enlaces utilizando expresiones regulares. Además, hay funciones para obtener códigos de estado de las URLs de los enlaces y generar estadísticas sobre los enlaces, incluyendo estadísticas específicas para enlaces rotos.

cli.js: Este archivo actúa como una interfaz de línea de comandos para interactuar con la función mdLinks. Captura los argumentos proporcionados en la línea de comandos, como la ruta del archivo y las opciones --validate y --stats, y luego invoca la función mdLinks con esos parámetros. Finalmente, imprime el resultado o maneja cualquier error que pueda surgir.