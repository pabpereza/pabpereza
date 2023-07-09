---
title: "Zsh"
linkTitle: "Zsh"
weight: 15 
tags: [shell, zsh, terminal, productividad]
description: 
---

En lo personal me encanta el terminal y en lo profesional lo veo indispensable para ciertas tareas.

Adaptarlo a nuestras necesidades y potenciar sus utilidades de caja me parece vital si pasas muchas
horas delante de una interfaz de comandos.

En esta guía explico como configurar zsh a mis gustos personales, (en este vídeo tenéis todo el proceso más detallado):
{{< youtube cyK89jHB9JA >}}


## Instalación de requisitos
Con el siguiente comando podéis instalar todos los requisitos necesarios para instalar zsh:
``` shell
apt install curl zsh
```


## Instalación de ohmyzsh
Ahora que tenemos instalado zsh podemos instalar el plugin de ohmyzsh:
``` shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

e voila!


## Opción 1 - Configuración con antigen (recomendada)
Antigen es un plugin de ohmyzsh que nos permite configurar zsh con una interfaz más sencilla, funcionando como gestor de plugins y temas.

Podemos descargarlo con el siguiente comando:
``` shell
curl -L git.io/antigen > antigen.zsh
```

Es importante que tengamos localizado el archivo `antigen.zsh`, personalmente lo suelo guardar dentro de la carpeta `.oh-my-zsh` 
por limpieza.

## Configuración de antigen
Para configurar antigen debemos añadir el siguiente comando en el fichero `.zshrc`:
``` conf
source <ubicación del archivo antigen.zsh>
```

## Instalación de plugin y temas
Para configurar un plugin podemos usar el comando 'antigen bundle' y para seleccionar un tema se usa el comando 'antigen theme'.

Por ejemplo:
``` shell 
# Definición de plugins
antigen bundle git
antigen bundle git-prompt

# Definición de un tema
antigen theme robbyrussell
```

Para finalizar la configuración de antigen debemos añadir el siguiente comando en el fichero `.zshrc`:
``` conf
antigen apply
```

La principal ventaja que nos aporta antigen es que deja un fichero de configuración mucho más limpio y, además, nos instala automaticamente los plugins y temas que hemos defino.

Las próxima vez que hagamos `source .zshrc` antigen se encargará de gestionarlo todo.

*Así quedaría el fichero `.zshrc` completo:*
``` conf
source ~/.oh-my-zsh/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle git-prompt
antigen bundle z 
antigen bundle pip
antigen bundle kubectl 
antigen bundle git-prompt
antigen bundle vi-mode
antigen bundle docker
antigen bundle docker-compose

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions

# Load the theme.
antigen theme bureau 

# Tell Antigen that you're done.
antigen apply
```


## Opción 2 - Configuración de ohmyzsh (Sin antigen)
Recuerda que todas las configuraciones que hagas en zsh se guardarán en el archivo `.zshrc`. Aquí podemos editar el tema, los plugins, añadir alias.. etc.

### Tema
Se puede editar el tema de zsh en el parámentro `ZSH_THEME`: del fichero `.zshrc`. Por ejemplo:
``` conf
ZSH_THEME="robbyrussell"
```
Así se cambia al tema por defecto de ohmyzsh.


### Plugins
Para añadir un plugin a zsh, debemos añadirlo en la sección `plugins` del fichero `.zshrc` separados por espacios. Por ejemplo:
``` conf
plugins=(git sudo docker z )
```

### Recargar cambios
Recuerda que cada vez que modifiques el fichero .zshrc tendras que cargar de nuevo la configuración con el comando:
``` shell
source ~/.zshrc
```

### Autocompletado y resaltado de color
Estas funcionalidades no vienen por defecto pero si podemos intalar los plugins para activarlos posteriormente. Aquí los enlaces a sus repositorios:
[autocomplete](https://github.com/zsh-users/zsh-autosuggestions)
[highlight](https://github.com/zsh-users/zsh-syntax-highlighting)

Los podríamos instalar respectivamente con los siguientes comandos:
``` shell
#Instalar autocompletado
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

#Instalar resaltado de color
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```


Los podríamos activar añadiéndolos en el parámetro de plugins en el fichero `.zshrc`:
``` conf
plugins=(zsh-syntax-highlighting zsh-autosuggestions)
```
