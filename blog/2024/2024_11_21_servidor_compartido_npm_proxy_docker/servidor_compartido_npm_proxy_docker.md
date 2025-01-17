---
date: 2024-11-21 
title: Servidor compartido para webs con HTTPS en 2 comandos con NPM Proxy y Docker 
slug: servidor-compartido-npm-proxy-docker 
tags: [docker, nginx, proxy]
authors: pabpereza
image: https://img.youtube.com/vi/WCSdh37Z6Wk/maxresdefault.jpg 
---

# Servidor compartido para webs con HTTPS en 2 comandos con NPM Proxy y Docker 
Es muy probable que tengas un servidor con un proveedor de hosting o cloud y quieras compartir los recursos de este servidor con múltiples usuarios o aplicaciones. Una solución muy común es utilizar un proxy inverso para redirigir las peticiones a los diferentes servicios que se ejecutan en el servidor. En este tutorial vamos a ver la forma fácil, utilizando el NPM (Node Proxy Manager) no confundir con el gestor de paquetes de Node.js, y como no Docker.

<!-- truncate -->

Dentro vídeo: https://youtu.be/WCSdh37Z6Wk

[![Curso Docker - Introducción](https://img.youtube.com/vi/WCSdh37Z6Wk/maxresdefault.jpg)](https://www.youtube.com/watch?v=WCSdh37Z6Wk)

## Requisitos
* Servidor VPS con Docker instalado.
* Entre 15 y 30 minutos de tu tiempo.
* ...
* Y nada más.

## Instalar docker en el servidor
Para instalar Docker en tu servidor, solo necesitas un comando:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
```

## Instalar NPM Proxy
Para instalar NPM Proxy, podemos usar su compose oficial. Solo necesitas un archivo `compose.yml` con el siguiente contenido:
```bash
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

Y ejecutar el siguiente comando:
```bash
docker-compose up -d
```

Si quieres repasar lo que es docker o docker compose, te dejo un enlace a mi curso de Docker en el que explico todo lo necesario para empezar a trabajar con Docker desde cero:
[Curso de Docker](https://pabpereza.dev/docs/cursos/docker)

Ahora ya tienes un servidor capaz de ejecutar múltiples aplicaciones y servicios en un mismo servidor, con certificados SSL y HTTPS. Bueno, en realidad aún no, pero lo que queda se hace rápidamente desde la interfaz de NPM Proxy.

El resto del tutorial se ve mejor en el vídeo, aquí dejo simplemente los comandos para que puedas copiar y pegar.
