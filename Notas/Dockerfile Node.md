#docker 

Guía de buenas prácticas para construir imágenes de docker basadas en node.

![[Dockerfile#Seguridad y buenas prácticas]]

## Específicas de node
1.  Instalar solo las librerías que van a producción
```dockerfile
RUN npm ci --only=production
```

2. Variables de entorno `MODE_ENV` para la configuración de algunos frameworks. Por ejemplo, Express.