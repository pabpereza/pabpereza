
En la parte de osint o fingerprinting, se busca obtener información de los objetivos, para ello se utilizan herramientas como nmap, que nos permite obtener información de los puertos abiertos, servicios, versiones, etc.

La mayoría de sistemas operativos enfocados en pentesting tienen instalado nmap, por lo que no es necesario instalarlo. Por si no estuvieras utilizando kalilinux, parrot, blackarch... etc, podrías instalarlo de la siguiente manera.

## Instalación
En sistemas basados en Debian, podrías instalarlo de la siguiente manera.

```bash
sudo apt install nmap
```

En el caso de sistemas basados en Arch, podrías instalarlo de la siguiente manera.

```bash
sudo pacman -S nmap
```

Para sistemas con paquetes rpm, podrías instalarlo de la siguiente manera.

```bash
sudo dnf install nmap
```

Y por último, para sistemas con paquetería yum, podrías instalarlo de la siguiente manera.

```bash
sudo yum install nmap
```

## Descubrimiento de hosts
Los primero que haremos será descubrir los hosts que están en la red, para ello utilizaremos el comando `nmap`, con el parámetro `-sn`, que nos permite realizar un escaneo ping, para descubrir los hosts que están en la red.

```bash
nmap -sn <rango de ips>
```

Los ragos en de IPs en nmap, se pueden definir de la siguiente manera.

```bash
nmap -sn 192.168.1.0-254 # Rango de IPs específico
nmap -sn 192.168.0-32.0-254 # Múltiples rangos específicos
nmap -sn 192.168.1.0/24 # Rango de IPs con máscara de red
```

RECUERDA: Un escaneo ping utiliza el protocolo ICMP, el cual es bloqueado por muchos cortafuegos, por lo que no siempre funcionará. Como alternativa, podrías utilizar el comando `arp-scan`, que utiliza el protocolo ARP, el cual no es bloqueado por los cortafuegos.

```bash
arp-scan -l # Escaneo de hosts en la red
```

## Tipos de escaneos
Nmap tiene múltiples opciones para realizar escaneos de puertos usando diferentes técnicas y combinaciones de flags en los paquetes TCP y UDP. En esta sección, se explicarán los escaneos más comunes.

### Syn Scan (Escaneo TCP SYN)
El escaneo TCP SYN es el más común y el más rápido. Este escaneo envía paquetes TCP SYN a los puertos especificados y espera una respuesta. Si el puerto está abierto, el objetivo responde con un paquete TCP SYN/ACK. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sS <ip>
```

### Connect Scan (Escaneo TCP Connect)
El escaneo TCP Connect es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP SYN/ACK. Si el puerto está abierto, el objetivo responde con un paquete TCP ACK. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sT <ip>
```

### Ack Scan (Escaneo TCP ACK)
El escaneo TCP ACK es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP ACK. Si el puerto está abierto, el objetivo responde con un paquete TCP RST. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sA <ip>
```

### Window Scan (Escaneo TCP Window)
El escaneo TCP Window es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP SYN/ACK con el flag de ventana en 0. Si el puerto está abierto, el objetivo responde con un paquete TCP RST. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sW <ip>
```

### Null Scan (Escaneo TCP Null)
El escaneo TCP Null es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP con todos los flags en 0. Si el puerto está abierto, el objetivo responde con un paquete TCP RST. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sN <ip>
```

### Fin Scan (Escaneo TCP Fin)
El escaneo TCP Fin es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP FIN. Si el puerto está abierto, el objetivo responde con un paquete TCP RST. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sF <ip>
```

### Xmas Scan (Escaneo TCP Xmas)
El escaneo TCP Xmas es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP con los flags de urgente, push y fin en 1. Si el puerto está abierto, el objetivo responde con un paquete TCP RST. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sX <ip>
```

### Idle Scan (Escaneo TCP Idle)
El escaneo TCP Idle es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes TCP con el flag de urgente en 1. Si el puerto está abierto, el objetivo responde con un paquete TCP RST. Si el puerto está cerrado, el objetivo responde con un paquete TCP RST. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sI <ip>
```

### UDP Scan (Escaneo UDP)
El escaneo UDP es similar al escaneo TCP SYN, pero en lugar de enviar paquetes TCP SYN, envía paquetes UDP. Si el puerto está abierto, el objetivo responde con un paquete UDP. Si el puerto está cerrado, el objetivo no responde. Si el puerto está filtrado, el objetivo no responde.

```bash
nmap -sU <ip>
```

## Escaneo de puertos
Nmap tiene múltiples opciones para realizar escaneos como ya hemos visto. Si no especificamos nada, por defecto, nmap realiza un escaneo de puertos TCP SYN. 

El escaneo básico que podríamos hacer es el siguiente:

```bash
nmap <ip>
```

Si quisiéramos realizar un escaneo de puertos UDP, podríamos hacerlo de la siguiente forma:

```bash
nmap -sU <ip>
```

### Filtrado de puertos
Podemos filtrar los puertos que queremos escanear de la siguiente forma:
```bash
nmap -p 1-100 <ip>
```
También podríamos especificar puertos individuales:
```bash
nmap -p 1,2,3,4,5 <ip>
```

O una combinación de ambos:
```bash
nmap -p 1-100,200,300,400 <ip>
```

### Banner Grabbing o obtención de banners
Nmap se conecta a un puerto y obtiene la información que nos devuelve. Esta información se conoce como banner. Podemos obtener esta información de la siguiente forma:
```bash
nmap -sV <ip>
```

### Escaneo de puertos con scripts
Nmap tiene una gran cantidad de scripts que podemos utilizar para realizar escaneos más avanzados. Podemos ver la lista de scripts disponibles con el siguiente comando:
```bash
nmap --script-help
```

Para ejecutar un script en concreto, podemos hacerlo de la siguiente forma:
```bash
nmap --script=<script> <ip>
```

Algunos scripts tienen argumentos que podemos pasarle. Para ver los argumentos de un script, podemos hacerlo de la siguiente forma:
```bash
nmap --script-help=<script>
```

Cuando tenemos claro como funciona un script, podemos ejecutarlo de la siguiente forma:
```bash
nmap --script=<script> --script-args=<argumentos> <ip>
```

Por último, nmap tiene una opción para ejecutar automáticamente los scripts recomendados a cada puerto automáticamente (Es muy lento y poco efectivo si la máquina tiene muchos puertos abiertos). Podemos hacerlo de la siguiente forma:
```bash
nmap -sC <ip>
```

## Combinaciones comunes
Estos serían algunos ejemplos de escaneos más comunes que podríamos realizar:
```bash
nmap -v -p- <ip> # Escaneo de todos los puertos de una máquina 
```

Cuando sabemos todos los puertos abiertos de una máquina, podemos realizar un escaneo de servicios para obtener información más detallada de cada uno de ellos. Es importante no volver a escanear todos los puertos y centrarnos solo en los abiertos para ahorrar tiempo y recursos. Podemos hacerlo de la siguiente forma:
```bash
nmap -v -sV -p <puertos abiertos> <ip> # Escaneo de servicios de los puertos abiertos de una máquina
```











