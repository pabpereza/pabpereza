
# Path Traversal

Path Traversal, también conocido como Directory Traversal, es un tipo de ataque que se realiza aprovechando las vulnerabilidades en la validación de la entrada del usuario para acceder a archivos y directorios que están fuera del directorio raíz del servidor web. Esto puede resultar en el acceso no autorizado a los archivos del sistema, posiblemente llevando a la divulgación de información sensible, corrupción de datos o incluso ejecución de código remoto.

Los ataques de Path Traversal suelen implicar el uso de caracteres especiales que representan los directorios "actuales" y "padres" en los sistemas de archivos. Estos caracteres son:

. (punto): Representa el directorio actual.
.. (dos puntos): Representa el directorio padre.
Por ejemplo, un atacante podría tratar de acceder a archivos sensibles en el directorio raíz del servidor usando una ruta como ../../etc/passwd en un sistema Unix, o ..\..\Windows\System32\Drivers\etc\hosts en un sistema Windows.

