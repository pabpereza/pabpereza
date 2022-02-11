---
title: "Comandos generales"
linkTitle: "Comandos generales"
weight: 
tags: [database, sql]
description:  
---


## Acceder a MySQL

```bash
mysql # Sin login
```

```bash
mysql -u root -p # Con usuario y contraseña
```

## Consultar base de datos

```sql
show databases;
```

## Crear base de datos

```sql
create database mibbdd;
```

## Consultar tablas

```sql
show tables;
```

## Crear tabla

```sql
mysql> CREATE TABLE mitabla(
         id MEDIUMINT NOT NULL AUTO_INCREMENT,
         nombre CHAR(30) NOT NULL,
         edad INTEGER(30),
         salario INTEGER(30),
         PRIMARY KEY (id) );
```

## Insertar datos

```sql
INSERT INTO mitabla (nombre, edad, salario) VALUES
("Pedro", 24, 21000),
        ("Maria", 26, 24000),
        ("Juan", 28, 25000),
        ("Luis", 35, 28000),
        ("Monica", 42, 30000),
        ("Rosa", 43, 25000),
        ("Susana", 45, 39000);
```

## Salir de MySql

```sql
exit;
```