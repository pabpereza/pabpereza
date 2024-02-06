
Un disparador o trigger es un tipo de procedimiento almacenado que se ejecuta 
cuando se intentan alterar los datos de una tabla o vista.
La diferencia con los procedimientos almacenados es que los disparadores:
* No pueden ser invocados directamente. El disparador se ejecuta automáticamente.
* No reciben y devuelven parámetros.
* Son apropiados para mantener la integridad de los datos, no para obtener resultados de consultas

Su función es ejecutarse cuando ocurre algún evento en una tabla. Estos eventos pueden ser insertar, modificar o borrar datos ( INSERT, UPDATE, DELETE ).

## Sintaxis básica
Antes de empezar, hay que detallar algunos variables que se usarán en el siguiente ejemplo:
* Nombre del disparador (`name`): Nombre del disparador.
* Tiempo del disparador (`time`)[ AFTER o BEFORE ]: se puede especificar cuando se ejecuta el disparador. Antes o después de la ejecución de la consulta.
* Evento (`evento`)[ INSERT, UPDATE o DELETE ]: se puede especificar el evento en el que se desea que se ejecute el disparador.
* Nombre de la tabla (`nombre_tabla`): se puede especificar el nombre de la tabla en la que se desea que se ejecute el disparador.
* Orden del trigger (`orden` opcional) [ FOLLOWS o  PRECEDES ]: se puede especificar el orden en el que se desea que se ejecute el disparador.
* Cuerpo del disparador (`cuerpo`): se puede especificar el cuerpo del disparador.

La sintaxis de un disparador es la siguiente:
```sql
CREATE TRIGGER <name> <time> <evento> 
ON <nombre_tabla> FOR EACH ROW 
BEGIN
<cuerpo>
END;
``` 

Por ejemplo:
```sql
CREATE TRIGGER tr_insert_persona AFTER INSERT ON persona FOR EACH ROW
BEGIN
	<cuerpo>
END;
```


## Cuerpo del disparador
El cuerpo del disparador es el código que se ejecuta cuando se lanza el disparador. Dentro de un disparador nos podemos referir a los datos que se están insertando, modificando o borrando. Esto nos permite evitar que se borren o modifiquen datos indeseados; aplicar condiciones como por ejemplo, que haya stock suficiente para un producto.. etc.

El cuerpo del disparador se puede definir en varias partes. En cada parte se puede definir una sentencia SQL.

Por ejemplo, controlar la edad de una persona para evitar que se inserten menores de edad:
```sql
CREATE TRIGGER tr_insert_persona BEFORE UPDATE ON persona FOR EACH ROW
BEGIN
	IF NEW.edad < 18 THEN
		UPDATE persona SET edad = 18 WHERE id = NEW.id;
	END IF;
END;
```

En el cuerpo podemos definir variables, condiciones, sentencias SQL, etc.

Por ejemplo, un disparador en el que consultamos y almacenamos en variables datos de otras tablas:
```sql
CREATE TRIGGER tr_insert_persona AFTER INSERT ON persona FOR EACH ROW
BEGIN
	DECLARE nombre_mascota VARCHAR(50);

	SET nombre_mascota = (SELECT nombre FROM mascotas WHERE id = NEW.id);

	INSERT INTO persona_mascota (id, nombre, edad, fecha_nacimiento, ) VALUES (NEW.id, nombre_mascota, NEW.edad, NEW.fecha_nacimiento);
END;
```


#TODO: Diferencias entre NEW y OLD...