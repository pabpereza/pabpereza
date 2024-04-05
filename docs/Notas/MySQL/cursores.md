
Un cursor es una consulta declarada que provoca que el servidor, cuando se 
realiza la operación de abrir cursor, cargue en memoria los resultados de la 
consulta en una tabla interna. Teniendo abierto el cursor, es posible, mediante 
una sentencia FETCH, leer una a una las filas correspondientes al cursor y, por 
tanto, correspondientes a la consulta definida. Los cursores deben declararse 
después de las variables locales.Los cursores nos permiten tras una consulta SQL, recuperar los resultados de la misma y poder trabajar con ellos de uno en uno.

Para hacer uso de un cursor, tendremos que: 
* Declarar el cursor (después de las variables locales). 
* Abrir el cursor. 
* Asignar las filas al cursor según tarea a realizar. 
* Cerrar el cursor una vez finalizada la tarea (`CLOSE`)

Los cursores se usan dentro de [[procedimientos_funciones]] 

## Sintaxis básica
Este cursor nos permite leer uno a uno los resultados de una consulta para trabajar con los datos. Cabe destacar la necesidad de abrir y cerrar el cursor (`OPEN` y `CLOSE`). 

Podemos leer los valores de un cursor con el comando `FETCH`:
```sql
DECLARE <variable> <tipo>
DECLARE <nombre_cursor> CURSOR FOR <consulta>;


OPEN <nombre_cursor>;

FETCH <nombre_cursor> INTO <variable>;

CLOSE <nombre_cursor>;
```


## Uso con repetición/bucles 
Al leer los valores de un cursor, podemos repetir el proceso de leer los valores de un cursor. Para ello, podemos usar el comando `FETCH` repetidamente:
```sql
DECLARE <nombre_cursor> CURSOR FOR <consulta>;

OPEN <nombre_cursor>;


FETCH <nombre_cursor> INTO <variable>;
FETCH <nombre_cursor> INTO <variable>;
FETCH <nombre_cursor> INTO <variable>;
FETCH <nombre_cursor> INTO <variable>;

CLOSE <nombre_cursor>;
```

Pero si quisieramos leer todos los valores de un cursor, lo normal es hacer un bucle para no estar repitiendo la misma operación tantas veces como filas tenga el cursor.


### Con repeat until - hasta que
Para leer valores hasta un momento específico, podemos usar el comando `REPEAT UNTIL`. Vamos a suponer en este caso que queremos sumar el precio de los 5 primeros resultados de un `SELECT`.

```sql
DECLARE total INT DEFAULT 0;
DECLARE precio INT DEFAULT 0;
DECLARE contador INT DEFAULT 1;
DECLARE cursor1 CURSOR FOR SELECT precio FROM productos;

OPEN cursor1;

REPEAT
    FETCH cursor1 INTO precio;
	SET total = total + precio;
	SET contador = contador + 1;
UNTIL contador > 5;
END REPEAT;

CLOSE cursor1;
```

### Con loop - todos los valores
Para leer todos los valores de un cursor, podemos usar el comando `LOOP`. Vamos a suponer en este caso que queremos sumar el precio de todos los resultados de un `SELECT`. Para ello, podemos usar el comando `LOOP`. Aún así, tenemos que ayudar a nuestro programa para que sepa cuando termina de leer los valores. Para ello, utilizamos un `HANDLER` para saber cuando no hay valores y utilizar una variable auxiliar para decirle al programa que salga del `LOOP`.

Cuando el handler detecta que no hay valores, el `HANDLER` añade a la variable auxiliar el valor `1`. Como el bucle `LOOP` al principio de la sentencia comprueba si la variable `auxiliar` es igual a uno, saldría del programa gracias a la intrucción `LEAVE <nombre del bucle>`.
```sql
DECLARE total INT DEFAULT 0;
DECLARE precio INT DEFAULT 0;
DECLARE auxiliar INT DEFAULT 0;
DECLARE cursor1 CURSOR FOR SELECT precio FROM productos;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET auxiliar = 1; 

OPEN cursor1;

bucle:LOOP
	FETCH cursor1 INTO precio;

	IF auxiliar = 1 THEN
		LEAVE bucle;
	END IF;

	SET total = total + precio;
END LOOP:bucle;

CLOSE cursor1;
```