---
slug: resumen_vulnerabilidades_octubre_2026
title: Octubre negro para la seguridad, resumen de vulnerabilidades de octubre de 2026
description: PHP2Shell, Node2Shell en Brotli, GitLab con CVSS 10, un Patch Tuesday de más de 1.400 CVEs, Next.js, LiteLLM troyanizado y el mayor robo cripto de la historia. Qué pasó y qué tienes que parchear.
tags: [seguridad, devsecops, vulnerabilidades, cve]
keywords: [octubre negro seguridad, vulnerabilidades octubre 2026, resumen cve octubre 2026, php2shell, node2shell, brotli cve-2026-111497, gitlab cvss 10, patch tuesday octubre 2026, next.js vulnerabilidad, litellm comprometido, binance hackeo, cisa kev, que parchear]
authors: pabpereza
date: 2026-11-09
image: ./resumen_vulnerabilidades_octubre_2026-miniatura.jpg
---

Octubre ha sido un mes negro para la seguridad. Este año el Black Friday se ha adelantado, y lo que venía de oferta eran CVEs. En cuatro semanas hemos tenido un RCE sin login en el intérprete de PHP explotado antes de ser público, un fallo en Brotli que tumba Node.js, .NET y Python a la vez, dos CVSS 10 en GitLab, un Patch Tuesday de más de 1.400 CVEs, una librería de IA troyanizada en PyPI y Docker Hub y, para rematar, el mayor robo cripto de la historia.

En este artículo repasamos lo que pasó, ordenado por fechas, y sobre todo **qué tienes que revisar en tus sistemas**. Al final tienes una checklist para ir tachando.

<!-- truncate -->

## La línea temporal en un vistazo

| Fecha | Qué pasó |
|---|---|
| 1 oct | Python publica parches para 8 CVEs (tarfile, zipfile y ssl) |
| 12 oct | GitLab parchea un RCE sin login con CVSS 10 que acaba explotado |
| 13 oct | Patch Tuesday de Microsoft con más de 1.400 CVEs, récord histórico |
| 14 oct | Next.js parchea dos RCE críticos sin login |
| 17 oct | Amazon detecta ataques a PHP2Shell con el fallo aún bajo embargo |
| 20 oct | Se filtran los detalles de PHP2Shell antes de tiempo |
| 21 oct | Sale el parche de PHP, Node.js parchea Brotli, LiteLLM troyanizado y otro CVSS 10 en GitLab |
| 22 oct | Los paquetes Brotli de Python también son vulnerables |
| 23 oct | PHP avisa de un tercer fallo, todavía sin parche |
| 26 oct | CISA confirma que PHP2Shell se explota en ataques reales |
| 27 oct | CISA hace lo mismo con el fallo de Brotli |
| 29 oct | Roban unos 6.300 millones de dólares a Binance |
| 31 oct | El FBI atribuye el robo a Corea del Norte |

Vamos uno por uno.

## PHP2Shell, la estrella del mes

**PHP2Shell** son en realidad dos vulnerabilidades, **CVE-2026-109618** y **CVE-2026-109619**: ejecución remota de código (RCE, *Remote Code Execution*) **sin autenticación** en el propio intérprete de PHP. No en un framework ni en un plugin, en PHP. Afecta a **todas las versiones desde la 5.4**, es decir, desde 2012.

La historia tiene de todo:

- El **17 de octubre**, con el fallo todavía bajo embargo, Amazon ya detecta intentos de explotación en sus honeypots.
- El **20 de octubre** se filtran los detalles y PHP tiene que adelantar el parche un día.
- El **21 de octubre** sale el parche: **8.5.12, 8.4.27, 8.3.36 y 8.2.35**. Ese mismo día Chainguard publica sus imágenes parcheadas antes de que acabe el embargo, y en Docker Hub aparecen durante unas horas tags vacíos.
- El **23 de octubre** PHP avisa de un tercer fallo, **CVE-2026-115560**, mucho menos probable de explotar (solo si tu aplicación cambia `session.serialize_handler` con `ini_set()`). A día de hoy **sigue sin parche**; la mitigación es poner `session.upload_progress.enabled=0`.
- El **26 de octubre** CISA mete los dos CVE principales en su catálogo **KEV** (*Known Exploited Vulnerabilities*, la lista de fallos que se están explotando de verdad).

Y lo más llamativo: PHP no solo está en tus servidores web. Se ha explotado en **firewalls de Palo Alto** encadenado con un fallo del kernel para conseguir root, y hay avisos para appliances de Cisco, Citrix, F5 y Siemens. Ese eslabón que ni sabías que tenías.

<!-- TODO: enlace al vídeo largo cuando se publique (slug provisional cadena-de-suministro-software-php2shell) -->
> 🎥 Por qué un parche que sale el 21 de octubre no llega a todos a la vez, y quién mantiene cada eslabón entre php-src y tu contenedor, lo veremos a fondo en el próximo vídeo del canal sobre la cadena de suministro de software.

**Qué hacer:** comprueba la versión de PHP de todo lo que tengas (`php -v`, pero también la imagen base de tus contenedores) y actualiza. Si estás en PHP 8.1 o anterior, no hay parche oficial: toca migrar. Y revisa los avisos de los fabricantes de tus appliances.

Fuentes: [aviso de php.net](https://www.php.net/archive/2026.php#2026-10-21-1), [PHP Foundation](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/), [Amazon](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/), [BleepingComputer](https://bleepingcomputer.com/news/security/cisa-confirms-php2shell-vulnerabilities-now-exploited-in-attacks), [Kaspersky](https://kaspersky.com/blog/php2shell-two-weeks-after-patches/56647).

## Node2Shell, o cómo un descompresor tumba medio internet

El mismo 21 de octubre llegó **CVE-2026-111497**, una escritura fuera de límites en el decodificador de **Brotli**, el algoritmo de compresión de Google que usan muchísimos servidores y clientes HTTP. La prensa lo ha bautizado como **Node2Shell**, aunque no es un nombre oficial y tampoco es un fallo exclusivo de Node.

Afecta a la librería Brotli de la 1.0.3 a la 1.2.0 y, por tanto, a todo lo que la lleva dentro:

- **Node.js 22, 24 y 26**, a través de `node:zlib` y de `fetch()` al recibir respuestas comprimidas. Parcheado en **22.23.4, 24.22.1 y 26.12.1**. Node 20 está en fin de vida y no recibe parche.
- **Python**, pero ojo, no CPython: los paquetes `brotli` y `brotlicffi` de PyPI. Como `urllib3` (y por tanto `requests`) descomprime Brotli automáticamente si alguno de ellos está instalado, puedes tenerlo sin saberlo. Parcheado en `brotli` 1.2.1 y `brotlicffi` 1.2.1.0.
- **.NET**, con parche fuera de ciclo el 25 de octubre, y productos como VMware SDDC Manager o los builds de PHP para Windows.

El impacto va desde tumbar el proceso hasta una posible ejecución de código, aunque los exploits públicos de momento solo consiguen la caída. Aun así, CISA lo metió en el KEV el **27 de octubre**.

**Qué hacer:** actualiza Node.js y reinicia los procesos, revisa tus dependencias de Python con `pip show brotli brotlicffi` y **reconstruye las imágenes** de contenedor. Si no puedes parchear todavía, desactiva Brotli en el proxy.

Fuentes: [aviso de Node.js](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases), [GHSA del paquete de Python](https://github.com/advisories/GHSA-9v8h-qqgm-4m35), [BleepingComputer](https://bleepingcomputer.com/news/security/cisa-warns-of-hackers-now-exploiting-critical-node2shell-flaw).

## GitLab, dos CVSS 10 en nueve días

Si tienes un GitLab autogestionado, octubre te ha dado trabajo doble.

El **12 de octubre** GitLab parchea **CVE-2026-97229**, un desbordamiento de entero en el compilador de expresiones regulares de CI/CD que permite **ejecutar código sin login**. CVSS 10. Rapid7 lo reprodujo en un día y CISA lo añadió al KEV el 29 de octubre: se está explotando.

El **21 de octubre** llega **CVE-2026-110264**, otro CVSS 10, otra regex y otra ejecución de código sin autenticación, esta vez en el motor de expresiones regulares de Ruby. Afecta a **prácticamente todas las versiones desde la 7.0**, o sea, desde 2014. Y el parche del día 12 **no** te protege de este.

**Qué hacer:** actualiza directamente a la última release (19.5.1, 19.4.3, 19.3.6 y equivalentes), que tapa los dos. Si estás en la 18.10 o anterior, primero tienes que subir a una rama soportada. GitLab.com ya estaba parcheado.

Fuentes: [GitLab 19.4.2](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/), [GitLab 19.5.1](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/), [BleepingComputer](https://bleepingcomputer.com/news/security/hackers-now-exploiting-max-severity-gitlab-flaw-in-attacks).

## Patch Tuesday con más de 1.400 CVEs

El **13 de octubre** Microsoft publicó el Patch Tuesday más grande de su historia. El número exacto baila según quién cuente (entre 1.403 y 1.416), así que quedémonos con **más de 1.400**. Y no son todos de Windows: entran Office, SharePoint, Azure, .NET y un montón de componentes de terceros de Azure Linux (Mariner), como el kernel de Linux o Go.

Lo importante de verdad son los tres zero-days, y sobre todo uno:

- **CVE-2026-96951**: salto de *Mark of the Web* en Windows Shell, explotado activamente. Es lo que permite que un fichero descargado de internet se abra sin los avisos de seguridad.
- **CVE-2026-108398**: salto de WDAC en .NET Framework, público antes del parche.
- **CVE-2026-92707**: denegación de servicio en MessagePack-CSharp, también público antes del parche.

Además, fue la última actualización para **Windows 11 24H2 Home y Pro**.

**Qué hacer:** aplica el acumulativo cuanto antes, empezando por los equipos de usuario (por el zero-day de Mark of the Web) y los servidores expuestos.

Fuentes: [BleepingComputer](https://www.bleepingcomputer.com/news/microsoft/microsoft-october-2026-patch-tuesday-fixes-1-411-flaws-3-zero-days/), [IT-Connect](https://www.it-connect.tech/patch-tuesday-october-2026-1407-vulnerabilities-fixed-including-three-zero-days/).

## Next.js, dos RCE sin login (con letra pequeña)

El **14 de octubre** Vercel sacó una actualización fuera de ciclo con dos fallos críticos de **ejecución remota de código sin autenticación**:

- Uno en **App Router con Cache Components**, cuando una función `use cache` devuelve varios *typed arrays*. Viene de React y no tiene workaround.
- Otro en la **optimización de imágenes con SVG**, por un fallo de memoria en `sharp`. Solo afecta a Linux con glibc, que en la práctica es tu Next.js autogestionado.

Ninguno se ha visto explotado, pero los dos son sin login.

**Qué hacer:** `npm install next@16.4.1` (o `next@15.5.28` si estás en la 15), comprueba en el lockfile que `sharp` es 0.35.5 o posterior y vuelve a desplegar.

Fuentes: [blog de Next.js](https://nextjs.org/blog/nextjs-security-update-october-14-2026), [GHSA-673q-mjm6-r5xr](https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr).

## Python, ocho CVEs y adiós a la 3.10

El **1 de octubre** salieron Python **3.11.17, 3.12.15, 3.13.16 y 3.14.8** con 8 CVEs corregidas. Los titulares se los llevaron `tarfile` y `zipfile` (extraer un archivo malicioso podía escribir fuera del directorio de destino o agotar la memoria), pero lo más grave estaba en `ssl`: un *use-after-free* que permite tumbar un servidor TLS en remoto y un salto de la verificación del hostname.

De paso, **Python 3.10.22 es la última versión de la 3.10**, que llega a su fin de vida.

**Qué hacer:** actualiza el intérprete (y la imagen base de tus contenedores), migra lo que siga en 3.10 y, si extraes archivos que no controlas, usa siempre `filter="data"`.

Fuente: [blog de Python](https://blog.python.org/2026/10/python-31022-31117/).

## LiteLLM, la cadena de suministro vuelve a romperse

El **21 de octubre** apareció en PyPI una versión **1.107.0 de LiteLLM troyanizada**, la librería que mucha gente usa como pasarela hacia los distintos modelos de IA. No solo en PyPI: las imágenes de Docker Hub y GHCR con los tags `v1.107.0` y `latest` también estaban infectadas. Estuvo disponible unas 2-3 horas.

Los atacantes entraron con tokens de GitHub robados a tres mantenedores y lanzaron el pipeline de release desde un clon del repositorio. El código de GitHub está limpio; lo envenenado era lo publicado. El malware se instalaba para ejecutarse **cada vez que arrancaba Python** y se llevaba claves de nube, API keys de proveedores de IA y secretos de la base de datos. En pocas horas ya se estaban usando credenciales de AWS robadas.

Es el **segundo compromiso de LiteLLM este año** (el anterior fue en marzo).

**Qué hacer:** fija `litellm==1.106.2`, vuelve a descargar las imágenes y, si instalaste la 1.107.0 en algún sitio, da ese host por comprometido y **rota todas las credenciales** que tuviera a mano. Y una lección general: no despliegues `latest`, fija versiones (y en imágenes, por digest).

Fuentes: [blog de LiteLLM](https://docs.litellm.ai/blog/tags/security), [Datadog Security Labs](https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-docker).

## Binance y el mayor robo cripto de la historia

Para cerrar el mes, el **29 de octubre** robaron unos **6.300 millones de dólares** a Binance, más de cuatro veces lo que se llevaron de Bybit en 2025, que hasta ahora era el récord. Según la investigación preliminar, todo empezó con el **portátil comprometido de un ingeniero**, que dio acceso a un servicio interno desde el que se ordenaron retiradas a direcciones del atacante. Binance asegura que los fondos de los usuarios están cubiertos.

El **31 de octubre** el FBI atribuyó el robo a Corea del Norte, en concreto a **TraderTraitor**, el mismo grupo al que ya culpó de lo de Bybit.

Aquí no hay nada que parchear, pero sí una lección muy DevSecOps: el eslabón débil no fue la criptografía, fue un equipo de desarrollo con acceso a un servicio crítico. Seguridad del endpoint, mínimo privilegio y aprobación de más de una persona para las operaciones peligrosas.

Fuentes: [The Register](https://www.theregister.com/security/2026/11/02/fbi-pins-63b-binance-crypto-heist-on-north-korean-hackers/5306889), [Nextgov](https://www.nextgov.com/cybersecurity/2026/10/fbi-involved-response-63-billion-binance-hack-linked-north-korea/416946/).

## Checklist para esta semana

- [ ] **PHP** actualizado a 8.5.12, 8.4.27, 8.3.36 o 8.2.35, y `session.upload_progress.enabled=0` hasta que salga el siguiente parche.
- [ ] **Node.js** en 22.23.4, 24.22.1 o 26.12.1, y nada en Node 20 expuesto.
- [ ] Paquetes **`brotli` / `brotlicffi`** de Python en 1.2.1 o posterior.
- [ ] **.NET** con el parche del 25 de octubre.
- [ ] **GitLab** autogestionado en la última release de su rama.
- [ ] **Patch Tuesday** de octubre aplicado.
- [ ] **Next.js** en 16.4.1 o 15.5.28, con `sharp` 0.35.5 o posterior.
- [ ] **Python** en 3.11.17 o superior, y nada en 3.10.
- [ ] **LiteLLM** revisado: ninguna instalación de la 1.107.0 y credenciales rotadas si la hubo.
- [ ] **Imágenes de contenedor reconstruidas**, que de poco sirve parchear si tu `Dockerfile` sigue tirando de una base vieja.
- [ ] Avisos de los **fabricantes de tus appliances** (firewalls, balanceadores) revisados por PHP2Shell.

## Conclusiones

Si hay un patrón en octubre es que **casi nada de lo grave estaba en el código que escribimos nosotros**. Estaba en el intérprete, en la librería de compresión, en la herramienta de CI/CD, en la dependencia de IA o en el portátil de alguien. Es la cadena de suministro de software, y cada vez se rompe por más sitios.

La buena noticia es que la defensa también es de cadena: saber qué tienes (un SBOM ayuda mucho), fijar versiones, reconstruir imágenes con frecuencia y vigilar el catálogo KEV de CISA para priorizar lo que se explota de verdad.

Si quieres ver la cadena entera con un caso real, el vídeo sobre la cadena de suministro de software y PHP2Shell llega muy pronto al canal. Y si quieres montar la defensa de forma ordenada, en el [curso de DevSecOps](/docs/cursos/devsecops) tienes capítulos sobre SBOM, firma de imágenes y cómo meter todo esto en un pipeline.
