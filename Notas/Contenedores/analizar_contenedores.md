---
title: "Escáneres de vulnerabilidades"
linkTitle: ""
weight: 4
tags: [docker, seguridad, vulnerabilidades]
description: Herramientas que nos permiten analizar la seguridad en nuestros contenedores.
---


## Introducción
Los contenedores nos han permitido la facilidad y comodidad de empaquetar nuestras aplicaciones y servicios, y también nos permiten asegurar que se ejecuten de forma segura. Sin embargo, las imágenes se contruyen con muchos componentes de terceros sobre los que no tenemos visibilidad. Para esta labor tenemos diferentes herramientas que nos ayudan a analizar la seguridad de nuestros contenedores.


## Herramientas

### Snyk - Docker Desktop
Es sin duda una de las más desconocidas debido a su reciente implementación en la plataforma de Docker pero, dada su integración nativa y que no es necesario realizar instalaciones adicionales, es una herramienta más que adecuada.

Tiene unas limitaciones de uso mensual pero podemos iniciar sesión con una cuenta gratuita para ampliarlo. [Snyk](https://snyk.io/).

Podemos utilizar esta herramienta simplemente escribiendo:

``` bash 
docker scan <imagen>
```

Otra forma de utilizarla, es con el parámetro "--dependency-tree", el cuál muestra todo el árbol
de dependencias de la images.
``` bash
docker scan --dependency-tree <imagen>
     ├─ ca-certificates @ 20200601~deb10u1
     │  └─ openssl @ 1.1.1d-0+deb10u3
     │     └─ openssl/libssl1.1 @ 1.1.1d-0+deb10u3
     ├─ curl @ 7.64.0-4+deb10u1
     │  └─ curl/libcurl4 @ 7.64.0-4+deb10u1
     │     ├─ e2fsprogs/libcom-err2 @ 1.44.5-1+deb10u3
     │     ├─ krb5/libgssapi-krb5-2 @ 1.17-3
     │     │  ├─ e2fsprogs/libcom-err2 @ 1.44.5-1+deb10u3
     │     │  ├─ krb5/libk5crypto3 @ 1.17-3
     │     │  │  └─ krb5/libkrb5support0 @ 1.17-3
     │     │  ├─ krb5/libkrb5-3 @ 1.17-3
     │     │  │  ├─ e2fsprogs/libcom-err2 @ 1.44.5-1+deb10u3
     │     │  │  ├─ krb5/libk5crypto3 @ 1.17-3
     │     │  │  ├─ krb5/libkrb5support0 @ 1.17-3
     │     │  │  └─ openssl/libssl1.1 @ 1.1.1d-0+deb10u3
     │     │  └─ krb5/libkrb5support0 @ 1.17-3
     │     ├─ libidn2/libidn2-0 @ 2.0.5-1+deb10u1
     │     │  └─ libunistring/libunistring2 @ 0.9.10-1
     │     ├─ krb5/libk5crypto3 @ 1.17-3
     │     ├─ krb5/libkrb5-3 @ 1.17-3
     │     ├─ openldap/libldap-2.4-2 @ 2.4.47+dfsg-3+deb10u2
     │     │  ├─ gnutls28/libgnutls30 @ 3.6.7-4+deb10u4
     │     │  │  ├─ nettle/libhogweed4 @ 3.4.1-1
     │     │  │  │  └─ nettle/libnettle6 @ 3.4.1-1
     │     │  │  ├─ libidn2/libidn2-0 @ 2.0.5-1+deb10u1
     │     │  │  ├─ nettle/libnettle6 @ 3.4.1-1
     │     │  │  ├─ p11-kit/libp11-kit0 @ 0.23.15-2
     │     │  │  │  └─ libffi/libffi6 @ 3.2.1-9
     │     │  │  ├─ libtasn1-6 @ 4.13-3
     │     │  │  └─ libunistring/libunistring2 @ 0.9.10-1
     │     │  ├─ cyrus-sasl2/libsasl2-2 @ 2.1.27+dfsg-1+deb10u1
     │     │  │  └─ cyrus-sasl2/libsasl2-modules-db @ 2.1.27+dfsg-1+deb10u1
     │     │  │     └─ db5.3/libdb5.3 @ 5.3.28+dfsg1-0.5
     │     │  └─ openldap/libldap-common @ 2.4.47+dfsg-3+deb10u2
     │     ├─ nghttp2/libnghttp2-14 @ 1.36.0-2+deb10u1
     │     ├─ libpsl/libpsl5 @ 0.20.2-2
     │     │  ├─ libidn2/libidn2-0 @ 2.0.5-1+deb10u1
     │     │  └─ libunistring/libunistring2 @ 0.9.10-1
     │     ├─ rtmpdump/librtmp1 @ 2.4+20151223.gitfa8646d.1-2
     │     │  ├─ gnutls28/libgnutls30 @ 3.6.7-4+deb10u4
     │     │  ├─ nettle/libhogweed4 @ 3.4.1-1
     │     │  └─ nettle/libnettle6 @ 3.4.1-1
     │     ├─ libssh2/libssh2-1 @ 1.8.0-2.1
     │     │  └─ libgcrypt20 @ 1.8.4-5
     │     └─ openssl/libssl1.1 @ 1.1.1d-0+deb10u3
     ├─ gnupg2/dirmngr @ 2.2.12-1+deb10u1
```
