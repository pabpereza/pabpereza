---
title: Templates con Jinja2
sidebar_label: 8. Templates
sidebar_position: 8
slug: templates-jinja2-ansible
---

# Templates con Jinja2 📝

Creación de archivos de configuración dinámicos y personalizados.

:::info Video pendiente de grabación
:::

## 8.1. ¿Por qué necesitamos templates?

Hasta ahora usábamos el módulo `copy` para subir archivos estáticos. Pero, ¿y si cada servidor necesita una configuración ligeramente diferente (su propia IP, su propio nombre, su propio entorno)?

### 📝 La analogía: "Mad Libs" o carta modelo
Imagina una carta del banco. No escriben una carta nueva para cada cliente. Tienen una plantilla:

```jinja
Hola {{ nombre_cliente }}, su saldo actual es de {{ saldo }} euros.
```

Ansible usa **Jinja2** (el motor de plantillas de Python) para rellenar esos huecos justo antes de subir el archivo al servidor.

### 🎯 Ventajas de los Templates
*   **Reutilización**: Una plantilla, miles de configuraciones diferentes.
*   **Mantenimiento**: Cambias la plantilla una vez y se actualiza en todos los servidores.
*   **Adaptabilidad**: Cada servidor recibe su configuración personalizada automáticamente.
*   **Variables Ansible**: Acceso directo a facts, variables de inventario y facts del sistema.

---

## 8.2. Sintaxis Básica de Jinja2

Jinja2 usa tres tipos de delimitadores especiales:

### 📌 Tipos de Expresiones

1.  **`{{ variable }}`**: **Imprimir/Sustituir**
    ```jinja
    Servidor: {{ ansible_hostname }}
    IP: {{ ansible_default_ipv4.address }}
    ```

2.  **`{% directiva %}`**: **Lógica/Control de Flujo**
    ```jinja
    {% if condicion %}
        hacer algo
    {% endif %}

    {% for item in lista %}
        {{ item }}
    {% endfor %}
    ```

3.  **`{# comentario #}`**: **Comentarios** (no aparecen en el archivo final)
    ```jinja
    {# TODO: añadir validación de SSL #}
    ```

### 🔗 Acceso a Variables Anidadas

```jinja
{# Diccionario anidado #}
{{ ansible_default_ipv4.address }}
{{ servidor.config.puerto }}

{# Listas #}
{{ usuarios[0] }}
{{ servidores_web[2].nombre }}
```

---

## 8.3. Variables en Templates

### Variables de Ansible
Todas las variables definidas en tu playbook, inventario o roles están disponibles:

```yaml
# En tu playbook
vars:
  app_name: "MiApp"
  app_version: "2.1.0"
  app_port: 8080
```

```jinja
# En tu template
Aplicación: {{ app_name }}
Versión: {{ app_version }}
Puerto: {{ app_port }}
```

### Facts del Sistema
Ansible recopila automáticamente información del servidor (facts):

```jinja
{# Información del sistema #}
Hostname: {{ ansible_hostname }}
FQDN: {{ ansible_fqdn }}
SO: {{ ansible_distribution }} {{ ansible_distribution_version }}
Arquitectura: {{ ansible_architecture }}

{# Red #}
IP Principal: {{ ansible_default_ipv4.address }}
Gateway: {{ ansible_default_ipv4.gateway }}
Interfaz: {{ ansible_default_ipv4.interface }}

{# Hardware #}
CPUs: {{ ansible_processor_vcpus }}
RAM Total: {{ ansible_memtotal_mb }} MB
```

---

## 8.4. Condicionales en Jinja2

### If / Elif / Else

```jinja
{% if app_env == 'production' %}
    LogLevel warn
    DebugMode off
{% elif app_env == 'staging' %}
    LogLevel info
    DebugMode on
{% else %}
    LogLevel debug
    DebugMode on
{% endif %}
```

### Operadores Lógicos

```jinja
{# AND #}
{% if usuario == 'admin' and permisos == 'total' %}
    AllowFullAccess yes
{% endif %}

{# OR #}
{% if puerto == 80 or puerto == 443 %}
    EnableSSL yes
{% endif %}

{# NOT #}
{% if not modo_mantenimiento %}
    ServerActive yes
{% endif %}

{# IN #}
{% if 'nginx' in servicios_instalados %}
    IncludeNginxConfig yes
{% endif %}
```

---

## 8.5. Bucles en Jinja2

### For Loop Básico

```jinja
# Lista de servidores permitidos
{% for servidor in servidores_permitidos %}
allow {{ servidor }};
{% endfor %}
```

### For con Diccionarios

```jinja
{% for nombre, valor in configuracion.items() %}
{{ nombre }} = {{ valor }}
{% endfor %}
```

### For con Else (cuando la lista está vacía)

```jinja
<ul>
{% for user in usuarios %}
    <li>{{ user }}</li>
{% else %}
    <li>No hay usuarios configurados</li>
{% endfor %}
</ul>
```

### Variables Especiales en Bucles

```jinja
{% for item in lista %}
    Índice: {{ loop.index }}     {# Comienza en 1 #}
    Índice0: {{ loop.index0 }}   {# Comienza en 0 #}
    ¿Es el primero?: {{ loop.first }}
    ¿Es el último?: {{ loop.last }}
    Longitud total: {{ loop.length }}
{% endfor %}
```

---

## 8.6. Filtros Útiles en Jinja2

Los filtros transforman variables. Se aplican con el símbolo `|` (pipe).

### Filtros de Texto

```jinja
{# Mayúsculas/Minúsculas #}
{{ nombre | upper }}          → PABLO
{{ nombre | lower }}          → pablo
{{ nombre | capitalize }}     → Pablo
{{ titulo | title }}          → Mi Aplicación Web

{# Valores por defecto #}
{{ variable_opcional | default('valor_por_defecto') }}

{# Reemplazar #}
{{ ruta | replace('/home', '/usr') }}
```

### Filtros de Listas

```jinja
{# Unir elementos #}
{{ ['web01', 'web02', 'web03'] | join(', ') }}
→ web01, web02, web03

{# Longitud #}
Total de servidores: {{ servidores | length }}

{# Primer/Último elemento #}
{{ servidores | first }}
{{ servidores | last }}

{# Ordenar #}
{{ numeros | sort }}
{{ nombres | sort(reverse=True) }}
```

### Filtros de Números

```jinja
{# Matemáticas #}
{{ precio | round }}           → Redondear
{{ numero | abs }}             → Valor absoluto
{{ valor | int }}              → Convertir a entero
{{ valor | float }}            → Convertir a decimal
```

### Filtros de Archivos/Rutas

```jinja
{{ '/etc/nginx/nginx.conf' | basename }}      → nginx.conf
{{ '/etc/nginx/nginx.conf' | dirname }}       → /etc/nginx
{{ 'archivo.txt' | splitext }}                → ['archivo', '.txt']
```

### Filtros de Formato

```jinja
{# JSON #}
{{ diccionario | to_json }}
{{ diccionario | to_nice_json }}    {# Formateado #}

{# YAML #}
{{ configuracion | to_yaml }}
{{ configuracion | to_nice_yaml }}

{# Escapar HTML #}
{{ texto_usuario | escape }}
```

---

## 8.7. Práctica 1: Configuración de Nginx

Vamos a crear un template para configurar un virtual host de Nginx que se adapte a cada servidor.

### **Template: `templates/nginx-vhost.conf.j2`**

```nginx
# Generado automáticamente por Ansible
# Servidor: {{ ansible_hostname }}
# Fecha: {{ ansible_date_time.date }}

server {
    listen {{ puerto_web | default(80) }};
    server_name {{ dominio }};

    root /var/www/{{ app_name }}/public;
    index index.html index.php;

    # Logs personalizados por entorno
    {% if app_env == 'production' %}
    access_log /var/log/nginx/{{ app_name }}-access.log combined;
    error_log /var/log/nginx/{{ app_name }}-error.log warn;
    {% else %}
    access_log /var/log/nginx/{{ app_name }}-access.log combined;
    error_log /var/log/nginx/{{ app_name }}-error.log debug;
    {% endif %}

    # IPs permitidas (generado desde lista)
    {% if ips_permitidas is defined %}
    {% for ip in ips_permitidas %}
    allow {{ ip }};
    {% endfor %}
    deny all;
    {% endif %}

    location / {
        try_files $uri $uri/ =404;
    }

    # PHP solo en producción
    {% if app_env == 'production' and 'php' in servicios %}
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
    {% endif %}
}
```

### **Playbook: `deploy-nginx.yml`**

```yaml
- name: Configurar Nginx
  hosts: webservers
  vars:
    app_name: miapp
    app_env: production
    dominio: www.ejemplo.com
    puerto_web: 80
    ips_permitidas:
      - 192.168.1.0/24
      - 10.0.0.1
    servicios:
      - nginx
      - php

  tasks:
    - name: Generar configuración de Nginx desde template
      template:
        src: templates/nginx-vhost.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}.conf
        owner: root
        group: root
        mode: '0644'
      notify: Reiniciar Nginx

  handlers:
    - name: Reiniciar Nginx
      service:
        name: nginx
        state: restarted
```

---

## 8.8. Práctica 2: Página HTML Dinámica

Generemos una página de estado del servidor con información en tiempo real.

### **Template: `templates/server-status.html.j2`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Estado de {{ ansible_hostname | upper }}</title>
    <style>
        body { font-family: Arial; margin: 40px; background: #f4f4f4; }
        .card { background: white; padding: 20px; margin: 10px 0; border-radius: 8px; }
        .prod { border-left: 5px solid red; }
        .dev { border-left: 5px solid green; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>🖥️ Panel de Estado del Servidor</h1>

    <div class="card {{ 'prod' if app_env == 'production' else 'dev' }}">
        <h2>Información General</h2>
        <table>
            <tr><th>Hostname</th><td>{{ ansible_hostname }}</td></tr>
            <tr><th>FQDN</th><td>{{ ansible_fqdn }}</td></tr>
            <tr><th>IP Principal</th><td>{{ ansible_default_ipv4.address }}</td></tr>
            <tr><th>Entorno</th><td>{{ app_env | upper }}</td></tr>
            <tr><th>Última actualización</th><td>{{ ansible_date_time.date }} {{ ansible_date_time.time }}</td></tr>
        </table>
    </div>

    <div class="card">
        <h2>Sistema Operativo</h2>
        <table>
            <tr><th>Distribución</th><td>{{ ansible_distribution }} {{ ansible_distribution_version }}</td></tr>
            <tr><th>Kernel</th><td>{{ ansible_kernel }}</td></tr>
            <tr><th>Arquitectura</th><td>{{ ansible_architecture }}</td></tr>
        </table>
    </div>

    <div class="card">
        <h2>Hardware</h2>
        <table>
            <tr><th>CPUs</th><td>{{ ansible_processor_vcpus }}</td></tr>
            <tr><th>RAM Total</th><td>{{ (ansible_memtotal_mb / 1024) | round(2) }} GB</td></tr>
            <tr><th>Swap</th><td>{{ (ansible_swaptotal_mb / 1024) | round(2) }} GB</td></tr>
        </table>
    </div>

    <div class="card">
        <h2>Servicios Configurados</h2>
        <ul>
        {% for servicio in servicios_activos | default([]) | sort %}
            <li>✅ {{ servicio | capitalize }}</li>
        {% else %}
            <li>⚠️ No hay servicios configurados</li>
        {% endfor %}
        </ul>
    </div>

    <div class="card">
        <h2>Interfaces de Red</h2>
        {% for interface in ansible_interfaces %}
            {% if interface != 'lo' %}
            <p><strong>{{ interface }}:</strong>
            {% if ansible_facts[interface]['ipv4'] is defined %}
                {{ ansible_facts[interface]['ipv4']['address'] }}
            {% else %}
                Sin IP asignada
            {% endif %}
            </p>
            {% endif %}
        {% endfor %}
    </div>

    <footer>
        <p style="text-align: center; color: #888; margin-top: 40px;">
            Generado automáticamente por Ansible el {{ ansible_date_time.iso8601 }}
        </p>
    </footer>
</body>
</html>
```

### **Playbook: `deploy-status-page.yml`**

```yaml
- name: Desplegar Página de Estado
  hosts: webservers
  vars:
    app_env: "{{ lookup('env', 'APP_ENV') | default('development', true) }}"
    servicios_activos:
      - nginx
      - mysql
      - redis
      - php-fpm

  tasks:
    - name: Generar página de estado desde template
      template:
        src: templates/server-status.html.j2
        dest: /var/www/html/status.html
        owner: www-data
        group: www-data
        mode: '0644'
```

---

## 8.9. Práctica 3: Archivo de Configuración de Base de Datos

Configuración de MySQL adaptada a cada entorno.

### **Template: `templates/mysql.cnf.j2`**

```ini
# MySQL Configuration for {{ ansible_hostname }}
# Environment: {{ db_env | upper }}
# Generated by Ansible on {{ ansible_date_time.iso8601 }}

[mysqld]
# Configuración básica
user = mysql
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
port = {{ mysql_port | default(3306) }}
datadir = /var/lib/mysql

# Ajuste de memoria según RAM disponible
{% set ram_mb = ansible_memtotal_mb %}
{% if ram_mb < 2048 %}
    {% set buffer_pool = 512 %}
    {% set max_connections = 50 %}
{% elif ram_mb < 8192 %}
    {% set buffer_pool = 1024 %}
    {% set max_connections = 150 %}
{% else %}
    {% set buffer_pool = 4096 %}
    {% set max_connections = 300 %}
{% endif %}

innodb_buffer_pool_size = {{ buffer_pool }}M
max_connections = {{ max_connections }}

# Logs según entorno
{% if db_env == 'production' %}
# Producción: logs mínimos
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
{% else %}
# Desarrollo: logs detallados
log_error = /var/log/mysql/error.log
general_log = 1
general_log_file = /var/log/mysql/general.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 0.5
{% endif %}

# Replicación (solo en producción)
{% if db_env == 'production' and db_role == 'master' %}
server-id = {{ ansible_default_ipv4.address.split('.')[-1] }}
log_bin = /var/log/mysql/mysql-bin.log
binlog_format = ROW
{% elif db_env == 'production' and db_role == 'slave' %}
server-id = {{ ansible_default_ipv4.address.split('.')[-1] }}
relay-log = /var/log/mysql/relay-bin
read_only = 1
{% endif %}

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[client]
port = {{ mysql_port | default(3306) }}
socket = /var/run/mysqld/mysqld.sock
default-character-set = utf8mb4
```

### **Playbook: `configure-mysql.yml`**

```yaml
- name: Configurar MySQL
  hosts: databases
  vars:
    db_env: production
    mysql_port: 3306

  tasks:
    - name: Generar configuración de MySQL
      template:
        src: templates/mysql.cnf.j2
        dest: /etc/mysql/mysql.conf.d/custom.cnf
        owner: root
        group: root
        mode: '0644'
      notify: Reiniciar MySQL

  handlers:
    - name: Reiniciar MySQL
      service:
        name: mysql
        state: restarted
```

---

## 8.10. Resultado de la Ejecución

Cuando ejecutes estos playbooks, Ansible:

1.  **Leerá** el archivo `.j2` de la plantilla.
2.  **Recopilará** los facts del servidor destino (memoria, CPUs, IPs, etc.).
3.  **Evaluará** todas las expresiones Jinja2:
    *   Sustituirá `{{ variables }}`
    *   Ejecutará los `{% if %}` y `{% for %}`
    *   Aplicará los filtros `| upper`, `| round`, etc.
4.  **Generará** el archivo final personalizado para ese servidor específico.
5.  **Subirá** el archivo resultante al destino.

### Ejemplo de Salida Real

Si tu servidor tiene:
*   Hostname: `web01`
*   RAM: 4096 MB
*   IP: `192.168.1.100`

La configuración de MySQL generada será:

```ini
# MySQL Configuration for web01
# Environment: PRODUCTION

[mysqld]
innodb_buffer_pool_size = 1024M
max_connections = 150
server-id = 100
log_bin = /var/log/mysql/mysql-bin.log
```

---

## 8.11. Buenas Prácticas

### ✅ DO:
*   Usa extensión `.j2` para identificar templates.
*   Comenta las secciones complejas con `{# comentario #}`.
*   Usa filtros `| default()` para valores opcionales.
*   Valida el resultado con `--check` y `--diff`.
*   Usa `{{ variable | mandatory }}` para forzar que exista.

### ❌ DON'T:
*   No pongas lógica de negocio compleja en templates (muévela al playbook).
*   No repitas código: usa includes o roles.
*   No olvides escapar datos de usuario con `| escape`.

### 🧪 Validar Templates

```bash
# Ver qué cambiaría sin aplicarlo
ansible-playbook site.yml --check --diff

# Ver el archivo generado antes de subirlo
ansible -m template -a "src=template.j2 dest=/tmp/test.conf" localhost
```

---

## Resumen

Con **Jinja2**, tus configuraciones se adaptan elásticamente a cualquier entorno:
*   📝 **Variables** para personalización
*   🔀 **Condicionales** para lógica adaptativa
*    🔄 **Bucles** para repetición eficiente
*   🎨 **Filtros** para transformación de datos

Un solo template puede generar miles de configuraciones diferentes, manteniendo tu código **DRY** (Don't Repeat Yourself) y profesional.
