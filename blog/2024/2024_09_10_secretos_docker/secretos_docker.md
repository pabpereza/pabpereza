---
slug: secretos_docker_buenas_practicas 
title: Secretos en Docker y mejores prácticas 
tags: [secretos, docker, seguridad, devops]
authors: pabpereza
image: https://img.youtube.com/vi/od3rUhL_P3Q/maxresdefault.jpg 
date: 2024-09-10
---

# Secretos en Docker y mejores prácticas 
Utilizar secretos en Docker de forma correcta, te permite asegurar que tu datos sensibles se almacenen de forma segura y solo sean accesibles por las aplicaciones que los necesitan. Docker proporciona varios mecanismos para gestionar secretos peeeero, según lo que necesites, puede ser que lo tengas que combinar con servicios de terceros.

En este video podcast con Felipe Cruz del equipo de Docker ([TECHarlas 3 - Supply chain and security on containers](https://www.notion.so/TECHarlas-3-Supply-chain-and-security-on-containers-5a5ccb5fdee546fe962ddd71b3ce8f75?pvs=21)) tratamos el tema entre otros much, por si te interesa. En cualquier caso, llegamos a la conclusión de que no existe el método perfecto, por eso, lo más importante es conocer las opciones que tenemos y elegir las más adecuadas en función del contexto. Aun así, quédate hasta el final del vídeo donde explico el método más recomendado para la mayoría de situaciones y como mitigar los riesgos en la medida de lo posible.

<!-- truncate -->


[![](https://img.youtube.com/vi/od3rUhL_P3Q/maxresdefault.jpg)](https://www.youtube.com/watch?v=od3rUhL_P3Q)

# En tiempo de compilación/construcción

Explicar como pasar secretos en el proceso de build, en dockerfile con buildkit.

# En tiempo de ejecución

Veamos las 3 opciones que quería comentar en este vídeo:

- Usar un volumen.
- Usar variables de entorno.
- Usar docker secrets ( limitado a docker swarm).

Al final del vídeo, te enseñaré cual es la que considero más recomendada en entornos pequeños o simples. 

## Utilizando un volumen

Usar volúmenes es una forma de transmitir información con el contenedor, pero siempre recuerda, que tienen sus riegos. En este vídeo de seguridad en contenedores explico la mayoría de ellos: [Seguridad contenedores](https://www.notion.so/Seguridad-contenedores-4b7442b465cd40619e7cc385e2bb3f0b?pvs=21) 

Puedes gestionar información secreta en Docker siguiendo estos pasos. Crea un archivo que contenga la información secreta. Por ejemplo, puedes crear un archivo llamado `mi_secreto.txt` y agregar la información secreta dentro de él.

Monta el archivo como un volumen al ejecutar el contenedor de Docker. Puedes utilizar la bandera `v` o `volume` para montar el archivo. Por ejemplo:

```
docker run -v /ruta/hacia/mi_secreto.txt:/app/mi_secreto.txt mi_imagen

```

Esto hará que la información secreta esté disponible dentro del contenedor en la ruta especificada (`/app/mi_secreto.txt` en este ejemplo). Ahora podrías, desde tu servicio o aplicación, leer este secreto para la configuración necesaria

## Utilizando variables de entorno

Otra forma de gestionar información secreta en Docker es utilizando variables de entorno en el contenedor. Para ello, podríamos usar el parámetro `-e` en la ejecución del contenedor, seguido de la `clave` y el `valor`del secreto como en el siguiente ejemplo:

```bash
docker run -e MI_SECRETO=mi_informacion_secreta mi_imagen
```

De esta manera, la información secreta estará disponible dentro del contenedor a través de la variable de entorno `MI_SECRETO`. 

¿Y ahora que hago con la variable de entorno?. Aquí tienes un ejemplo de cómo obtener una variable de entorno en Python:

```python
import os

# Obtener el valor de la variable de entorno
mi_secreto = os.environ.get('MI_SECRETO')

# Utilizar el valor de la variable de entorno
print(f"El valor de MI_SECRETO es: {mi_secreto}")

```

En este ejemplo, usamos el módulo `os` para acceder al entorno del sistema y obtener el valor de la variable de entorno `MI_SECRETO`. Luego, imprimimos el valor de la variable utilizando la función `print()`. Asegúrate de reemplazar `"MI_SECRETO"` con el nombre de la variable de entorno que deseas obtener.

Finalmente, y por seguridad, cuando cargamos el secreto en la memoria de nuestra aplicación podemos borrarlo para dificultar su acceso a un atacante. En python sería así: 

Aquí tienes un ejemplo de cómo limpiar una variable de entorno en Python:

```python
import os

# Limpiar la variable de entorno
os.environ["MI_SECRETO"] = ""

for name, value in os.environ.items():
    print("{0}: {1}".format(name, value))
```

Todos los lenguajes de programación modernos tienen esta capacidad, No dudes en aplicarlo a tu caso.

## Docker secrets (en swarm)

En Docker Swarm, puedes gestionar secretos de forma segura utilizando los siguientes pasos, por ejemplo, en un único comando, definiendo la clave y valor de tu secreto y pasándolo con una tubería al comando de creación de docker.

```bash
echo "valor-secreto" | docker secret create clave_secreto -
```

Una vez creado el secreto, ya podríamos desplegar un servicio en docker swarm utilizando el secreto que acabamos de configurar. 

Despliega un servicio en Docker Swarm que necesite acceder al secreto utilizando el siguiente comando:

```bash
docker service create --name mi_servicio --secret mi_secreto mi_imagen
```

Reemplaza "mi_servicio" con el nombre del servicio y "mi_secreto" con el nombre del secreto que creaste. Por último, "mi_imagen" es la imagen del contenedor que utilizará el servicio. En este caso probaremos con nginx.

Dentro del contenedor, puedes acceder al secreto como un archivo en la ruta `/run/secrets/mi_secreto`. Primero entraremos al contenedor que se ha creado, de la siguiente manera:

Finalmente, mostraremos el contenido del fichero que hemos definido como secreto:

```bash
cat /run/secrets/mi_secreto
```

Asegúrate de que el nombre del secreto coincida con el que has creado en primer paso.

De esta manera, puedes gestionar y acceder a los secretos de forma segura en Docker Swarm. Pero, que pasa si no utilizas docker swarm, pues vamos con la opción que yo recomendaría para entornos pequeños o servidores  individuales.

## Opción recomendada

¿Qué es lo mejor? La verdad es que no hay una única respuesta acertada, dependerá del tipo de tecnología que estes utilizando, el entorno donde de este ejecutando el contenedor y, por último, la criticidad del secreto a desplegar.

Además, otra capa extra de seguridad es utilizar un gestor de secretos externo, en el que delegar la tarea de albergarlos a buen recaudo. Aunque como siempre, tendremos que guardar el secretos de gestor de secretos. 

Diagrama. Tendremos que tener en el contenedor un secreto que nos permita acceder al gestor de secretos y, de ahí, obtener uno o varios secretos o configuraciones. Aunque no solucionamos el problema inicial, el cuál no tienen una solución ya que siempre dependemos de tener un secreto de cualquier tipo expuesto en el filesystem del contenedor, utilizar un gestor de secretos nos permite capacidades clave como la revocación, modificación o rotación de secretos, permitiéndonos aplicar políticas de credenciales de forma centralizada para credenciales de distintos entornos.

Espero que te haya ayudado a tener una visión genérica e introductoria al tema de secretos en contenedores. Si este vídeo gusta, haré otro similar pero en kubernetes, donde tenemos bastantes más posibilidades. Recuerda dejarme en los comentarios cualquier duda o sugerencia respecto a este tema.

¡Nos vemos en el siguiente!

¿Todavía estas aquí? ¿Es posible que hayan robado tus secretos? Aquí es donde tener un gestor de secretos permite revocar el acceso y generar unos nuevos en todas tus aplicaciones. Nos vemos en el siguiente.
