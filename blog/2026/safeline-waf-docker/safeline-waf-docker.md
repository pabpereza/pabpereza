---
slug: waf_gratis_en_docker_safeline
title: Monta tu propio WAF gratis en Docker con SafeLine
tags: [seguridad, docker, devsecops, waf, homelab]
keywords: [waf gratis docker, safeline waf, firewall de aplicaciones web, waf self hosted, waf open source, proteger vps de ataques, bloquear sql injection, waf para homelab, dvwa, modsecurity alternativa]
authors: pabpereza
date: 2026-09-22
---

Un campo de texto de una web cualquiera. Escribes unas comillas, concatenas una inyección SQL y, de forma casi mágica, la base de datos te escupe todos los usuarios. No he entrado al servidor, no tengo credenciales, simplemente he lanzado una inyección de SQL contra un formulario.

Ese es el punto de partida del vídeo de hoy: cómo montar un **WAF** (Web Application Firewall) gratis en Docker delante de lo que tengas expuesto —VPS, homelab, ese contenedor que levantaste "solo para probar"— y ver cómo ese mismo ataque deja de funcionar.

Vídeo completo: https://youtu.be/X0vm8cJ674w
[![Monta tu propio WAF GRATIS y bloquea ataques reales (SafeLine en Docker)](https://img.youtube.com/vi/X0vm8cJ674w/maxresdefault.jpg)](https://youtu.be/X0vm8cJ674w)

<!-- truncate -->

En el vídeo uso **SafeLine**, que además es el patrocinador (te digo claramente qué es gratis y qué es de pago), montado delante de **DVWA**, un laboratorio deliberadamente vulnerable. La demo es sencilla pero contundente: primero el ataque funciona y me da acceso a datos que no debería tener; luego pongo el WAF por delante, repito exactamente el mismo ataque, y esta vez el backend ni se entera —el WAF lo corta antes de que llegue.

Explico también qué diferencia a SafeLine de un WAF de reglas clásico tipo ModSecurity: en vez de buscar patrones con expresiones regulares (fáciles de esquivar cambiando un poco la query), decodifica el parámetro y analiza si es sintaxis válida de SQL/HTML/JS con intención maliciosa. Y, como siempre, sin venderte la moto: un WAF es una contramedida, no arregla tu código, y te cuento qué se queda fuera de la edición gratuita si algún día necesitas la de pago.

Todos los detalles —instalación con Docker Compose, cómo no exponer el panel de administración, configurar el sitio protegido y la demo completa de ataque→bloqueo— están en el vídeo. Dale al play arriba.

¿Tienes aplicaciones expuestas a internet sin un firewall web por delante? Te leo en los comentarios del vídeo.
