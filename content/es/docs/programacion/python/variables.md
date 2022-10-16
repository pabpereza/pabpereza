---
title: "Variables"
linkTitle: "Variables"
weight: 10
tags: [python, programación]
description: >
---

Las variables en python son contenedores para almacenar valores. Estos valores pueden ser de cualquier tipo, como números, cadenas, listas, diccionarios, etc.

## Declaración de variables
Se pueden declarar variables usando el operador de asignación `=`. Por ejemplo:

```python
x = 5
y = "Hello, World!"
```

Python es un lenguaje de tipado dinámico, lo que significa que no necesitas declarar el tipo de variable. Cuando se crea una variable, se le asigna un tipo de datos. El tipo de datos puede cambiar durante la ejecución del programa.

## Nombres de variables
Un nombre de variable debe comenzar con una letra o el carácter de subrayado `_`. No puede comenzar con un número. Un nombre de variable solo puede contener caracteres alfanuméricos y guiones bajos (A-z, 0-9 y _). Los nombres de variables son sensibles a mayúsculas y minúsculas, por lo que `myvar` y `myVar` son dos variables diferentes.

## Asignación múltiple
Python permite asignar valores a múltiples variables en una sola línea.

```python
x, y, z = "Orange", "Banana", "Cherry"
print(x)
print(y)
print(z)
```

También puede asignar el mismo valor a múltiples variables en una sola línea.

```python
x = y = z = "Orange"
```


