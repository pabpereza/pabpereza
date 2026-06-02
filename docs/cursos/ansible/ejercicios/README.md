# Ejercicios prácticos de Ansible

Cada fichero es un playbook completo listo para ejecutar contra el laboratorio del curso (`target1`, `target2`, `target3`).

## Estructura

| Fichero | Descripción | Hosts |
|---------|-------------|-------|
| `01_cis_benchmark.yml` | Bastionado CIS Benchmark nivel 1 | target1 |
| `02_firewall_politicas.yml` | Firewall UFW + fail2ban + políticas sudo | target1, target2 |
| `03_backup_bbdd.yml` | Backups de MariaDB con rotación y transferencia | target3 → target1 |
| `04_nginx_ssl.yml` | nginx con TLS (autofirmado o Let's Encrypt) | target2 |

## Conceptos cubiertos por ejercicio

| Concepto | 01 | 02 | 03 | 04 |
|----------|----|----|----|----|
| `loop` con lista | ✓ | ✓ | ✓ | ✓ |
| `loop` con dicts | ✓ | ✓ | | |
| `when` condicional | ✓ | ✓ | ✓ | ✓ |
| `register` + uso posterior | ✓ | ✓ | ✓ | ✓ |
| `set_fact` | | | ✓ | ✓ |
| `block / rescue / always` | ✓ | ✓ | ✓ | ✓ |
| `failed_when` / `changed_when` | | ✓ | ✓ | |
| `assert` | ✓ | | ✓ | ✓ |
| `handlers` + `notify` | ✓ | ✓ | | ✓ |
| `any_errors_fatal` | ✓ | ✓ | | |
| `async` / `poll` | ✓ | | | ✓ |
| `stat` (idempotencia manual) | | | | ✓ |
| `fetch` + `delegate_to` | | | ✓ | |
| `vars_files` + Vault | ✓ | ✓ | ✓ | ✓ |
| múltiples plays | | ✓ | ✓ | |

## Variables necesarias

Cada ejercicio requiere una carpeta `vars/` en el mismo directorio con los siguientes ficheros:

### `vars/cis_vars.yml` (ejercicio 01)
```yaml
# Vacío — las variables están en el propio playbook
```

### `vars/cis_vault.yml` (ejercicio 01, cifrado con Vault)
```yaml
grub_password_hash: "grub.pbkdf2.sha512.10000.XXXX"
```

### `vars/usuarios_vault.yml` (ejercicio 02, cifrado con Vault)
```yaml
# Contraseñas de usuarios operacionales si fuera necesario
```

### `vars/db_vault.yml` (ejercicio 03, cifrado con Vault)
```yaml
db_root_password: "tu_password_root"
```

### `vars/ssl_vars.yml` (ejercicio 04)
```yaml
cert_mode: selfsigned       # o letsencrypt
domain: target2.local
contact_email: tu@email.com
```

## Ejecución

```bash
# Ejercicio 1 — CIS Benchmark
ansible-playbook 01_cis_benchmark.yml

# Ejercicio 2 — Firewall y políticas
ansible-playbook 02_firewall_politicas.yml

# Ejercicio 3 — Backup de BBDD (requiere MariaDB del ejercicio del módulo 4)
ansible-playbook 03_backup_bbdd.yml --ask-vault-pass

# Ejercicio 4 — nginx + TLS
ansible-playbook 04_nginx_ssl.yml
```

> Los ejercicios que usan Vault necesitan `--ask-vault-pass` o un fichero de contraseña con `--vault-password-file`.
