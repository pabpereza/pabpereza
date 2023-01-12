---
title: "Permisos"
linkTitle: "Permisos"
weight: 110
tags: [mysql]
description:  
---


## Creación de permisos
Podemos crear permisos para que los usuarios puedan acceder a la base de datos. Para ello, utilizamos el comando `GRANT`:
```sql
GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'localhost';
```

Pero ojo, porque este comando da todos los permisos al usuario. Si queremos darle permisos específicos, podemos hacerlo de la siguiente manera:
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON <base de datos>.* TO 'usuario'@'localhost';
```

También podríamos dar permisos específicos a una tabla en concreto:
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON base_de_datos.tabla TO 'usuario'@'localhost';
```

## Consultar permisos
Podemos consultar los permisos de un usuario con el comando `SHOW GRANTS`:
```sql
SHOW GRANTS FOR 'usuario'@'localhost';
```

Podríamos consultar los permisos de las tablas desde la "table_priv" de la base de datos "mysql":
```sql
SELECT * FROM mysql.table_priv WHERE User = 'usuario' AND Host = 'localhost';
```

## Eliminación de permisos
Para eliminar permisos, utilizamos el comando `REVOKE`:
```sql
REVOKE ALL PRIVILEGES ON *.* FROM 'usuario'@'localhost';
```

También podríamos ser más concretos y eliminar permisos específicos:
```sql
REVOKE SELECT, INSERT, UPDATE, DELETE ON <base de datos>.* FROM 'usuario'@'localhost';
```

Y por último, limitar los permisos a una tabla en concreto:
```sql
REVOKE SELECT, INSERT, UPDATE, DELETE ON base_de_datos.tabla FROM 'usuario'@'localhost';
```

