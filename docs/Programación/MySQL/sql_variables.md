
Las variables son valores que se pueden modificar en tiempo de ejecución. Podemos consultar el valor de una variable con el comando `SHOW VARIABLES`:
```sql
SHOW VARIABLES;
```

Podemos modificar el valor de una variable con el comando `SET`:
```sql
SET @variable = valor;
```

También podemos modificar el valor de una variable global con el comando `SET GLOBAL`:
```sql
SET GLOBAL @variable = valor;
```