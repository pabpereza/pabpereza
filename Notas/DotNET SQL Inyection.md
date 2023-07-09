---
title: "DotNET SQL Inyection"
tags: [ "sql"  ]
---

# Entity Framework
Es el ORM de Microsoft. Es muy utilizado en aplicaciones .NET. Es muy importante conocerlo para poder evitar inyecciones SQL.

Por defecto, Entity Framework utiliza parámetros para evitar inyecciones SQL. Pero si se utiliza SQL puro, se puede inyectar código SQL.

## Ejemplo de SQL puro
Si se utiliza SQL puro, se puede inyectar código SQL. En este caso, se inyecta un`1' OR 1='` para que siempre devuelva todos los registros rompiendo la cláusula `WHERE`. 
```csharp
	string query = "SELECT firstname, lastname FROM Users WHERE id='" + id + "'";
	Console.WriteLine(query);

	var command = connection.CreateCommand();
	command.CommandText = query;

	var reader = command.ExecuteReader(); 
```


## Ejemplo de SQL con parámetros
En cambio, si se utilizan parámetros, se evita la inyección SQL.
```csharp
	string query = "SELECT * FROM Users WHERE id=@id";
	Console.WriteLine(query);

	var command = connection.CreateCommand();
	command.CommandText = query;

	command.Parameters.AddWithValue("@id", id);

	var reader = command.ExecuteReader();
```

En conclusión, se debe utilizar siempre parámetros para evitar inyecciones SQL. Además, siempre es recomendable utilizar un [[ORM]] como Entity Framework para evitar errores de programación. En cualquier caso, limpiar los datos de entrada siempre es una buena práctica. 