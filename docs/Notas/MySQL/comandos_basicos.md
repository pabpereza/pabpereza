
## Acceder a MySQL
Sin especificar credenciales:
```bash
mysql # Sin login
```

Con usuario y contraseña (la password la pide por pantalla):
```bash
mysql -u root -p # Con usuario y contraseña
```

## Bases de datos

Mostrar todas:
```sql
show databases;
```

Crear base de datos:
```sql
create database <base de datos>;
```

Borrar base de datos:
```sql
drop database <base de datos>;
```

## Tablas

Consultar tablas:
```sql
show tables;
```

Describir los atributos de una tabla:
```sql
DESCRIBE <tabla>;
```

Crear tabla:
```sql
mysql> CREATE TABLE <tabla>(
         id CLAVE NOT NULL AUTO_INCREMENT,
         nombre CHAR(30) NOT NULL,
         edad INTEGER(30),
         salario INTEGER(30),
         PRIMARY KEY (id) );
```

Insertar datos:
```sql
INSERT INTO <tabla> (nombre, edad, salario) VALUES
("Pedro", 24, 21000),
        ("Maria", 26, 24000),
        ("Juan", 28, 25000),
        ("Luis", 35, 28000),
        ("Monica", 42, 30000),
        ("Rosa", 43, 25000),
        ("Susana", 45, 39000);
```

Actualizar datos:
```sql
UPDATE <tabla> SET nombre = "Pedro" WHERE id = 1;
```

Obtener datos:
```sql
SELECT * FROM <tabla>;
```

Borrar datos:
```sql
DELETE FROM <tabla> WHERE id = 1;
``` 

## Salir de MySql
Para salir del cli interactivo de mysql se puede usar la opción `quit` o `exit`.
```sql
exit;
```
