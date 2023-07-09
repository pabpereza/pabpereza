---
title: "Operaciones numéricas"
linkTitle: "Operaciones numéricas"
weight: 30 
tags: []
description:  
---

En Python, podemos realizar operaciones numéricas de forma muy sencilla. Para ello, utilizamos los operadores aritméticos:

| Operador | Descripción |
|----------|-------------|
| +        | Suma        |
| -        | Resta       |
| *        | Multiplicación |
| /        | División    |
| %        | Módulo      |
| **       | Potencia    |
| //       | División entera |

## Suma
La operación más sencilla es la suma. Para ello, utilizamos el operador `+`:
```python
x = 5
y = 3

print(x + y) # Output: 8
```

## Resta
Para realizar una resta, utilizamos el operador `-`:
```python
x = 5
y = 3

print(x - y) # Output: 2
```

## Multiplicación
En el caso de la multiplicación, utilizamos el operador `*`:
```python
x = 5
y = 3

print(x * y) # Output: 15
```

## División
En una división, utilizamos el operador `/`:
```python
x = 5
y = 3

print(x / y) # Output: 1.6666666666666667
```

## Módulo
El módulo es el resto de una división. Para calcularlo, utilizamos el operador `%`:
```python
x = 5
y = 3

print(x % y) # Output: 2
```

## División entera
La división entera es la división que devuelve el resultado sin decimales. Para calcularla, utilizamos el operador `//`:
```python
x = 5
y = 3

print(x // y) # Output: 1
```

## Potencia
Podemos calcular la potencia de un número utilizando el operador `**`:
```python
x = 5
y = 3

print(x ** y) # Output: 125
```

Otra forma de calcular la potencia es utilizando la función `pow()`:
```python
x = 5
y = 3

print(pow(x, y)) # Output: 125
```

## Raíz cuadrada
En el caso opuesto a la potencia, podemos calcular la raíz cuadrada de un número utilizando la función `sqrt()`:
```python
x = 25
y = 5

print(sqrt(x)) # Output: 5.0
```