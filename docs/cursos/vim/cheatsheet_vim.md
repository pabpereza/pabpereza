---
title: "Cheatsheet Vim"
tags: [vim, cheatsheet, referencia]
keywords: [vim, cheatsheet, terminal, referencia]
description: "Guía rápida de comandos y atajos esenciales de Vim para mejorar tu productividad en el editor."
image: 'https://pabpereza.dev/img/banner_vim.png'
sidebar_label: "Cheatsheet Vim"
---

# 📋 Cheatsheet Vim

## 🎭 Modos

| Comando | Acción |
|---------|--------|
| `Esc` | Volver a modo Normal |
| `i` | Insert antes del cursor |
| `a` | Insert después del cursor |
| `I` | Insert al inicio de línea |
| `A` | Insert al final de línea |
| `o` | Nueva línea abajo |
| `O` | Nueva línea arriba |
| `v` | Visual carácter |
| `V` | Visual línea |
| `Ctrl+v` | Visual bloque |
| `:` | Modo comando |
| `/` | Búsqueda adelante |
| `?` | Búsqueda atrás |

## 🏃 Movimientos básicos

### Carácter
| Comando | Acción |
|---------|--------|
| `h` | ← Izquierda |
| `j` | ↓ Abajo |
| `k` | ↑ Arriba |
| `l` | → Derecha |

### Palabra
| Comando | Acción |
|---------|--------|
| `w` | Siguiente palabra |
| `W` | Siguiente PALABRA (separada por espacios) |
| `b` | Palabra anterior |
| `B` | PALABRA anterior |
| `e` | Final de palabra |
| `E` | Final de PALABRA |

### Línea
| Comando | Acción |
|---------|--------|
| `0` | Inicio de línea |
| `^` | Primer carácter no-blanco |
| `$` | Final de línea |
| `g_` | Último carácter no-blanco |

### Pantalla
| Comando | Acción |
|---------|--------|
| `H` | Top de pantalla |
| `M` | Medio de pantalla |
| `L` | Bottom de pantalla |
| `Ctrl+u` | Media página arriba |
| `Ctrl+d` | Media página abajo |
| `Ctrl+b` | Página completa arriba |
| `Ctrl+f` | Página completa abajo |
| `gg` | Inicio de archivo |
| `G` | Final de archivo |
| `:{número}` | Ir a línea número |

### Búsqueda en línea
| Comando | Acción |
|---------|--------|
| `f{char}` | Buscar carácter hacia adelante |
| `F{char}` | Buscar carácter hacia atrás |
| `t{char}` | Hasta carácter hacia adelante |
| `T{char}` | Hasta carácter hacia atrás |
| `;` | Repetir búsqueda de carácter |
| `,` | Repetir búsqueda de carácter (reversa) |

## ✂️ Edición

### Borrar
| Comando | Acción |
|---------|--------|
| `x` | Borrar carácter |
| `X` | Borrar carácter anterior |
| `dd` | Borrar línea |
| `dw` | Borrar palabra |
| `d$` | Borrar hasta final de línea |
| `d0` | Borrar hasta inicio de línea |
| `dG` | Borrar hasta final de archivo |
| `dgg` | Borrar hasta inicio de archivo |

### Cambiar (borrar + insert)
| Comando | Acción |
|---------|--------|
| `cc` | Cambiar línea |
| `cw` | Cambiar palabra |
| `c$` | Cambiar hasta final de línea |
| `C` | Cambiar hasta final de línea |
| `s` | Cambiar carácter |
| `S` | Cambiar línea completa |

### Copiar (yank)
| Comando | Acción |
|---------|--------|
| `yy` | Copiar línea |
| `yw` | Copiar palabra |
| `y$` | Copiar hasta final de línea |
| `yG` | Copiar hasta final de archivo |

### Pegar
| Comando | Acción |
|---------|--------|
| `p` | Pegar después |
| `P` | Pegar antes |

### Otros
| Comando | Acción |
|---------|--------|
| `u` | Deshacer |
| `Ctrl+r` | Rehacer |
| `.` | Repetir último comando |
| `~` | Cambiar mayúscula/minúscula |
| `>>` | Indentar línea |
| `<<` | Des-indentar línea |
| `J` | Unir línea con la siguiente |

## 🔍 Búsqueda y reemplazo

### Búsqueda
| Comando | Acción |
|---------|--------|
| `/texto` | Buscar "texto" |
| `?texto` | Buscar "texto" hacia atrás |
| `n` | Siguiente resultado |
| `N` | Resultado anterior |
| `*` | Buscar palabra bajo cursor |
| `#` | Buscar palabra bajo cursor (atrás) |

### Reemplazo
| Comando | Acción |
|---------|--------|
| `:s/old/new/` | Reemplazar en línea actual |
| `:s/old/new/g` | Reemplazar todo en línea |
| `:%s/old/new/g` | Reemplazar en todo el archivo |
| `:%s/old/new/gc` | Reemplazar con confirmación |

## 🗂️ Buffers y ventanas

### Buffers
| Comando | Acción |
|---------|--------|
| `:e archivo` | Abrir archivo |
| `:b número` | Cambiar a buffer número |
| `:bnext` | Siguiente buffer |
| `:bprev` | Buffer anterior |
| `:bd` | Cerrar buffer |
| `:ls` | Listar buffers |

### Ventanas
| Comando | Acción |
|---------|--------|
| `:split` | División horizontal |
| `:vsplit` | División vertical |
| `Ctrl+w h` | Ventana izquierda |
| `Ctrl+w j` | Ventana abajo |
| `Ctrl+w k` | Ventana arriba |
| `Ctrl+w l` | Ventana derecha |
| `Ctrl+w w` | Siguiente ventana |
| `Ctrl+w q` | Cerrar ventana |
| `Ctrl+w =` | Igualar tamaños |

### Pestañas
| Comando | Acción |
|---------|--------|
| `:tabnew` | Nueva pestaña |
| `:tabnext` | Siguiente pestaña |
| `:tabprev` | Pestaña anterior |
| `:tabclose` | Cerrar pestaña |
| `gt` | Siguiente pestaña |
| `gT` | Pestaña anterior |

## 📝 Comandos útiles

### Archivos
| Comando | Acción |
|---------|--------|
| `:w` | Guardar |
| `:w archivo` | Guardar como |
| `:wa` | Guardar todos |
| `:q` | Salir |
| `:q!` | Salir sin guardar |
| `:wq` | Guardar y salir |
| `:x` | Guardar y salir |
| `:qa` | Salir de todo |

### Configuración
| Comando | Acción |
|---------|--------|
| `:set number` | Mostrar números |
| `:set nonumber` | Ocultar números |
| `:set paste` | Modo paste |
| `:set nopaste` | Desactivar modo paste |
| `:syntax on` | Activar sintaxis |
| `:syntax off` | Desactivar sintaxis |

### Ayuda
| Comando | Acción |
|---------|--------|
| `:help` | Ayuda general |
| `:help comando` | Ayuda de comando |
| `:helpgrep texto` | Buscar en ayuda |

## 🎯 Combinaciones de objetos de texto

### Formato: `{operador}{objeto}`

#### Operadores
- `d` - borrar
- `c` - cambiar
- `y` - copiar
- `v` - seleccionar

#### Objetos de texto
| Comando | Acción |
|---------|--------|
| `w` | palabra |
| `W` | PALABRA |
| `s` | oración |
| `p` | párrafo |
| `t` | tag HTML/XML |
| `"` | texto entre comillas dobles |
| `'` | texto entre comillas simples |
| ``` | texto entre backticks |
| `(` o `)` | texto entre paréntesis |
| `[` o `]` | texto entre corchetes |
| `{` o `}` | texto entre llaves |

#### Modificadores
- `i` - inner (dentro de)
- `a` - around (alrededor de, incluyendo)

### Ejemplos
| Comando | Acción |
|---------|--------|
| `diw` | borrar palabra (inner word) |
| `daw` | borrar palabra con espacios (around word) |
| `ci"` | cambiar texto entre comillas |
| `ya{` | copiar contenido entre llaves |
| `vi(` | seleccionar dentro de paréntesis |

## 🔢 Modificadores numéricos

Cualquier comando puede ser precedido por un número:

| Comando | Acción |
|---------|--------|
| `3w` | 3 palabras adelante |
| `5j` | 5 líneas abajo |
| `2dd` | borrar 2 líneas |
| `3yy` | copiar 3 líneas |
| `4>>` | indentar 4 líneas |

## 🎨 Marcas y registros

### Marcas
| Comando | Acción |
|---------|--------|
| `ma` | Marcar posición como 'a' |
| `` `a `` | Ir a marca 'a' |
| `'a` | Ir a línea de marca 'a' |
| `:marks` | Ver todas las marcas |

### Registros
| Comando | Acción |
|---------|--------|
| `"ayy` | Copiar línea al registro 'a' |
| `"ap` | Pegar del registro 'a' |
| `:reg` | Ver contenido de registros |

## 🔄 Macros

| Comando | Acción |
|---------|--------|
| `qa` | Grabar macro en registro 'a' |
| `q` | Parar grabación |
| `@a` | Ejecutar macro 'a' |
| `@@` | Repetir última macro |
| `3@a` | Ejecutar macro 'a' 3 veces |

---

**💡 Pro tip**: Imprimamos esta página y tengámosla cerca mientras aprendemos. Con el tiempo no la necesitaremos.
