
Podemos insertar, modificar y borrar datos de las tablas a través de consultas de SQL. Podemos usar los comandos INSERT, UPDATE y DELETE.

Importante, antes de usar cualquiera de estos comandos, debemos indicar la base de datos sobre la que queremos aplicar la operación con el comando `USE`.

Ejemplo:
```sql
USE base_de_datos;
```

## Insert - Insertar datos
Para insertar datos, podemos usar el comando INSERT.

```sql
INSERT INTO <tabla> (<atributos>) VALUES (<valores>);
```

Por ejemplo:
```sql
INSERT INTO persona (nombre, edad, salario) VALUES ('Juan', 30, 1000);
```

Las inserciones se podrían realizar con subconsultas, como por ejemplo, con un select anidado:
```sql
INSERT INTO persona (nombre, edad, salario) VALUES ( 'Juan', 30, (SELECT salario FROM persona WHERE nombre = 'Juan') );
```

## Insert con select - Insertar datos con select
Para insertar datos con un select, podemos usar el comando INSERT con la siguiente sintaxis:
``` sql
INSERT INTO <tabla> (<atributos>) SELECT <valores> FROM <tabla>;
```

Esto nos permitiría insertar datos de una tabla en otra, por ejemplo:
```sql
INSERT INTO persona (nombre, edad, salario) SELECT nombre, edad, salario FROM persona;
```

También podríamos combinar datos procedentes del SELECT con datos estáticos introducidos manualmente:
```sql
INSERT INTO persona (nombre, edad, salario) SELECT nombre, edad, 1600, FROM persona WHERE nombre = 'Juan';
```

O hacer operaciones con datos procedentes del SELECT, como por ejemplo, duplicarle el salario a Juan:
```sql
INSERT INTO persona (nombre, edad, salario) SELECT nombre, edad, salario * 2 FROM persona WHERE nombre = 'Juan';
```

## Update - Modificar datos
Para modificar datos, podemos usar el comando UPDATE. Cabe destacar el uso del WHERE para especificar que valores queremos actualizar, si no lo especificamos, se actualizarán todos los datos de la tabla. La sintaxis es la siguiente:
```sql
UPDATE <tabla> SET <atributos> = <valores> WHERE <condiciones>;
```

Por ejemplo, para modificar un atributo de una tabla:
```sql
UPDATE persona SET nombre = 'Pedro' WHERE id = 1;
```

También podríamos actualizar múltiples valores de una fila separándolos por comas:
```sql
UPDATE persona SET nombre = 'Pedro', edad = 30 WHERE id = 1;
```

## Delete - Borrar datos
Para borrar datos, podemos usar el comando DELETE.

```sql
DELETE FROM <tabla> WHERE <condiciones>;
```

Por ejemplo:
```sql
DELETE FROM persona WHERE id = 1;
```