---
title: "Consultas y cláusulas"
linkTitle: "Consultas y cláusulas"
weight: 20
tags: [database, mysql]
description:  
---

## Cláusulas
Las consultas en SQL son una forma de acceder a la base de datos.

Estas consultas tienen diferentes cláusulas:

* `FROM`: Selecciona la tabla.
* `WHERE`: Selecciona los registros que cumplan con una condición.
* `ORDER BY`: Ordena los registros por un atributo.
* `GROUP BY`: Agrupa los registros por un atributo.
* `LIMIT`: Limita el número de registros a devolver.
* `HAVING`: Selecciona los registros que cumplan con una condición. Opera sobre los registros agrupados.


La siguiente consulta devolvería todos los registros de la tabla `tabla`.
```sql
SELECT * FROM tabla;
```

Ejemplo where:
La siguiente consulta devolvería el registro con el id 1 de la tabla `tabla`.
```sql
SELECT * FROM tabla WHERE id = 1;
```

Ejemplo order by:
Por defecto, `ORDER BY` devolvería todos los registros la tabla `tabla` ordenados por el `id` de forma ascendente (sin especificar nada), también podría usarte el `DESC` para ordenarlas de forma ascendent
```sql
SELECT * FROM tabla ORDER BY id DESC;
```

Ejemplo group by:
La siguiente consulta devolvería todos los registros agrupados por el campo `nombre`.
```sql
SELECT * FROM tabla GROUP BY nombre;
```

Ejemplo limit:
La siguiente consulta devolvería los primeros 5 registros de la tabla `tabla`.
```sql
SELECT * FROM tabla LIMIT 5;
```

Ejemplo having:
```sql
SELECT * FROM tabla GROUP BY nombre HAVING COUNT(*) > 1;
```
---


## Operadores
Los operadores nos permiten establecer condiciones en las consultar, modificarlas o agruparlos.


### Operadores de comparación
Existen diferentes operadores de comparación que nos permiten comparar dos valores.

| Operador | Función                    |
| -------- | -------------------------- |
| <        | Menor que                  |
| >        | Mayor que                  |
| <>       | Distinto de                |
| =        | Igual a                    |
| <=       | Menor o igual que          |
| >=       | Mayor o igual que          |
| IN       | Dentro de (filas de tabla) |
| NOT IN   | Fuera de (filas de tabla)  |
| BETWEEN  | Entre (valores numéricos)  |
| LIKE     | Contiene (valor de cadena) |

Algunos ejemplos:
```sql
SELECT * FROM table WHERE precio > 10; /*Selecciona todos los registros con precio mayor a 10*/
SELECT * FROM table WHERE precio < 10; /*Selecciona todos los registros con precio menor a 10*/
SELECT * FROM table WHERE precio <> 10; /*Selecciona todos los registros con precio distinto a 10*/
SELECT * FROM table WHERE precio = 10; /*Selecciona todos los registros con precio igual a 10*/
SELECT * FROM table WHERE precio <= 10; /*Selecciona todos los registros con precio menor o igual a 10*/
SELECT * FROM table WHERE precio >= 10; /*Selecciona todos los registros con precio mayor o igual a 10*/
SELECT * FROM table WHERE precio IN (10, 20, 30); /*Selecciona todos los registros con precio 10, 20 o 30*/
SELECT * FROM table WHERE precio NOT IN (10, 20, 30); /*Selecciona todos los registros con precio distinto a 10, 20 o 30*/
SELECT * FROM table WHERE precio BETWEEN 10 AND 20; /*Selecciona todos los registros con precio entre 10 y 20*/
```

### Comparación de cadenas
Concretamente el comando `LIKE` nos permite buscar dentro de una cadena de texto. Este comando se aplica a los campos de tipo `varchar` o `char`. Se apoya en los siguientes operadores:

| Operador | Función                                                    |
| -------- | ---------------------------------------------------------- |
| %        | Comodín, representa cualquier cadena de 0 o más caracteres |
| _        | Representa a un único carácter cualquiera                  |


Combinando el `LIKE` con el `%` o con el `_` podemos buscar por palabras completas o parciales.

Algunos ejemplos con `%`:
```sql
SELECT * FROM tabla WHERE nombre LIKE '%Pedro%'; /*Todas las filas que contengan la palabra Pedro*/
SELECT * FROM tabla WHERE nombre LIKE 'Pedro%'; /*Todas las filas que comiencen por Pedro*/
SELECT * FROM tabla WHERE nombre LIKE '%Pedro'; /*Todas las filas que terminen por Pedro*/
```

Algunos ejemplos con `_`:



### Operadores lógicos
Nos permiten establecer condiciones en las consultas. También nos permite agrupar varias consultas y condiciones a su vez. 

Los operadores lógicos son:

| Operador | Función |
| -------- | ------- |
| AND      | Y       |
| OR       | O       |
| NOT      | No      |

Algunos ejemplos:
```sql
SELECT * FROM tabla WHERE nombre LIKE '%Pedro%' AND precio < 10;
SELECT * FROM tabla WHERE nombre LIKE '%Pedro%' OR precio < 10;
SELECT * FROM tabla WHERE precio < 10 AND nombre LIKE '%Pedro%';
SELECT * FROM tabla WHERE nombre LIKE '%Pedro%' AND precio < 10 OR precio > 20;
SELECT * FROM tabla WHERE nombre LIKE '%Pedro%' AND (precio < 10 OR precio > 20);
SELECT * FROM tabla WHERE nombre LIKE '%Pedro%' OR (precio < 10 AND precio > 20);
SELECT * FROM tabla WHERE (nombre LIKE '%Pedro%' AND precio < 10) OR precio > 20;
```

### Operadores de agrupación
Nos permiten agrupar registros por un campo.

| Operador | Función                                           |
| -------- | ------------------------------------------------- |
| COUNT()  | Cuenta los registros que cumplan con la condición |
| SUM()    | Suma los valores de un campo                      |
| MAX()    | Devuelve el valor máximo de un campo              |
| MIN()    | Devuelve el valor mínimo de un campo              |
| AVG()    | Devuelve la media de un campo                     |

Algunos ejemplos:
```sql
SELECT COUNT(*) FROM tabla;
SELECT SUM(precio) FROM tabla;
SELECT MAX(precio) FROM tabla;
SELECT MIN(precio) FROM tabla;
SELECT AVG(precio) FROM tabla;
```

## Subconsultas

A veces, para realizar alguna operación de consulta, necesitamos los datos devueltos por otra 
consulta.

Una subconsulta, que no es más que una sentencia SELECT dentro de otra SELECT. 

Las subconsultas son aquellas sentencias SELECT que forman parte de una cláusula WHERE de 
una sentencia SELECT anterior. Una subconsulta consistirá en incluir una declaración SELECT 
como parte de una cláusula WHERE. 

Un ejemplo de subconsultas:
```sql
SELECT apellido FROM empleados WHERE oficio = (SELECT oficio FROM empleados WHERE apellido ='gil');
```
