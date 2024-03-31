
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
