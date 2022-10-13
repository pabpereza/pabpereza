---
title: "Strings (Cadenas)"
linkTitle: "Strings"
weight: 
tags: [python, programación]
description: Las cadenas en python nos permiten almacenar texto 
---

Las cadenas de texto o `strings` en Python se pueden declarar usando comillas simples o dobles.

```python
x = "Hello World"
```

Las cadenas de texto pueden ser de una línea o de varias líneas. Para declarar una cadena de texto de varias líneas, se debe usar tres comillas simples o dobles.

```python
x = """Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua."""
```

## Operaciones con cadenas
Podemos utilizar diferentes operadores para realizar operaciones con cadenas de texto.

Por ejemplo, si queremos concatenar dos cadenas de texto, podemos usar el operador `+`.

```python
x = "Hello"
y = "World"
z = x + y
print(z) # Output: HelloWorld
```