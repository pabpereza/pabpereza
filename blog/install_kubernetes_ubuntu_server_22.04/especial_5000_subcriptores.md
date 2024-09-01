---
slug: instalacion_kubernetes_ubuntu_server_22.04 
title: Instalación de Kubernetes en Ubuntu Server 22.04 LTS 
tags: [kubernetes, ubuntu]
authors: pabpereza
---

Minimum requirements for practice. 

**⚠️ It is highly recommended to assign fixed IPs to the machines.**


| Server | Hostname | Minimum requirements |
| --- | --- | --- |
| Master | k8s-master | 4GB Ram, 2vcpus |
| Worker | k8s-worker | 4GB Ram, 2vcpus |

## 1. Assembly and update of machines

We need to prepare the virtual machines in our favorite hypervisor (virtualbox, vmware, hyper-v, parallels...).

With the machines ready, we update the operating system:

```bash
sudo apt update && sudo apt -y full-upgrade [ -f /var/run/reboot-required ] && sudo reboot -f

```

## 2. Installation of kubelet, kubeadm and kubectl

When the servers are updated and restarted, we install the kubernetes repositories:

```bash
sudo apt -y install curl apt-transport-https

curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/kubernetes.gpg

echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

```

We install the packages and mark the kubernetes packages as `hold`. This will allow us to keep them in the current version even if we upgrade the machine, ensuring stability:

```bash
sudo apt update
sudo apt -y install wget kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

```

We can confirm the installed packages and versions with the following command:

```bash
kubectl version --client && kubeadm version
```

## 3. Disable SWAP memory and activate kernel features.

Disable swap memory by commenting out the `/etc/fstab` file. You can edit it manually or use the following command to do it automatically:

```bash
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

This is how it looks when the line commented:

```jsx
/dev/disk/by-uuid/65504f19-362f-4fb6-a983-26d3541d5dc7 /boot ext4 defaults 0 1
#/swap.img      none    swap    sw      0       0
```

On the other hand, we use the following commands to activate the necessary features:

```bash
# Enable kernel modules
sudo modprobe overlay
sudo modprobe br_netfilter

# Add some settings to sysctl
sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# Reload sysctl
sudo sysctl --system

```

## 4. Install containerd

You could also use docker or CRI-O, but personally I usually use containerd.

We can do this by launching the following commands:

```bash
# Configure persistent loading of modules
sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF

# Install required packages
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates

# Add Docker repo
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-archive-keyring.gpg

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install containerd
sudo apt update
sudo apt install -y containerd.io

# Configure containerd and start service
sudo mkdir -p /etc/containerd
sudo containerd config default|sudo tee /etc/containerd/config.toml

# restart containerd
sudo systemctl restart containerd
sudo systemctl enable containerd
systemctl status  containerd
```

## 5. Install the master node

We download the images that Kubernetes needs to function. If we skip this step, it will be done automatically during the `init` process. Personally, I like to do it separately to verify that the container engine is working correctly.

```bash
sudo kubeadm config images pull
```

We modify the file `/etc/hosts` to associate the name we want to give to the master node with the machine's IP. In my case, I usually name it `k8scp` so we configure the node with a domain name to facilitate the process with the workers. File `/etc/hosts`:

```
127.0.0.1 localhost 
IP_OF_THE_MACHINE k8scp

```

Start the cluster with `kubeadm init`:

```bash
sudo kubeadm init --pod-network-cidr=172.24.0.0/16 --cri-socket=unix:///run/containerd/containerd.sock --upload-certs --control-plane-endpoint=k8scp
```

Once started, we can copy the configuration file to our base user (avoid using root):

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Si por casualidad no os lo cogiera automáticamente, podríais modificar la variable de entorno donde se define la ruta del fichero config:

```bash
export KUBECONFIG=$HOME/.kube/config
```

Comprobar que el cluster funciona correctamente:

```bash
kubectl cluster-info
```

## 6. Installing the network plugin on the master node.

By default, Kubernetes requires a network manager (CNI) that will create a network to connect all pods together. It is essential for the node to function properly.

There are several alternatives, such as Flannel or Calico. This guide explains the installation of Calico (nothing to do with Cálico Electrónico).

The installation is done through Kubernetes objects declared in .yaml files. We can download the latest version from the [project's releases page](https://github.com/projectcalico/calico/releases). As of now, I am downloading the latest version:

```bash
curl -O https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/tigera-operator.yaml
curl -O https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/custom-resources.yaml
```

Install the operator:

```bash
kubectl create -f tigera-operator.yaml
```

We would have the file `custom-resources.yaml`, which would need to be modified with the network range defined in the `kubeadm init` command. In the case of this guide, it is `172.24.0.0`. We can do it with the following command:

```bash
sed -ie 's/192.168.0.0/172.24.0.0/g' custom-resources.yaml
```

We load the file that we have modified:

```bash
kubectl create -f custom-resources.yaml
```

And finally, we wait for all pods to be in the `ready` state:

```bash
kubectl get pods --all-namespaces -w
```

<aside>
⚠️ Good practice dictates that the master node does not run pods (excluding those of the system itself), as this improves the stability of the cluster. If for some reason, or simply in a testing environment, you can disable this restriction with the following commands:

</aside>

```bash
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```

We can confirm that the node is up and running:

```bash
kubectl get nodes -o wide
```

## Extra 1.  Command autocomplete in bash

Add bash autocomplete for cli. 

```bash
echo 'source <(kubectl completion bash)' >>~/.bashrc

# Reload sourcefile again (located on home)
source .bashrc 
```

## 7.  Add workers

<aside>
⚠️ You must to repeat the steps 1-4 (included) to prepare the virtual machine to install kubernetes.

</aside>

To join a worker on the cluster, we going to use this command:

```bash
kubeadm join \
<control-plane-host>:<control-plane-port> \
--token <token> \
--discovery-token-ca-cert-hash sha256:<hash>
```

The data that you need:

- Control plane host and port, in this case: k8scp:6443
- Token, launch this command on master server:

```bash
kubeadm token create
```

- Discovery token ca, lauch this command on master server again:

```bash
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'
```

<aside>
💡 If you want to see the active tokens: `kubeadm token list`

</aside>

Now, use the completed `kubeadm join` command. If the process It's correct, you could se the node ready using `kubectl get nodes` on master API.

You could add all the workers that you want.

That´s all, see you in the next!