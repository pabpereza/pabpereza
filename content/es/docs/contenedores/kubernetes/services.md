---
title: "Services"
linkTitle: "Services"
weight: 50 
tags: [kubernetes, devops]
description: "" 
    
---

Los servicios en kubernetes son una forma de agrupar pods mediande sus etiquetas o labels y disponer a los usuarios
el acceso a los recursos que están asociados a ellos.

Los pods en kubernetes son efímeros y cambiaran frecuentemente, con ellos, tambien sus IPs por lo que los servicios entregan una IP
única (también tiene DNS), además de balancear las peticiones entre los pods que están asociados a un servicio.
