
## Introducción 
SNMP o Simple Network Mangement Protocol es un protocolo usado para monitorizar los dispositivos de una red ( por ejemplo, routers, switches, impresoras, IoTs...).
Las versiones 1,2 y 2c son bastante inseguras y transmiten la información en texto plano. Estos problemas se solucionaron con la versión 3.
En cualquiera de los casos teniendo credenciales se puede lsitar información muy valiosa de un sistema.


## Enumeración 
Nmap tiene varios scripts para enumerar información sobre este protocolo. 


Lo primero que tendremos que identificar es el protocolo y puerto. Por defecto, opera en el 161 UDP. Con NMAP podríamos lanzar un barrido a todos los puertos UDP con el siguiente comando:
```shell
nmap -v -p- -sU <Objetivo>
```

Una vez identificado el protocolo y puerto, especificamos a nmap el puesto concreto sobre el que operar:
```shell
nmap -p161 -sU <Objetivo>
```

Ahora *toca* utilizar los scripts de nmap. Podríamos dejarlo en modo automático con el parámetro **-sC** pero no es el método más eficaz dado que muchos de estos script requieren parámetros.