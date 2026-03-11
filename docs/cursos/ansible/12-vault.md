---
title: Ansible Vault
sidebar_label: 12. Ansible Vault
sidebar_position: 12
---

# Ansible Vault 🔐

Gestión profesional de secretos: contraseñas, claves API y certificados cifrados.

:::info Video pendiente de grabación
:::

## 12.1. El Problema: Secretos en Texto Plano

Imagina que subes tu playbook a Git con las contraseñas de producción en texto claro. Cualquiera que tenga acceso al repositorio (o que hackee tu cuenta) tiene las llaves de tu infraestructura.

### 💣 La Analogía: La Llave bajo el Felpudo

Dejar contraseñas en texto plano es como dejar la llave de tu casa bajo el felpudo. Todo el mundo sabe que está ahí.

```yaml
# ❌ NUNCA hagas esto (secretos visibles en Git)
db_password: "SuperSecreto123"
api_key: "sk-1234567890abcdef"
ssl_private_key: "-----BEGIN RSA PRIVATE KEY-----..."
```

**Ansible Vault** es la caja fuerte donde guardas esas llaves. Solo quien tiene la combinación puede abrirla.

---

## 12.2. Conceptos Básicos

Ansible Vault cifra archivos o variables usando **AES-256**, uno de los estándares de cifrado más robustos que existen.

### ¿Qué puedes cifrar?

- **Archivos completos**: `group_vars/all/vault.yml`
- **Variables individuales**: Una sola variable dentro de un archivo YAML
- **Archivos estáticos**: Certificados SSL, claves privadas, configuraciones sensibles

### Flujo de trabajo

```mermaid
flowchart LR
    A[Secreto en texto plano] -->|ansible-vault encrypt| B[Archivo cifrado AES-256]
    B -->|ansible-vault view| C[Ver sin modificar]
    B -->|ansible-vault edit| D[Editar in-situ]
    B -->|ansible-vault decrypt| E[Volver a texto plano]
    B -->|ansible-playbook --ask-vault-pass| F[Usar en playbook]
```

---

## 12.3. Comandos Esenciales

### Crear un archivo cifrado desde cero

```bash
ansible-vault create group_vars/all/vault.yml
```

Se abre tu editor (`$EDITOR`) y al guardar, el archivo queda cifrado automáticamente.

### Cifrar un archivo existente

```bash
# Cifrar un archivo que ya existe
ansible-vault encrypt group_vars/production/secrets.yml

# Cifrar múltiples archivos a la vez
ansible-vault encrypt group_vars/*/vault.yml
```

### Ver un archivo cifrado (sin modificar)

```bash
ansible-vault view group_vars/all/vault.yml
```

### Editar un archivo cifrado

```bash
ansible-vault edit group_vars/all/vault.yml
```

Se descifra temporalmente en memoria, abre tu editor, y al guardar lo vuelve a cifrar.

### Descifrar un archivo

```bash
# Descifrar (vuelve a texto plano)
ansible-vault decrypt group_vars/all/vault.yml

# ⚠️ Cuidado: ¡No hagas commit después de descifrar!
```

### Cambiar la contraseña (Rekey)

```bash
# Cambiar la contraseña del Vault
ansible-vault rekey group_vars/all/vault.yml

# Cambiar en múltiples archivos
ansible-vault rekey group_vars/*/vault.yml
```

---

## 12.4. El Patrón Profesional: Variables Separadas

Esta es la **práctica recomendada por Red Hat** y la que verás en entornos profesionales.

### 🏗️ La Analogía: El Directorio Telefónico y la Caja Fuerte

Imagina que tienes un directorio telefónico (variables públicas) donde cada entrada tiene un nombre y dice "su clave está en la caja fuerte, cajón 42". La caja fuerte (vault) solo contiene las claves, sin contexto.

### Estructura de Archivos

```
proyecto/
├── group_vars/
│   └── all/
│       ├── vars.yml      # Variables PÚBLICAS (visible en Git)
│       └── vault.yml     # Variables SECRETAS (cifrado con Vault)
```

### Paso 1: Archivo público (`vars.yml`)

```yaml
# group_vars/all/vars.yml
# Visible en Git, fácil de auditar

# Base de datos
db_host: "db.ejemplo.com"
db_port: 5432
db_name: "mi_aplicacion"
db_user: "app_user"
db_password: "{{ vault_db_password }}"  # Referencia al secreto

# API externa
api_endpoint: "https://api.ejemplo.com/v2"
api_key: "{{ vault_api_key }}"          # Referencia al secreto

# SSL
ssl_cert_path: /etc/ssl/certs/app.crt
ssl_key_path: /etc/ssl/private/app.key
ssl_key_content: "{{ vault_ssl_key }}"  # Referencia al secreto
```

### Paso 2: Archivo cifrado (`vault.yml`)

```bash
ansible-vault create group_vars/all/vault.yml
```

```yaml
# group_vars/all/vault.yml (cifrado)
# Solo contiene los valores sensibles con prefijo vault_

vault_db_password: "P@ssw0rd_Pr0duct10n_2025!"
vault_api_key: "sk-abc123def456ghi789"
vault_ssl_key: |
  -----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEA7...
  -----END RSA PRIVATE KEY-----
```

### ¿Por qué este patrón?

| Aspecto | Todo cifrado | Patrón separado |
|---------|-------------|-----------------|
| **Git diffs** | Inútiles (todo cifrado) | Claros para variables públicas |
| **Auditoría** | Necesitas descifrar para ver | Ves qué variables existen sin descifrar |
| **Búsqueda** | `grep` no funciona | `grep db_password vars.yml` funciona |
| **Revisión de código** | Imposible sin contraseña | Se revisa normalmente |

---

## 12.5. Variables Cifradas Inline

Puedes cifrar **una sola variable** dentro de un archivo YAML sin cifrar el archivo completo.

```bash
# Cifrar un valor individual
ansible-vault encrypt_string 'SuperSecreto123' --name 'db_password'
```

**Salida:**

```yaml
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  63326634633135663663353566633134613133383865316234616330613066363865
  3666346564363532636537393366656465383438643262640a3831333233323131
  ...
```

Puedes copiar esa salida directamente en tu archivo de variables:

```yaml
# group_vars/all/vars.yml
db_host: "db.ejemplo.com"
db_port: 5432
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  63326634633135663663353566633134613133383865316234616330613066363865
  ...
```

### ¿Cuándo usar inline vs archivo completo?

- **Inline**: Cuando solo tienes 1-2 secretos en un archivo con muchas variables públicas
- **Archivo completo**: Cuando tienes muchos secretos (patrón `vault.yml` separado)

---

## 12.6. Vault IDs: Múltiples Contraseñas

En proyectos grandes, necesitas diferentes contraseñas para diferentes entornos. No quieres que el equipo de desarrollo pueda descifrar los secretos de producción.

### 🏢 La Analogía: Llaves de la Oficina

El becario tiene llave de la sala de reuniones (dev), el ingeniero tiene la del laboratorio (staging), y solo el director tiene la de la caja fuerte (production).

### Configuración

```bash
# Cifrar con un Vault ID específico
ansible-vault create --vault-id dev@prompt group_vars/development/vault.yml
ansible-vault create --vault-id prod@prompt group_vars/production/vault.yml

# Ejecutar playbook con múltiples Vault IDs
ansible-playbook site.yml \
  --vault-id dev@~/.vault_pass_dev \
  --vault-id prod@~/.vault_pass_prod
```

### Archivos de contraseña por entorno

```bash
# Crear archivos de contraseña (uno por entorno)
echo "contraseña_dev_2025" > ~/.vault_pass_dev
echo "contraseña_prod_2025" > ~/.vault_pass_prod

# Permisos estrictos (IMPORTANTE)
chmod 600 ~/.vault_pass_dev ~/.vault_pass_prod
```

### Configurar en `ansible.cfg`

```ini
# ansible.cfg
[defaults]
vault_identity_list = dev@~/.vault_pass_dev, prod@~/.vault_pass_prod
```

Con esto ya no necesitas pasar `--vault-id` en cada ejecución.

---

## 12.7. Integración con Sistemas Externos

En entornos enterprise, los secretos suelen estar en sistemas dedicados como **HashiCorp Vault**, **AWS Secrets Manager** o **Azure Key Vault**. Ansible Vault puede trabajar con ellos.

### Script de Contraseña Personalizado

En lugar de un archivo de texto con la contraseña, puedes usar un script que la obtenga de donde sea.

```bash
#!/bin/bash
# vault-password-client.sh
# Obtener la contraseña del Vault desde un gestor de secretos externo

# Ejemplo con HashiCorp Vault
vault kv get -field=ansible_vault_password secret/ansible/vault-pass

# Ejemplo con AWS Secrets Manager
# aws secretsmanager get-secret-value --secret-id ansible-vault-pass --query SecretString --output text

# Ejemplo con macOS Keychain
# security find-generic-password -a ansible -s vault-pass -w
```

```bash
# Hacer el script ejecutable
chmod +x vault-password-client.sh

# Usarlo con Ansible
ansible-playbook site.yml --vault-password-file ./vault-password-client.sh
```

---

## 12.8. Buenas Prácticas de Vault

### 1. Usa el prefijo `vault_` para secretos

```yaml
# ✅ BIEN: prefijo claro
vault_db_password: "secreto"
vault_api_key: "clave"

# ❌ MAL: sin prefijo, confuso
db_password: "secreto"  # ¿Es la variable real o la cifrada?
```

### 2. Nunca descifres en producción

```bash
# ❌ MAL: Descifrar archivo (queda en texto plano)
ansible-vault decrypt secrets.yml
git add . && git commit -m "fix"  # ¡Acabas de subir los secretos!

# ✅ BIEN: Solo editar o ver
ansible-vault edit secrets.yml
ansible-vault view secrets.yml
```

### 3. Protege el archivo de contraseña

```bash
# Permisos restrictivos
chmod 600 ~/.vault_pass

# Añadir a .gitignore
echo ".vault_pass" >> .gitignore
echo "*.vault_pass" >> .gitignore
```

### 4. Usa `no_log` para tareas con secretos

```yaml
- name: Configurar contraseña de base de datos
  mysql_user:
    name: app_user
    password: "{{ db_password }}"
    state: present
  no_log: yes  # Evita que la contraseña aparezca en los logs
```

### 5. Rota secretos periódicamente

```bash
# Script de rotación de secretos
#!/bin/bash
# 1. Generar nueva contraseña
NEW_PASS=$(openssl rand -base64 32)

# 2. Actualizar en Vault
ansible-vault edit group_vars/production/vault.yml
# Cambiar vault_db_password por $NEW_PASS

# 3. Desplegar el cambio
ansible-playbook -i inventory/production.ini playbooks/rotate-credentials.yml

# 4. Cambiar contraseña maestra del Vault (cada trimestre)
ansible-vault rekey group_vars/production/vault.yml
```

---

## 12.9. Práctica: Proyecto Completo con Vault 🔒

Vamos a crear un proyecto desde cero con gestión profesional de secretos.

### Estructura del proyecto

```
vault-demo/
├── ansible.cfg
├── inventory/
│   ├── dev.ini
│   └── prod.ini
├── group_vars/
│   ├── all/
│   │   ├── vars.yml
│   │   └── vault.yml      # Cifrado
│   ├── dev/
│   │   └── vars.yml
│   └── prod/
│       ├── vars.yml
│       └── vault.yml      # Cifrado (contraseña diferente)
├── playbooks/
│   └── deploy-app.yml
└── .gitignore
```

### `ansible.cfg`

```ini
[defaults]
inventory = inventory/dev.ini
vault_identity_list = dev@~/.vault_pass_dev, prod@~/.vault_pass_prod
```

### `group_vars/all/vars.yml`

```yaml
app_name: mi-aplicacion
app_port: 8080
db_host: "{{ vault_db_host }}"
db_password: "{{ vault_db_password }}"
```

### Crear el Vault

```bash
# Crear secretos para desarrollo
ansible-vault create --vault-id dev@prompt group_vars/all/vault.yml

# Contenido:
# vault_db_host: "localhost"
# vault_db_password: "dev_password_123"

# Crear secretos para producción
ansible-vault create --vault-id prod@prompt group_vars/prod/vault.yml

# Contenido:
# vault_db_host: "db.produccion.empresa.com"
# vault_db_password: "Pr0d_S3cur3_P@ss!"
```

### `playbooks/deploy-app.yml`

```yaml
---
- name: Desplegar aplicación con secretos
  hosts: all
  become: yes

  tasks:
    - name: Crear archivo de configuración con secretos
      template:
        src: templates/app.conf.j2
        dest: "/etc/{{ app_name }}/config.yml"
        mode: '0600'
        owner: root
      no_log: yes

    - name: Mostrar configuración (sin secretos)
      debug:
        msg: |
          App: {{ app_name }}
          Puerto: {{ app_port }}
          DB Host: {{ db_host }}
          DB Password: ******** (oculto por seguridad)
```

### `.gitignore`

```
.vault_pass*
*.retry
*.pyc
__pycache__/
```

### Ejecución

```bash
# Desarrollo (usa contraseña de dev automáticamente)
ansible-playbook -i inventory/dev.ini playbooks/deploy-app.yml

# Producción (usa contraseña de prod)
ansible-playbook -i inventory/prod.ini playbooks/deploy-app.yml
```

---

## 📝 Resumen del Capítulo

En este capítulo has aprendido:

✅ **Cifrado AES-256**: Proteger archivos y variables con Ansible Vault
✅ **Comandos esenciales**: create, encrypt, decrypt, edit, view, rekey
✅ **Patrón profesional**: Separar variables públicas y secretas con prefijo `vault_`
✅ **Variables inline**: Cifrar valores individuales con `encrypt_string`
✅ **Vault IDs**: Usar diferentes contraseñas por entorno
✅ **Integración externa**: Conectar con HashiCorp Vault, AWS Secrets Manager
✅ **`no_log`**: Evitar que los secretos aparezcan en los logs
✅ **Buenas prácticas**: Rotación, permisos, `.gitignore`

**Próximo paso:** Reutilizar y organizar código con Include, Import y control avanzado de tareas 📦
