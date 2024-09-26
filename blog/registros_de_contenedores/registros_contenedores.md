---
slug: Tu propio registry privado
title: Registros de contenedores y alternativas a Dockerhub 
tags: [ contenedores]
authors: pabpereza
date: 2024-09-12

---


#  Harbor ¿Quieres almacenar tus imágenes de contenedor en tu propio repositorio o registry ?

En cuento a los repositorios, tenemos múltiples opciones. Tanto en variantes gestionadas por un proveedor o en formato SaaS o también otras tantas que puedes instalarte en tus servidores. Os dejo este repositorio donde he hecho la tabla comparando las opciones que concozco, pero puedes contribuir con más opciones o detalles.

[Tabla comparativa de registros de contenedores](https://github.com/pabpereza/private-container-registries)

De entre todos estos, destaca Harbor. Este es el más completo, personalizable y escalable. Permite albergar imágenes, analizar su seguridad, despliegue en kubernetes en alta disponibilidad o incluso replicar automáticamente las imágenes de otro registry, actuando como una especie de caché para tu infraestructura. 

Pero si quieres algo más sencillo, CNCF Distribution, es el core tecnológico de la mayoría de registries y se puede montar en docker con una línea de instrucciones.


## Instalación de Harbor

### Requisitos mínimos
Estos son los requisitos mínimos y recomendados, se puede instalar tanto en un servidor físico como en un cluster de kubernetes.

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU      | 2 CPU   | 4 CPU       |
| Mem      | 4 GB    | 8 GB        |
| Disk     | 40 GB   | 160 GB      |

<!-- truncate -->

Para este primer vídeo, vamos a instalar Harbor en un servidor físico con los siguientes requisitos. La distribución de Linux es indiferente mientras soporte Docker Engine.
* Docker Engine
* Docker Compose
* OpenSSL (si vamos a isntalar certificados SSL)


### Decargar el instalador
Vamos a la página de releases de Harbor en Github y descargamos el instalador. [Releases de Harbor](https://github.com/goharbor/harbor/releases)

Copiamos el link de la última versión y lo descargamos con wget, o usamos el navegador y lo descargamos en el servidor. Ojo haber cogido la versión latest y no una pre-release.
```bash
wget https://github.com/goharbor/harbor/releases/download/v2.11.1/harbor-offline-installer-v2.11.1.tgz
```

Descomprimimos el archivo y entramos en el directorio creado.
```bash
tar xzvf harbor-offline-installer-v2.11.1.tgz

cd harbor
```

### Habilitar HTTPS
Aunque sale como opcional en el tutorial, si vas a usarlo en producción, te recomiendo que lo hagas. Además, en modo HTTP no igual no te funcionará el login con docker login u otras herramientas, que ya fuerzan el uso de HTTPS.

#### Generar certificados SSL con OpenSSL
```bash
openssl genrsa -out ca.key 4096

openssl req -x509 -new -nodes -sha512 -days 3650 \
 -subj "/C=CN/ST=Madrid/L=Madrid/O=example/OU=Personal/CN=MyPersonal Root CA" \
 -key ca.key \
 -out ca.crt 
```

```bash
openssl genrsa -out harbor.dev.key 4096
```

Generar una solicitud de firma de certificado (CSR) para el certificado del servidor.
```bash
openssl req -sha512 -new \
    -subj "/C=CN/ST=Madrid/L=Madrid/O=example/OU=Personal/CN=harbor.dev" \
    -key harbor.dev.key \
    -out harbor.dev.csr
```

Generar fichero v3.ext para el certificado
```bash
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1=harbor.dev
DNS.2=harbor
DNS.3=hostname
EOF
```

Generar el certificado del servidor
```bash
openssl x509 -req -sha512 -days 3650 \
    -extfile v3.ext \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -in harbor.dev.csr \
    -out harbor.dev.crt
```

#### Proveer los certificados a Docker
Copiamos los certificados a la carpeta de certificaos de nuestro servidor. En mi caso, en `/data/cert/`.
```bash
cp harbor.dev.crt /data/cert/
cp harbor.dev.key /data/cert/
```

Convertimos nuestro fichero `.crt` a `.cert` para que Docker lo pueda interpretar.
```bash
openssl x509 -inform PEM -in harbor.dev.crt -out harbor.dev.cert
```

Copiamos los certificados a la carpeta de Docker.
```bash
cp harbor.dev.cert /etc/docker/certs.d/harbor.dev/
cp harbor.dev.key /etc/docker/certs.d/harbor.dev/
cp ca.crt /etc/docker/certs.d/harbor.dev/
```

Reiniciamos el servicio de Docker para que coja los nuevos certificados.
```bash
systemctl restart docker
```


### Configurar el yaml de Harbor
En la carpeta en la que deberíamos estar, tras descomprimir el instalador, hay un archivo llamado `harbor.yml`. Este archivo es el que vamos a modificar para configurar nuestro Harbor. 

Recuerda personalizar los campos `hostname`, `http`, `https`, `harbor_admin_password`... etc, con tus valores y preferencias. En mi caso, para este laboratorio, comentaré las líneas de `https` y `certificate` para que no me de problemas con los certificados SSL ya que optaré por usar http y proxy inverso en el futuro.



### Ejecutar el instalador
Importante, o lo ejecutas como root, o asegúrate que tu usuario tiene permisos para ejecutar docker y sobre la carpeta 'common'. Sino te dará un error de permisos.

Además, este script, verificará que tienes docker y docker compose instalado. Si no lo tienes, te recomiendo que veas este vídeo de mi curso de docker donde explico [como instalar Docker Engine en Linux](https://youtu.be/obALwLV-49U)

Para instalarlo, simplemente ejecutamos el script `install.sh` y esperamos a que termine. 
```bash
./install.sh
```

Puede ser que aún teniendo docker compose instalado, te de un error de que no lo encuentra. Esto es porque Harbor intenta buscar el binario de docker-compose (en su versión antigua) ya que ahora se invoca con `docker compose`. Para solucionarlo, usa la guía de [instalación standalone para solucionar estos problemas de compatibilidad](https://docs.docker.com/compose/install/standalone/)


