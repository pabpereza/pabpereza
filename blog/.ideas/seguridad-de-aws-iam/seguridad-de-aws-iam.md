---
slug: seguridad-de-aws-iam
title: Seguridad en AWS IAM: Controles Técnicos Esenciales
authors: pabpereza
tags: [aws, iam, security]
keywords: [aws iam seguridad, políticas aws, acceso aws, mfa aws, scp aws]
date: 2026-02-12
draft: true
---

# Seguridad en AWS IAM: Controles Técnicos Esenciales

## Introducción

Amazon Web Services (AWS) ofrece un conjunto de herramientas para gestionar identidades y recursos: Identity and Access Management (IAM). El diseño de una política de seguridad efectiva no solo protege los recursos, sino que también garantiza cumplimiento y operatividad fluida. Para los usuarios intermedios, la comprensión profunda de los controles técnicos disponibles permite diseñar infraestructuras robustas sin caer en prácticas subóptimas de acceso. El objetivo de este artículo es describir, de forma concisa, los controles clave de IAM que deben considerarse para una postura segura.

<!-- truncate -->

## 1. Principios de Seguridad en IAM

- **Least privilege**: Otorga solo los permisos estrictamente necesarios para cumplir una tarea. Revise periódicamente las políticas adjuntas y elimine accesos obsoletos.
- **Separation of duties**: Evite que una única entidad posea permisos de administración y operación. Use roles con privilegios distintos y haga auditorías de cambios de privilegios.
- **Policy evaluation workflow**: Comprenda la “evaluación en cascada” (Allow + Deny) y la prioridad de las políticas de acceso. Deny siempre prevalece sobre Allow, sea que vengan de la política de usuario, grupo o rol.

## 2. Controles de identidad

- **Usuarios y grupos**: Los usuarios son identidades humanas, mientras que los grupos funcionan como contenedores de permisos compartidos. Agrupele usuarios con roles similares para simplificar la gestión de políticas.
- **Roles**: Las identidades basadas en servicios (ej. EC2, Lambda) o roles de federación (SAML, OIDC) deben usar roles para delegar privilegios mínimos.
- **Acceso delegado y acceso cruzado**: Use roles de confianza y políticas de “assume-role” para delegar privilegios entre cuentas de AWS, garantizando controles de auditoría centralizados.

## 3. Control de recursos y políticas

- **Policy‑based vs Resource‑based**: Las políticas de IAM se adjuntan a usuarios, grupos o roles, mientras que las políticas basadas en recursos se adjuntan directamente al recurso (ej. bucket de S3). Combine ambos mecanismos para controlar el acceso de manera granular.
- **Service Control Policies (SCP)**: En AWS Organizations, las SCP definen límites de permiso que se aplican a todas las cuentas hijas. Su utilidad radica en restringir accesos globales de forma declarativa y persistente.
- **Conditions y Context Keys**: Aproveche los atributos condicionantes (ej. IP, hora, tipo de dispositivo) para restringir políticas y añadir capas adicionales de seguridad sin cambiar los permisos básicos.

## 4. Monitoreo y respuesta

- **CloudTrail**: Registra todas las llamadas a la API de AWS. Habilite `trail` de auditoría en todas las cuentas y archívele en un bucket de S3 con políticas de permanencia larga.
- **AWS Config**: Use `config rules` para detectar desviaciones de política de IAM, como la creación de usuarios sin MFA o la modificación del `root account`.
- **GuardDuty**: Analiza comportamiento anómalo en el tráfico de IAM. Alerta por accesos inusuales, cambios de clave o inicio de sesión sin MFA.

## 5. Automatización y buenas prácticas

- **IaC**: Escriba recursos IAM con Terraform, AWS CDK o CloudFormation para versionar y revisar políticas automáticamente.
- **Rotación automática de claves**: Implemente scripts de rotación de Access Key con `aws iam create-access-key` y `delete-access-key`, garantizando caducidad cíclica.
- **Política de auditoría**: Agregue una política que permita a grupos dedicados de auditoria leer todas las políticas y logs, sin otorgar derechos de escritura.

## Conclusión

La seguridad en AWS IAM no es un estado estático, sino un proceso continuo de revisión y refinamiento. Adoptar los controles técnicos descritos—principios de least privilege, roles bien diseñados, SCPs, auditoría de eventos y automatización de IaC—concreta la postura de seguridad y reduce el riesgo de exposición. Los administradores de recursos deben implementar una cultura de revisión de permisos y auditoría de logs como parte integral del ciclo de vida del desarrollo.

---

```mermaid
graph TD
  subgraph "Users & Groups"
    U[Users]
    G[Groups]
  end
  subgraph Roles
    R[Roles]
  end
  subgraph Policies
    P[Policies]
    SBC[Service Control Policies]
  end
  subgraph MFA
    MFA[MFA Device]
  end

  U --\u003e|belongs to| G
  G --\u003e|has| P
  U --\u003e|assumes| R
  R --\u003e|has| P
  U --\u003e|auth via| MFA
  P --\u003e|attached to| U
  P --\u003e|attached to| G
  P --\u003e|attached to| R
  SBC --\u003e|restricts| U
  SBC --\u003e|restricts| G
  SBC --\u003e|restricts| R
```

---