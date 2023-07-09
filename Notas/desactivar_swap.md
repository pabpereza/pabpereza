---
title: "Desactivar swap"
linkTitle: "Desactivar swap"
weight: 30
tags: [linux]
description:  
---

Para ciertos escenarios es recomendable desactivar el swap o incluso obligatorio. Por ejemplo, en el caso de kubernetes si o si se debe desactivar el swap.


## Ubuntu 20.04
En ubuntu 20.04 podemos ver el estado de la memoria swap con el siguiente comando:
```bash
sudo swap --show

# También nos serviría el comando free
sudo free -h
```

Para desactivarlas, podemos usar el comando:
```bash
sudo swapoff -a #Esto la desactiva, pero solo de forma temporal

# Luego tendríamos que borrar el archivo de intercambio
sudo rm /swap.img

# Por último, borramos la línea de swap del fichero de configuración de linux fstab para que no se recree cuando el sistema se reinicie
sudo sed -i '/swap/d' /etc/fstab
```


