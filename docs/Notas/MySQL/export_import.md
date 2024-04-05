
Exportar e importar bases de datos es un proceso crítico y totalmente necesario para proteger nuestros datos. 

Estas exportaciones se puede hacer con clientes como mysql workbench, phpmyadmin, etc. En la práctica, suele haber incompatibilidades entre algunas vesiones de los clientes con el servidor de bases de datos. Personalmente, siempre recomiendo utilizar la utilidad de terminal que lleva el propio servidor para minimizar la posibilidad de errores.

A continuación, una lista de como exportar e importar bases de datos sql clasificados por tecnología:

## MySQL
### Exportar
Podemos exportar con el siguiente comando:
``` bash
mysqldump -u USER -p DATABASE > salida.sql #La contraseña nos la pedirá interactivamente
```

Ejemplo real:
``` bash
mysqldump -u root -p database1 > database1.sql
```

Exportar múltiples bases de datos:
``` bash
mysqldump -u root -p --databases database1 database2 database3 > databases.sql
```

Exportar tablas específicas:
``` bash
mysqldump -u root -p --databases database1 --tables table1 table2 table3 > tables.sql
```

### Importar
Podemos importar con el siguiente comando:
``` bash
mysql -u USER -p DATABASE < salida.sql
```
