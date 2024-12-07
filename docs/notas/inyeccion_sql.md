
# Inyección SQL
La inyección SQL es una vulnerabilidad que permite inyectar código SQL en una consulta SQL. Esta vulnerabilidad es muy común en aplicaciones web que utilizan bases de datos relacionales.

## Ejemplo de inyección SQL
En este ejemplo, se inyecta un`1' OR 1='` para que siempre devuelva todos los registros rompiendo la cláusula `WHERE`. 
```sql
SELECT firstname, lastname FROM Users WHERE id='1' OR 1='1'
```

## Herramientas para detectar inyecciones SQL
* [[sqlmap]]
