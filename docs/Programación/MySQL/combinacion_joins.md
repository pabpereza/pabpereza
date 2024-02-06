

Hay momentos en los que una consulta necesita columnas de varias tablas. En este caso podremos definir en el `FROM` todas las tablas que queremos usar.
```sql
SELECT * FROM tabla1, tabla2, tabla3;
```

Si lo hacemos de esta forma, nos devolverá todos los registros de las tablas pero al no haberlas relacionado nos mostrará los registros de cada unos de ellas combinados entre sí.
Estos datos no tendrían coherencia.


Veamos un ejemplo, vamos a usar las tablas `empleados` y la tabla `departamentos`:

EMPLEADOS
| id | nombre | apellidos | departamento_id |
|----|--------|-----------|-----------------|
| 1 | Pepe | Pérez     | 1             |
| 2 | Ana  | Muñoz     | 1             |
| 3 | Juan | González     | 2             |
| 4 | María | Rubio     | 2             |

DEPARTAMENTOS
| id | nombre |
|----|--------|
| 1 | Ingeniería |
| 2 | Finanzas   |

Si quisiéramos mostrar los empleados junto con los nombres de su departamento, podríamos hacerlo de la siguiente forma:
```sql
SELECT empleados.nombre, empleados.apellidos, departamentos.nombre FROM empleados, departamentos WHERE empleados.departamento_id = departamentos.id;
```

Cuando seleccionamos datos de varias tablas tenemos que difinir en el `WHERE` la relación entre ellas. En este caso, el `id` de la tabla `empleados` y el `departamento_id` de la tabla `departamentos` porque es la única forma de mostrar el nombre del departamento al que pertenece cada empleado.



## JOIN
El `JOIN` es una forma de relacionar dos tablas y tiene varios comandos. La consulta anterior es un ejemplo de `INNER JOIN` realizado con un `WHERE`. Existen varios tipos de `JOIN` en función de la información que quieras obtener de dos tablas relacionadas.

El más común es el `INNER JOIN` que nos permite obtener los registros de una tabla que están relacionados con otra. 

![Representación visual de los diferentes tipos de joins](https://www.dofactory.com/img/sql/sql-joins.png)

Aunque son los más comunes, hay más tipos de los que se muestran en la representación visual. De momento nos centraremos en los más comunes:


### INNER JOIN
El `INNER JOIN` nos permite seleccionar los registros que tengan coincidencias en ambas tablas, es decir, que estén relacionados. Para ello, en el `FROM` seleccionamos la tabla de la que queremos obtener los registros y en el `JOIN` seleccionamos la tabla con la que queremos relacionar. Por último, tendríamos que definir en el `ON` del `JOIN` la relación entre ambas tablas de la misma forma que en el `WHERE` de la consulta anterior.

Ejemplo:
```sql
SELECT empleados.nombre, empleados.apellidos, departamentos.nombre FROM empleados JOIN departamentos ON empleados.departamento_id = departamentos.id;
```


### LEFT JOIN
El `LEFT JOIN` nos permite seleccionar todos los registros de la tabla de la izquierda junto con los registros de la tabla de la derecha que tengan coincidencias.

Ejemplo de uso:
```sql
SELECT empleados.nombre, empleados.apellidos, departamentos.nombre FROM empleados LEFT JOIN departamentos ON empleados.departamento_id = departamentos.id;
```

### RIGHT JOIN
El `RIGHT JOIN` nos permite seleccionar todos los registros de la tabla de la derecha junto con los registros de la tabla de la izquierda que tengan coincidencias.

Ejemplo de uso:
```sql
SELECT empleados.nombre, empleados.apellidos, departamentos.nombre FROM empleados RIGHT JOIN departamentos ON empleados.departamento_id = departamentos.id;
```

### FULL JOIN 
El `FULL JOIN` nos permite seleccionar todos los registros de la tabla de la izquierda junto con los registros de la tabla de la derecha aunque no tengan coincidencias.

Ejemplo de uso:
```sql
SELECT empleados.nombre, empleados.apellidos, departamentos.nombre FROM empleados FULL JOIN departamentos ON empleados.departamento_id = departamentos.id;
```
