---
title: Inventarios y Comandos Ad-Hoc
sidebar_label: 3. Inventarios
sidebar_position: 3
---

# Inventarios y comandos ad-hoc 📋

Aprende a definir tus objetivos y ejecutar tareas rápidas sin escribir Playbooks.

:::info Video pendiente de grabación
:::

## 3.1. inventario estático (hosts, grupos)

Antes de que Ansible pueda configurar algo, necesita saber **qué** está configurando. Aquí es donde entra el **Inventario**.

### 📞 La analogía: la agenda del móvil
Imagina tu lista de contactos en el teléfono. No tienes a todo el mundo mezclado sin orden. Probablemente los tengas organizados mentalmente (o con etiquetas):
- **Familia**: Mamá, Papá, Hermanos.
- **Trabajo**: Jefe, RRHH, Equipo DevOps.
- **Amigos**: Los del fútbol, Los de la uni.

Si quieres enviar un mensaje de "¡Feliz Navidad!" a todos, no vas uno por uno; seleccionas el grupo "Familia" o "Amigos".

En Ansible, el **inventario** es esa agenda. Es un archivo donde listas las direcciones IP o nombres de dominio de tus servidores y los organizas en **grupos** para aplicar automatizaciones de forma masiva.

### Formatos: INI vs YAML

Ansible soporta dos formatos principales para definir inventarios estáticos: el clásico **INI** y el moderno **YAML**.

#### Formato INI (el clásico)
Es simple, fácil de leer para humanos y muy parecido a los archivos de configuración antiguos de Windows.

```ini
# inventory.ini

[webservers]
web01.empresa.com
web02.empresa.com

[dbservers]
db01.empresa.com

[production:children]
webservers
dbservers
```

#### Formato YAML (El Recomendado) ✅
Aunque INI es más corto, **te recomiendo encarecidamente usar YAML**. ¿Por qué? Porque es consistente con el resto de Ansible (Playbooks, Roles) y maneja mucho mejor las variables complejas.

```yaml
# inventory.yml
all:
  children:
    webservers:
      hosts:
        web01.empresa.com:
        web02.empresa.com:
    dbservers:
      hosts:
        db01.empresa.com:
    production:
      children:
        webservers:
        dbservers:
```

### Conceptos Clave

#### 1. Grupos y Hosts
Los **Hosts** son las máquinas individuales. Los **Grupos** son conjuntos de hosts. Un host puede pertenecer a múltiples grupos (ej: `web01` puede estar en `webservers` y en `madrid_datacenter`).

#### 2. Grupos de Grupos (`children`)
Esta es una característica potente. Puedes crear "meta-grupos".
En el ejemplo anterior, el grupo `production` no contiene servidores directamente, sino que contiene a los grupos `webservers` y `dbservers`. Si ejecutas una tarea contra `production`, Ansible la ejecutará en todos los servidores web y de base de datos.

#### 3. Variables de Inventario
Puedes asignar variables directamente en el inventario (aunque es mejor práctica usar `group_vars` y `host_vars` para mantener el orden).

```yaml
# inventory.yml con variables
webservers:
  hosts:
    web01.empresa.com:
      http_port: 8080  # Variable específica para este host
  vars:
    ansible_user: admin  # Variable para todo el grupo webservers
```

### Host Patterns: Selección Precisa de Objetivos

Los **host patterns** son la forma de especificar sobre qué hosts quieres ejecutar comandos o playbooks. Es como el lenguaje para "apuntar" a tus máquinas.

#### Patrones Básicos

| Patrón | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `all` o `*` | Todos los hosts del inventario | `ansible all -m ping` |
| `hostname` | Un host específico | `ansible web01.empresa.com -m ping` |
| `groupname` | Todos los hosts de un grupo | `ansible webservers -m ping` |
| `host1:host2` | Múltiples hosts o grupos (OR lógico) | `ansible webservers:dbservers -m ping` |
| `host1:&host2` | Intersección (hosts en ambos grupos) | `ansible webservers:&production -m ping` |
| `host1:!host2` | Exclusión (hosts en host1 pero NO en host2) | `ansible webservers:!staging -m ping` |

#### Patrones con Comodines y Rangos

```bash
# Wildcards (comodines)
ansible web* -m ping          # web01, web02, webserver, etc.
ansible *.empresa.com -m ping # Todos los .empresa.com

# Rangos numéricos
ansible web[01:10] -m ping    # web01, web02, ... web10
ansible web[01:10:2] -m ping  # web01, web03, web05, web07, web09 (salto de 2)

# Rangos alfabéticos
ansible web[a:d] -m ping      # weba, webb, webc, webd
```

#### Ejemplos Prácticos de Patrones

```bash
# Todos los webservers excepto el de staging
ansible webservers:!staging -m service -a "name=nginx state=restarted"

# Solo los servidores que son webservers Y están en producción
ansible webservers:&production -m apt -a "name=nginx state=latest"

# Webservers O dbservers (unión de ambos grupos)
ansible webservers:dbservers -m shell -a "df -h"

# Patrones complejos combinados
ansible webservers:&production:!maintenance -m ping
# (webservers EN producción y NO en mantenimiento)
```

:::tip Uso con --limit
Puedes usar patrones con la opción `--limit` en tus playbooks para restringir la ejecución:
```bash
ansible-playbook deploy.yml --limit "webservers:&production"
```
:::

## 3.2. Inventarios Dinámicos (Cloud)

### El Problema del Inventario Estático

En un entorno tradicional on-premise, los servidores son como mascotas: tienen nombre, los cuidas y rara vez cambian de IP. Un archivo de texto estático funciona bien.

Pero en la **Nube** (AWS, Azure, Google Cloud), los servidores son ganado. Se crean y destruyen automáticamente según la demanda (Auto Scaling). Mantener un archivo `inventory.yml` a mano es imposible; estaría desactualizado en minutos.

### La Solución: Inventory Plugins

Antiguamente se usaban scripts ejecutables complejos. Hoy en día, Ansible utiliza **Inventory Plugins**. Estos plugins consultan la API de tu proveedor de nube en tiempo real para saber qué máquinas existen **ahora mismo**.

#### ¿Cómo funciona?

```mermaid
flowchart LR
    A[Ansible Controller] -->|1. Lee config plugin| B(Inventory Plugin\naws_ec2 / azure_rm)
    B -->|2. API Request| C[Cloud Provider\nAWS / Azure / GCP]
    C -->|3. JSON Response\nLista de Instancias| B
    B -->|4. Genera Inventario en Memoria| A
    style A fill:#EE0000,color:white
    style C fill:#FF9900,color:black
```

1. Ansible lee la configuración del plugin (ej: "dame todas las máquinas con el tag `Environment: Production`").
2. El plugin pregunta a la nube.
3. La nube responde con la lista actual.
4. Ansible ejecuta el Playbook sobre esa lista fresca.

### Caso Práctico: AWS EC2 Plugin

Para usar el inventario dinámico con AWS, usamos el plugin `aws_ec2`. El archivo de configuración debe terminar en `aws_ec2.yml` o `aws_ec2.yaml`.

#### Ejemplo de configuración (`demo_aws_ec2.yml`)

```yaml
# demo_aws_ec2.yml
plugin: aws_ec2

# Regiones donde buscar
regions:
  - us-east-1
  - eu-west-1

# Filtros: Solo quiero instancias que estén corriendo
filters:
  instance-state-name: running

# Agrupación automática (La magia ✨)
# Crea grupos de Ansible basados en tags de AWS
keyed_groups:
  - key: tags.Environment
    prefix: env
    separator: "_"
  - key: tags.Role
    prefix: role
    separator: "_"

# Variables de host
compose:
  ansible_host: public_ip_address
```

#### Resultado
Si tienes una instancia en AWS con los tags `Environment: Production` y `Role: Webserver`, Ansible generará automáticamente los grupos:
- `env_Production`
- `role_Webserver`

Ahora puedes lanzar tu playbook así:

```bash
ansible-playbook deploy.yml -i demo_aws_ec2.yml --limit env_Production
```

## 3.3. Comandos Ad-Hoc (ping, shell, setup)

### ¿Ad-Hoc o Playbook?

Hasta ahora hemos hablado de automatización, pero a veces no necesitas escribir una "receta" completa (Playbook) para algo sencillo.

*   **Playbooks**: Son como la **artillería pesada**. Orquestación compleja, múltiples pasos, idempotencia garantizada, guardados en Git. Úsalos para despliegues y configuraciones.
*   **Comandos Ad-Hoc**: Son como un **francotirador**. Tareas rápidas, de una sola vez, diagnósticos o comprobaciones rápidas. No se suelen guardar.

**¿Cuándo usar Ad-Hoc?**
- "¿Están todos los servidores encendidos?"
- "Necesito reiniciar Nginx en todos los frontales YA."
- "¿Qué versión de Kernel tienen mis máquinas?"
- "Copia este archivo de log a mi máquina local."

### Sintaxis Básica

La estructura es simple:

```bash
ansible [grupo_o_host] -i [inventario] -m [modulo] -a "[argumentos]"
```

- `-m`: El módulo a usar (ping, shell, copy, apt...).
- `-a`: Los argumentos específicos del módulo (si los necesita).

### Tabla de Módulos Comunes para Ad-Hoc

| Módulo | Uso Principal | Ejemplo |
| :--- | :--- | :--- |
| **ping** | Verificar conectividad y autenticación SSH (no es un ping ICMP). | `ansible all -m ping` |
| **command** | Ejecutar comandos simples (sin pipes `|` ni redirecciones `>`). Es el default. | `ansible web -m command -a "uptime"` |
| **shell** | Ejecutar comandos complejos de shell (con pipes, variables de entorno, etc). | `ansible db -m shell -a "ps aux | grep mysql"` |
| **apt / yum** | Instalar o actualizar paquetes rápidamente. | `ansible all -m apt -a "name=vim state=latest"` |
| **service** | Gestionar servicios (start, stop, restart). | `ansible web -m service -a "name=nginx state=restarted"` |
| **setup** | **¡Importante!** Recolecta y muestra los "Facts" (información del sistema). | `ansible localhost -m setup` |

### Ejemplos Prácticos

#### 1. Verificar conexión masiva
El "Hola Mundo" de Ansible. Si esto responde "pong" en verde, tienes acceso SSH y Python instalado.

```bash
ansible all -m ping
```

#### 2. Reiniciar un servicio en producción
Imagina que hay una incidencia y necesitas reiniciar Apache en 50 servidores.

```bash
ansible webservers -m service -a "name=apache2 state=restarted" --become
```
*(Nota: `--become` es para usar sudo)*

#### 3. Espiar los "Facts" de un servidor
El módulo `setup` es increíblemente útil. Te devuelve un JSON gigante con toda la info de la máquina: IPs, memoria, discos, SO, etc.

```bash
ansible web01 -m setup
```
Puedes filtrar para ver solo lo que te interesa:
```bash
ansible web01 -m setup -a "filter=ansible_distribution*"
# Salida: Ubuntu, CentOS, RedHat...
```
