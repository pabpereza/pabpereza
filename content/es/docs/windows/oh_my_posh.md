---
title: "Oh my posh"
linkTitle: "Oh my posh"
weight: 10 
tags: [powershell]
description:  
---

Página oficial: [Oh My Posh](https://ohmyposh.dev/)

Aquí tenéis también el video tutorial:
{{< youtube kWIesAUhLAg >}} 

## Instalación 
El módulo de oh my posh se puede instalar desde la documentación de este enlace:
[Instalación en windows](https://ohmyposh.dev/docs/installation/windows)

Mediante winget (el gestor de paquetes nativo de windows) podemos instalarlo con un solo comando:
``` 
winget install JanDeDobbeleer.OhMyPosh -s winget
```

Una vez instalado, nos queda configurarlo para que arranque cada vez que iniciamos powershell. Para ello,
abrimos el fichero `profile` de powershell:
``` powershell
 notepad $PROFILE
```

Una vez abierto notepad, añadimos las siguientes líneas y guardamos:
``` powershell
oh-my-posh init pwsh  | Invoke-Expression
```

Esto permitirá que se arranque solo cada vez que abramos el terminal de powershell.

### Fuentes ( Nerd Fonts )
Podemos instalar fuentes con el comando (Requiere permisos de administrador):
``` powershell
oh-my-posh font install
```
Esto nos abrirá un prompt interactivo para elegir la fuente que queremos que nos instale.

También podríamos instalarlas desde la página de [Nerd Fonts](https://www.nerdfonts.com/)

Una vez instalada la fuente que nos interesa usar, no nos olvidemos de seleccionarla en nuestra aplicación o gestor de terminales favorito.

En el caso de windows terminal: Configuración (Control , ) -> Perfiles -> Valores predeterminados -> Apariencia -> Tipo de Fuente


## Módulos de terceros

### PSReadLine 
Este módulo nos permitirá activar el autocompletado de comandos en base a nuestro historial de una forma gráfica y cómoda:

Instalación:
``` powershell
Install-Module -Name PSReadLine -AllowPrerelease -Scope CurrentUser -Force -SkipPublisherCheck
```

Además de la instalación tendremos que añadir al nuestro script ubicado `$PROFILE`, por defecto, ubicado en `~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1`:
``` powershell
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/material.omp.json' | Invoke-Expression
```
Este es el resultado final de mi configuración importando remotamente el tema de oh-my-posh a utilizar.
