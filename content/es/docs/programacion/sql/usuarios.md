---
title: "Usuarios"
linkTitle: "Usuarios"
weight: 100 
tags: [mysql]
description:  
---


## Creación de usuarios

Podemos crear usuarios para que accedan a la base de datos. Para ello, utilizamos el comando `CREATE USER`:

```sql
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'password';
```

El comando anterior crea un usuario llamado `usuario` con contraseña `password` que solo puede acceder desde el servidor `localhost`.


## Modificación de usuarios
Podemos modificar la contraseña de un usuario con el comando `SET PASSWORD`:
```sql
SET PASSWORD FOR 'usuario'@'localhost' = PASSWORD('nueva_password');
```

También podríamos haber utilizado el comando `ALTER USER`:
```sql
ALTER USER 'usuario'@'localhost' IDENTIFIED BY 'nueva_password';
```

Podemos modificar el nombre de un usuario con el comando `RENAME USER`:
```sql
RENAME USER 'usuario'@'localhost' TO 'nuevo_usuario'@'localhost';
```


## Eliminación de usuarios
Podemos eliminar un usuario con el comando `DROP USER`:
```sql
DROP USER 'usuario'@'localhost';
```

Podemos eliminar todos los usuarios con el comando `DROP ALL USERS`:
```sql
DROP ALL USERS;
```



