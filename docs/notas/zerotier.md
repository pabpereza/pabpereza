# Zerotier


## Instalación

```bash
curl -s https://install.zerotier.com | sudo bash
```

## Configuración

### Unirse a una red

```bash
sudo zerotier-cli join <id_red>
```

### Verificar estado

```bash
sudo zerotier-cli info
```

### Habilitar en el arranque

```bash
sudo systemctl enable zerotier-one
```

### Iniciar servicio

```bash
sudo systemctl start zerotier-one
```

### Detener servicio

```bash
sudo systemctl stop zerotier-one
```

### Reiniciar servicio

```bash
sudo systemctl restart zerotier-one
```

### Desinstalar

```bash
sudo apt-get remove zerotier-one
```

