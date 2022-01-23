---
date: 2021-10-24
title: "La alternativa a Docker que estabas buscando - Rancher Desktop"
linkTitle: "Rancher Desktop"
tags: [docker,devops]
---


Ya estuve explicando en este [artículo](/blog/2021/09/12/docker-desktop-de-pago) los nuevos planes de Docker Desktop y como afectaría a los usuarios. 
Aunque existen otras alternativas como Buildah o Podman, estas, solo funcionan sobre linux y si sois usuarios de 
Windows o Mac y pensais en montar una máquina Linux quizá prefiráis usar docker engine por la familiaridad que no usar otras herramientas.

Rancher Desktop se posiciona como una alternativa a tener en cuenta. Dentro vídeo <i class='fa fa-film'></i>
{{< youtube LmKN4NvpR-4 >}}

## ¿Qué es rancher desktop?
Si vienes del mundo de kubernetes seguro que Rancher te es familiar. Este es una plataforma de kubernetes con una capa de gestión 
pensado en la facilidad de despliegue y gestión de clústers.

En esta ocasión, rancher desktop es una forma de acercarse a los desarrolladores y competir directamente con docker en el escritorio.

## ¿Qué aporta?
El planteamiento es similar al de Docker Desktop, gestiona automáticamente la instalación de una interfaz de usario, el engine de contenedores (containerd), k3s (la misma tecnología que utiliza rancher para kubernetes), kubectl... etc y todo este paquete en una instalación sencilla.

{{< imgproc rancher_desktop_panel Fit "700x450" >}}
Panel de control de rancher desktop en Mac
{{< /imgproc >}}

Si has visto el vídeo Rancher Desktop, al menos en Windows, tiene algunos pequeños errores. Cabe recordar que su estado de desarrollo es pre-release y es normal que durante sus betas encontremos 
errores que nos impidan utilizarlo a día de hoy.

## La alternativa definitiva
Como ya comentaba, una solución 100% efectiva es instalar docker en una máquina virtual de linux. Esto lo podríamos hacer manualmente pero, puestos a hacerlo, mejor hacerlo bien.

Un viejo compañero con alias [Yohnah](https://github.com/Yohnah) en Github ha creado un repositorio con automatismos y una máquina virtual preparada para desplegar automáticamente con Vagrant.
La máquina virtual viene con docker instalado y listo para funcionar, además, el automatismo deja el host configurado para que utilice el docker engine de la máquina virtual de una forma similar a la que lo hace docker desktop. Toda la guía aquí:
https://github.com/Yohnah/Docker

¡Hasta el siguiente!
