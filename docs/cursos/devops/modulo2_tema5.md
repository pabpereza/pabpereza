---
title: Entrega Continua (CD)
---

# Entrega Continua (CD)

## Resumen teórico

La Entrega Continua (CD) es una práctica de desarrollo de software en la que los cambios en el código se construyen, prueban y preparan automáticamente para su lanzamiento a producción. El objetivo de CD es asegurar que el software puede ser lanzado de manera confiable en cualquier momento.

### Estrategias de despliegue: Blue/Green, Red/Black

Las estrategias de despliegue son métodos utilizados para lanzar nuevas versiones de software sin interrumpir el servicio. Dos estrategias comunes son Blue/Green y Red/Black.

- **Blue/Green Deployment**: En esta estrategia, se mantienen dos entornos idénticos, uno activo (Blue) y otro inactivo (Green). La nueva versión del software se despliega en el entorno inactivo. Una vez que se verifica que la nueva versión funciona correctamente, el tráfico se redirige al entorno inactivo, que ahora se convierte en el entorno activo.
- **Red/Black Deployment**: Similar a Blue/Green, pero con una diferencia en la nomenclatura. El entorno activo se llama Red y el inactivo se llama Black. El proceso de despliegue es el mismo.

### Rollbacks y gestión de entornos

Los rollbacks son procesos para revertir una versión de software a una versión anterior en caso de problemas. La gestión de entornos implica mantener múltiples entornos (desarrollo, prueba, producción) para asegurar que el software se prueba adecuadamente antes de su lanzamiento.

### Promoción de versiones

La promoción de versiones es el proceso de mover una versión de software a través de diferentes entornos (desarrollo, prueba, producción) hasta que esté lista para su lanzamiento a producción. Este proceso asegura que el software se prueba adecuadamente en cada etapa.

### Plataformas de automatización (AWS CodePipeline, CodeDeploy, etc.)

Las plataformas de automatización son herramientas que facilitan la implementación de CD. Algunas de las plataformas más comunes son:

- **AWS CodePipeline**: Un servicio de integración y entrega continua que permite automatizar las fases de construcción, prueba y despliegue de aplicaciones.
- **AWS CodeDeploy**: Un servicio que automatiza el despliegue de aplicaciones en una variedad de servicios de computación, como Amazon EC2, AWS Lambda y servidores locales.
- **Jenkins**: Una herramienta de automatización de código abierto que permite la integración y entrega continua.
- **GitLab CI/CD**: Una herramienta integrada en GitLab que permite la integración y entrega continua.
- **CircleCI**: Una herramienta de integración y entrega continua basada en la nube.

## Lista de objetivos de aprendizaje

1. Comprender el concepto de Entrega Continua (CD) y su importancia en el desarrollo de software.
2. Conocer las estrategias de despliegue Blue/Green y Red/Black.
3. Aprender a realizar rollbacks y gestionar entornos.
4. Entender el proceso de promoción de versiones.
5. Conocer las plataformas de automatización como AWS CodePipeline, CodeDeploy, Jenkins, GitLab CI/CD y CircleCI.

## Ejemplos técnicos comentados

### Ejemplo de Blue/Green Deployment con AWS CodeDeploy

```yaml
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: "arn:aws:ecs:us-west-2:123456789012:task-definition/my-task"
        LoadBalancerInfo:
          ContainerName: "my-container"
          ContainerPort: 80
        DeploymentConfiguration:
          MinimumHealthyPercent: 50
          MaximumPercent: 200
        NetworkConfiguration:
          AwsvpcConfiguration:
            Subnets:
              - "subnet-abcde012"
              - "subnet-bcde012a"
            SecurityGroups:
              - "sg-0123456789abcdef0"
            AssignPublicIp: "ENABLED"
```

### Ejemplo de rollback con Jenkins

```groovy
pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                script {
                    try {
                        sh 'deploy.sh'
                    } catch (Exception e) {
                        echo 'Deployment failed, rolling back...'
                        sh 'rollback.sh'
                    }
                }
            }
        }
    }
}
```

## Casos de uso o buenas prácticas

1. **Despliegue automatizado**: Utilizar plataformas de automatización para realizar despliegues de manera confiable y repetible.
2. **Pruebas exhaustivas**: Asegurar que el software se prueba adecuadamente en cada entorno antes de su lanzamiento a producción.
3. **Monitoreo y alertas**: Implementar monitoreo y alertas para detectar problemas rápidamente y realizar rollbacks si es necesario.

## Recursos recomendados

1. [Continuous Delivery](https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912) - Un libro sobre la entrega continua y la automatización del despliegue de software.
2. [The DevOps Handbook](https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002) - Un libro que proporciona una guía completa sobre cómo implementar DevOps en una organización.
3. [Jenkins: The Definitive Guide](https://www.amazon.com/Jenkins-Definitive-Guide-John-Ferguson/dp/1449305350) - Un libro sobre cómo utilizar Jenkins para la integración y entrega continua.

## Ideas visuales

1. **Diagrama de flujo de un pipeline de CD**: Un diagrama que muestre el flujo de trabajo de un pipeline de CD, desde la construcción del código hasta el despliegue en producción.
2. **Diagrama de despliegue Blue/Green**: Un diagrama que ilustre cómo se realiza un despliegue Blue/Green, con dos entornos idénticos y la redirección del tráfico.
3. **Animación de un rollback en acción**: Una animación que muestre el proceso de rollback de una aplicación utilizando una plataforma de automatización.

## FAQ o puntos clave a recordar

1. **¿Qué es la Entrega Continua (CD)?**: La Entrega Continua (CD) es una práctica de desarrollo de software en la que los cambios en el código se construyen, prueban y preparan automáticamente para su lanzamiento a producción.
2. **¿Por qué es importante la Entrega Continua (CD)?**: La Entrega Continua (CD) asegura que el software puede ser lanzado de manera confiable en cualquier momento.
3. **¿Qué es un despliegue Blue/Green?**: Un despliegue Blue/Green es una estrategia en la que se mantienen dos entornos idénticos, uno activo y otro inactivo, y se redirige el tráfico al entorno inactivo una vez que se verifica que la nueva versión funciona correctamente.
4. **¿Qué es un rollback?**: Un rollback es el proceso de revertir una versión de software a una versión anterior en caso de problemas.
5. **¿Qué es la promoción de versiones?**: La promoción de versiones es el proceso de mover una versión de software a través de diferentes entornos hasta que esté lista para su lanzamiento a producción.
6. **¿Qué son las plataformas de automatización?**: Las plataformas de automatización son herramientas que facilitan la implementación de CD, como AWS CodePipeline, CodeDeploy, Jenkins, GitLab CI/CD y CircleCI.
