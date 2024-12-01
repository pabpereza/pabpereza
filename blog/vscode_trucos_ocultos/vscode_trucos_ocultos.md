---
slug: vscode_vale_para_todo
title: VSCode lo tiene TODO 
tags: [ contenedores]
authors: pabpereza
---

# ¡Trucos ocultos (o poco conocidos) que seguro que no sabías en VSCODE!
Me imagino que la gran mayoría conocéis Visual Studio Code, el editor de código de Microsoft. Pero no es solo un editor de código, gracias a sus funcionalidad de caja y sobretodo a un gran mercado de extensiones, podemos convertirlo en una herramienta para casi cualquier cosa.

Vamos a explorar las 15 funcionalidades menos conocidas de esta potente herramienta. ¿Cuántas de ellas conocerás?

<!-- truncate -->

Dentro vídeo:  https://youtu.be/pItQbWrAifE

[![VSCode lo tiene TODO](https://img.youtube.com/vi/pItQbWrAifE/maxresdefault.jpg)](https://www.youtube.com/watch?v=pItQbWrAifE)



## Funcionalidades de VSCode que no conocías

* **Terminal integrado**: Puedes abrir una terminal en cualquier momento y trabajar con ella como si estuvieras en tu terminal habitual. Si, esto no es algo nuevo, pero, ¿sabías que podías separarla en una ventana independiente y tener múltiples terminales abiertas a la vez?. Es más, aunque igual no superaría a windows terminal, ya le da mil vueltas a los terminales que traen por defecto los sistemas operativos.

* **Drawio y excalidraw**: Puedes dibujar diagramas de flujo o esquemas de forma sencilla con las extensiones de Drawio y Excalidraw. Solo con instalarlas, vscode te cargará cualquier diagrama que abras con el editor propio y llevarte estos diagramas junto a tu repositorio de GIT y, como cada vez es más común, tu documentación en markdown. Además, si cambias el nombre de la extensión manteniendo .drawio o .excalidraw y terminando en .png, automáticamente se generará una imagen con tu diagrama, que podrás seguir editando en la extensión pero que en tu repositorio se verá como una imagen. Es decir, si la referencias o la abras fuera de vscode será una imagen pero si la abres con la extensión activa dentro del IDE se abrirá el editor de diagramas, ¿no parece mágico?. Esto te permite vincular esas imágenes en otros ficheros markdown o en la documentación de tu proyecto y no tener que exportar manualmente el diagrama cada vez que haces un cambio, simplemente guardas el fichero y se actualiza la imagen automáticamente. Francamente, el descubrimiento de esta funcionalidad me ha cambiado la vida.

* **Modo Streaming o compartir pantalla**: Puedes buscar en la paleta de comandos o con el atajo `Ctrl+Shift+P` y buscar "Toogle screencast mode" para hacer más grande el cursor del ratón y mostrar las teclas que pulsas. Esto es muy útil para grabar tutoriales o para compartir pantalla en reuniones.

* **Control de versiones y copilot**: VSCode tiene un control de versiones integrado, es más, en las últimas versiones te permite dibujar gráficos de las ramas y commits. Aquí además, junto con copilot, te ayuda hasta a escribir los mensajes de commit.

* **Visor de logs**: Si arrastras un archivo de log a VSCode, te mostrará una vista previa de los logs, con colores, resaltado de errores y lo mejor de todo, filtros de búsqueda. Algo realmente útil cuando estas depurando errores y solo cuentas con registros en un archivo de texto.

* **Búsqueda por funciones, variables o clases**: Seguro que conoces la paleta de comandos pero si, durante una búsqueda, quitas el símbolo > o abres la paleta solo con `Ctrl+P` podrás hacer búsqueda de ficheros. Además, si añades un `@` la búsqueda se realizará por una función, variable o clase de tu espacio de trabajo.

* **Ir a una línea de código**: Puedes ir a una línea de código concreta en un fichero con `Ctrl+G` y escribiendo el número de línea. Esto es muy útil si tienes un error en una línea concreta y quieres ir directamente a ella sin tener que buscarla manualmente. También puedes usar la paleta de comandos y, en este caso, escribir `:` y el número de línea.

* **Diferencias entre ficheros**: Puedes comparar dos ficheros abiertos en VSCode con el comando `Compare Active File With...` o `Ctrl+Alt+D`. Esto te abrirá una nueva ventana con las diferencias entre ambos ficheros, aunque seguro que te ha tocado hacerlo en git para un conflicto, siempre puede darse el caso de que necesites comparar dos ficheros que no están en git.


* **Plantillas de código**: Puedes crear plantillas de código para tus proyectos o para tus snippets. Solo tienes que crear un fichero con la extensión .code-snippets y añadirlo a tus plantillas. Luego, solo tienes que escribir el nombre de la plantilla y pulsar tab para que se genere el código. Esto es muy útil para crear plantillas de código que usas a menudo o para crear snippets de código que te ahorren tiempo.

* **Integración con Jupyter**: Si trabajas con Jupyter, puedes abrir los notebooks directamente en VSCode y trabajar con ellos como si estuvieras en Jupyter. Además, puedes ejecutar las celdas, ver los resultados y exportar el notebook a otros formatos.

* **Integración con Docker y kubernetes**: Si trabajas con Docker, puedes ver los contenedores, imágenes y volúmenes de Docker directamente en VSCode. Además, puedes ejecutar comandos de Docker desde VSCode y ver los logs de los contenedores. Esto es muy útil si trabajas con Docker a menudo y quieres tener todo en un mismo lugar.

* **Edición multi-cursor**: Puedes seleccionar varias líneas de código y editarlas a la vez con el cursor. Solo tienes que mantener pulsada la tecla `Alt` y hacer clic en las líneas que quieras seleccionar. Esto es muy útil para cambiar varias líneas de código a la vez o para añadir texto en varias líneas a la vez.

* **Timeline**: Además de la vista de control de versiones y los commits que tengas, VSCode guarda un historial de cambios en tus ficheros. Puedes consultarlo en la ventana de timeline dentro de la sección de archivos. Esto nos permitirá volver a versiones anteriores de nuestros ficheros sin necesidad de usar git.

* **Auto save**: Puedes configurar VSCode para que guarde automáticamente los ficheros que estás editando. Esto es muy útil si sueles olvidar guardar los cambios o si simplemente eres tan vago como yo y prefieres que se guarde solo. 

* **Crear carpetas haciendo doble click**: Puedes crear carpetas en el explorador de archivos de VSCode haciendo doble click en el espacio en blanco. Esto es muy útil si sueles crear muchas carpetas y quieres hacerlo de forma rápida y sencilla. Además, si creas un fichero y en su nombre pones `/` VSCode automáticamente creará una carpeta con el nombre del fichero y moverá el fichero dentro de esa carpeta.

Y bueno, he dicho 15, pero aquí va un último como bonus:

* **Perfiles de usuario**: Puedes crear perfiles de usuario en VSCode para tener diferentes configuraciones y extensiones para cada proyecto. Esto es útil para tener diferentes configuraciones para cada proyecto y, si usas muchas extensiones, evitar cargar decenas de ellas en todos tus proyectos. Por ejemplo, tenemos instalado python, java, rust, etc. y no queremos que todas las extensiones estén activas en todos los proyectos, solo si vamos a programas en ese lenguaje, ¿no?. Esto ahorra también tiempo de carga de VSCode y recursos del sistema.


¿Conocías todas estas funcionalidades de VSCode? ¿Cuál es tu favorita? ¿Tienes alguna funcionalidad o extensión que te gustaría compartir? ¡Déjame un comentario y cuéntame tu experiencia!

Nos vemos en el siguiente. ¡Hasta la próxima!