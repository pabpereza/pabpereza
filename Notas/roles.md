---
title: "Roles"
linkTitle: "Roles"
weight: 120
tags: [mysql]
description:  
---

Los roles son una forma de agrupar usuarios y darles un conjunto de permisos. Sería una especie de plantilla de permisos que se puede aplicar a un usuario.

## Creación de roles
Podemos crear roles para que accedan a la base de datos. Para ello, utilizamos el comando `CREATE ROLE`:
```sql
CREATE ROLE 'rol';
```

Asignamos permisos a un rol con el comando `GRANT`:
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON 'tabla' TO 'rol';
```

## Asignación de roles a usuarios
Podemos asignar un rol a un usuario con el comando `GRANT`:
```sql
GRANT 'rol' TO 'usuario'@'localhost';
```

También podríamos usar el comando set:
```sql
SET ROLE 'rol' TO 'usuario'@'localhost';
```

Por último, lo podríamos asignar por defecto al usuario:
```sql
SET DEFAULT ROLE 'rol' TO 'usuario'@'localhost';
```

## Consultar roles de un usuario
Podemos consultar los roles de un usuario con el comando `SHOW GRANTS`:
```sql
SHOW GRANTS FOR 'usuario'@'localhost';
```

## Modificación de roles
Podemos modificar el nombre de un rol con el comando `RENAME ROLE`:
```sql
RENAME ROLE 'rol' TO 'nuevo_rol';
```

## Eliminación de roles
Podemos eliminar un rol con el comando `DROP ROLE`:
```sql
DROP ROLE 'rol';
```

