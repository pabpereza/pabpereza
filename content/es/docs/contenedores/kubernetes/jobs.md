---
title: "Jobs"
linkTitle: "Jobs"
weight: 55
tags: [kubernetes, devops]
description:  
---

Los `Jobs` en kubernetes son una forma de automatizar tareas en kubernetes. A diferencia de los `Pods`, los `Jobs` tienen número de ejecuciones definido y un tiempo de ejecución limitado.

Estos recursos se suelen utilizar para tareas de mantenimiento que se ejecutan de forma puntual y recurrente.


## Sintaxis básica
Este sería un ejemplo de sintáxis básica de un `Job`:
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: test-job 
spec:
  completions: 5 # Número de ejecuciones
  template:
    spec:
      containers:
      - name: test 
        image: busybox
        command: ["/bin/sleep"]
        args: ["3"]
      restartPolicy: Never
```

El parámetro diferenciador del `Jobs` frente a los `Pods` es el `completions`. Este define el número de ejecuciones que se realizarán y una vez que se alcanza el número de ejecuciones, el `Job` se detendrá.

Si vemos el estado de un `Job` en kubernetes, podemos ver que está en estado `Pending` si no se ha iniciado, `Running` si se está ejecutando y `Succeeded` si se ha terminado con éxito.


