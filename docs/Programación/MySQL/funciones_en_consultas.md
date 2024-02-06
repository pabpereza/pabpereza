
## Funciones en consultas de selección
Estas se utilizan para manipular y filtrar los datos que se devuelven en una consulta. Se pueden usar en las cláusulas `WHERE` y `HAVING` pero lo más común es usarlas en las cláusulas `SELECT`.
Esta consulta de ejemplo nos permitiría obtener el salario redondeado de todos los empleados y modificando la salida (sin alterar el registro de la basa de datos):
```sql
SELECT nombre, ROUND(salario) FROM empleados;
```


### Funciones aritméticas
Nos permiten realizar operaciones aritméticas sobre los valores de los campos.
| Operador   | Función                                                                   |
| ---------- | ------------------------------------------------------------------------- |
| ABS()      | Valor absoluto                                                            |
| ROUND(n,d) | Redondea el valor "n" con con el número de decimales especificados en "d" |
| FLOOR()    | Redondea hacia abajo                                                      |
| CEIL()     | Redondea hacia arriba                                                     |
| SQRT()     | Raíz cuadrada                                                             |
| POW()    | Potencia, ejemplo POW(x,y) el valor x elevado a el exponente y 			|

### Funciones de cadenas de texto
Nos permiten manipular textos de las consultas.
| Operador         | Función                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| CONCAT()         | Concatena dos o más cadenas de texto                                                                     |
| SUBSTRING(c,m,n) | Devuelve una sub-cadena obtenida de la cadena “c”, a partir de la posición “m” y tomando “n” caracteres. |
| LENGTH()         | Devuelve la longitud de una cadena de texto                                                              |
| UCASE()          | Convierte una cadena de texto a mayúsculas                                                               |
| LCASE()          | Convierte una cadena de texto a minúsculas                                                               |
| REPLACE(c,b,s)   | Reemplaza en la cadena "c" el valor buscado en "b" por el valor indicado en "s"                          |
| TRIM()           | Elimina los espacios en blanco de una cadena de texto                                                    |
| REPLICATE(c,n)   | Repite la cadena "c" tantas veces como indique la variable "n"                                           |

### Funciones de fecha
Nos permiten manipular fechas de las consultas.

| Operador      | Función                                             |
| ------------- | --------------------------------------------------- |
| DATE()        | Convierte una fecha a una cadena de texto           |
| DATE_FORMAT() | Convierte una fecha a un formato de cadena de texto |
| NOW()         | Devuelve la fecha actual                            |
| YEAR()        | Devuelve el año de una fecha                        |
| MONTH()       | Devuelve el mes de una fecha                        |
| QUARTER()       | Devuelve el trimestre del año de una fecha        |
| DAY()         | Devuelve el día de una fecha                        |
| HOUR()        | Devuelve la hora de una fecha                       |
| MINUTE()      | Devuelve los minutos de una fecha                   |
| SECOND()      | Devuelve los segundos de una fecha                  |
