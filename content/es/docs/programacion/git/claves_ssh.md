---
title: "Claves ssh"
linkTitle: "Claves ssh"
weight: 10
tags: [git, configuracion]
description: >
    Configuracion de múltiples claves o claves ssh específicas por repositorio
---

## Usar una clave específica por repositorio
Puede ocurrir, por ejemplo usando github, que tengamos varias cuentas y no podamos usar la misma clave ssh que tenemos en el sistema para todos los repositorios. Este problema surge a raiz de que github no permite tener la misma clave ssh repetida en diferentes cuentas.

En nuestro local podríamos generar otra pareja de claves que tuvieran otro nombre y luego en nuestro repositorio de git, especificar manualmente que clave queremos que use nuestro repositorio. 
``` shell
git config --local core.sshCommand "ssh -i ~/.ssh/id_rsa_personal -F /dev/null"
```

