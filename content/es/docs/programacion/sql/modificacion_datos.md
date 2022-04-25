---
title: "Insert, update y delete"
linkTitle: "Insert, update y delete"
weight: 30 
tags: [sql, database]
description:  
---

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


## Update - Modificar datos
Para modificar datos, podemos usar el comando UPDATE.

```sql
UPDATE <tabla> SET <atributos> = <valores> WHERE <condiciones>;
```

Por ejemplo:
```sql
UPDATE persona SET nombre = 'Pedro' WHERE id = 1;
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