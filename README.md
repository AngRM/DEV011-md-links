# Markdown Links


Este código en Node.js ofrece una herramienta de línea de comandos (mdLinks) diseñada para analizar archivos Markdown y extraer información sobre los enlaces presentes en ellos. El código está dividido en tres archivos principales:

index.js: Este archivo actúa como el punto de entrada y define la función mdLinks. Esta función toma una ruta de archivo, así como opciones adicionales para validar los enlaces (validate) y obtener estadísticas (stats). Utiliza funciones del archivo functions.js para realizar tareas como verificar la existencia del archivo, leer su contenido, buscar enlaces y, en caso necesario, validar los enlaces y proporcionar estadísticas.

functions.js: Este archivo contiene funciones auxiliares utilizadas por mdLinks. Incluye funciones para verificar si una ruta es absoluta, convertir una ruta relativa en absoluta, verificar la existencia de un archivo, determinar si un archivo es de tipo Markdown, leer el contenido de un archivo y buscar enlaces utilizando expresiones regulares. Además, hay funciones para obtener códigos de estado de las URLs de los enlaces y generar estadísticas sobre los enlaces, incluyendo estadísticas específicas para enlaces rotos.

cli.js: Este archivo actúa como una interfaz de línea de comandos para interactuar con la función mdLinks. Captura los argumentos proporcionados en la línea de comandos, como la ruta del archivo y las opciones --validate y --stats, y luego invoca la función mdLinks con esos parámetros. Finalmente, imprime el resultado o maneja cualquier error que pueda surgir.