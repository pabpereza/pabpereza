¡Oído cocina! Aquí tienes el artículo técnico definitivo sobre la **ZimaBoard 2**.

He seguido estrictamente la estructura del guion de vídeo (Intro -> Hardware -> Software -> NAS -> Usos Avanzados -> Cierre), pero profundizando en los detalles técnicos (arquitectura Alder Lake-N, buses PCIe, gestión de RAIDs) para que aporte valor extra a quien haya visto el vídeo y quiera "chicha".

Mantenemos el tono *pabpereza*: técnico, directo y sin tonterías.

---

# ZimaBoard 2: Análisis a fondo y Guía de Despliegue (Tu homelab en serio)

Si llevas tiempo en el canal, sabes que me encanta el "cacharreo". Pero hay una línea fina entre cacharrear y sufrir. Llevamos años montando servidores en placas ARM, peleándonos con tarjetas SD que mueren los domingos por la tarde y adaptadores USB que se desconectan solos.

Hoy analizamos la **ZimaBoard 2**. Sobre el papel, promete ser el eslabón perdido entre una Raspberry Pi y un servidor rack ruidoso. ¿Es solo diseño *cyberpunk* o hay una bestia x86 debajo del disipador? Vamos a destriparla siguiendo el flujo de trabajo real de un devops.

## 1. Hardware: Más allá de la estética

Lo primero que impacta es que no parece una placa de desarrollo; parece un producto final. El diseño industrial actúa como un enorme disipador pasivo.

* **Ruido:** 0dB.
* **Refrigeración:** Pasiva (aunque si le vas a meter carga sostenida al 100% de la CPU, un ventilador USB silencioso encima no sobra).

### El corazón: Intel N-Series (Alder Lake-N)

Aquí está el salto generacional. La ZimaBoard 2 monta los procesadores **Intel N100**.
¿Por qué importa esto? Porque pasamos de arquitecturas ARM a instrucciones x86 que son nativamente compatibles con todo el software de servidor que conocemos.

* **Consumo:** Seguimos hablando de un TDP ridículo (6W - 15W bajo carga).
* **Eficiencia:** Puedes tenerla encendida 24/7 sin que tu compañía eléctrica te mande una carta de agradecimiento.


### Conectividad: El «game changer» del PCIe

A diferencia de otras SBCs que te obligan a usar USB para todo, aquí tenemos un puerto **PCIe Gen 3 x4** expuesto en el lateral.
Esto es un bus de datos real, directo a la CPU. Todo esto se complementa con las tarjetas de expansión, ya sean de la propia marca o de terceros. Por ejemplo:

* **¿Quieres almacenamiento NVMe?** Adaptador PCIe a M.2.
* **¿Quieres red 10GbE?** Tarjeta de red PCIe.
* **¿Quieres IA?** Google Coral o GPU Low-Profile.

¡Ah! un detalle crítico: **No tiene Wi-Fi integrado**. Esta podría ser su única pega de hardware... pero francamente, quien monte un NAS o un servidor por WIFI pudiendo aprovechar el puerto Ethernet 2.5GbE, merece todos los males del mundo. 


## 2. Software: CasaOS (La entrada suave)

La placa viene preinstalada con **CasaOS** (o su evolución ZimaOS).
Para los que venís de nuevas, es una interfaz web preciosa que abstrae la complejidad de Docker.

* **Plug and play:** Enchufas red, enchufas corriente, vas a `http://casaos.local` y listo.
* **App store:** Tienes contenedores «curados» (Plex, Home Assistant, Pi-Hole) que se instalan con un clic.

### Para los «máquinas»

Pero aquí somos sysadmins. Lo que hay debajo es un **Debian 11/12** estándar.
Esto significa que puedes pasar olímpicamente de la interfaz web, entrar por SSH y gestionar tu infraestructura como dios manda:

```bash
# Acceso estándar
ssh root@<IP_ZIMA>

# ¿Tienes tus propios dotfiles o docker-compose?
git clone https://github.com/tu-usuario/tu-infraestructura.git
docker compose up -d

```

Al ser arquitectura x86, **todas** las imágenes de Docker Hub funcionan. Se acabó el buscar la etiqueta `arm64` o compilar tú mismo los binarios.


## 3. Proyecto Práctico: Montaje del NAS

El uso más lógico para este dispositivo es convertirlo en el centro de datos de tu casa y luego expandirlo con otros servicios. Vamos a montar un NAS casero con RAID 1 para proteger nuestros datos.

### Conexión física

La ZimaBoard 2 incluye puertos SATA nativos (alimentación + datos). Esto es un plus, porque estoy montando algo similar con la raspberry y necesitas alimentación externa para los discos, lo que complica el cableado y la fiabilidad.

Esta parte de cableado, se ve mejor en el vídeo: 
TODO:

### RAID 1 vs. RAID 5: La eterna duda

Con dos puertos SATA, tu mejor opción es **RAID 1 (Espejo)**. Aunque también puedes expandirlo con un adaptador PCIe a SATA para tener más discos y poder montar un RAID 5 (De estos intentaré montar uno más adelante).

* **RAID 1:** Los datos se escriben en ambos discos a la vez. Si uno muere, el sistema sigue vivo.
* **RAID 5:** Necesita mínimo 3 discos. No te compliques con expansores USB para esto; perderás fiabilidad.

El montaje del RAID se puede hacer muy cómodamente desde la interfaz de CasaOS (llamado ZimaOS en la versión que trae la placa preinstalada).


## 4. Opciones Futuras y Usos Avanzados

Aquí es donde la ZimaBoard 2 justifica su precio frente a una Raspberry Pi.

### A. El router/firewall definitivo

La placa monta **doble puerto Ethernet 2.5GbE**.
Esto te permite instalar **pfSense**, **OPNsense** u **OpenWrt** «bare metal» o virtualizado.

* **Puerto 1 (WAN):** Directo a tu ONT de fibra.
* **Puerto 2 (LAN):** A tu switch.

Tienes un firewall físico capaz de inspeccionar tráfico a velocidades multigigabit sin despeinarse.

### B. Virtualización con Proxmox

Gracias al procesador Intel N100 y (si has elegido bien) 16 GB de RAM, puedes instalar **Proxmox VE**.

* VM 1: Home Assistant OS (domótica).
* VM 2: Docker LXC (contenedores ligeros).
* VM 3: Windows/Linux de pruebas.

### C. Inteligencia artificial local

Usando el puerto PCIe, puedes conectar una TPU (como la Coral) o incluso una GPU externa (con alimentación propia). Esto convierte la ZimaBoard en un NVR perfecto para **Frigate**, detectando personas y coches en tus cámaras de seguridad sin enviar ni un solo byte a la nube.

## 5. Cierre

La **ZimaBoard 2** es una pieza de ingeniería brutal para el entusiasta.

* **Pros:** Estética, silencio, potencia x86, PCIe y puertos 2.5GbE.
* **Contras:** Precio más elevado que un SBC básico y necesidad de periféricos externos para los discos.


*¿Qué montarías tú en el puerto PCIe? ¿Almacenamiento o tarjeta gráfica? Te leo en los comentarios.*