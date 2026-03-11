---
title: Include, Import y Control Avanzado
sidebar_label: 13. Include e Import
sidebar_position: 13
---

# Include, Import y Control Avanzado de Tareas 📦

Reutilizar código, delegar tareas y controlar la ejecución en entornos complejos.

:::info Video pendiente de grabación
:::

## 13.1. El Problema: Playbooks Gigantes

Cuando tu infraestructura crece, los playbooks crecen con ella. Un archivo de 500 líneas es difícil de leer, mantener y reutilizar. La solución es **dividir y conquistar**.

### 🧩 La Analogía: Los Bloques de LEGO

No construyes una nave espacial de LEGO con una sola pieza. Usas bloques pequeños y reutilizables que encajas juntos. `include` e `import` son el sistema de encaje de tus bloques Ansible.

---

## 13.2. `import_tasks` vs `include_tasks`: La Diferencia Clave

Ansible tiene dos formas de incluir tareas externas. Parecen iguales, pero funcionan de forma muy diferente.

### La Regla Rápida

| Característica | `import_tasks` | `include_tasks` |
|---------------|----------------|-----------------|
| **Cuándo se procesa** | Al cargar el playbook (estático) | Al ejecutar la tarea (dinámico) |
| **Tags** | Se aplican a las tareas importadas | NO se propagan automáticamente |
| **Condicionales** | Se aplican a CADA tarea | Se evalúan UNA vez |
| **Loops** | NO funciona con loops | Funciona con loops |
| **Rendimiento** | Más rápido (pre-procesado) | Más flexible (runtime) |

### 📺 La Analogía: DVD vs Streaming

- **`import_tasks`** es como un DVD: todo el contenido se carga al principio. Es rápido porque ya está ahí, pero no puedes cambiar la película a mitad de camino.
- **`include_tasks`** es como streaming: el contenido se carga bajo demanda. Es más flexible pero requiere decisiones en tiempo real.

---

## 13.3. `import_tasks`: Inclusión Estática

Las tareas se "pegan" en el playbook antes de ejecutarse, como si las hubieras escrito directamente ahí.

### Estructura de Archivos

```
proyecto/
├── playbooks/
│   └── site.yml
└── tasks/
    ├── instalar-paquetes.yml
    ├── configurar-nginx.yml
    └── configurar-firewall.yml
```

### Archivos de Tareas

```yaml
# tasks/instalar-paquetes.yml
---
- name: Actualizar caché de paquetes
  apt:
    update_cache: yes
    cache_valid_time: 3600

- name: Instalar paquetes base
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - curl
    - git
    - htop
```

```yaml
# tasks/configurar-nginx.yml
---
- name: Copiar configuración de Nginx
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/default
  notify: Reiniciar Nginx

- name: Activar sitio
  file:
    src: /etc/nginx/sites-available/default
    dest: /etc/nginx/sites-enabled/default
    state: link
```

### Playbook Principal

```yaml
# playbooks/site.yml
---
- name: Configurar servidor web
  hosts: webservers
  become: yes

  tasks:
    - name: Instalar paquetes necesarios
      import_tasks: ../tasks/instalar-paquetes.yml
      tags: install

    - name: Configurar Nginx
      import_tasks: ../tasks/configurar-nginx.yml
      tags: config

    - name: Configurar firewall
      import_tasks: ../tasks/configurar-firewall.yml
      tags: security

  handlers:
    - name: Reiniciar Nginx
      systemd:
        name: nginx
        state: restarted
```

### Ventaja con Tags

Como `import_tasks` es estático, los tags se propagan. Esto funciona:

```bash
# Ejecutar solo las tareas de instalación
ansible-playbook site.yml --tags install
# ✅ Ejecuta las tareas de instalar-paquetes.yml
```

---

## 13.4. `include_tasks`: Inclusión Dinámica

Las tareas se cargan **en tiempo de ejecución**. Esto permite usar variables, condicionales y loops para decidir qué incluir.

### Caso de Uso: Playbook Multi-OS

```yaml
---
- name: Configurar servidor según el sistema operativo
  hosts: all
  become: yes

  tasks:
    - name: Incluir tareas específicas del OS
      include_tasks: "tasks/{{ ansible_os_family | lower }}.yml"
      # Si es Ubuntu → tasks/debian.yml
      # Si es CentOS → tasks/redhat.yml
```

```yaml
# tasks/debian.yml
---
- name: Instalar paquetes en Debian/Ubuntu
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - apache2
    - libapache2-mod-php

# tasks/redhat.yml
---
- name: Instalar paquetes en RedHat/CentOS
  yum:
    name: "{{ item }}"
    state: present
  loop:
    - httpd
    - php
```

### Caso de Uso: Include con Loop

```yaml
- name: Configurar múltiples aplicaciones
  include_tasks: tasks/deploy-app.yml
  loop:
    - { name: 'frontend', port: 3000 }
    - { name: 'backend', port: 8080 }
    - { name: 'api', port: 5000 }
  loop_control:
    loop_var: app
```

```yaml
# tasks/deploy-app.yml
---
- name: "Crear directorio para {{ app.name }}"
  file:
    path: "/opt/{{ app.name }}"
    state: directory

- name: "Configurar {{ app.name }} en puerto {{ app.port }}"
  template:
    src: app-config.j2
    dest: "/opt/{{ app.name }}/config.yml"
```

### Caso de Uso: Include Condicional

```yaml
- name: Incluir tareas de monitoreo solo en producción
  include_tasks: tasks/setup-monitoring.yml
  when: environment == "production"

- name: Incluir tareas de debug solo en desarrollo
  include_tasks: tasks/setup-debug-tools.yml
  when: environment == "development"
```

---

## 13.5. `import_playbook`: Orquestar Playbooks

Si `import_tasks` incluye tareas, `import_playbook` incluye playbooks completos. Es la forma de crear un **playbook maestro** que orquesta todo.

```yaml
# site.yml - El playbook maestro
---
- name: Configuración común en todos los servidores
  import_playbook: playbooks/common.yml

- name: Configurar servidores web
  import_playbook: playbooks/webservers.yml

- name: Configurar bases de datos
  import_playbook: playbooks/databases.yml

- name: Configurar monitoreo
  import_playbook: playbooks/monitoring.yml
```

```yaml
# playbooks/webservers.yml
---
- name: Configurar Nginx
  hosts: webservers
  become: yes
  roles:
    - nginx
    - ssl_certificates
```

### Ejecución Selectiva

```bash
# Ejecutar todo
ansible-playbook site.yml

# Ejecutar solo webservers (usando tags o --limit)
ansible-playbook site.yml --limit webservers

# Ejecutar un playbook específico directamente
ansible-playbook playbooks/webservers.yml
```

---

## 13.6. `import_role` e `include_role`: Roles Dinámicos

Además de la sección `roles:` del play, puedes incluir roles dentro de las tareas.

```yaml
---
- name: Despliegue condicional de servicios
  hosts: all
  become: yes

  tasks:
    - name: Configuración base (siempre)
      import_role:
        name: common

    - name: Servidor web (solo si está en el grupo)
      include_role:
        name: nginx
      when: "'webservers' in group_names"

    - name: Base de datos (solo si está en el grupo)
      include_role:
        name: postgresql
      when: "'dbservers' in group_names"

    - name: Instalar aplicaciones dinámicamente
      include_role:
        name: "{{ item }}"
      loop: "{{ apps_to_install }}"
      # apps_to_install: ['redis', 'memcached', 'elasticsearch']
```

---

## 13.7. `delegate_to`: Ejecutar en Otro Host

A veces necesitas ejecutar una tarea en un host diferente al que estás configurando. Por ejemplo, sacar un servidor del balanceador **antes** de actualizarlo.

### 🎯 La Analogía: El Árbitro en un Partido

El árbitro no juega en ninguno de los dos equipos, pero toma decisiones que afectan a ambos. `delegate_to` permite que una tarea "arbitre" desde otro host.

```yaml
---
- name: Actualización con zero-downtime
  hosts: webservers
  become: yes
  serial: 1  # Servidor a servidor

  tasks:
    - name: Sacar del balanceador de carga
      uri:
        url: "http://loadbalancer.ejemplo.com/api/disable/{{ inventory_hostname }}"
        method: POST
      delegate_to: localhost  # Se ejecuta desde tu máquina, no desde el servidor

    - name: Actualizar aplicación
      apt:
        name: myapp
        state: latest

    - name: Reiniciar servicio
      systemd:
        name: myapp
        state: restarted

    - name: Esperar a que esté sano
      uri:
        url: "http://{{ inventory_hostname }}:8080/health"
        status_code: 200
      retries: 10
      delay: 3
      delegate_to: localhost

    - name: Devolver al balanceador
      uri:
        url: "http://loadbalancer.ejemplo.com/api/enable/{{ inventory_hostname }}"
        method: POST
      delegate_to: localhost
```

### `run_once`: Ejecutar Solo una Vez

Combinado con `delegate_to`, es útil para tareas que solo deben ejecutarse una vez en todo el play.

```yaml
- name: Ejecutar migración de base de datos (solo una vez)
  shell: /opt/app/bin/migrate
  run_once: true
  delegate_to: "{{ groups['dbservers'][0] }}"
  # Se ejecuta solo en el primer servidor de bases de datos
```

---

## 13.8. `serial`: Despliegue en Lotes

Cuando actualizas 100 servidores, no quieres hacerlo todos a la vez. `serial` controla cuántos se procesan simultáneamente.

```yaml
---
- name: Rolling update del cluster
  hosts: webservers
  become: yes
  serial: 2  # De 2 en 2

  tasks:
    - name: Actualizar aplicación
      apt:
        name: myapp
        state: latest
      notify: Reiniciar aplicación

  handlers:
    - name: Reiniciar aplicación
      systemd:
        name: myapp
        state: restarted
```

### Estrategias de Serial

```yaml
# Número fijo
serial: 5  # 5 servidores a la vez

# Porcentaje
serial: "25%"  # 25% del total a la vez

# Escalonado (primero pocos, luego más)
serial:
  - 1    # Primero prueba con 1 (canary)
  - 5    # Si va bien, 5 más
  - "50%" # Luego la mitad del resto
```

### 🐤 Despliegue Canary

```yaml
---
- name: Canary deployment
  hosts: webservers
  become: yes
  serial:
    - 1      # Paso 1: Solo 1 servidor (el canary)
    - "100%" # Paso 2: El resto (si el canary fue bien)

  tasks:
    - name: Desplegar nueva versión
      apt:
        name: "myapp={{ app_version }}"
        state: present

    - name: Verificar salud
      uri:
        url: "http://localhost:8080/health"
        status_code: 200
      retries: 5
      delay: 3

    - name: Pausa manual después del canary
      pause:
        prompt: "El canary está sano. ¿Continuar con el resto? (Ctrl+C para abortar)"
      when: ansible_play_batch | length == 1
      run_once: true
```

---

## 13.9. Tareas Asíncronas (`async` y `poll`)

Para tareas que tardan mucho (compilaciones, backups, descargas), puedes lanzarlas en segundo plano y seguir con otras cosas.

### ⏱️ La Analogía: Poner la Lavadora

No te quedas mirando la lavadora 2 horas. La pones, haces otras cosas, y vuelves a comprobar cuando crees que ha terminado.

```yaml
---
- name: Tareas asíncronas
  hosts: all
  become: yes

  tasks:
    - name: Lanzar backup pesado en segundo plano
      shell: /usr/local/bin/full-backup.sh
      async: 3600    # Timeout máximo: 1 hora
      poll: 0        # No esperar (lanzar y olvidar)
      register: backup_job

    - name: Mientras tanto, actualizar paquetes
      apt:
        upgrade: dist
        update_cache: yes

    - name: Configurar monitoreo
      import_tasks: tasks/monitoring.yml

    - name: Comprobar si el backup terminó
      async_status:
        jid: "{{ backup_job.ansible_job_id }}"
      register: backup_result
      until: backup_result.finished
      retries: 120
      delay: 30  # Comprobar cada 30 segundos
```

### Múltiples Tareas en Paralelo

```yaml
- name: Lanzar compilaciones en paralelo
  shell: "/opt/build/compile-{{ item }}.sh"
  async: 1800
  poll: 0
  register: compile_jobs
  loop:
    - frontend
    - backend
    - docs

- name: Esperar a que todas las compilaciones terminen
  async_status:
    jid: "{{ item.ansible_job_id }}"
  register: job_result
  until: job_result.finished
  retries: 60
  delay: 30
  loop: "{{ compile_jobs.results }}"
```

---

## 13.10. Práctica: Orquestación Multi-Tier 🏗️

Vamos a combinar todo en un ejemplo de despliegue de una aplicación de 3 capas.

### Estructura del Proyecto

```
multi-tier/
├── site.yml
├── playbooks/
│   ├── common.yml
│   ├── databases.yml
│   └── webservers.yml
├── tasks/
│   ├── backup-db.yml
│   ├── deploy-app.yml
│   └── health-check.yml
└── inventory/
    └── production.ini
```

### Playbook Maestro

```yaml
# site.yml
---
- name: Configuración común
  import_playbook: playbooks/common.yml

- name: Actualizar base de datos
  import_playbook: playbooks/databases.yml

- name: Desplegar en servidores web
  import_playbook: playbooks/webservers.yml
```

### Playbook de Base de Datos

```yaml
# playbooks/databases.yml
---
- name: Actualizar base de datos
  hosts: dbservers
  become: yes

  tasks:
    - name: Backup antes de migrar
      include_tasks: ../tasks/backup-db.yml

    - name: Ejecutar migración (solo una vez)
      shell: /opt/app/bin/migrate
      run_once: true
      register: migration
      changed_when: "'Applied' in migration.stdout"
```

### Playbook de Servidores Web

```yaml
# playbooks/webservers.yml
---
- name: Rolling deploy en servidores web
  hosts: webservers
  become: yes
  serial:
    - 1
    - "50%"
    - "100%"

  tasks:
    - name: Sacar del balanceador
      uri:
        url: "http://{{ lb_host }}/api/disable/{{ inventory_hostname }}"
        method: POST
      delegate_to: localhost
      changed_when: false

    - name: Desplegar aplicación
      include_tasks: ../tasks/deploy-app.yml

    - name: Verificar salud
      include_tasks: ../tasks/health-check.yml

    - name: Devolver al balanceador
      uri:
        url: "http://{{ lb_host }}/api/enable/{{ inventory_hostname }}"
        method: POST
      delegate_to: localhost
      changed_when: false
```

### Health Check Reutilizable

```yaml
# tasks/health-check.yml
---
- name: Esperar a que el puerto esté abierto
  wait_for:
    port: "{{ app_port }}"
    delay: 3
    timeout: 30

- name: Verificar endpoint de salud
  uri:
    url: "http://localhost:{{ app_port }}/health"
    status_code: 200
  retries: 5
  delay: 3
  register: health
  until: health.status == 200
```

---

## 📝 Resumen del Capítulo

En este capítulo has aprendido:

✅ **`import_tasks`**: Inclusión estática (pre-procesado, tags se propagan)
✅ **`include_tasks`**: Inclusión dinámica (runtime, permite loops y condicionales)
✅ **`import_playbook`**: Orquestar múltiples playbooks desde uno maestro
✅ **`import_role` / `include_role`**: Incluir roles condicionalmente dentro de tareas
✅ **`delegate_to`**: Ejecutar tareas en un host diferente al actual
✅ **`run_once`**: Ejecutar una tarea solo una vez en todo el play
✅ **`serial`**: Controlar el despliegue en lotes (rolling updates, canary)
✅ **`async/poll`**: Tareas asíncronas para operaciones de larga duración

**Próximo paso:** Depurar y solucionar problemas cuando las cosas no salen como esperabas 🔍
