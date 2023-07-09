---
title: "Strings (Cadenas)"
linkTitle: "Strings"
weight: 20 
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

## Indexado de una string
Las cadenas en python son un conjunto de caracteres. Por lo tanto, cada carácter tiene un índice asociado. El primer carácter tiene el índice 0, el segundo carácter tiene el índice 1, etc.

Por ejemplo, si queremos acceder al primer carácter de una cadena de texto, podemos usar el índice 0.

```python
x = "Hello World"
print(x[0]) # Output: H
```

Si queremos acceder al último carácter de una cadena de texto, podemos usar el índice -1.

```python
x = "Hello World"
print(x[-1]) # Output: d
```

Se trataría exactamente igual que una lista. Si queremos acceder a un rango de caracteres, podemos usar el operador `:`.

```python
x = "Hello World"
print(x[2:5]) # Output: llo
```

## Inmutabilidad de las cadenas
Las cadenas de texto en Python son inmutables. Esto significa que no podemos cambiar los caracteres de una cadena de texto una vez que se ha creado.

```python
x = "Hello World"
x[0] = "J" # Error
```

Si queremos cambiar un carácter de una cadena de texto, tenemos que crear una nueva cadena de texto.

```python
x = "Hello World"
y = "J" + x[1:]
print(y) # Output: Jello World
```

## Métodos de las cadenas
Las cadenas de texto en Python tienen muchos métodos que podemos utilizar.

### Lower
El método `lower()` devuelve la cadena de texto en minúsculas.

```python
x = "Hello World"
print(x.lower()) # Output: hello world
```

### Upper
El método `upper()` devuelve la cadena de texto en mayúsculas.

```python
x = "Hello World"
print(x.upper()) # Output: HELLO WORLD
```

### Capitalize
El método `capitalize()` devuelve la cadena de texto con la primera letra en mayúsculas.

```python
x = "hello world"
print(x.capitalize()) # Output: Hello world
```

### Len
El método `len()` devuelve la longitud de la cadena de texto.

```python
x = "Hello World"
print(len(x)) # Output: 11
```

### Replace
El método `replace()` devuelve una nueva cadena de texto donde se han reemplazado todas las apariciones de una cadena de texto por otra.

```python
x = "Hello World"
print(x.replace("H", "J")) # Output: Jello World
```

### Split
El método `split()` devuelve una lista donde la cadena de texto se ha dividido en subcadenas en cada aparición del carácter especificado.

```python
x = "Hello World"
print(x.split(" ")) # Output: ['Hello', 'World']
```

### Quitar espacios en blanco
Tenemos tres métodos para quitar espacios en blanco de una cadena de texto.

Rstrip quita los espacios en blanco del final de la cadena de texto.

```python
x = "Hello World     "
print(x.rstrip()) # Output: Hello World
```

Lstrip quita los espacios en blanco del principio de la cadena de texto.

```python
x = "     Hello World"
print(x.lstrip()) # Output: Hello World
```

Strip quita los espacios en blanco del principio y del final de la cadena de texto.

```python
x = "     Hello World     "
print(x.strip()) # Output: Hello World
```

## Formateo de cadenas
Podemos utilizar el método `format()` para formatear cadenas de texto.

El método `format()` toma los argumentos pasados, los formatea y los inserta en la cadena de texto donde se encuentran los corchetes `{}`.

```python
x = "Hello {}"
print(x.format("World")) # Output: Hello World
```

Podemos pasar múltiples argumentos al método `format()`.

```python
x = "Hello {}, you are {} years old"
print(x.format("John", 36)) # Output: Hello John, you are 36 years old
```

También podemos utilizar índices para especificar el orden en el que se insertan los argumentos.

```python
x = "Hello {1}, you are {0} years old"
print(x.format(36, "John")) # Output: Hello John, you are 36 years old
```

O nombres.
```python
x = "Hello {name}, you are {age} years old"
print(x.format(age = 36, name = "John")) # Output: Hello John, you are 36 years old
```

Por último, también podríamos utilizar el operador `%` para formatear cadenas de texto.
```python
x = "Hello %s, you are %d years old"
print(x % ("John", 36)) # Output: Hello John, you are 36 years old
```


## Empieza o termina con
Podemos utilizar los métodos `startswith()` y `endswith()` para comprobar si una cadena de texto empieza o termina con una subcadena de texto.

```python
x = "Hello World"
print(x.startswith("Hello")) # Output: True
print(x.endswith("World")) # Output: True
```

## In - Contiene
Podemos utilizar el operador `in` para comprobar si una cadena de texto contiene una subcadena de texto.

```python
x = "Hello World"
print("Hello" in x) # Output: True
print("Goodbye" in x) # Output: False
```

## Find - Encontrar
Podemos utilizar el método `find()` para encontrar la posición de la primera aparición de una subcadena de texto dentro de una cadena de texto.

```python
x = "Hello World"
print(x.find("World")) # Output: 6
```



