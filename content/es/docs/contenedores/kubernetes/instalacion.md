---
title: "Instalación"
linkTitle: "Instalación"
weight: 5 
tags: [kubernetes, devops]
description:  
---

La instalación de Kubernetes en un cluster de nodos puede ser un proceso complejo. En esta guía agruparé distintos tutoriales de instalación con distintos motores de contenedores y distintos sistemas operativos.

## Ubuntu Server 22.04 con Containerd

### Nodo maestro
1. Instalar requisitos previos:
```bash
apt install curl apt-transport-https vim git wget gnupg2 \
software-properties-common apt-transport-https ca-certificates uidmap -y
```

2. Desactivar swap:
```bash
swapoff -a
sed -i '/swap/s/^\(.*\)$/#\1/g' /etc/fstab # Auto comenta la línea de swap en fstab
```

3. Cargar módulos necesarios:
```bash
modprobe overlay
modprobe br_netfilter

sudo tee /etc/modules-load.d/k8s.conf <<EOF
overlay
br_netfilter
EOF
```


4. Configurar módulos:
```bash
cat << EOF | tee /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sysctl --system # Aplica la configuración
```

5. Añadir al fichero `/etc/hosts' la IP y el nombre de la máquina (ATENCIÓN: Pon la IP del nodo master si esta configurando un worker). Con esto podremos configurar el cluster con el nombre de la máquina en vez de la IP.
```bash
echo "<IP> <NOMBRE>" >> /etc/hosts
```

6. Instalar containerd:
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

apt update && apt install containerd.io -y
```

7. Configurar containerd:
```bash
mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
```

Dentro del fichero `/etc/containerd/config.toml` hay que cambiar la línea `SystemdCgroup = false` por `SystemdCgroup = true`.


1. Iniciar containerd:
```bash
systemctl enable containerd
systemctl restart containerd
```

9. Instalar kubeadm, kubelet y kubectl:
```bash
# Agrergar repositorio de Kubernetes
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list

# Instalar clave pública de Kubernetes
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add 

# Instalar paquetes
apt update && apt install -y kubelet kubeadm kubectl
# Especificar versión de Kubernetes, por ejemplo:
#apt install -y kubelet=1.24.1-00 kubeadm=1.24.1-00 kubectl=1.24.1-00

# Bloquear actualizaciones automáticas
apt-mark hold kubelet kubeadm kubectl

# Iniciar kubelet
systemctl enable kubelet
```


10. Iniciar cluster master:
```bash
kubeadm init --pod-network-cidr=<rango de IPs para pods> --control-plane-endpoint=<Nombre añañadido en /etc/hosts>:6443
```

10. Configurar kubectl:
```bash
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config
```

11. Instalar red de pods:
Esta paso es importante, tendremos que editar el archivo de configuración de la red de pods para que funcione correctamente. En este caso usaremos Calico, pero puedes usar cualquier otra red de pods que quieras. Debemos especificar en la instrucción CALICO_IPV4POOL_CIDR el rango de IPs que hemos especificado en el paso 9.
```bash
wget https://docs.projectcalico.org/manifests/calico.yaml

# Editar el archivo de configuración de Calico descomentando las líneas. Quedando así:
- name: CALICO_IPV4POOL_CIDR
  value: "rango de IPs para pods"
```

Por ejemplo:
```bash
            # The default IPv4 pool to create on startup if none exists. Pod IPs will be
            # chosen from this range. Changing this value after installation will have
            # no effect. This should fall within `--cluster-cidr`.
            - name: CALICO_IPV4POOL_CIDR
              value: "192.168.0.0/16"
           # The default IPv4 pool to create on startup if none exists. Pod IPs will be
            # chosen from this range. Changing this value after installation will have
            # no effect. This should fall within `--cluster-cidr`.
```

12. Aplicar red de pods:
```bash
kubectl apply -f calico.yaml
```



### Nodo worker
Repeticiones de los pasos 1 a 9 del nodo maestro. Esta vez en el fichero `/etc/hosts` tenemos que añadir la IP y el nombre del nodo maestro.

1. Iniciar cluster worker:
```bash
kubeadm join <Nombre del nodo maestro>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

El token se puede obtener con el comando `kubeadm token list` lanzado en el nodo maestro. Si hubiera expirado, se puede generar uno nuevo con `kubeadm token create`.

El hash se puede obtener con el siguiente comando de openssl. Lo lanzamos en el nodo maestro:
```bash
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'
```
