---
title: "Variables"
linkTitle: "Variables"
weight: 140 
tags: [mysql, sql]
description:  
---

Las variables son valores que se pueden modificar en tiempo de ejecución. Podemos consultar el valor de una variable con el comando `SHOW VARIABLES`:

```sql
SHOW VARIABLES;
```

Podemos modificar el valor de una variable con el comando `SET`:

```sql
SET @variable = valor;
```
