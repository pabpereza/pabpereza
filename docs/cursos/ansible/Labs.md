---
title: Laboratorios
sidebar_label: 💻 Labs
sidebar_position: 15
---

# Laboratorios y Ejercicios Prácticos 💻

¡Bienvenido al centro de prácticas del curso de Ansible! Aquí encontrarás ejercicios hands-on que te permitirán aplicar todo lo aprendido en cada módulo del curso.

:::tip La Práctica Hace al Maestro
La mejor forma de aprender Ansible es **practicando**. Cada laboratorio está diseñado para reforzar los conceptos teóricos con ejercicios reales que podrás ejecutar en tu propio entorno.
:::

## 🎯 Objetivo de los Laboratorios

Estos ejercicios prácticos te ayudarán a:
- **Aplicar conocimientos teóricos** en escenarios reales
- **Desarrollar músculo memoria** con comandos y sintaxis de Ansible
- **Experimentar sin miedo** en un entorno controlado
- **Resolver problemas comunes** que encontrarás en producción
- **Construir tu propio portafolio** de playbooks y roles

## 📋 Prerequisitos para los Labs

### Entorno Mínimo Requerido

Para realizar los laboratorios necesitarás:

1. **Nodo de Control (tu máquina):**
   - Linux, macOS o WSL2 en Windows
   - Ansible instalado (versión 2.15+)
   - Python 3.8+
   - Editor de texto (VS Code, vim, nano)

2. **Nodos Gestionados (servidores de prueba):**
   - Al menos 2 máquinas virtuales Linux (Ubuntu 22.04 o Rocky Linux 9 recomendados)
   - Acceso SSH configurado
   - Usuario con privilegios sudo

:::info Opciones para Nodos de Prueba
**Opciones económicas para laboratorios:**
- **Vagrant + VirtualBox**: Gratis, local, ideal para aprender
- **Docker containers**: Rápido para pruebas básicas
- **Cloud providers**: AWS Free Tier, GCP, DigitalOcean (desde $5/mes)
- **LXC/LXD containers**: Ligero y eficiente en Linux
:::

### Configuración SSH Básica

Asegúrate de tener acceso SSH sin contraseña a tus nodos:

```bash
# Generar clave SSH (si no tienes una)
ssh-keygen -t ed25519 -C "ansible-labs"

# Copiar clave pública al nodo gestionado
ssh-copy-id usuario@ip-del-servidor

# Verificar conectividad
ssh usuario@ip-del-servidor "hostname"
```

## 🗂️ Estructura de los Laboratorios

Cada módulo del curso tiene ejercicios asociados. Están organizados por dificultad:

- 🟢 **Básico**: Ejercicios introductorios, paso a paso
- 🟡 **Intermedio**: Requiere combinar varios conceptos
- 🔴 **Avanzado**: Desafíos reales, múltiples soluciones posibles

## 📚 Laboratorios por Módulo

### Capítulo 1: Introducción, Fundamentos e Instalación
**Archivo**: Los ejercicios están incluidos en [101.Introduccion.md](./101.Introduccion.md)

**Ejercicios disponibles:**
- 🟢 Instalar Ansible en tu distribución (apt, dnf, pip)
- 🟢 Crear y configurar `ansible.cfg` personalizado
- 🟢 Configurar SSH sin contraseña hacia los managed nodes
- 🟢 Verificar conectividad con `ansible all -m ping`
- 🟢 Recopilar información del sistema con el módulo `setup`
- 🟡 Resolver problemas comunes de conectividad

**Qué practicarás:**
- Instalación en diferentes distribuciones
- Configuración del archivo `ansible.cfg`
- Comandos ad-hoc básicos (`ping`, `command`, `setup`)
- Facts de Ansible
- Troubleshooting de SSH

---

### Capítulo 2: Inventarios y Hosts
**Archivo**: Los ejercicios están incluidos en [102.Inventarios.md](./102.Inventarios.md)

**Ejercicios disponibles:**
- 🟢 Crear inventario estático en formato INI
- 🟢 Convertir inventario a formato YAML
- 🟡 Organizar hosts en grupos y subgrupos
- 🟡 Definir variables de inventario por host y grupo
- 🟡 Lanzar comandos ad-hoc filtrando por grupos
- 🔴 Implementar inventario dinámico con AWS EC2 (`aws_ec2`)
- 🔴 Combinar inventario estático on-prem con uno dinámico de cloud

**Qué practicarás:**
- Sintaxis de inventarios INI y YAML
- Jerarquía de grupos
- Variables de inventario
- Inventory plugins (`aws_ec2`, `azure_rm`, `gcp_compute`)
- Patrones de selección de hosts

---

### Capítulo 3: Playbooks y YAML
**Archivo**: Los ejercicios están incluidos en [103.Playbooks.md](./103.Playbooks.md)

**Ejercicios disponibles:**
- 🟢 Crear tu primer playbook funcional
- 🟢 Validar sintaxis YAML correcta
- 🟡 Usar tags para ejecución selectiva
- 🔴 Crear playbook completo de despliegue de aplicación web

**Qué practicarás:**
- Sintaxis YAML estricta
- Estructura de playbooks (plays, tasks)
- Ejecución con `ansible-playbook`
- Tags y ejecución parcial

---

### Capítulo 4: Módulos e Idempotencia
**Archivo**: Los ejercicios están incluidos en [104.Modulos_idempotencia.md](./104.Modulos_idempotencia.md)

**Ejercicios disponibles:**
- 🟢 Gestionar paquetes con `apt`/`dnf`
- 🟢 Manipular archivos y directorios con `file` y `copy`
- 🟢 Administrar servicios del sistema con `service`
- 🟡 Gestionar usuarios y grupos con `user`
- 🟡 Probar idempotencia: lanzar el mismo playbook dos veces y comprobar `changed=0`
- 🟡 Usar `--check` y `--diff` para simular ejecuciones
- 🔴 Hacer idempotente un comando crudo con `creates`/`removes`/`changed_when`

**Qué practicarás:**
- Módulos de paquetes, archivos, servicios y usuarios
- Diferencia entre módulos idempotentes y no idempotentes
- Validación de idempotencia con `--check`
- Patrones para domesticar `command`/`shell`

---

### Capítulo 5: Variables y Control de Flujo
**Archivo**: Los ejercicios están incluidos en [105.Variables_control_flujo.md](./105.Variables_control_flujo.md)

**Ejercicios disponibles:**
- 🟢 Definir y usar variables en playbooks
- 🟢 Acceder a facts del sistema
- 🟢 Usar handlers con `notify`/`listen`
- 🟡 Implementar condicionales con `when`
- 🟡 Trabajar con `loop` (listas, dicts, `subelements`)
- 🟡 Reintentos con `until`/`retries`/`delay`
- 🟡 Registrar resultados de tasks con `register`
- 🟡 Entender precedencia de variables
- 🔴 Crear playbook dinámico cross-platform usando facts

**Qué practicarás:**
- Definición de variables en múltiples niveles
- Facts de Ansible y filtros Jinja2
- Condicionales y bucles
- Handlers y reacciones a cambios
- Debug y troubleshooting con `register`

---

### Capítulo 6: Roles, Templates y Galaxy
**Archivo**: Los ejercicios están incluidos en [106.Roles.md](./106.Roles.md)

**Ejercicios disponibles:**
- 🟢 Crear estructura de rol con `ansible-galaxy init`
- 🟢 Crear templates Jinja2 básicos con variables
- 🟢 Buscar e instalar roles de Ansible Galaxy
- 🟡 Desarrollar rol completo para aplicación web
- 🟡 Usar condicionales y loops dentro de templates
- 🟡 Aplicar filtros útiles de Jinja2
- 🟡 Gestionar dependencias con `requirements.yml`
- 🟡 Dividir playbook monolítico con `include_tasks`/`import_tasks`
- 🟡 Crear playbook maestro con `import_playbook`
- 🔴 Generar configuraciones complejas (Nginx, Apache) con templates
- 🔴 Crear rol reutilizable con variables parametrizadas y publicarlo
- 🔴 Estructurar un proyecto Ansible profesional con buenas prácticas

**Qué practicarás:**
- Estructura de directorios de roles
- Sintaxis de templates Jinja2
- Comandos de `ansible-galaxy` y collections
- Diferencia entre `import` (estático) e `include` (dinámico)
- Layout de proyectos reales

---

### Capítulo 7: Seguridad y Credenciales
**Archivo**: Los ejercicios están incluidos en [107.Seguridad.md](./107.Seguridad.md)

**Ejercicios disponibles:**
- 🟢 Crear y editar archivos cifrados con Ansible Vault
- 🟢 Cifrar variables inline con `encrypt_string`
- 🟢 Generar una clave SSH dedicada al deploy y distribuirla
- 🟡 Implementar el patrón profesional `vars.yml` + `vault.yml`
- 🟡 Configurar Vault IDs por entorno (dev/staging/prod)
- 🟡 Usar `no_log` para silenciar tareas con secretos
- 🟡 Configurar `ssh-agent` y bastion host
- 🔴 Integrar Vault con sistemas externos (HashiCorp Vault, AWS Secrets Manager)
- 🔴 Implementar rotación de claves SSH sin downtime

**Qué practicarás:**
- Comandos de Ansible Vault (create, edit, view, rekey)
- Patrón de separación de variables públicas y secretas
- Gestión segura de claves SSH
- `no_log` y anti-patterns de credenciales

---

### Capítulo 8: Entornos Reales y Proyecto Final
**Archivo**: Los ejercicios están incluidos en [108.Entornos_reales.md](./108.Entornos_reales.md)

**Ejercicios disponibles:**
- 🟢 Usar `ignore_errors` para tareas opcionales
- 🟢 Inspeccionar variables con el módulo `debug`
- 🟢 Usar niveles de verbosidad para diagnosticar (`-v` a `-vvvv`)
- 🟡 Implementar `block`/`rescue`/`always` para rollback
- 🟡 Controlar fallos con `failed_when` y `changed_when`
- 🟡 Validar requisitos con `assert` antes de actuar
- 🟡 Diagnosticar errores comunes de conexión y permisos
- 🟡 Implementar `delegate_to` para tareas centralizadas
- 🔴 Crear despliegue resiliente con rollback automático
- 🔴 Encontrar y corregir errores en un playbook roto
- 🔴 **Proyecto final**: desplegar la stack completa NotaStack con roles, Vault e inventarios separados por entorno

**Qué practicarás:**
- Manejo estructurado de errores (try/catch/finally)
- Reintentos y validaciones previas
- Método sistemático de depuración
- Despliegue en lotes (rolling updates)
- Integración de todo lo aprendido en un proyecto real

---

### Capítulo 9: Ansible y Contenedores
**Archivo**: Los ejercicios están incluidos en [109.Contenedores.md](./109.Contenedores.md)

**Ejercicios disponibles:**
- 🟢 Instalar la colección `community.docker` y el SDK de Python
- 🟢 Desplegar un contenedor Nginx con `docker_container`
- 🟡 Bootstrap completo de un host Docker (instalar Docker + desplegar stack)
- 🟡 Orquestar un stack Compose desde Ansible con `docker_compose_v2`
- 🟡 Aplicar manifiestos Kubernetes con `kubernetes.core.k8s`
- 🟡 Renderizar manifiestos K8s con plantillas Jinja2
- 🟡 Instalar charts Helm desde Ansible
- 🔴 Levantar un clúster K3s de 1 master + N workers desde cero
- 🔴 Desplegar la misma stack en VMs y en K8s con un único playbook

**Qué practicarás:**
- Colecciones `community.docker` y `kubernetes.core`
- Construcción y push de imágenes
- Despliegues híbridos (VMs + contenedores + K8s)
- Helm desde Ansible

---

### Capítulo 10: Ansible en DevOps y CI/CD
**Archivo**: Los ejercicios están incluidos en [110.CICD.md](./110.CICD.md)

**Ejercicios disponibles:**
- 🟢 Validar playbooks con `ansible-lint`
- 🟢 Inyectar secretos en GitHub Actions con `secrets`
- 🟡 Crear pipeline declarativa de Jenkins que ejecute un playbook
- 🟡 Crear workflow de GitHub Actions con multi-entorno (staging → prod)
- 🟡 Implementar un reusable workflow para varios entornos
- 🟡 Probar roles con `molecule`
- 🔴 Implementar rolling update con `serial` y healthchecks
- 🔴 Implementar despliegue blue-green con cambio de balanceador
- 🔴 Implementar canary con validación de métricas en Prometheus
- 🔴 Pipeline completa: PR → lint → staging → tag → prod con aprobación manual

**Qué practicarás:**
- Pipelines en Jenkins y GitHub Actions
- Gestión de secretos en CI/CD
- Estrategias de despliegue (rolling, blue-green, canary)
- Testing con `ansible-lint` y `molecule`

---

## 🚀 Cómo Usar los Laboratorios

### Flujo de Trabajo Recomendado

1. **Lee el módulo teórico** correspondiente
2. **Prepara tu entorno** de laboratorio
3. **Intenta resolver el ejercicio** por tu cuenta primero
4. **Consulta las pistas** si te atascas
5. **Compara tu solución** con las proporcionadas
6. **Experimenta y modifica** el código para profundizar

:::warning Aprende del Error
**No tengas miedo de romper cosas.** Ese es el propósito de un laboratorio. Los mejores aprendizajes vienen de:
- Playbooks que fallan y aprender a debuggear
- Configuraciones incorrectas y entender por qué
- Experimentar con variaciones de los ejercicios
:::

### Convenciones en los Ejercicios

```yaml
# 💡 Este símbolo indica una pista útil

# ⚠️ Este símbolo advierte sobre un error común

# ✅ Este símbolo muestra la forma correcta de hacer algo

# 🔍 Este símbolo invita a investigar más a fondo
```

## 📖 Recursos Adicionales

### Herramientas Útiles para Labs

- **VS Code** con extensión "Ansible" (autocompletado y syntax highlighting)
- **ansible-lint**: Validador de sintaxis y mejores prácticas
- **yamllint**: Validador de sintaxis YAML
- **ansible-navigator**: Herramienta interactiva para debugging
- **Vagrant**: Para crear entornos de laboratorio reproducibles

### Comandos de Debug Útiles

```bash
# Verificar sintaxis de playbook
ansible-playbook --syntax-check playbook.yml

# Modo dry-run (no ejecuta cambios reales)
ansible-playbook --check playbook.yml

# Ejecución paso a paso
ansible-playbook --step playbook.yml

# Ver variables disponibles para un host
ansible -m debug -a "var=hostvars[inventory_hostname]" hostname

# Listar tags disponibles en un playbook
ansible-playbook --list-tags playbook.yml
```

## 🎓 Proyectos Finales (Próximamente)

Estamos preparando proyectos completos que integran todos los módulos:

- 🚧 **Proyecto 1**: Despliegue completo de stack LAMP
- 🚧 **Proyecto 2**: Automatización de infraestructura en AWS
- 🚧 **Proyecto 3**: Pipeline CI/CD con Jenkins y Ansible
- 🚧 **Proyecto 4**: Orquestación de contenedores Docker
- 🚧 **Proyecto 5**: Hardening y compliance de seguridad

:::info Mantente Actualizado
Estos laboratorios se actualizan constantemente. Suscríbete al [canal de YouTube](https://youtube.com/@pabpereza) para recibir notificaciones de nuevos ejercicios y proyectos.
:::

## 💬 Comunidad y Soporte

¿Tienes dudas con los ejercicios? ¿Quieres compartir tu solución?

- **GitHub**: Comparte tus soluciones y proyectos
- **YouTube**: Deja comentarios en los videos del curso

---

## 🏆 Certificado de Finalización

Al completar todos los laboratorios del curso, habrás desarrollado habilidades sólidas en:
- Automatización de infraestructura
- Gestión de configuraciones a escala
- Despliegue de aplicaciones con Ansible
- Implementación de mejores prácticas DevOps

:::tip Tu Portafolio
Guarda todos tus playbooks, roles y proyectos en un repositorio Git. Serán una excelente demostración de tus habilidades para futuros empleadores.
:::

---

**¡Manos a la obra! 🛠️**

Empieza por el [Capítulo 1: Introducción, Fundamentos e Instalación](./101.Introduccion.md) y ve avanzando capítulo por capítulo. Recuerda: la práctica constante es la clave para dominar Ansible.

**¡Feliz automatización! 🚀**
