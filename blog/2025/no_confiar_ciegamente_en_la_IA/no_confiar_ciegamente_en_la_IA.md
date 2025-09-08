---
slug: no_confiar_ciegamente_en_la_IA
title: "Jamás confíes ciegamente en la IA, y menos para tu infraestructura"
tags: [IA, devops, docker]
authors: pabpereza
date: 2025-08-20
---

# Jamás confíes ciegamente en la IA, y menos para tu infraestructura
Hace un par de semanas, un amigo me escribió frustrado por un problema que tenía en una base de datos, concretamente un MongoDB desplegado con Docker.

Cada noche su base de datos desaparecía, no se explicaba por qué, pensaba que montaba mal los volúmenes o que no estaba utilizando Docker Compose como se debía.

Tras revisarlo, nos dimos cuenta de que le estaban secuestrando la base de datos y pidiéndole un rescate en criptomonedas por el contenido de la misma.

El problema fue que, confiando en el Docker Compose que generó una IA, expuso de forma indebida la base de datos y esto permitió a un ciberdelincuente entrar y robar toda la información.


Dentro vídeo: https://www.youtube.com/watch?v=y4ULg8tD8nQ

[![Ver vídeo](https://img.youtube.com/vi/y4ULg8tD8nQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=y4ULg8tD8nQ)

Por suerte, esta base de datos era para una aplicación que empezaba a desarrollar y no había ningún dato sensible, pero podría haber sido muy grave en cualquier otra situación.

Todo esto me dio la idea de hacer este vídeo, compartir la experiencia que tuvo y responder tres preguntas:

* ¿Cómo se produjo el ciberataque y cómo los cibercriminales detectan tan rápido un servicio expuesto si el servidor y la base de datos estaban recién levantados y ni siquiera estaban indexados en Google u otros buscadores?
* ¿Qué errores de seguridad tenemos que evitar cuando desplegamos nuestras aplicaciones en servidores con Docker y cuáles son las configuraciones clave que hay que tener en cuenta en materia de seguridad?
* ¿Por qué hay que repasar el resultado de una IA, evitando confiar ciegamente en ella, y cómo podemos usarla para corregir sus propios errores?

Quédate hasta el final para saber cómo se produjo el error, cómo un cibercriminal detectó el servicio expuesto en apenas unas horas y cómo pudimos solucionarlo rápidamente.

## ¿Cómo detecta un ciberdelincuente un servicio expuesto?
La pregunta más habitual en estos casos suele ser: ¿por qué a mí? ¿Cómo han encontrado tan rápido esta base de datos si mi aplicación no está indexada en buscadores?

Existe la falsa creencia de que si algo no es conocido, no es popular, está libre de peligros. En plan: ¿quién me va a atacar a mí? Mi servidor de pruebas no tiene nada de valor. Que un problema de seguridad no se vea no significa que no exista; a esto lo llamamos en el sector "seguridad por oscuridad", y no suele ser efectiva, todo sea dicho.

La mayoría de los ataques hoy en día son automatizados y normalmente buscan siempre el eslabón más débil. Si lo piensas, tiene sentido: ¿qué prefieres, invertir muchos recursos en un ataque complejo, sofisticado y caro de realizar, o ir recogiendo muchas migas de pan de forma sencilla?

Con este último enfoque, miles de programas, bots o automatismos manejados por cibercriminales consiguen rápidamente descubrir servicios expuestos mal configurados. Aquí concretamente existe un servicio que se llama Shodan y es uno de los tantos que se encargan de analizar servicios expuestos en la red.

Shodan es una aplicación que podríamos llamar el Google de los dispositivos. Los buscadores indexan páginas o servicios web; Shodan, IPs y puertos. Simplemente funciona analizando todas las IPs y puertos públicos en Internet y creando una base de datos. Veamos cómo consultar esta información.

Podemos entrar en la [web de Shodan](https://www.shodan.io/) y empezar a buscar dispositivos por IP, servicios que contiene, puertos, país... una maravilla.

Vamos a filtrar por bases de datos de Mongo expuestas públicamente en Internet, a ver lo que nos encontramos. Podemos utilizar los filtros en la interfaz o escribir simplemente "mongo" para ver que hay cerca de unos 70.000 MongoDB expuestos alrededor del mundo, mayoritariamente en el puerto 27017 (el predeterminado).

![Búsqueda de mongo en shodan](shodan_mongo.png)

Shodan no solo lista los puertos abiertos, sino que se conecta a ellos y lee las respuestas, permitiéndole identificar en los mensajes de bienvenida el tipo de servicio que es y el protocolo que utiliza. Otro ejemplo de que el ocultismo no funciona, por si estabas pensando en cambiar el puerto por defecto y creer que estabas a salvo.

También podríamos buscar directamente las IPs de nuestros servidores, que seguro que os ha surgido la curiosidad de saber lo que tenéis expuesto.

Hilando desde la perspectiva de un ciberdelincuente, utilizar estas bases de datos en automatismos permite atacar a discreción cualquier servicio expuesto. Además, si sabemos filtrar y estamos atentos a las vulnerabilidades del sector, podemos identificar las versiones exactas de un software que sería fácilmente explotable por un fallo de seguridad.

Bonus tip: te puedes instalar la CLI de Shodan o utilizarlo como librería de Python en tus programas. Personalmente, utilizo mucho el siguiente comando para enumerar rápidamente información de un servidor.
```bash
shodan host <IP>
```

Finalmente, volviendo con nuestro caso, al exponerse el Mongo de mi amigo a Internet (o cualquier servicio que expongas tú mismo) se vuelve automáticamente el foco de ataques. Da igual la popularidad del servicio, su tráfico, el dinero que maneje el servicio, los automatismos no entienden de clases. Si os interesa conocer el volumen de ataques que se reciben a diario, puedes levantar un honeypot que actúe de imán de ciberataques para que te hagas una idea.

## Seguridad en Docker
La mayoría de las personas no sabe que Docker hace un bypass del firewall. ¿Cómo? ¿Esto es normal? Al menos en Linux, así es como funciona Docker. Por defecto, hace caso omiso de las reglas que podáis aplicar en un firewall tipo ufw de Debian/Ubuntu o similares.

![](network_flow.png)

Por eso, cuando hacemos un docker run como este:
```
docker run -d -p 27017:27017 --name mongodb mongo
```

o en un compose:
```
services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
```

Tenemos que tener claro que en Linux, y salvo en las versiones de Docker Desktop, ejecutar así un contenedor implica que abre también ese puerto en el host y lo vincula con el del contenedor. Por consiguiente, también lo estás exponiendo públicamente a Internet.

Tenemos dos formas de solucionarlo: o bien quitamos el mapeo de puertos o lo configuramos adecuadamente para que no esté expuesto.

* Si optamos por quitar el mapeo, no te preocupes, si tienes varias aplicaciones en un compose estas seguirán siendo accesibles entre ellas. Por defecto, Docker Compose genera una red para todos los contenedores y entre ellos siempre habrá visibilidad salvo que se indique lo contrario.
* Si necesitas igualmente exponer el puerto en el host, puedes hacerlo de forma segura precediendo el puerto del host con `127.0.0.1:`. De esta forma, solo será accesible desde el host y no desde el exterior. Por defecto, Docker lo expone con `0.0.0.0:` y es el motivo principal por el que esto puede ser un problema.

El docker compose quedaría así:
```bash
services:
  mongodb:
    image: mongo
    ports:
      - "127.0.0.1:27017:27017"
```

Y, si solo fuerais a acceder al Mongo desde la red de Docker, podéis quitar directamente el mapeo de puertos. Recuerda que esto no impediría al contenedor de Mongo abrir su puerto, simplemente solo sería visible dentro de la red de Docker. El compose quedaría así:
```bash
services:
  mongodb:
    image: mongo
```

Una vez que expones el puerto en el host de forma privada, lo más fácil y seguro es enrutar a tus servicios a través de SSH, ya sea para conectarse a una base de datos o configurar cualquier cosa.

## Prompts
Prueba con un mensaje de este tipo la próxima vez y trata de darle todo el contexto posible que puedas a la IA:
```txt
Genera un docker compose para un mongodb, pero asegúrate de que el puerto no esté expuesto públicamente a Internet, ya que solo necesito acceder desde la red local y desde el host.
```

## Moralejas
Aunque seamos desarrolladores, nos dediquemos a la parte de datos o simplemente no sepamos mucho de infraestructura, no podemos confiar ciegamente en la IA. No se puede saber de todo, eso está claro, pero recuerda que la IA no tiene el contexto de todo. Apóyate siempre en compañeros del área de DevOps, sistemas o seguridad, si disponéis de ellos en la empresa.

En el vídeo veremos si le podemos dar ese contexto a la IA para saber si se podría haber evitado.

Nos vemos en el siguiente.


