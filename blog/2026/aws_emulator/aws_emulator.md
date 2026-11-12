---
slug: aws_emulator_probar_aws_en_local_gratis
title: AWS Emulator, el emulador oficial para probar AWS en local gratis y sin cuenta
description: AWS lanza AWS Emulator, un emulador local y gratuito de sus APIs escrito por agentes de IA. Qué es, la skill que trae para agentes, cómo configurarlo para las primeras pruebas y qué limitaciones tiene.
tags: [aws, cloud, devops, testing, ia]
keywords: [aws emulator, emulador aws local, probar aws en local, aws sin cuenta, aws emulator tutorial, aws emulator skill, aws emulator vs localstack, localstack alternativa, aws cli endpoint local, testing aws ci, agentes ia aws, aws emulator telemetria]
authors: pabpereza
date: 2026-11-12
image: ./aws_emulator-portada.jpg
---

AWS acaba de sacar **AWS Emulator**, un emulador oficial de sus APIs que corre en tu máquina, es gratis y no necesita cuenta de AWS. Lanzas el binario, apuntas la AWS CLI o tu SDK a él y tus `create-bucket`, `put-item` o `send-message` responden en milisegundos sin tocar la nube ni la tarjeta de crédito.

Hasta ahora, para esto tirábamos de herramientas de terceros como LocalStack o moto. Que lo haga la propia AWS cambia bastante las cosas, y encima con un detalle curioso: **todo el código lo han escrito agentes de IA**. En este artículo veremos qué es, un par de curiosidades y cómo configurarlo para hacer las primeras pruebas.

<!-- truncate -->

## ¿Qué es AWS Emulator?

Es un programa local que **sirve un endpoint de la API de AWS** por HTTPS. No tiene interfaz gráfica ni levanta máquinas de verdad: cuando le pides un bucket, te devuelve lo mismo que te devolvería S3, pero el bucket vive en la memoria del emulador.

Algunas claves para situarnos:

- **Más de 200 servicios** generados a partir de los modelos de API públicos de AWS (en formato Smithy, los mismos que usan los SDK para saber cómo hablar con cada servicio). Cuando AWS publica un servicio nuevo, aparece en el emulador.
- **Estado en memoria**: todo lo que crees desaparece al parar el emulador. Cada instancia tiene su propio puerto, credenciales y estado, así que dos suites de tests o dos jobs de CI no se pisan.
- **Cuenta de mentira**: el emulador actúa como una única cuenta, la `000000000000`.
- **Lo que no sabe hacer, lo dice**: si llamas a una operación que aún no está implementada, devuelve un `501 Not Implemented` en vez de inventarse una respuesta.
- **Gratis y abierto**: el código está en el [repositorio aws/aws-emulator de GitHub](https://github.com/aws/aws-emulator) bajo licencia CC0 (dominio público), escrito en Rust.

Está pensado para desarrollar y probar en tu equipo o en tu pipeline de CI (integración continua). **No es para producción ni para hacer pruebas de seguridad**, y al final veremos por qué lo segundo importa.

## Lo curioso, lo han escrito agentes de IA

La idea arrancó con una hipótesis bastante concreta: si un agente tiene una descripción escrita de cómo se comporta un servicio y el servicio real para comparar, debería poder construir una versión que funcione él solo. El primer prototipo fue un emulador de SQS que salió en unos 15 minutos.

A partir de ahí, el trabajo de los ingenieros no fue escribir el emulador, sino montar todo lo que lo rodea:

- **Tests de fidelidad** que se ejecutan contra AWS real, para saber cuál es la respuesta correcta.
- **Una barrera de merge** con comprobaciones automáticas, revisores de código y varios agentes de seguridad haciendo revisiones adversariales de cada cambio.
- **Comprobaciones deterministas** que impiden a los agentes tocar código que no les corresponde.

Basta con echar un ojo a las notas de cualquier release del repositorio, son cientos de líneas de `fix:` del tipo "este error de DynamoDB no usa el mismo texto que AWS". Es una buena muestra de hacia dónde va esto de programar con agentes: el humano define qué es "correcto" y cómo se comprueba, y los agentes iteran hasta cumplirlo.

## Hecho por agentes y para agentes, trae su propia skill

La otra curiosidad es que AWS no solo lo ha construido con agentes, también ha pensado en que lo usen. Junto al emulador publica una **skill**, un paquete de instrucciones que tu agente de código carga cuando la tarea lo pide. Funciona con Claude Code, Cursor o Kiro, y se instala con la propia AWS CLI (versión 2.35.0 o superior):

```bash
aws agent-toolkit add-skill --skill-name aws-emulator --region us-east-1
```

Con ella le puedes pedir al agente que instale el emulador, lo arranque y apunte tu proyecto a él, y si algo falla con los certificados o las credenciales, que lo arregle. Antes de usar `sudo` o tocar el perfil de tu shell te pide permiso.

Lo que más me llama la atención es que le puedes preguntar *"¿funcionará mi aplicación de este repo con AWS Emulator?"*. La skill cruza las operaciones de AWS que usa tu código con los tests de fidelidad del emulador y te dice qué partes no van a funcionar todavía. Incluso te redacta el issue para reportar lo que falta, y te lo enseña antes de publicar nada.

## Primeras pruebas

La instalación depende de tu sistema: en Linux hay paquetes `.deb` y `.rpm`, y en macOS y Windows se ejecuta con Docker a partir de un Dockerfile que te construyes tú, porque AWS no publica imagen. Tienes los pasos de cada caso en el [README del repositorio](https://github.com/aws/aws-emulator).

Una vez instalado, lo arrancamos:

```bash
aws-emulator
```

Se queda en primer plano escuchando en `https://127.0.0.1:9297` con un certificado autofirmado. Al arrancar genera en `~/.aws/emulator/9297/` (el número es el puerto) unas credenciales nuevas, un fichero de configuración y su certificado. Todo eso cambia en cada arranque y se borra al parar con `Ctrl+C`.

### Apuntar la CLI y los SDK al emulador

Lo primero es **quitar tus credenciales reales de la sesión**. Si quedan variables de AWS cargadas, el emulador rechaza las peticiones, y además así evitamos sustos:

```bash
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_PROFILE
```

Después exportamos las variables que redirigen la CLI y los SDK al emulador:

```bash
export AWS_ENDPOINT_URL=https://127.0.0.1:9297
export AWS_SHARED_CREDENTIALS_FILE=~/.aws/emulator/9297/emulator_credentials
export AWS_CONFIG_FILE=~/.aws/emulator/9297/config
export AWS_CA_BUNDLE=~/.aws/emulator/9297/ca.pem
export AWS_EC2_METADATA_DISABLED=true
export AWS_DISABLE_HOST_PREFIX_INJECTION=true
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1
```

Comprobamos que estamos hablando con el emulador y no con nuestra cuenta:

```bash
aws sts get-caller-identity
```

Si en `Account` aparece `000000000000`, todo en orden. Ya podemos jugar:

```bash
aws s3api create-bucket --bucket amzn-s3-demo-bucket
aws s3api list-buckets --query 'Buckets[].Name'
```

Lo interesante es que también imita los errores. Si intentas crear una tabla de DynamoDB con un nombre de dos letras, te devuelve el mismo `ValidationException` que AWS, con el mismo mensaje. Eso es justo lo que quieres en un test: que falle donde fallaría en la nube.

Un par de detalles que te ahorrarán un rato:

- **Usa `127.0.0.1`, no `localhost`**, sobre todo con S3.
- **El certificado no lo lee igual cada SDK**. La CLI, Boto3 y Go usan `AWS_CA_BUNDLE`. En Node.js necesitas `NODE_EXTRA_CA_CERTS` apuntando al mismo `ca.pem`, en Rust y .NET `SSL_CERT_FILE`, y en Java el `truststore.p12` que también deja en esa carpeta.
- **Tu código no cambia**. Como todo va por variables de entorno, el mismo test que crea una tabla, escribe un ítem y lo lee de vuelta funciona igual contra el emulador y contra AWS.

### La telemetría viene activada

Esto conviene saberlo antes de meterlo en el pipeline de la empresa. **AWS Emulator envía datos de uso a AWS por defecto**. Según la documentación no incluye el contenido de las peticiones, ni código, ni credenciales, ni nombres de recursos, pero si prefieres apagarlo es tan fácil como:

```bash
# Solo para esta ejecución
aws-emulator --telemetry off

# Para todo lo que arranques desde esta shell
export EMULATOR_TELEMETRY=off
```

Y si lo quieres apagado para siempre en tu máquina, añade esto a `~/.aws/emulator/config.toml`:

```toml
[telemetry]
enabled = false
```

## Conclusiones

Aún no lo he probado en profundidad, así que tómate esto como una primera impresión. Llevo mucho tiempo usando LocalStack para probar cosas en local (tienes el artículo de [dudas comunes de LocalStack y cómo usarlo con Terraform](/blog/localstack_terraform_mas_dudas)) y siempre con la misma espinita: en cuanto sales de lo básico, la versión gratuita se queda corta.

Que la propia AWS saque un emulador gratis para todos sus servicios, generado desde los mismos modelos que sus SDK, es una muy buena noticia. Eso sí, tiene sus limitaciones y conviene tenerlas claras:

- **No evalúa las políticas de IAM como AWS**. Una petición que AWS te denegaría puede funcionar en el emulador. Por eso no sirve para probar permisos ni seguridad: que tu Lambda funcione en local no significa que su rol esté bien configurado.
- **Una cuenta y una región**. Acepta cualquier región o ID de cuenta, pero no los separa, así que nada de probar comportamiento entre cuentas o entre regiones.
- **Todo en memoria**. No hay persistencia: al parar, adiós recursos. Para tests es una ventaja, para un entorno de desarrollo que dure días no tanto.
- **No es para pruebas de carga** ni para dejarlo corriendo indefinidamente.
- **Es muy joven**. Hay operaciones que todavía devuelven `501` y, por lo que he visto, lo que más cojea es el cómputo y la infraestructura como código (CloudFormation, CDK o Terraform).

¿Sustituye a LocalStack? De momento yo no tiraría nada a la basura. LocalStack tiene años de madurez, interfaz web, persistencia y un ecosistema con Terraform y CDK muy rodado, justo donde AWS Emulator está más verde. Pero si tus pruebas tiran sobre todo de S3, DynamoDB, SQS o Secrets Manager, yo le daría una oportunidad ya, sobre todo en CI. Y viendo que sacan varias versiones al día, no creo que tarde mucho en ponerse al nivel.

¿Y vosotros, lo habéis probado ya?

## Recursos

- [Repositorio de AWS Emulator en GitHub](https://github.com/aws/aws-emulator)
- [Anuncio oficial de AWS Emulator](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/)
- [Guía de usuario de AWS Emulator](https://docs.aws.amazon.com/emulator/latest/userguide/what-is-service.html)
- [Cómo lo construyeron los agentes, en el blog de Werner Vogels](https://www.allthingsdistributed.com/2026/11/aws-emulator-and-the-engineers-job-when-agents-write-the-code.html)
