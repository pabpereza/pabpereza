---
slug: waf_gratis_en_docker_safeline
title: Monta tu propio WAF gratis en Docker con SafeLine
description: Guía paso a paso para montar SafeLine WAF en Docker delante de tu VPS o homelab, entender cómo detecta ataques y bloquear SQL injection y XSS reales en un laboratorio propio.
tags: [seguridad, docker, devsecops, waf, homelab]
keywords: [waf gratis docker, safeline waf, firewall de aplicaciones web, waf self hosted, waf open source, proteger vps de ataques, bloquear sql injection, waf para homelab, dvwa, modsecurity alternativa, reverse proxy, owasp top 10]
authors: pabpereza
date: 2026-09-22
image: ./safeline-waf-docker-miniatura.jpg
---

Un campo de texto de una web cualquiera. Escribes una comilla, añades cuatro palabras y, de forma casi mágica, la base de datos te escupe todos los usuarios con sus contraseñas. No has entrado al servidor ni tienes credenciales: has lanzado una **inyección SQL** contra un formulario.

En este artículo vamos a montar un **WAF** (*Web Application Firewall*) gratis en Docker delante de lo que tengas expuesto —un VPS, tu homelab, ese contenedor que levantaste "solo para probar"— y vamos a ver cómo ese mismo ataque deja de funcionar. Usaré **SafeLine** en su edición gratuita, y en esta entrada tienes todo el proceso paso a paso.

<!-- truncate -->

🎥 Vídeo completo, utilicemos los capítulos de youtube para saltar a la sección que nos interese:
[https://youtu.be/X0vm8cJ674w](https://youtu.be/X0vm8cJ674w)

[![Monta tu propio WAF GRATIS y bloquea ataques reales (SafeLine en Docker)](https://img.youtube.com/vi/X0vm8cJ674w/maxresdefault.jpg)](https://www.youtube.com/watch?v=X0vm8cJ674w)

> **Transparencia:** esta entrada está patrocinada por SafeLine (CyberServal). Todo lo que aparece en ella es la edición **gratuita**, y cuando algo es de pago lo digo claramente.

> ⚠️ **Laboratorio propio.** Todos los ataques de esta guía se hacen contra **DVWA**, una aplicación vulnerable a propósito, montada en tu propia máquina. Lanzarlos contra sistemas que no son tuyos, sin autorización por escrito, es un **delito**.

## ¿Por qué debería importarte?

Si tienes "cuatro cosas colgadas en un VPS", quizá pienses que nadie va a perder el tiempo contigo. Dos datos para quitarte esa idea:

- **OWASP Top 10:2025**: la categoría *Injection* (SQL, XSS, comandos...) sigue en el **top 5 (A05)** y es la que más CVEs acumula: **62.445**, de los que más de 30.000 son de XSS y más de 14.000 de SQL injection.
- **Verizon DBIR 2026**: el **31 % de las brechas** empieza explotando una vulnerabilidad. Por primera vez en 19 años, eso supera al robo de credenciales.

Y a eso súmale lo que ya sabes: en cuanto un servicio tiene una IP pública, empiezan los escaneos automáticos. No te atacan *a ti*; atacan a todo lo que responde. Son bots pasando la escoba, probando `/wp-login.php` en máquinas que ni siquiera tienen WordPress.

## ¿Qué es un WAF (y en qué se diferencia de un firewall)?

Un **firewall** de los de toda la vida trabaja en las capas 3 y 4 del modelo OSI: **IPs y puertos**. Decide si un paquete puede llegar al puerto 443, pero no tiene ni idea de lo que dice la petición.

Un **WAF** trabaja en la **capa 7**, la de aplicación. Lee el HTTP: la URL, los parámetros, las cabeceras, las cookies y el cuerpo del POST. Le importa *lo que estás diciendo*, no solo desde dónde lo dices.

> **Analogía:** el firewall es el guardia de la barrera del parking, que solo mira la matrícula. El WAF es el portero de la discoteca, que además te abre la mochila.

Para poder leer todo eso, el WAF se coloca **delante de tu aplicación como *reverse proxy***:

1. El cliente (o el atacante) envía la petición al WAF, no a tu app.
2. El WAF la analiza.
3. Si es legítima, la reenvía a tu aplicación (el *upstream*).
4. Si es un ataque, devuelve una página de bloqueo y lo registra. **Tu aplicación ni se entera de que la petición existió.**

## Cómo decide un WAF qué es un ataque

Aquí es donde unos WAF se diferencian de otros.

### El modelo clásico: reglas y expresiones regulares

El estándar de facto lleva más de quince años siendo **ModSecurity** con el **OWASP Core Rule Set (CRS)**: un catálogo enorme de expresiones regulares y firmas. Si ve `union` seguido de `select`, huele a SQL injection y bloquea. Es rápido, transparente y protege a medio internet.

Pero tiene dos problemas que conoce cualquiera que haya administrado uno:

- **La evasión.** El atacante no rompe el WAF: le da la vuelta al patrón. Durante años bastaba con meter un comentario vacío (`union/**/select`) para que la regex dejara de casar. Siendo justos, el CRS v4 moderno ya detecta ese truco concreto, pero la carrera sigue: codificaciones anidadas, mayúsculas mezcladas, sintaxis alternativas... Cada variante nueva necesita una regla nueva.
- **Los falsos positivos.** El ejemplo que usa la propia documentación de SafeLine es perfecto: *"the union select members from each department"*. Es inglés normal, lo puede escribir un cliente en tu formulario de contacto, y un WAF de reglas lo corta como SQL injection. Y ahí estás tú, a las once de la noche, desactivando reglas a mano.

### El enfoque de SafeLine: entender la frase, no buscar palabras

SafeLine no busca palabras clave. Para cada parámetro:

1. **Lo decodifica de forma recursiva**, deshaciendo capas de ofuscación (URL-encode doble, entidades HTML...) hasta llegar al contenido real.
2. Se pregunta si eso es **sintácticamente válido** en algún lenguaje: SQL, HTML, JavaScript...
3. Si lo es, analiza si tiene **intención maliciosa** o es algo inofensivo.
4. **Puntúa y decide**: bloquear o dejar pasar.

¿El resultado? Un `UNION SELECT` escondido bajo dos capas de codificación vuelve a ser el mismo SQL de siempre al decodificarlo, así que se bloquea. Y la frase de los departamentos no es SQL válido, así que pasa sin molestar a nadie.

> **Ojo, vale para cualquier WAF:** esto **no arregla tu bug**. Si tu código concatena strings dentro de una query, mañana sigue siendo vulnerable. La defensa de verdad son las consultas parametrizadas, la validación y el *output encoding*. El WAF es una capa más de defensa en profundidad, no una cura.

## Qué vamos a montar

SafeLine son **7 contenedores**, pero para entenderlo basta con dos:

| Contenedor | Qué hace |
| --- | --- |
| `safeline-tengine` | El **reverse proxy** (basado en Tengine, un fork de Nginx). Recibe todo el tráfico. Corre en `network_mode: host`. |
| `safeline-detector` | El **motor de detección**. Analiza cada petición y dice sí o no. |
| `safeline-mgt` | La **consola de administración** web (puerto 9443). |
| `safeline-pg`, `-fvm`, `-luigi`, `-chaos` | Base de datos, gestión de reglas, estadísticas y anti-bot. |

### Requisitos

Son bastante modestos:

- **Linux en x86_64** con la instrucción de CPU **SSSE3**.
- **Docker ≥ 20.10.14** y **Docker Compose v2**.
- **1 core, 1 GB de RAM y 5 GB de disco** como mínimo (2 cores y 2 GB recomendados).
- Los puertos **80 y 443 libres** en el host (el proxy los usa directamente).

> ⚠️ **¿Raspberry Pi o un Mac con Apple Silicon?** La edición gratuita **no está soportada en ARM**; ahí hace falta la licencia Pro. Te lo digo ahora para que no pierdas la tarde.

Un apunte sobre la licencia, porque alguien lo va a preguntar: el repositorio de SafeLine es **GPL-3.0**, pero el **motor de detección se distribuye como binario propietario**. Tenlo en cuenta si para ti el código auditable es un requisito.

## Paso 1: la víctima (DVWA)

Necesitamos algo que atacar. **DVWA** (*Damn Vulnerable Web Application*) es una aplicación hecha a propósito para ser vulnerable. Este `compose.yaml` la publica **solo en `127.0.0.1:4280`**, para no exponerla y para que SafeLine pueda usarla como *upstream*:

```yaml
services:
  dvwa:
    image: ghcr.io/digininja/dvwa:latest
    restart: unless-stopped
    environment:
      - DB_SERVER=db
      - DEFAULT_SECURITY_LEVEL=low
    depends_on:
      - db
    ports:
      - "127.0.0.1:4280:80"   # nunca 0.0.0.0 en un host con IP pública

  db:
    image: docker.io/library/mariadb:10
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=dvwa
      - MYSQL_DATABASE=dvwa
      - MYSQL_USER=dvwa
      - MYSQL_PASSWORD=p@ssw0rd
```

```bash
docker compose up -d
```

Abre `http://localhost:4280` (o un túnel SSH si está en un servidor remoto), entra con `admin` / `password` y pulsa **Create / Reset Database**. Comprueba que en **DVWA Security** el nivel es **Low**; si no, los ataques no entrarán.

## Paso 2: el ataque, sin WAF

En el módulo **SQL Injection**, escribe en el campo `id`:

```text
1' UNION SELECT user, password FROM users -- -
```

DVWA te devuelve todos los usuarios con el hash de su contraseña. En el módulo **XSS (Reflected)**, prueba en el campo `name`:

```text
<script>alert('XSS')</script>
```

Y salta el `alert` en el navegador. Fíjate en lo poco que ha costado. Ahora, a ponerle remedio.

## Paso 3: instalar SafeLine con Docker Compose

Hay un instalador oficial de una línea que te lo hace todo, pero lo descarga con `curl -k` (sin verificar el certificado TLS) y lo ejecuta como root. Prefiero la vía manual, que además te deja ver qué está pasando:

```bash
mkdir -p /data/safeline && cd /data/safeline
wget https://waf.chaitin.com/release/latest/compose.yaml
```

Crea un fichero `.env` al lado:

```dotenv
SAFELINE_DIR=/data/safeline
IMAGE_TAG=latest
# Panel solo en loopback (ver "No expongas el panel" más abajo)
MGT_PORT=127.0.0.1:9443
# SOLO letras y números: el instalador lo valida
POSTGRES_PASSWORD=CambiaEstoSoloLetrasYNumeros123
SUBNET_PREFIX=172.22.222
IMAGE_PREFIX=chaitin
ARCH_SUFFIX=
RELEASE=
REGION=-g
MGT_PROXY=0
```

Un par de detalles del `.env`:

- `REGION=-g` instala la versión internacional.
- `RELEASE=` vacío usa la línea estable. No uses la LTS, que lleva congelada desde la 9.1.0.
- `POSTGRES_PASSWORD` con cualquier símbolo raro rompe el arranque.

Y arriba:

```bash
docker compose up -d
docker ps   # deberían aparecer 7 contenedores safeline-*
```

La primera vez tarda unos minutos, porque descarga bastantes imágenes.

## Paso 4: entrar en la consola (sin exponerla)

La contraseña de administrador no está en ningún fichero. Se genera con este comando, que la muestra **una sola vez** (y es el mismo que te salvará el día cuando la pierdas dentro de tres meses):

```bash
docker exec safeline-mgt resetadmin
```

La consola vive en el puerto **9443 por HTTPS**, con un certificado autofirmado, así que el navegador te pondrá cara de asco. Es normal. En el primer login te pedirá configurar un segundo factor (TOTP).

### No expongas el panel

El 9443 **no debe estar abierto a internet**. Y cuidado con la trampa habitual: **`ufw` no protege los puertos que publica Docker**. Docker los abre con reglas DNAT en `nat/PREROUTING`, antes de la cadena `INPUT` donde actúa `ufw`, así que un `ufw deny 9443` no sirve de nada.

La forma fiable es la que ya pusimos en el `.env`: publicar el panel solo en `127.0.0.1` y entrar por un túnel SSH:

```bash
ssh -L 9443:127.0.0.1:9443 usuario@tu-servidor
# y en tu navegador: https://localhost:9443
```

Una VPN o Tailscale son igual de válidos. Lo importante es que el panel de tu WAF no sea, a su vez, una superficie de ataque.

## Paso 5: proteger tu aplicación

En la consola: **Applications → Add Application**. Son tres campos:

| Campo | Qué poner | En el laboratorio |
| --- | --- | --- |
| **Domain** | El dominio o IP que atenderá SafeLine | La IP del servidor o `dvwa.tudominio.com` |
| **Port** | El puerto público | `80` (o `443` con tu certificado) |
| **Upstream** | Dónde está de verdad tu aplicación | `http://127.0.0.1:4280` |

> **Detalle de red que te puede volver loco:** el proxy corre en `network_mode: host`. Si tu aplicación vive en una red de Docker propia **sin publicar puerto**, SafeLine no la va a encontrar por el nombre del servicio. Lo más sencillo es publicarla en `127.0.0.1` (como hace DVWA) y apuntar ahí.

## Paso 6: repetir el ataque, ahora con WAF

Abre DVWA **a través de SafeLine** (puerto 80, no el 4280) y repite exactamente los mismos ataques. Esta vez, en lugar de la tabla de usuarios, aparece la **página de bloqueo**. En la consola, en **Attack Logs**, verás cada intento con el payload, el tipo de ataque y la IP de origen.

Prueba también una versión ofuscada con doble URL-encode, la que un motor de firmas sencillo no siempre decodifica en cascada:

```text
1%2527%2520UNION%2520SELECT%25201,2--%2520-
```

También bloqueada. Y no porque exista una regla para ese payload concreto, sino porque SafeLine lo decodifica y lo vuelve a leer como lo que es. **Esa es la diferencia entre buscar palabras y entender la frase.**

Si no quieres usar DVWA, la propia documentación de SafeLine propone estas pruebas directas contra cualquier sitio protegido (tuyo):

```text
http://TU_SITIO/?id=1+and+1=2+union+select+1
http://TU_SITIO/?id=<img+src=x+onerror=alert()>
http://TU_SITIO/?id=../../../../etc/passwd
```

Lo importante: **no hemos tocado ni una línea del código de DVWA**. La aplicación sigue siendo igual de vulnerable; lo único que ha cambiado es que ahora hay algo delante mirando el tráfico.

## Antes de ponerlo delante de algo serio

Un WAF mal configurado es una forma estupenda de tumbarte la web tú solo. Algunas recomendaciones:

1. **No lo estrenes un viernes por la tarde.** Pruébalo primero con una copia o un dominio de pruebas.
2. **Deja pasar tráfico real un par de días** y revisa los Attack Logs. Si aparecen tus propios usuarios haciendo cosas normales, son falsos positivos y hay que ajustar.
3. **Es un punto único de fallo.** Todo el tráfico pasa por él: si el WAF se cae, tu web deja de responder.
4. **Necesita ver el tráfico en claro.** Para HTTPS, los certificados pasan a gestionarse en SafeLine, que es quien termina el TLS.
5. **No cubre la lógica de negocio.** Un control de acceso roto (el A01 del OWASP Top 10) no lo para ningún WAF.

## ¿Qué es gratis y qué es de pago?

Todo lo de esta guía es la **edición Community (Personal)**: gratis para siempre, hasta **10 aplicaciones**. Y no es una versión de juguete:

- El mismo **motor semántico** que las ediciones de pago.
- Protección contra ataques web (SQLi, XSS, RCE...).
- *Rate limiting* contra floods HTTP.
- Anti-bot con CAPTCHA.
- Una **pantalla de login** delante de aplicaciones que no tienen autenticación propia, que para un homelab es una maravilla.

Lo que te llevas pagando, y que me parece una diferencia real y no cosmética:

- **Rendimiento:** la Community corre en un solo hilo; la documentación del fabricante la sitúa en torno a **800 peticiones por segundo**. En un homelab no lo notas; con tráfico serio, sí.
- **Producción de verdad:** sincronización de configuración entre varios nodos, balanceo de carga hacia el *upstream* y varios usuarios administrando.
- **ARM:** solo con licencia Pro.

### Mide tú mismo

En lugar de fiarte de los benchmarks del fabricante, puedes pasar **BlazeHTTP**, su herramienta de pruebas *open source*, contra tu propio sitio protegido:

```bash
docker run --rm --net=host chaitin/blazehttp:latest \
  /app/blazehttp -t http://TU_SITIO_PROTEGIDO
```

Lo que salga será una medición de *tu* entorno, que es justo lo que te interesa.

## Conclusiones

- Poner un WAF delante de lo que tienes expuesto **ya no es cosa de empresas con presupuesto**: un `docker compose`, quince minutos y cero euros.
- Un WAF de capa 7 lee el contenido de las peticiones. Los de reglas buscan patrones; SafeLine decodifica y analiza la sintaxis, lo que reduce evasiones y falsos positivos.
- **No arregla tu código** ni te salva de todo. Pero te quita el ruido de fondo de los bots y te da margen cuando salga la vulnerabilidad de turno en esa aplicación que llevas seis meses sin actualizar. Que la tienes. Los dos sabemos que la tienes.
- Protege el panel de administración: **loopback + túnel SSH**, porque `ufw` no te cubre con Docker.

¿Qué tienes ahora mismo expuesto sin nada delante? Cuéntamelo en los comentarios.

## Recursos adicionales

- [Vídeo completo en YouTube](https://youtu.be/X0vm8cJ674w)
- [Repositorio de SafeLine en GitHub](https://github.com/chaitin/SafeLine)
- [Documentación oficial: despliegue](https://docs.waf.chaitin.com/en/GetStarted/Deploy)
- [Documentación oficial: añadir una aplicación](https://docs.waf.chaitin.com/en/GetStarted/AddApplication)
- [Cómo funciona el análisis sintáctico de SafeLine](https://docs.waf.chaitin.com/en/reference/articles/syntax-analysis)
- [Comparativa de ediciones (Plan)](https://docs.waf.chaitin.com/en/License/Plan)
- [DVWA en GitHub](https://github.com/digininja/DVWA)
- [OWASP Top 10:2025 — A05 Injection](https://owasp.org/Top10/2025/A05_2025-Injection/)
- [OWASP Core Rule Set](https://github.com/coreruleset/coreruleset)
- [BlazeHTTP](https://github.com/chaitin/blazehttp)
