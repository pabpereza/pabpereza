---
slug: localstack_terraform_mas_dudas 
title: LocalStack, dudas comunes y cómo usarlo con terraform
description: Una guía para resolver dudas comunes al usar LocalStack con Terraform y las del vídeo anterior
authors: pabpereza
date: 2025-10-22
---

# LocalStack, dudas comunes y cómo usarlo con Terraform
Publiqué un vídeo hace dos semanas sobre cómo utilizar LocalStack para simular los servicios de AWS en local. Sin duda un completo éxito pero surgieron muchas dudas en los comentarios que quería recopilar.

Si no sabes de lo que te estoy hablando, te dejo el enlace al vídeo aquí: https://youtu.be/rcx47LMqMZU 
[![](https://img.youtube.com/vi/rcx47LMqMZU/maxresdefault.jpg)](https://youtu.be/rcx47LMqMZU) 

Los puntos que trataremos son:
* ¿Qué necesidad cubre realmente LocalStack?
* ¿Es LocalStack realmente gratuito?
* ¿Tiene interfaz gráfica?
* ¿Qué ofrece la versión Pro de LocalStack?
* ¿Cómo usar LocalStack con Terraform? 
  
<!-- truncate -->

## ¿Qué necesidad cubre realmente LocalStack?
LocalStack es una herramienta que simula los servicios de AWS en tu máquina local. Esto es especialmente útil para desarrolladores que quieren probar y desarrollar aplicaciones que utilizan servicios de AWS sin incurrir en costos o depender de una conexión a internet.

Diría que principalmente está pensado para DevOps y desarrolladores backend que trabajan con infraestructuras en la nube. Me encanta personalmente para probar despliegues o para entrevistas técnicas donde no quieres gastar dinero pero si que demostrar que sabes usar los servicios de AWS.

En cualquiera de los casos, es una herramienta para simular servicios y probar integraciones, no para dar servicio productivo ni para montarte tu nube en local. Esto solo simula los APIs y ciertas acciones.


## ¿Es LocalStack realmente gratuito?
LocalStack tiene una versión gratuita que cubre muchos de los servicios más comunes de AWS, pero también ofrece una versión Pro de pago que incluye características adicionales y soporte para más servicios.

Puede ser que la capa gratuita te sea suficiente pero, a nada que vayas a utilizar servicios de computación como EC2 o EKS, tendrás que utilizar la versión Pro. 

Esta capa cuesta unos 40€ al mes en el plan más básico, ahora bien, me dirás no es gratis... pues no del todo pero echa cuentas. 

Probar la automatización de un cluster de EKS puede costarte cientos de euros en AWS si lo haces mal y con LocalStack puedes hacer todas las pruebas que quieras por un coste fijo mensual. Nada de sustos. Aquí lo tienes que poner tu en la balanza.

Pero lo repito, simula haber desplegado un cluster de EKS, no es un cluster real. Esto está pensado para probar los despliegues de infraestructura como código o para entornos de CI/CD. Pero no para montar un entorno productivo.

## ¿Tiene interfaz gráfica?
No, LocalStack no tiene una interfaz gráfica propia. La interfaz de su versión desktop solo sirve para gestionar la instancia de LocalStack en tu máquina local, pero no proporciona una interfaz gráfica para interactuar con los servicios simulados.

También tenéis una extensión de Docker para esta labor, la vimos en este vídeo: https://youtu.be/oOTyDGPAq7g

[![](https://img.youtube.com/vi/oOTyDGPAq7g/maxresdefault.jpg)](https://youtu.be/oOTyDGPAq7g)


## ¿Qué ofrece la versión Pro de LocalStack?
La versión Pro de LocalStack ofrece varias características adicionales que no están disponibles en la versión gratuita. Algunas de las características más destacadas incluyen:
* Soporte para más servicios de AWS, incluyendo servicios como EKS, ECS, y más.
* Funcionalidades avanzadas como la persistencia de datos, que permite mantener el estado entre reinicios de LocalStack.
* Mejor rendimiento y escalabilidad para entornos de desarrollo más grandes.
* Soporte técnico y actualizaciones regulares.
* Integraciones adicionales y herramientas para facilitar el desarrollo y las pruebas.


## ¿Cómo usar LocalStack con Terraform u otras herramientas?
Al final, localstack simula el API de AWS, por lo que se puede utilizar cualquier herramienta. El CLI de AWS, SDKs como Boto3 en python, Terraform, Pulumi, etc.

Para usar LocalStack con Terraform, necesitas configurar el proveedor de AWS en tu archivo de configuración de Terraform para que apunte a la instancia de LocalStack en lugar de a los servicios reales de AWS.

Por ejemplo, vamos a montar un terraform que simule el despliegue de dos buckets de S3 en LocalStack.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
}

# Configura el provider AWS para usar LocalStack
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  s3_use_path_style           = true         # equivalente moderno a force_path_style
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  endpoints {
    s3 = "http://localhost:4566"
  }
}

# Buckets S3 en LocalStack
resource "aws_s3_bucket" "bucket_a" {
  bucket = "demo-bucket-a"
}

resource "aws_s3_bucket" "bucket_b" {
  bucket = "demo-bucket-b"
}


output "buckets" {
  value = [
    aws_s3_bucket.bucket_a.bucket,
    aws_s3_bucket.bucket_b.bucket
  ]
}
```

La clave para el funcionamiento es cambiar los endpoints del provider AWS para que apunten a LocalStack (normalmente en `http://localhost:4566`).


Asegurando primero que tenemos LocalStack corriendo en local (con docker o con la versión desktop) y luego ejecutando los comandos de terraform:

```bash
terraform init
terraform apply
```

Si todo ha ido bien, veremos como se han creado los buckets en LocalStack y no en AWS. Podemos listarlos con la AWS CLI apuntando a LocalStack:

```bash
aws --endpoint-url=http://localhost:4566 s3 ls
```

O bien con la herramienta `awslocal`, que es un wrapper de la AWS CLI para facilitar el trabajo con LocalStack:

```bash
awslocal s3 ls
```

Creo que con esto ya hemos visto las principales dudas que surgieron en el vídeo anterior. Si tienes más preguntas, no dudes en dejarlas en los comentarios o contactarme directamente.

¡Nos vemos en el próximo!
