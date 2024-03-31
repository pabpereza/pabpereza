
## Introducción
Con el fin de mejorar la eficiencia y reutilizar las consultas SQL, se ha desarrollado una serie de procedimientos y funciones que permiten realizar operaciones de forma más eficiente.

Estos objetos se almacena en la base de datos y se pueden utilizar en las consultas SQL.

## Procedimientos y funciones
Sus principales diferencias son:
* Valores de retorno: Los procedimientos no tienen porque retornar ningún valor, mientras que las funciones siempre retornan un valor.
* Tipos de valores de retorno: Los procedimientos pueden mostrar resultados de cualquier tipo (listas, tablas), mientras que las funciones siempre retornan un valor concreto (int, varchar, etc.).
* Parámetros: Los procedimientos pueden tener parámetros múltiples valores de entrada y salida (in, out, inout), mientras que las funciones siempre tienen un solo parámetro de entrada y un valor de salida. 


## Procedimientos
Los procedimientos son rutinas o subprogramas compuestos por un conjunto 
nombrado de sentencias SQL agrupados lógicamente para realizar una tarea 
específica, que se guardan en la base de datos y que se ejecutan como una 
unidad cuando son invocados por su nombre. Es decir, nos permiten agrupar un conjuntos de sentencias para lanzarlas en bloque.

El procedimiento consta de las siguientes partes:
* Definición del nombre del procedimiento.
* Parámetros de entrada o salida
* Sentencias SQL


Sintaxis básicas de procedimientos almacenados:
```sql
CREATE PROCEDURE <nombre_procedimiento>
(
	<parametro_entrada> <tipo>
	<parametro_entrada> <tipo>
	...
)
...
```

Los parámetros de entrada pueden ser de los siguientes tipos:
* `IN`: De entrada
* `OUT`: De salida
* `INOUT`: De entrada y salida


Un ejemplo completo sería el siguiente:
```sql
CREATE PROCEDURE procedimiento_ejemplo (IN nombre VARCHAR(50), OUT edad INT)
BEGIN
	SELECT  edad INTO edad FROM usuarios WHERE nombre = nombre ;
END
```

Podemos ejecutar el procedimiento usando la siguiente sintaxis:
```sql
CALL <nombre_procedimiento>(<parametro_entrada>, <parametro_salida>)
```

Por ejemplo, para ejecutar el procedimiento anterior:
```sql
CALL procedimiento_ejemplo('Pablo', @edad);
```

## Funciones
Las funciones son rutinas o subprogramas compuestos por un conjunto. Estas siempre tiene un valor de retorno, el cuál, cuyo tipo depende de la declaración de la función con la sintaxis `RETURNS <tipo>` y luego en el cuerpo de la función se devuelve con la instrucción `RETURN <valor>`.

Por ejemplo, la siguiente función devuelve el nombre de un usuario. Primero hacemos un select que asigna el resultado a una variable y luego hacemos que la función devuelva el valor de la variable.
```sql
CREATE FUNCTION nombre_usuario (id_usuario INT) RETURNS VARCHAR(50)
BEGIN
	DECLARE nombre_obtenido VARCHAR(50);

	SELECT nombre INTO nombre_obtenido FROM usuarios WHERE id_usuario = id_usuario;

	RETURN nombre_obtenido;
END
```

Podemos ejecutar la función usando un select: 
```sql
SELECT nombre_usuario(1);
```


## Borrado de procedimientos y funciones

Para borrar un procedimiento o función, se utiliza la siguiente sintaxis:
```sql
DROP PROCEDURE <nombre_procedimiento>
DROP FUNCTION <nombre_funcion>
```

También se puede borrar un procedimiento o función solo si existe:
```sql
DROP PROCEDURE IF EXISTS <nombre_procedimiento>
DROP FUNCTION IF EXISTS <nombre_funcion>
```
