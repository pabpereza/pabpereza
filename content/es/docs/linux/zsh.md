---
title: "Zsh"
linkTitle: "Zsh"
weight: 15 
tags: [shell, zsh, terminal, productividad]
description: >
   Como potenciar tu terminal con zsh y ohmyzsh 
---

En lo personal me encanta el terminal y en lo profesional lo veo indispensable para ciertas tareas.

Adaptarlo a nuestras necesidades y potenciar sus utilidades de caja me parece vital si pasas muchas
horas delante de una interfaz de comandos.

En esta guía explico como configurar zsh a mis gustos personales, (en este vídeo tenéis todo el proceso más detallado):

<iframe width="100%" height="400" src="https://www.youtube.com/embed/cyK89jHB9JA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Instalación de requisitos
Con el siguiente comando podéis instalar todos los requisitos necesarios para instalar zsh:
```
apt install curl zsh
```


## Instalación de ohmyzsh
Ahora que tenemos instalado zsh podemos instalar el plugin de ohmyzsh:
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

e voila!


## Configuración de zsh
Recuerda que todas las configuraciones que hagas en zsh se guardarán en el archivo `.zshrc`. Aquí podemos editar el tema, los plugins, añadir alias.. etc.

### Tema
Se puede editar el tema de zsh en el parámentro `ZSH_THEME`: del fichero `.zshrc`. Por ejemplo:
```
ZSH_THEME="robbyrussell"
```
Así se cambia al tema por defecto de ohmyzsh.


### Plugins
Para añadir un plugin a zsh, debemos añadirlo en la sección `plugins` del fichero `.zshrc` separados por espacios. Por ejemplo:
```
plugins=(git sudo docker z )
```

### Recargar cambios
Recuerda que cada vez que modifiques el fichero .zshrc tendras que cargar de nuevo la configuración con el comando:
```
source ~/.zshrc
```

### Autocompletado y resaltado de color
Estas funcionalidades no vienen por defecto pero si podemos intalar los plugins para activarlos posteriormente. Aquí los enlaces a sus repositorios:
[autocomplete](https://github.com/zsh-users/zsh-autosuggestions)
[highlight](https://github.com/zsh-users/zsh-syntax-highlighting)

Los podríamos instalar respectivamente con los siguientes comandos:
```
```
#Instalar autocompletado
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

#Instalar resaltado de color
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```


Los podríamos activar añadiéndolos en el parámetro de plugins en el fichero `.zshrc`:
```
plugins=(zsh-syntax-highlighting zsh-autosuggestions)
```

