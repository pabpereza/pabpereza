---
slug: mac-os-en-docker
title: Ejecuta Mac OS en Docker
tags: [macos, docker]
authors: pabpereza 
image: https://img.youtube.com/vi/Xzz8_r48K74/0.jpg
date: 2024-04-09
---

# Ejecuta Mac OS en Docker
Te preguntarás el sentido de ejecutar Mac OS en Docker, la respuesta corta es, why not?, la larga es, para probar aplicaciones, para probar configuraciones, para probar scripts, para probar lo que se te ocurra en macos sin tener un macos y de una forma más cómoda y rápida que una máquina virtual. Veamos como hacerlo.

<!-- truncate -->

[![Ejecuta Mac OS en Docker](https://img.youtube.com/vi/Xzz8_r48K74/0.jpg)](https://youtu.be/Xzz8_r48K74)

## Requisitos
- Docker

Separaremos el proceso de instalación y preparación de requisitos en dos partes, una para linux y otra para windows, dado que el proceso difiere un poco y en windows hay que hacer pasos adicionales. **En ambos necesitaremos tener instalado docker**.

**Si no tienes WSL activado en windows, en este vídeo te enseño como hacerlo**: [Linux en Windows en windows con WSL](https://youtu.be/p04dRcQh2VM)


### Requisitos para linux
Referencia original: https://github.com/sickcodes/Docker-OSX?tab=readme-ov-file#initial-setup

Selecciona tu distribución y sigue los pasos.
```bash
# ARCH
sudo pacman -S qemu libvirt dnsmasq virt-manager bridge-utils flex bison iptables-nft edk2-ovmf

# UBUNTU DEBIAN
sudo apt install qemu qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils virt-manager libguestfs-tools

# CENTOS RHEL FEDORA
sudo yum install libvirt qemu-kvm
```

Por último, para todas las distribuciones activa libvirt y carga el módulo de KVM.
```bash
sudo systemctl enable --now libvirtd
sudo systemctl enable --now virtlogd

echo 1 | sudo tee /sys/module/kvm/parameters/ignore_msrs

sudo modprobe kvm
```

Finalmente, elegimos la versión que queramos de Mac OS y ejecutamos el contenedor.
```bash

docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    -e CPU='Haswell-noTSX' \
    -e CPUID_FLAGS='kvm=on,vendor=GenuineIntel,+invtsc,vmware-cpuid-freq=on' \
    -e MASTER_PLIST_URL='https://raw.githubusercontent.com/sickcodes/osx-serial-generator/master/config-custom-sonoma.plist' \
    sickcodes/docker-osx:sonoma

# docker build -t docker-osx --build-arg SHORTNAME=sonoma .
```




### Rquisitos para windows
Referencia original: https://github.com/sickcodes/Docker-OSX?tab=readme-ov-file#id-like-to-run-docker-osx-on-windows

Tenemos que instalar WSL2 y activar la virtualización anidada en WSL. Tengo un vídeo donde explico como hacerlo: [WSL en Windows](https://youtu.be/Xzz8_r48K74)

Para activar la virtualización anidada, tenemos que crear un archivo ".wslconfig" en la carpeta de usuario con el siguiente contenido (por ejemplo, en `C:\Users\usuario\.wslconfig`:
```bash title=".wslconfig"
[wsl2]
nestedVirtualization=true
```

Dentro del subsistema de linux, instalamos los paquetes necesarios.
```bash
sudo apt -y install bridge-utils cpu-checker libvirt-clients libvirt-daemon qemu qemu-kvm
```

Ahora ya podríamos ejecutar el contenedor, con la diferencia de la ruta del volumen del servidor x11, que en windows es diferente.
```bash

docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /mnt/wslg/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    -e CPU='Haswell-noTSX' \
    -e CPUID_FLAGS='kvm=on,vendor=GenuineIntel,+invtsc,vmware-cpuid-freq=on' \
    -e MASTER_PLIST_URL='https://raw.githubusercontent.com/sickcodes/osx-serial-generator/master/config-custom-sonoma.plist' \
    sickcodes/docker-osx:sonoma

# docker build -t docker-osx --build-arg SHORTNAME=sonoma .
```

Así de simple, ya tendríamos ejecutada nuestro contenedor con una máquina virtual de MacOS. También puedes usar el tag pre-instalado


Finalmente, solo quedaría instalar el sistema operativo y configurar MacOS a nuestro gusto.

Te dejo el proceso completo en el vídeo de youtube

[![Ejecuta Mac OS en Docker](https://img.youtube.com/vi/Xzz8_r48K74/0.jpg)](https://youtu.be/Xzz8_r48K74)
