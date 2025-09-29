---
slug: aws-local-gratuito-localstack
title: AWS en local y gratuito para que aprendas sin sustos y restricciones
tags: [aws, localstack, docker, terraform, cli, cloud, desarrollo]
keywords: [aws, localstack, docker compose, terraform, desarrollo local, cloud computing, s3, lambda, dynamodb, sqs, sns]
authors: pabpereza
date: 2025-01-15
---

# AWS en local y gratuito para que aprendas sin sustos y restricciones

¿Te ha pasado que quieres aprender AWS pero te da miedo la facturación? ¿O que quieres hacer pruebas rápidas sin tener que configurar toda la infraestructura en la nube? **LocalStack** es la solución perfecta para ti.

LocalStack es una plataforma que emula los servicios de AWS en tu máquina local, permitiéndote desarrollar y probar aplicaciones cloud sin costo alguno y sin restricciones. Es como tener tu propio AWS personal corriendo en Docker.

<!-- truncate -->

## ¿Qué es LocalStack?

LocalStack es un framework de desarrollo cloud completamente funcional que **simula más de 80 servicios de AWS** en tu entorno local. Funciona como una capa de emulación que implementa las APIs de AWS, permitiendo que tus aplicaciones funcionen exactamente igual que lo harían en AWS real.

### Ventajas de usar LocalStack

- **💰 Gratuito**: No hay facturación sorpresa, puedes hacer todas las pruebas que quieras
- **🚀 Rápido**: Sin latencia de red, todo funciona localmente
- **🔄 Repetible**: Puedes resetear tu entorno cuando quieras
- **🛡️ Seguro**: Tus datos nunca salen de tu máquina
- **🧪 Ideal para testing**: Perfecto para tests de integración
- **📚 Aprendizaje**: Experimenta con AWS sin miedo a costos

### Servicios compatibles

LocalStack soporta los servicios más populares de AWS:

- **Almacenamiento**: S3, EFS, FSx
- **Bases de datos**: DynamoDB, RDS, DocumentDB, Neptune
- **Compute**: Lambda, ECS, EKS, Batch
- **Messaging**: SQS, SNS, EventBridge, Kinesis
- **API Management**: API Gateway, Application Load Balancer
- **Seguridad**: IAM, Secrets Manager, Systems Manager
- **Y muchos más**...

## Instalación con Docker Compose

La forma más sencilla de usar LocalStack es con Docker Compose. Vamos a crear un setup completo:

### 1. Crear el archivo docker-compose.yml

```yaml
version: '3.8'

services:
  localstack:
    container_name: "${LOCALSTACK_DOCKER_NAME:-localstack-main}"
    image: localstack/localstack:latest
    ports:
      - "127.0.0.1:4566:4566"            # LocalStack Gateway
      - "127.0.0.1:4510-4559:4510-4559"  # external services port range
    environment:
      # LocalStack configuration: https://docs.localstack.cloud/references/configuration/
      - DEBUG=${DEBUG:-0}
      - DOCKER_HOST=unix:///var/run/docker.sock
      - LOCALSTACK_HOST=localhost.localstack.cloud:4566
    volumes:
      - "${LOCALSTACK_VOLUME_DIR:-./volume}:/var/lib/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "./init-scripts:/etc/localstack/init/ready.d"  # scripts de inicialización
    networks:
      - localstack-network

  # Herramientas complementarias
  awscli:
    image: amazon/aws-cli:latest
    container_name: aws-cli-localstack
    environment:
      - AWS_ACCESS_KEY_ID=test
      - AWS_SECRET_ACCESS_KEY=test
      - AWS_DEFAULT_REGION=us-east-1
      - AWS_ENDPOINT_URL=http://localstack:4566
    volumes:
      - "./aws-scripts:/scripts"
    networks:
      - localstack-network
    depends_on:
      - localstack
    profiles:
      - tools

networks:
  localstack-network:
    driver: bridge

volumes:
  localstack-volume:
```

### 2. Crear archivo de configuración .env

```bash
# .env
LOCALSTACK_DOCKER_NAME=localstack-main
LOCALSTACK_VOLUME_DIR=./localstack-volume
DEBUG=1

# AWS CLI Configuration
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_DEFAULT_REGION=us-east-1
AWS_ENDPOINT_URL=http://localhost:4566
```

### 3. Levantar LocalStack

```bash
# Levantar LocalStack
docker-compose up -d

# Ver los logs
docker-compose logs -f localstack

# Para levantar también las herramientas complementarias
docker-compose --profile tools up -d
```

## Primeros pasos con AWS CLI

Una vez que LocalStack esté funcionando, podemos empezar a usar AWS CLI para interactuar con él:

### Configurar AWS CLI para LocalStack

```bash
# Configurar perfil para LocalStack
aws configure set aws_access_key_id test --profile localstack
aws configure set aws_secret_access_key test --profile localstack
aws configure set region us-east-1 --profile localstack
aws configure set endpoint_url http://localhost:4566 --profile localstack

# O usar variables de entorno
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:4566
```

### Ejemplos básicos con S3

```bash
# Crear un bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://mi-bucket-local

# Listar buckets
aws --endpoint-url=http://localhost:4566 s3 ls

# Subir un archivo
echo "Hola LocalStack!" > test.txt
aws --endpoint-url=http://localhost:4566 s3 cp test.txt s3://mi-bucket-local/

# Listar objetos en el bucket
aws --endpoint-url=http://localhost:4566 s3 ls s3://mi-bucket-local/

# Descargar el archivo
aws --endpoint-url=http://localhost:4566 s3 cp s3://mi-bucket-local/test.txt downloaded.txt
```

### Ejemplos con DynamoDB

```bash
# Crear una tabla
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name MiTabla \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5

# Listar tablas
aws --endpoint-url=http://localhost:4566 dynamodb list-tables

# Insertar un elemento
aws --endpoint-url=http://localhost:4566 dynamodb put-item \
    --table-name MiTabla \
    --item '{"id": {"S": "1"}, "nombre": {"S": "Juan"}, "edad": {"N": "30"}}'

# Obtener el elemento
aws --endpoint-url=http://localhost:4566 dynamodb get-item \
    --table-name MiTabla \
    --key '{"id": {"S": "1"}}'
```

### Ejemplos con SQS y SNS

```bash
# Crear una cola SQS
aws --endpoint-url=http://localhost:4566 sqs create-queue \
    --queue-name mi-cola-local

# Enviar un mensaje
aws --endpoint-url=http://localhost:4566 sqs send-message \
    --queue-url http://localhost:4566/000000000000/mi-cola-local \
    --message-body "Hola desde LocalStack"

# Recibir mensajes
aws --endpoint-url=http://localhost:4566 sqs receive-message \
    --queue-url http://localhost:4566/000000000000/mi-cola-local

# Crear un topic SNS
aws --endpoint-url=http://localhost:4566 sns create-topic \
    --name mi-topic-local

# Publicar un mensaje
aws --endpoint-url=http://localhost:4566 sns publish \
    --topic-arn arn:aws:sns:us-east-1:000000000000:mi-topic-local \
    --message "Mensaje desde LocalStack"
```

## Uso con Terraform

LocalStack funciona perfectamente con Terraform. Solo necesitas configurar el provider para que apunte a LocalStack:

### Configuración del provider

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
  s3_use_path_style          = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    apigateway     = "http://localhost:4566"
    apigatewayv2   = "http://localhost:4566"
    cloudformation = "http://localhost:4566"
    cloudwatch     = "http://localhost:4566"
    dynamodb       = "http://localhost:4566"
    ec2            = "http://localhost:4566"
    es             = "http://localhost:4566"
    elasticache    = "http://localhost:4566"
    firehose       = "http://localhost:4566"
    iam            = "http://localhost:4566"
    kinesis        = "http://localhost:4566"
    lambda         = "http://localhost:4566"
    rds            = "http://localhost:4566"
    redshift       = "http://localhost:4566"
    route53        = "http://localhost:4566"
    s3             = "http://s3.localhost.localstack.cloud:4566"
    secretsmanager = "http://localhost:4566"
    ses            = "http://localhost:4566"
    sns            = "http://localhost:4566"
    sqs            = "http://localhost:4566"
    ssm            = "http://localhost:4566"
    stepfunctions  = "http://localhost:4566"
    sts            = "http://localhost:4566"
  }
}
```

### Ejemplo de infraestructura completa

```hcl
# Bucket S3
resource "aws_s3_bucket" "mi_bucket" {
  bucket = "mi-bucket-terraform"
}

resource "aws_s3_bucket_versioning" "mi_bucket_versioning" {
  bucket = aws_s3_bucket.mi_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Tabla DynamoDB
resource "aws_dynamodb_table" "usuarios" {
  name           = "usuarios"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name     = "email-index"
    hash_key = "email"
  }

  tags = {
    Name        = "usuarios"
    Environment = "local"
  }
}

# Cola SQS
resource "aws_sqs_queue" "procesar_usuarios" {
  name                       = "procesar-usuarios"
  delay_seconds              = 90
  max_message_size           = 2048
  message_retention_seconds  = 86400
  receive_wait_time_seconds  = 10

  tags = {
    Environment = "local"
  }
}

# Topic SNS
resource "aws_sns_topic" "notificaciones" {
  name = "notificaciones-usuarios"
}

# Suscripción SQS al topic SNS
resource "aws_sns_topic_subscription" "sqs_subscription" {
  topic_arn = aws_sns_topic.notificaciones.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.procesar_usuarios.arn
}

# Función Lambda
resource "aws_lambda_function" "procesar_usuario" {
  filename         = "lambda.zip"
  function_name    = "procesar-usuario"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime         = "nodejs18.x"

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.usuarios.name
      SNS_TOPIC_ARN  = aws_sns_topic.notificaciones.arn
    }
  }
}

# Rol IAM para Lambda
resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Política IAM para Lambda
resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ]
        Resource = aws_dynamodb_table.usuarios.arn
      },
      {
        Effect = "Allow"
        Action = [
          "sns:Publish"
        ]
        Resource = aws_sns_topic.notificaciones.arn
      }
    ]
  })
}

# Crear archivo ZIP para Lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "lambda.zip"
  source {
    content = <<EOF
exports.handler = async (event) => {
    console.log('Evento recibido:', JSON.stringify(event));
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Usuario procesado correctamente',
            timestamp: new Date().toISOString()
        }),
    };
    
    return response;
};
EOF
    filename = "index.js"
  }
}

# Outputs
output "bucket_name" {
  value = aws_s3_bucket.mi_bucket.bucket
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.usuarios.name
}

output "sqs_queue_url" {
  value = aws_sqs_queue.procesar_usuarios.url
}

output "sns_topic_arn" {
  value = aws_sns_topic.notificaciones.arn
}

output "lambda_function_name" {
  value = aws_lambda_function.procesar_usuario.function_name
}
```

### Aplicar la configuración

```bash
# Inicializar Terraform
terraform init

# Ver el plan
terraform plan

# Aplicar cambios
terraform apply

# Ver los recursos creados
terraform show

# Destruir la infraestructura
terraform destroy
```

## Scripts de inicialización

LocalStack permite ejecutar scripts de inicialización automáticamente. Crea un directorio `init-scripts/`:

### Script de inicialización básica

```bash
#!/bin/bash
# init-scripts/01-setup-base.sh

echo "🚀 Inicializando LocalStack con configuración básica..."

# Crear buckets S3
awslocal s3 mb s3://app-data-bucket
awslocal s3 mb s3://app-logs-bucket
awslocal s3 mb s3://app-backups-bucket

# Crear tabla DynamoDB para sesiones
awslocal dynamodb create-table \
    --table-name user-sessions \
    --attribute-definitions \
        AttributeName=session_id,AttributeType=S \
    --key-schema \
        AttributeName=session_id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5

# Crear colas SQS
awslocal sqs create-queue --queue-name notifications-queue
awslocal sqs create-queue --queue-name processing-queue

# Crear topic SNS
TOPIC_ARN=$(awslocal sns create-topic --name app-notifications --output text --query 'TopicArn')

# Suscribir la cola al topic
QUEUE_URL=$(awslocal sqs get-queue-url --queue-name notifications-queue --output text --query 'QueueUrl')
QUEUE_ARN=$(awslocal sqs get-queue-attributes --queue-url $QUEUE_URL --attribute-names QueueArn --output text --query 'Attributes.QueueArn')
awslocal sns subscribe --topic-arn $TOPIC_ARN --protocol sqs --notification-endpoint $QUEUE_ARN

echo "✅ Configuración básica completada"
```

Haz el script ejecutable:

```bash
chmod +x init-scripts/01-setup-base.sh
```

## Mejores prácticas y consejos

### 1. Persistencia de datos

Por defecto, LocalStack no persiste datos entre reinicios. Para mantener tus datos:

```yaml
# En docker-compose.yml
volumes:
  - "${LOCALSTACK_VOLUME_DIR:-./volume}:/var/lib/localstack"
```

### 2. Usar awslocal

Instala `awslocal` para no tener que especificar el endpoint cada vez:

```bash
pip install awscli-local

# Ahora puedes usar
awslocal s3 ls
awslocal dynamodb list-tables
```

### 3. Variables de entorno útiles

```bash
# .env
DEBUG=1                          # Habilitar logs detallados
SERVICES=s3,dynamodb,lambda,sqs  # Solo servicios que necesitas
DATA_DIR=/tmp/localstack         # Directorio de datos
HOST_TMP_FOLDER=/tmp/localstack  # Directorio temporal
```

### 4. Health checks

```bash
# Verificar que LocalStack está funcionando
curl http://localhost:4566/health

# Verificar servicios específicos
curl http://localhost:4566/health?service=s3
```

### 5. Integración con testing

```python
# conftest.py para pytest
import pytest
import boto3
from moto import mock_s3, mock_dynamodb

@pytest.fixture(scope="session")
def localstack_client():
    return boto3.client(
        's3',
        endpoint_url='http://localhost:4566',
        aws_access_key_id='test',
        aws_secret_access_key='test',
        region_name='us-east-1'
    )
```

### 6. Monitoreo y debugging

```bash
# Ver logs en tiempo real
docker-compose logs -f localstack

# Conectar al container para debugging
docker-compose exec localstack bash

# Ver métricas de uso
curl http://localhost:4566/_localstack/health
```

## Limitaciones y consideraciones

### Versión Community vs Pro

La versión **Community** (gratuita) incluye los servicios más populares, mientras que la versión **Pro** incluye:

- Servicios adicionales (EKS, RDS, ElastiCache, etc.)
- Persistencia cloud
- Snapshots
- Support técnico
- Funcionalidades avanzadas de debugging

### Performance

LocalStack emula los servicios, no los ejecuta nativamente, por lo que:

- Puede ser más lento que AWS real para operaciones complejas
- Algunos comportamientos pueden diferir ligeramente
- No es recomendable para pruebas de performance

### Compatibilidad

- No todos los parámetros de API están implementados
- Algunas funcionalidades avanzadas pueden no estar disponibles
- Siempre verifica la [matriz de compatibilidad](https://docs.localstack.cloud/user-guide/aws/feature-coverage/)

## Casos de uso ideales

### 1. Desarrollo local

```bash
# Ejemplo: Desarrollo de API con S3 y DynamoDB
# Sin LocalStack: Configurar bucket S3 real + tabla DynamoDB + IAM
# Con LocalStack: docker-compose up y listo
```

### 2. Tests de integración

```python
def test_upload_to_s3():
    # Test que funciona igual en local y CI/CD
    client = boto3.client('s3', endpoint_url='http://localhost:4566')
    client.put_object(Bucket='test-bucket', Key='test.txt', Body=b'test data')
    
    response = client.get_object(Bucket='test-bucket', Key='test.txt')
    assert response['Body'].read() == b'test data'
```

### 3. Aprendizaje y experimentación

Perfecto para:
- Aprender AWS sin costos
- Probar configuraciones de Terraform
- Experimentar con arquitecturas serverless
- Validar scripts de automatización

### 4. CI/CD

```yaml
# .github/workflows/test.yml
- name: Start LocalStack
  run: |
    docker-compose up -d
    # Esperar a que esté listo
    until curl -s http://localhost:4566/health; do sleep 1; done

- name: Run integration tests
  run: pytest tests/integration/
```

## Conclusión

LocalStack es una herramienta **indispensable** para cualquier desarrollador que trabaje con AWS. Te permite:

- **Aprender AWS** sin restricciones económicas
- **Desarrollar localmente** con todos los servicios AWS
- **Hacer testing** de forma rápida y repetible
- **Experimentar** con nuevas arquitecturas sin riesgo

La curva de aprendizaje es mínima: si sabes usar AWS CLI o Terraform, ya sabes usar LocalStack. Solo cambia el endpoint y ya tienes tu AWS personal en tu portátil.

### Próximos pasos

1. **Instala LocalStack** con el docker-compose de este artículo
2. **Prueba los ejemplos** de CLI y Terraform
3. **Adapta tus proyectos** actuales para usar LocalStack en desarrollo
4. **Integra LocalStack** en tus pipelines de CI/CD
5. **Experimenta** con servicios AWS que nunca has usado

¿Vas a seguir pagando por experimentar con AWS? Con LocalStack, tu creatividad es el único límite.

---

## Recursos adicionales

- **[Documentación oficial de LocalStack](https://docs.localstack.cloud/)**
- **[GitHub de LocalStack](https://github.com/localstack/localstack)**
- **[Ejemplos de la comunidad](https://github.com/localstack/localstack/tree/master/doc/example)**
- **[AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/)**
- **[Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)**

¿Te ha resultado útil este artículo? ¡Compártelo y ayuda a otros desarrolladores a descubrir LocalStack! 🚀