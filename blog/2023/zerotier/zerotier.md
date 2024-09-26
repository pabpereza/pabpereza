---
slug: zerotier-cli-linux-instalacion 
title: ZeroTier - Qué es y Cómo Instalar su CLI en Linux 
tags: [ redes, linux]
authors: pabpereza
date: 2023-01-19
---



# Guía Completa sobre ZeroTier: Qué es y Cómo Instalar su CLI en Linux

## ¿Qué es ZeroTier?

ZeroTier es una herramienta de red definida por software (SDN, por sus siglas en inglés) que permite crear redes virtuales seguras, privadas y fáciles de configurar. Funciona como una VPN (Red Privada Virtual), pero con mayor flexibilidad y simplicidad en la configuración. ZeroTier permite conectar dispositivos en diferentes ubicaciones físicas como si estuvieran en la misma red local (LAN), lo que facilita la comunicación entre ellos sin la necesidad de complicadas configuraciones de firewall, NAT o túneles.

<!-- truncate -->

Algunas de las principales características de ZeroTier incluyen:

- **Cifrado extremo a extremo**: Toda la comunicación está cifrada con estándares de alta seguridad.
- **Conexiones P2P**: Los dispositivos conectados a través de ZeroTier se comunican de forma directa cuando es posible, mejorando el rendimiento.
- **Multi-plataforma**: Disponible en Linux, Windows, macOS, Android, iOS, y más.
- **Escalabilidad**: Desde redes pequeñas hasta infraestructuras a gran escala.
- **Fácil integración con redes locales y virtuales**.

## ¿Por qué elegir ZeroTier?

ZeroTier destaca por su facilidad de uso y su capacidad para conectar dispositivos a través de diferentes redes físicas con una configuración mínima. Para administradores de sistemas, equipos de desarrollo y usuarios avanzados, ZeroTier es una solución poderosa cuando se necesita una red virtual privada sin complicaciones de configuración complejas. A diferencia de soluciones como OpenVPN o WireGuard, ZeroTier puede autogestionar las rutas entre dispositivos, lo que lo hace mucho más fácil de configurar.

### Casos de uso comunes de ZeroTier

1. **Acceso remoto a redes internas**: Útil para equipos que trabajan de forma remota y necesitan acceder a recursos locales.
2. **Juegos en red**: Jugar videojuegos en red con amigos en diferentes ubicaciones como si estuvieran en la misma LAN.
3. **IoT y redes de dispositivos**: Conectar dispositivos IoT distribuidos en diferentes ubicaciones geográficas.
4. **Desarrollo y pruebas**: Crear entornos de desarrollo distribuidos para simular infraestructuras de red complejas.

## Instalación de ZeroTier CLI en Linux

ZeroTier ofrece un cliente de línea de comandos (CLI) que permite gestionar redes virtuales directamente desde la terminal de Linux. A continuación, te explicamos cómo instalar y configurar el cliente en distribuciones basadas en Debian y Red Hat.

### Paso 1: Agregar el repositorio de ZeroTier

Primero, necesitas agregar el repositorio oficial de ZeroTier a tu sistema para poder instalar el paquete a través de tu gestor de paquetes. Dependiendo de tu distribución, los pasos pueden variar ligeramente.

#### En distribuciones basadas en Debian/Ubuntu

1. Abre la terminal y añade la clave GPG de ZeroTier:

    ```bash
    curl -s https://pgp.mit.edu/pks/lookup?op=get&search=0x1657198823E52A61 | gpg --import
    ```

2. Añade el repositorio de ZeroTier a la lista de fuentes de tu sistema:

    ```bash
    echo "deb http://download.zerotier.com/debian/buster buster main" | sudo tee /etc/apt/sources.list.d/zerotier.list
    ```

3. Actualiza la lista de paquetes:

    ```bash
    sudo apt update
    ```

4. Instala ZeroTier:

    ```bash
    sudo apt install zerotier-one
    ```

#### En distribuciones basadas en Red Hat/Fedora

1. Añade el repositorio de ZeroTier:

    ```bash
    sudo dnf config-manager --add-repo https://download.zerotier.com/redhat/zerotier.repo
    ```

2. Instala ZeroTier:

    ```bash
    sudo dnf install zerotier-one
    ```

### Paso 2: Iniciar el servicio de ZeroTier

Después de instalar ZeroTier, inicia el servicio de red. Esto se hace ejecutando el siguiente comando:

```bash
sudo systemctl start zerotier-one
```

También puedes habilitar el servicio para que se inicie automáticamente al arrancar el sistema:

```bash
sudo systemctl enable zerotier-one
```

### Paso 3: Unirse a una red

Una vez que ZeroTier está en funcionamiento, puedes unirte a una red existente. Las redes de ZeroTier tienen un identificador único de 16 caracteres que se utiliza para conectar diferentes dispositivos. Para unirte a una red, utiliza el siguiente comando:

```bash
sudo zerotier-cli join <network_id>
```

Por ejemplo, si el ID de la red es `8056c2e21c000001`, el comando sería:

```bash
sudo zerotier-cli join 8056c2e21c000001
```

### Paso 4: Verificar la conexión

Para verificar que te has unido correctamente a la red y ver el estado de las interfaces de red, usa:

```bash
sudo zerotier-cli listnetworks
```

Este comando te mostrará todas las redes a las que estás conectado, junto con la información de las interfaces de red.

### Paso 5: Autorizar dispositivos (opcional)

Si eres el administrador de la red, puede que necesites autorizar el dispositivo que se ha unido. Para hacerlo, inicia sesión en el panel de control web de ZeroTier en [https://my.zerotier.com](https://my.zerotier.com), selecciona la red y habilita el dispositivo conectado.

### Paso 6: Dejar una red

Si en algún momento deseas dejar una red, puedes hacerlo con el siguiente comando:

```bash
sudo zerotier-cli leave <network_id>
```

### Paso 7: Desinstalar ZeroTier

Si por alguna razón deseas desinstalar ZeroTier de tu sistema, puedes hacerlo usando el siguiente comando en Debian/Ubuntu:

```bash
sudo apt remove zerotier-one
```

En Red Hat/Fedora, usa:

```bash
sudo dnf remove zerotier-one
```

## Comandos Esenciales de ZeroTier CLI

El CLI de ZeroTier proporciona una serie de comandos que permiten gestionar redes, obtener información del estado de la red y solucionar problemas. Aquí tienes algunos de los comandos más útiles:

### Ver el estado del cliente ZeroTier

Para obtener un resumen del estado actual del cliente ZeroTier, incluyendo tu dirección ZeroTier y si estás conectado a alguna red:

```bash
sudo zerotier-cli info
```

Este comando devolverá algo como:

```bash
200 info <version> <node_id> ONLINE
```

- `<version>`: La versión de ZeroTier instalada.
- `<node_id>`: El identificador único de tu nodo.
- `ONLINE`: El estado de tu nodo.

### Listar las redes a las que estás conectado

Este comando te muestra todas las redes a las que está conectado tu nodo ZeroTier:

```bash
sudo zerotier-cli listnetworks
```

### Verificar las rutas

Para ver las rutas configuradas en tu nodo (importante para gestionar el tráfico a través de redes específicas):

```bash
sudo zerotier-cli listpeers
```

### Unirse a una red

Como se mencionó anteriormente, el comando para unirse a una red es:

```bash
sudo zerotier-cli join <network_id>
```

### Dejar una red

Para salir de una red específica:

```bash
sudo zerotier-cli leave <network_id>
```

### Actualizar el cliente ZeroTier

Para actualizar ZeroTier a la última versión (en distribuciones basadas en Debian/Ubuntu):

```bash
sudo apt update && sudo apt upgrade zerotier-one
```

## Conclusión

ZeroTier es una herramienta increíblemente potente y fácil de usar para crear redes virtuales privadas. Su simplicidad de instalación y configuración, combinada con su seguridad y flexibilidad, lo hacen ideal para una variedad de casos de uso, desde acceso remoto hasta redes IoT.

Si estás buscando una manera eficiente de conectar dispositivos a través de diferentes redes físicas sin la molestia de una configuración compleja, ZeroTier es sin duda una solución a considerar.