---
date: 2022-08-08
title: "Potencia PowerShell"
slug: "potencia_powershell"
tags: [powershell, terminal]
authors: pabpereza
---

He de reconocer que no soy muy fan de PowerShell, es más, en ciertos momentos de mi vida he llegado a detestarlo. Tanto si te encanta PowerShell como si te ves forzado a usarlo, hay que reconocer que es muy mejorable.
<!-- truncate -->

En el anterior vídeo vimos el proceso de potenciar el terminal en entornos Unix y Linux mediante zsh y oh-my-zsh. [Aquí la entrada al blog y enlace al vídeo](/blog/2021/2021_12_30_potencia_tu_terminal/index.md)

Para esta ocasión, abordaremos el tema en sistemas Windows utilizando oh-my-posh. OMP nos ofrece características que, a día de hoy, considero indispensables, como:
* Auto completado
* Navegación simplificada
* Información avanzada
* Personalización con múltiples temas

### Características de PowerShell

PowerShell es una herramienta poderosa y versátil que ofrece una amplia gama de características para la administración y automatización de sistemas. Algunas de las características más destacadas incluyen:

* **Cmdlets**: PowerShell utiliza cmdlets, que son comandos especializados diseñados para realizar tareas específicas. Estos cmdlets son fáciles de usar y se pueden combinar para crear scripts complejos.
* **Pipelines**: PowerShell permite encadenar cmdlets utilizando pipelines, lo que facilita la manipulación y transformación de datos.
* **Objetos**: A diferencia de otros shells, PowerShell trabaja con objetos en lugar de texto plano, lo que permite una manipulación de datos más precisa y eficiente.
* **Compatibilidad**: PowerShell es compatible con una amplia variedad de sistemas y aplicaciones, lo que lo convierte en una herramienta ideal para la administración de entornos heterogéneos.

### Instalación de oh-my-posh

Para instalar oh-my-posh en PowerShell, sigue estos pasos:

1. Abre PowerShell como administrador.
2. Ejecuta el siguiente comando para instalar oh-my-posh:

```powershell
Install-Module oh-my-posh -Scope CurrentUser -AllowClobber
```

3. Una vez instalado, importa el módulo ejecutando el siguiente comando:

```powershell
Import-Module oh-my-posh
```

4. Configura el tema de oh-my-posh que desees utilizar. Por ejemplo, para utilizar el tema "paradox", ejecuta el siguiente comando:

```powershell
Set-PoshPrompt -Theme paradox
```

### Verificación de enlaces

- [Entrada al blog y enlace al vídeo sobre potenciar el terminal en Unix y Linux](/blog/2021/2021_12_30_potencia_tu_terminal/index.md)
- [Vídeo sobre potenciar PowerShell](https://youtu.be/kWIesAUhLAg)
