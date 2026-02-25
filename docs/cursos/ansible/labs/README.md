---
title: Laboratorios y Ejercicios Prácticos
sidebar_label: 💻 Labs
sidebar_position: 11
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

### Módulo 1: Fundamentos
**Archivo**: Los ejercicios están incluidos directamente en [01-fundamentos.md](../01-fundamentos.md)

**Ejercicios disponibles:**
- 🟢 Verificar conectividad con comandos ad-hoc
- 🟢 Explorar módulos básicos desde la línea de comandos
- 🟢 Recopilar información del sistema con el módulo `setup`

**Qué practicarás:**
- Comandos ad-hoc básicos
- Módulos ping, command, shell
- Facts de Ansible

---

### Módulo 2: Instalación y Configuración
**Archivo**: Los ejercicios están incluidos en [02-instalacion.md](../02-instalacion.md)

**Ejercicios disponibles:**
- 🟢 Instalar Ansible en tu distribución
- 🟢 Crear y configurar `ansible.cfg` personalizado
- 🟢 Configurar SSH para automatización
- 🟡 Resolver problemas comunes de conectividad

**Qué practicarás:**
- Instalación en diferentes distribuciones
- Configuración del archivo ansible.cfg
- Troubleshooting de SSH

---

### Módulo 3: Inventarios
**Archivo**: Los ejercicios están incluidos en [03-inventarios.md](../03-inventarios.md)

**Ejercicios disponibles:**
- 🟢 Crear inventario estático en formato INI
- 🟢 Convertir inventario a formato YAML
- 🟡 Organizar hosts en grupos y subgrupos
- 🟡 Definir variables de inventario por host y grupo
- 🔴 Implementar inventario dinámico básico

**Qué practicarás:**
- Sintaxis de inventarios INI y YAML
- Jerarquía de grupos
- Variables de inventario
- Patrones de selección de hosts

---

### Módulo 4: Playbooks
**Archivo**: Los ejercicios están incluidos en [04-playbooks.md](../04-playbooks.md)

**Ejercicios disponibles:**
- 🟢 Crear tu primer playbook funcional
- 🟢 Usar handlers para gestionar servicios
- 🟡 Implementar condicionales con `when`
- 🟡 Trabajar con loops para automatizar tareas repetitivas
- 🟡 Usar tags para ejecución selectiva
- 🔴 Crear playbook completo de despliegue de aplicación web

**Qué practicarás:**
- Sintaxis YAML correcta
- Estructura de playbooks
- Tasks, handlers, y notificaciones
- Condicionales y loops
- Tags y ejecución parcial

---

### Módulo 5: Módulos
**Archivo**: Los ejercicios están incluidos en [05-modulos.md](../05-modulos.md)

**Ejercicios disponibles:**
- 🟢 Gestionar paquetes con apt/yum
- 🟢 Manipular archivos y directorios
- 🟢 Administrar servicios del sistema
- 🟡 Gestionar usuarios y grupos
- 🟡 Configurar firewall con ufw
- 🔴 Crear playbook de hardening básico de seguridad

**Qué practicarás:**
- Módulos de gestión de paquetes
- Módulos de sistema de archivos
- Módulos de servicios
- Módulos de usuarios y permisos
- Módulos de red y seguridad

---

### Módulo 6: Variables y Facts
**Archivo**: Los ejercicios están incluidos en [06-variables.md](../06-variables.md)

**Ejercicios disponibles:**
- 🟢 Definir y usar variables en playbooks
- 🟢 Acceder a facts del sistema
- 🟡 Entender precedencia de variables
- 🟡 Registrar resultados de tasks con `register`
- 🔴 Crear playbook dinámico basado en facts

**Qué practicarás:**
- Definición de variables en múltiples niveles
- Uso de facts de Ansible
- Filtros de Jinja2
- Variables especiales
- Debug y troubleshooting con variables

---

### Módulo 7: Roles
**Archivo**: Los ejercicios están incluidos en [07-roles.md](../07-roles.md)

**Ejercicios disponibles:**
- 🟢 Crear estructura de rol con `ansible-galaxy init`
- 🟡 Desarrollar rol completo para aplicación web
- 🟡 Gestionar dependencias entre roles
- 🔴 Crear rol reutilizable con variables parametrizadas

**Qué practicarás:**
- Estructura de directorios de roles
- Organización de tasks, handlers, templates, files
- Variables de roles y defaults
- Dependencias entre roles

---

### Módulo 8: Templates (Jinja2)
**Archivo**: Los ejercicios están incluidos en [08-templates.md](../08-templates.md)

**Ejercicios disponibles:**
- 🟢 Crear templates básicos con variables
- 🟡 Usar condicionales en templates
- 🟡 Implementar loops en templates
- 🟡 Aplicar filtros útiles de Jinja2
- 🔴 Generar configuraciones complejas (Nginx, Apache)

**Qué practicarás:**
- Sintaxis de templates Jinja2
- Variables y expresiones
- Condicionales y loops
- Filtros y tests
- Plantillas de configuración realistas

---

### Módulo 9: Ansible Galaxy
**Archivo**: Los ejercicios están incluidos en [09-ansible-galaxy.md](../09-ansible-galaxy.md)

**Ejercicios disponibles:**
- 🟢 Buscar roles en Galaxy
- 🟢 Instalar y usar roles de la comunidad
- 🟡 Gestionar dependencias con requirements.yml
- 🔴 Publicar tu propio rol en Galaxy

**Qué practicarás:**
- Comandos de ansible-galaxy
- Instalación de roles de terceros
- Gestión de versiones
- Contribución a la comunidad

---

### Módulo 10: Buenas Prácticas
**Archivo**: Los ejercicios están incluidos en [10-buenas-practicas.md](../10-buenas-practicas.md)

**Ejercicios disponibles:**
- 🟢 Estructurar proyecto Ansible profesional
- 🟢 Cifrar secretos con Ansible Vault
- 🟡 Implementar testing con ansible-lint
- 🟡 Validar idempotencia de playbooks
- 🔴 Crear pipeline CI/CD para Ansible

**Qué practicarás:**
- Estructura de proyectos reales
- Gestión de secretos con Vault
- Testing y validación
- Integración con CI/CD
- Documentación y mantenibilidad

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

- **Discord**: Únete a nuestra comunidad (enlace en el canal)
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

Empieza por el [Módulo 1: Fundamentos](../01-fundamentos.md) y ve avanzando módulo por módulo. Recuerda: la práctica constante es la clave para dominar Ansible.

**¡Feliz automatización! 🚀**
