---
title: Ansible Galaxy y Collections
sidebar_label: 9. Ansible Galaxy
sidebar_position: 9
---

# Ansible Galaxy y Collections 🌌

Aprende a reutilizar código de la comunidad y a compartir tus propios roles con el mundo.

:::info Video pendiente de grabación
:::

## 9.1. ¿Qué es Ansible Galaxy?

### 🌟 La analogía: el "App Store" de Ansible
Imagina que necesitas configurar un servidor con Docker. Podrías escribir todas las tareas desde cero (instalar dependencias, añadir repositorios, configurar el daemon, etc.), o simplemente descargar un rol ya probado y mantenido por la comunidad.

**Ansible Galaxy** es el repositorio oficial donde miles de desarrolladores comparten roles, collections y plugins listos para usar.

### 🎯 Ventajas de usar Galaxy
*   **Ahorro de tiempo**: No reinventes la rueda. Usa roles probados en producción.
*   **Calidad**: Los roles populares tienen miles de descargas y están bien mantenidos.
*   **Estandarización**: Aprende buenas prácticas viendo código de expertos.
*   **Comunidad**: Contribuye con mejoras y reporta bugs.

### 🌐 Galaxy vs Collections
*   **Galaxy (tradicional)**: Repositorio de roles individuales.
*   **Collections (moderno)**: Paquetes que incluyen roles + módulos + plugins + documentación.

---

## 9.2. Buscando roles en Galaxy

### 🔍 Búsqueda desde línea de comandos

```bash
# Buscar roles relacionados con "docker"
ansible-galaxy search docker

# Buscar con un término más específico
ansible-galaxy search mysql --author geerlingguy

# Ver detalles de un rol específico
ansible-galaxy info geerlingguy.docker
```

### 📊 Output de ejemplo

```bash
$ ansible-galaxy search nginx

Found 523 roles matching your search:

 Name                          Description
 ----                          -----------
 geerlingguy.nginx            Nginx installation for Linux
 jdauphant.nginx              Install and configure nginx
 nginxinc.nginx               Official NGINX role
 ...
```

### 🌐 Búsqueda en la web
La forma más cómoda es buscar en [galaxy.ansible.com](https://galaxy.ansible.com):

*   **Filtros**: Por plataforma (Ubuntu, CentOS, etc.), categoría, autor.
*   **Métricas**: Descargas, estrellas, fecha de última actualización.
*   **Documentación**: README, dependencias, versiones compatibles.

### 💡 Criterios para elegir un buen rol

| Criterio | ¿Qué buscar? |
|----------|-------------|
| **Popularidad** | Más de 1000 descargas, estrellas altas |
| **Mantenimiento** | Última actualización reciente (< 6 meses) |
| **Compatibilidad** | Soporta tu distribución y versión de Ansible |
| **Documentación** | README completo con ejemplos |
| **Licencia** | Open source (MIT, Apache, BSD) |

---

## 9.3. Instalando roles desde Galaxy

### 📥 Instalación básica

```bash
# Instalar un rol (se guarda en ~/.ansible/roles/)
ansible-galaxy install geerlingguy.docker

# Instalar en una ruta específica
ansible-galaxy install geerlingguy.nginx -p ./roles/

# Instalar una versión específica
ansible-galaxy install geerlingguy.mysql,3.4.0
```

### 📦 Usando requirements.yml

Para proyectos profesionales, **nunca instales roles manualmente**. Usa un archivo `requirements.yml` para documentar todas las dependencias.

**`requirements.yml`**
```yaml
---
# Roles desde Galaxy
roles:
  - name: geerlingguy.docker
    version: 6.1.0

  - name: geerlingguy.nginx
    version: 3.1.4

  - name: geerlingguy.mysql
    version: 4.3.3

  - name: geerlingguy.redis
    version: 1.8.0

# Collections
collections:
  - name: community.general
    version: 8.1.0

  - name: ansible.posix
    version: 1.5.4

  - name: amazon.aws
    version: 7.1.0
```

### 🚀 Instalación desde requirements.yml

```bash
# Instalar todos los roles y collections del archivo
ansible-galaxy install -r requirements.yml

# Forzar reinstalación (útil para actualizar)
ansible-galaxy install -r requirements.yml --force

# Instalar en ruta específica
ansible-galaxy install -r requirements.yml -p ./roles/
```

### 🔗 Instalando desde Git

Puedes instalar roles directamente desde repositorios Git (GitHub, GitLab, etc.):

**`requirements.yml`**
```yaml
---
roles:
  # Desde GitHub
  - src: https://github.com/usuario/mi-rol.git
    name: mi_rol_custom
    version: main  # Branch, tag o commit

  # Desde GitLab
  - src: git@gitlab.com:empresa/rol-interno.git
    name: rol_interno
    scm: git

  # Desde Galaxy con nombre personalizado
  - src: geerlingguy.apache
    name: apache_role
    version: 3.2.0
```

---

## 9.4. Usando roles instalados en playbooks

Una vez instalados, los roles se usan como cualquier otro rol local:

### 📝 Ejemplo: Playbook con roles de Galaxy

**`site.yml`**
```yaml
---
- name: Configurar servidor web con roles de Galaxy
  hosts: webservers
  become: yes

  vars:
    # Variables para geerlingguy.docker
    docker_users:
      - deployer
      - jenkins

    # Variables para geerlingguy.nginx
    nginx_vhosts:
      - listen: "80"
        server_name: "ejemplo.com www.ejemplo.com"
        root: "/var/www/ejemplo"

  roles:
    - geerlingguy.docker
    - geerlingguy.nginx
    - geerlingguy.certbot

  post_tasks:
    - name: Verificar que Docker está corriendo
      service:
        name: docker
        state: started
```

### 🔧 Sobrescribiendo variables de roles

Los roles de Galaxy suelen tener muchas variables configurables. Revisa su documentación:

```bash
# Ver variables disponibles de un rol
cat ~/.ansible/roles/geerlingguy.docker/defaults/main.yml

# O en GitHub:
# https://github.com/geerlingguy/ansible-role-docker#role-variables
```

**Ejemplo de sobrescritura:**
```yaml
---
- hosts: servers
  roles:
    - role: geerlingguy.mysql
      vars:
        mysql_root_password: "secreto123"
        mysql_databases:
          - name: wordpress
            encoding: utf8mb4
        mysql_users:
          - name: wpuser
            password: "pass123"
            priv: "wordpress.*:ALL"
```

---

## 9.5. Collections: el nuevo estándar

### 📦 ¿Qué es una Collection?

Una **collection** es un paquete que puede incluir:
*   **Roles**: Como los tradicionales
*   **Módulos**: Nuevas funcionalidades (`aws_ec2`, `docker_container`)
*   **Plugins**: Filtros, callbacks, inventarios
*   **Documentación**: Guías y ejemplos

### 🌍 Collections oficiales importantes

| Collection | Descripción | Ejemplo de uso |
|-----------|-------------|----------------|
| `community.general` | Módulos generales de la comunidad | `timezone`, `snap`, `git_config` |
| `ansible.posix` | Herramientas POSIX/Unix | `mount`, `sysctl`, `firewalld` |
| `amazon.aws` | Servicios de AWS | `ec2`, `s3`, `rds`, `lambda` |
| `azure.azcollection` | Microsoft Azure | `azure_rm_virtualmachine` |
| `google.cloud` | Google Cloud Platform | `gcp_compute_instance` |
| `community.docker` | Gestión de Docker | `docker_container`, `docker_image` |
| `community.mysql` | Base de datos MySQL | `mysql_db`, `mysql_user` |
| `community.kubernetes` | Kubernetes/K8s | `k8s`, `helm` |

### 📥 Instalando collections

```bash
# Instalar una collection
ansible-galaxy collection install community.general

# Instalar versión específica
ansible-galaxy collection install amazon.aws:7.1.0

# Instalar desde requirements.yml
ansible-galaxy collection install -r requirements.yml

# Listar collections instaladas
ansible-galaxy collection list

# Ver información de una collection
ansible-galaxy collection info community.docker
```

### 🗂️ Ubicación de collections

Las collections se instalan en:
*   Sistema: `/usr/share/ansible/collections/`
*   Usuario: `~/.ansible/collections/ansible_collections/`
*   Proyecto: `./collections/ansible_collections/`

### 📝 Usando collections en playbooks

**Opción 1: Declarar a nivel de play**
```yaml
---
- name: Gestionar AWS EC2
  hosts: localhost
  collections:
    - amazon.aws  # Todos los módulos de esta collection están disponibles

  tasks:
    - name: Crear instancia EC2
      ec2_instance:  # Módulo de amazon.aws
        name: servidor-web-01
        instance_type: t3.micro
        image_id: ami-0c55b159cbfafe1f0
        region: us-east-1
        key_name: mi-llave
        state: running
```

**Opción 2: Usar FQCN (Fully Qualified Collection Name)**
```yaml
---
- name: Gestionar Docker
  hosts: servidores
  tasks:
    - name: Crear contenedor Nginx
      community.docker.docker_container:  # FQCN completo
        name: nginx
        image: nginx:latest
        ports:
          - "80:80"
        state: started

    - name: Configurar timezone
      community.general.timezone:  # FQCN completo
        name: Europe/Madrid
```

**Recomendación**: Usa FQCN para evitar conflictos si dos collections tienen módulos con el mismo nombre.

---

## 9.6. Creando y publicando tu propio rol

### 🛠️ Paso 1: Inicializar el rol

```bash
# Crear estructura del rol
ansible-galaxy init mi_rol_apache

# Estructura generada:
# mi_rol_apache/
# ├── README.md
# ├── defaults/
# │   └── main.yml
# ├── files/
# ├── handlers/
# │   └── main.yml
# ├── meta/
# │   └── main.yml
# ├── tasks/
# │   └── main.yml
# ├── templates/
# ├── tests/
# │   ├── inventory
# │   └── test.yml
# └── vars/
#     └── main.yml
```

### 📝 Paso 2: Escribir el código del rol

**`tasks/main.yml`**
```yaml
---
- name: Instalar Apache
  apt:
    name: apache2
    state: present
    update_cache: yes

- name: Configurar virtual host
  template:
    src: vhost.conf.j2
    dest: "/etc/apache2/sites-available/{{ app_name }}.conf"
  notify: Reiniciar Apache

- name: Habilitar sitio
  file:
    src: "/etc/apache2/sites-available/{{ app_name }}.conf"
    dest: "/etc/apache2/sites-enabled/{{ app_name }}.conf"
    state: link
  notify: Reiniciar Apache
```

**`defaults/main.yml`**
```yaml
---
app_name: miapp
app_port: 80
app_root: /var/www/html
```

**`handlers/main.yml`**
```yaml
---
- name: Reiniciar Apache
  service:
    name: apache2
    state: restarted
```

### 📄 Paso 3: Documentar en meta/main.yml

**`meta/main.yml`**
```yaml
---
galaxy_info:
  author: Tu Nombre
  description: Instalación y configuración de Apache
  company: Tu Empresa (opcional)
  license: MIT
  min_ansible_version: "2.14"

  platforms:
    - name: Ubuntu
      versions:
        - focal
        - jammy
    - name: Debian
      versions:
        - bullseye
        - bookworm

  galaxy_tags:
    - web
    - apache
    - httpd
    - webserver

dependencies: []  # Si tu rol necesita otros roles
```

### ✍️ Paso 4: Escribir README.md completo

**`README.md`**
```markdown
# Rol Ansible: mi_rol_apache

Instala y configura Apache en servidores Ubuntu/Debian.

## Requisitos

- Ansible >= 2.14
- Ubuntu 20.04+ o Debian 11+

## Variables

| Variable | Default | Descripción |
|----------|---------|-------------|
| `app_name` | `miapp` | Nombre de la aplicación |
| `app_port` | `80` | Puerto de escucha |
| `app_root` | `/var/www/html` | Directorio raíz |

## Ejemplo de uso

```yaml
- hosts: webservers
  roles:
    - role: mi_rol_apache
      vars:
        app_name: sitio_ejemplo
        app_port: 8080
```

## Licencia

MIT

## Autor

Tu Nombre (@tu_usuario)
```

### 🧪 Paso 5: Probar el rol localmente

```bash
# Ejecutar el test incluido
ansible-playbook tests/test.yml -i tests/inventory

# O crear un playbook de prueba
cat > test-rol.yml <<EOF
---
- hosts: localhost
  become: yes
  roles:
    - mi_rol_apache
EOF

ansible-playbook test-rol.yml
```

### 📤 Paso 6: Publicar en Galaxy

**6.1. Subir a GitHub**
```bash
cd mi_rol_apache
git init
git add .
git commit -m "Versión inicial"
git remote add origin https://github.com/tu_usuario/ansible-role-apache.git
git push -u origin main

# Crear un tag de versión
git tag 1.0.0
git push origin 1.0.0
```

**6.2. Importar en Galaxy**
1. Ve a [galaxy.ansible.com](https://galaxy.ansible.com)
2. Inicia sesión con GitHub
3. Ve a "My Content" → "Add Content"
4. Selecciona tu repositorio `ansible-role-apache`
5. Galaxy importará automáticamente tu rol

**6.3. Actualizar versiones**
```bash
# Hacer cambios en el código
git add .
git commit -m "Añadida compatibilidad con SSL"
git tag 1.1.0
git push origin main --tags

# Galaxy detectará el nuevo tag automáticamente
```

---

## 9.7. Buenas prácticas con Galaxy

### ✅ DO:

*   **Fija versiones en requirements.yml**: Evita sorpresas con actualizaciones.
*   **Lee el README antes de instalar**: Entiende qué hace el rol.
*   **Revisa el código**: Especialmente en roles con pocos downloads.
*   **Contribuye con issues y PRs**: Ayuda a mejorar los roles que usas.
*   **Usa FQCN en collections**: Mayor claridad y evita conflictos.

### ❌ DON'T:

*   **No uses roles sin mantenimiento**: Busca alternativas activas.
*   **No instales sin probar primero**: Usa `--check` mode.
*   **No expongas credenciales**: Usa Ansible Vault para secretos.
*   **No dependas de un solo rol**: Ten un plan B si el autor lo abandona.

### 🔒 Seguridad

```bash
# Verificar el código antes de ejecutar
cat ~/.ansible/roles/nombre_rol/tasks/main.yml

# Ejecutar en modo dry-run
ansible-playbook site.yml --check

# Limitar a un host de pruebas primero
ansible-playbook site.yml --limit test-server
```

---

## 9.8. Creando tu propia collection

### 🎯 Cuándo crear una collection

Crea una collection cuando tengas:
*   Múltiples roles relacionados
*   Módulos personalizados
*   Plugins o filtros custom
*   Documentación extensa

### 🛠️ Inicializar collection

```bash
# Crear estructura de collection
ansible-galaxy collection init mi_namespace.mi_collection

# Estructura generada:
# mi_namespace/
# └── mi_collection/
#     ├── README.md
#     ├── galaxy.yml        # Metadatos de la collection
#     ├── docs/
#     ├── plugins/
#     │   ├── modules/      # Tus módulos custom
#     │   ├── inventory/
#     │   ├── lookup/
#     │   └── filter/
#     ├── roles/            # Roles incluidos
#     └── playbooks/        # Playbooks de ejemplo
```

### 📝 Configurar galaxy.yml

**`galaxy.yml`**
```yaml
---
namespace: mi_namespace
name: mi_collection
version: 1.0.0
readme: README.md
authors:
  - Tu Nombre <email@ejemplo.com>

description: Collection para gestión de infraestructura web

license:
  - MIT

tags:
  - web
  - infrastructure
  - automation

dependencies: {}

repository: https://github.com/tu_usuario/mi_collection
documentation: https://docs.ejemplo.com
homepage: https://ejemplo.com
issues: https://github.com/tu_usuario/mi_collection/issues
```

### 📦 Build y publicar

```bash
# Construir la collection (crea un .tar.gz)
ansible-galaxy collection build

# Publicar en Galaxy (necesitas API key)
ansible-galaxy collection publish mi_namespace-mi_collection-1.0.0.tar.gz --api-key=TU_API_KEY

# Instalar localmente para pruebas
ansible-galaxy collection install ./mi_namespace-mi_collection-1.0.0.tar.gz
```

---

## 9.9. Ejemplo completo: proyecto con Galaxy

**Estructura del proyecto:**
```
mi-proyecto/
├── ansible.cfg
├── requirements.yml
├── inventory/
│   └── hosts.yml
├── group_vars/
│   └── all.yml
├── playbooks/
│   └── site.yml
└── roles/            # Roles locales custom
    └── mi_rol/
```

**`ansible.cfg`**
```ini
[defaults]
roles_path = ./roles:~/.ansible/roles
collections_path = ./collections:~/.ansible/collections
inventory = inventory/hosts.yml
```

**`requirements.yml`**
```yaml
---
roles:
  - name: geerlingguy.docker
    version: 6.1.0
  - name: geerlingguy.nginx
    version: 3.1.4

collections:
  - name: community.general
    version: 8.1.0
  - name: community.docker
    version: 3.4.11
```

**Workflow:**
```bash
# 1. Instalar dependencias
ansible-galaxy install -r requirements.yml

# 2. Ejecutar playbook
ansible-playbook playbooks/site.yml

# 3. Actualizar dependencias cuando sea necesario
ansible-galaxy install -r requirements.yml --force
```

---

## 9.10. Comandos de referencia rápida

```bash
# === ROLES ===
# Buscar roles
ansible-galaxy search <término>

# Instalar rol
ansible-galaxy install <autor>.<rol>

# Instalar desde requirements
ansible-galaxy install -r requirements.yml

# Listar roles instalados
ansible-galaxy list

# Eliminar rol
ansible-galaxy remove <autor>.<rol>

# Ver información de un rol
ansible-galaxy info <autor>.<rol>

# === COLLECTIONS ===
# Buscar collections
ansible-galaxy collection search <término>

# Instalar collection
ansible-galaxy collection install <namespace>.<collection>

# Listar collections instaladas
ansible-galaxy collection list

# Ver información
ansible-galaxy collection info <namespace>.<collection>

# === CREACIÓN ===
# Inicializar rol
ansible-galaxy init <nombre_rol>

# Inicializar collection
ansible-galaxy collection init <namespace>.<collection>

# Build collection
ansible-galaxy collection build

# Publicar collection
ansible-galaxy collection publish <archivo.tar.gz> --api-key=<KEY>
```

---

## Resumen

En este capítulo has aprendido:

✅ **Qué es Ansible Galaxy**: El repositorio oficial de contenido de la comunidad.
✅ **Buscar e instalar roles**: Cómo encontrar y usar roles de calidad.
✅ **Requirements.yml**: Gestión profesional de dependencias.
✅ **Collections**: El nuevo estándar que incluye roles, módulos y plugins.
✅ **Publicar tu contenido**: Comparte tus roles con la comunidad.
✅ **Buenas prácticas**: Seguridad, versiones fijas y documentación.

### 💡 Puntos clave

1.  **No reinventes la rueda**: Usa roles de Galaxy cuando sea posible.
2.  **Fija versiones**: `requirements.yml` es tu mejor amigo.
3.  **Lee el código**: Especialmente de roles con pocos usuarios.
4.  **Contribuye**: Reporta bugs, envía PRs, mejora la comunidad.
5.  **Usa FQCN**: Claridad y compatibilidad a largo plazo.

**Próximo paso:** Optimización y mejores prácticas para proyectos grandes 🚀
