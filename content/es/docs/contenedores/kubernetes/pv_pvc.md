---
title: "Persistent volume"
linkTitle: "Persistent volume"
weight: 90
tags: [kubernetes]
description:  
---

En kubernetes existe la posibilidad de crear volumenes para persistir los datos de los pods. Estos se agrupan en dos objetos:
* PV: "Persistent Volume", es la declaración de un espacio del host que el cluster va a reservar para su uso.
* PVC: "Persistent Volume Claim" es la petición de reserva de espacio de un PV para un uso más especifico, por ejemplo, para un único proyecto.

Esta asiganación de espacio se realiza a dos niveles para reservar espacio para el cluster por un lado (PV) y luego se utilizan los objetos (PVC) para repartir ese espacio entre diferentes proyectos (namespaces) u objetos.

## Persistent Volume (PV)
Estos permiten múltiples configuraciones en función del tipo de cluster. En entornos de nube lo normal suele ser usar almacenamiento nativo del proveedor. En este ejemplo lo haremos utilizando un volumen NFS totalmente válido para infraestructura no gestionada por un proveedor cloud.

En esta entrada explico como trabajar con NFS (solo es necesaria la parte de servidor). [NFS en Linux](/docs/linux/nfs.md)