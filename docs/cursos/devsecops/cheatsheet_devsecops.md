---
title: Cheatsheet DevSecOps - comandos de gitleaks, Semgrep, Trivy, Checkov y Cosign
description: >-
  Referencia rápida con todos los comandos del curso de DevSecOps. Detección de
  secretos, SAST, análisis de dependencias, escaneo de imágenes, SBOM, firma,
  seguridad en IaC y DAST, listos para copiar y pegar.
keywords:
  - cheatsheet devsecops
  - comandos devsecops
  - gitleaks comandos
  - trivy comandos
  - semgrep comandos
  - checkov comandos
  - cosign comandos
  - referencia rapida seguridad
  - chuleta devsecops
  - herramientas devsecops
  - devsecops resumen
  - comandos seguridad docker
sidebar_label: 11. Cheatsheet
tags:
  - devsecops
  - seguridad
  - cheatsheet
image: 'https://pabpereza.dev/img/banner_devsecops.png'
slug: cheatsheet_devsecops_comandos_gitleaks_semgrep_trivy_checkov_cosign
---

# Cheatsheet DevSecOps

Todos los comandos del curso en una página. Ninguno necesita instalar nada más que Docker.

Los ejemplos asumen que estás dentro del [repositorio de prácticas](https://github.com/pabpereza/devsecops-demo):

```bash
git clone https://github.com/pabpereza/devsecops-demo
cd devsecops-demo
```

## Secretos — gitleaks

```bash
# Analizar todo el historial del repositorio
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest detect -s /repo -v

# Analizar solo lo que está en staging (antes del commit)
docker run --rm -v "$PWD:/repo" -w /repo zricethezav/gitleaks:latest protect --staged -v

# Analizar el directorio sin mirar el historial de git
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest detect -s /repo --no-git

# Generar informe en JSON
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest \
  detect -s /repo -f json -r /repo/gitleaks.json
```

Hook de pre-commit:

```bash
# .git/hooks/pre-commit  (recuerda: chmod +x)
#!/bin/sh
docker run --rm -v "$PWD:/repo" -w /repo \
  zricethezav/gitleaks:latest protect --staged || {
    echo "❌ Secreto detectado. Commit abortado."
    exit 1
  }
```

Silenciar un falso positivo en `.gitleaksignore` (el fingerprint sale del informe):

```
d2cfcbaa96ee67dd3c9a3b891b35d01ad3eff674:src/config.js:generic-api-key:19
```

## Dependencias — Trivy

```bash
# Vulnerabilidades en dependencias
docker run --rm -v "$PWD:/src" aquasec/trivy:latest fs --scanners vuln /src

# Solo lo grave
docker run --rm -v "$PWD:/src" aquasec/trivy:latest fs \
  --scanners vuln --severity HIGH,CRITICAL /src

# Solo lo que tiene parche disponible
docker run --rm -v "$PWD:/src" aquasec/trivy:latest fs \
  --scanners vuln --ignore-unfixed /src
```

:::warning Sin fichero de bloqueo no hay análisis

Trivy necesita `package-lock.json`, `yarn.lock`, `poetry.lock`, `go.sum`… Con solo `package.json` **no reporta nada**.

:::

## SAST — Semgrep

```bash
# Reglas automáticas según el lenguaje detectado
docker run --rm -v "$PWD:/src" semgrep/semgrep:latest semgrep --config=auto /src

# Un conjunto de reglas concreto
docker run --rm -v "$PWD:/src" semgrep/semgrep:latest semgrep --config=p/security-audit /src

# Tus propias reglas
docker run --rm -v "$PWD:/src" semgrep/semgrep:latest semgrep --config=/src/.semgrep.yml /src

# Salida SARIF para GitHub
docker run --rm -v "$PWD:/src" semgrep/semgrep:latest \
  semgrep --config=auto --sarif --output=/src/semgrep.sarif /src

# Analizar solo lo que ha cambiado
semgrep --config=auto --baseline-commit=origin/main
```

Regla propia mínima:

```yaml
# .semgrep.yml
rules:
  - id: sql-por-concatenacion
    message: Consulta SQL construida concatenando texto. Usa consultas parametrizadas.
    languages: [javascript, typescript]
    severity: ERROR
    patterns:
      - pattern-either:
          - pattern: $CLIENT.query("..." + $X, ...)
          - pattern: $CLIENT.query('...' + $X, ...)
          - pattern: $CLIENT.query(`...${$X}...`, ...)
```

Silenciar una línea concreta: `// nosemgrep: sql-por-concatenacion`

## Imágenes — Trivy

```bash
# Escanear una imagen
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image node:22-alpine

# La comparativa del curso
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image node:16          # 990 vulnerabilidades
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image node:22-alpine   # 20

# Gate de CI: sale con código 1 si hay algo crítico
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image \
  --severity CRITICAL --ignore-unfixed --exit-code 1 mi-imagen:1.0
```

`.trivyignore` — pon siempre motivo y fecha de revisión:

```
# CVE-2019-1010022: glibc, disputado por el proyecto, sin parche.
# Revisar: 2026-12-01
CVE-2019-1010022
```

## SBOM y firma — Syft y Cosign

```bash
# Generar el SBOM
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  anchore/syft:latest mi-imagen:1.0 -o spdx-json > sbom.json

# Formato CycloneDX
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  anchore/syft:latest mi-imagen:1.0 -o cyclonedx-json > sbom.json

# Escanear un SBOM ya generado
docker run --rm -v "$PWD:/w" -w /w aquasec/trivy:latest sbom sbom.json
```

Firma (fija siempre la versión: los flags cambian entre versiones):

```bash
export COSIGN_PASSWORD=""
C="gcr.io/projectsigstore/cosign:v2.4.1"

# Registry local — en macOS usa el 5001, el 5000 lo ocupa AirPlay
docker run -d --rm -p 5001:5000 --name reg registry:2

docker run --rm -e COSIGN_PASSWORD --network host -v "$PWD:/w" -w /w $C generate-key-pair

docker run --rm -e COSIGN_PASSWORD --network host -v "$PWD:/w" -w /w $C \
  sign --key cosign.key --tlog-upload=false --yes localhost:5001/demo:1.0

docker run --rm -e COSIGN_PASSWORD --network host -v "$PWD:/w" -w /w $C \
  verify --key cosign.pub --insecure-ignore-tlog=true localhost:5001/demo:1.0
```

Firma sin claves en GitHub Actions (requiere `permissions: id-token: write`):

```bash
cosign sign --yes ghcr.io/usuario/imagen@sha256:abc...

cosign verify \
  --certificate-identity-regexp "https://github.com/usuario/.*" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/usuario/imagen:1.0
```

## Infraestructura — Checkov y Conftest

```bash
# Auditar Terraform
docker run --rm -v "$PWD/infra:/tf" bridgecrew/checkov:latest -d /tf --compact

# Saltar una comprobación concreta
docker run --rm -v "$PWD/infra:/tf" bridgecrew/checkov:latest -d /tf --skip-check CKV_AWS_144

# La alternativa si ya usas Trivy
docker run --rm -v "$PWD:/src" aquasec/trivy:latest config /src
```

Políticas propias con Conftest:

```bash
# Ver cómo parsea tu fichero (imprescindible antes de escribir la regla)
docker run --rm -v "$PWD:/project" openpolicyagent/conftest:latest parse infra/main.tf

docker run --rm -v "$PWD:/project" openpolicyagent/conftest:latest \
  test infra/main.tf -p policy
```

```rego
# policy/s3.rego
package main

deny contains msg if {
	acl := input.resource.aws_s3_bucket_acl[name][_]   # ← ojo al [_]
	startswith(acl.acl, "public")
	msg := sprintf("El bucket '%s' tiene ACL publica", [name])
}
```

:::tip El error más común de Rego con Terraform

Cada recurso es una **lista** de bloques, no un objeto. Sin el `[_]`, la política pasa en silencio aunque haya violaciones.

:::

## DAST — OWASP ZAP

```bash
# Levantar la aplicación y ZAP en la misma red (funciona en cualquier sistema)
docker network create devsecops-lab
docker run -d --rm --name demo-app --network devsecops-lab mi-imagen:1.0

# Escaneo pasivo: rápido e inofensivo
docker run --rm --network devsecops-lab \
  zaproxy/zap-stable zap-baseline.py -t http://demo-app:3000

# Escaneo activo: ATACA de verdad, solo en staging y con permiso
docker run --rm --network devsecops-lab \
  zaproxy/zap-stable zap-full-scan.py -t http://demo-app:3000

# APIs sin interfaz web
docker run --rm --network devsecops-lab \
  zaproxy/zap-stable zap-api-scan.py -t http://demo-app:3000/openapi.json -f openapi
```

```
# .zap/rules.tsv    IGNORE no aparece · WARN informa · FAIL rompe el build
10015	IGNORE	(Re-examine Cache-control Directives)
10038	FAIL	(Content Security Policy Header Not Set)
```

## Qué herramienta en qué etapa

| Etapa | Herramienta | Qué encuentra |
|---|---|---|
| Pre-commit | gitleaks | Secretos antes de confirmarlos |
| Push | gitleaks, Semgrep | Secretos en el historial, fallos de código |
| Push | Trivy `fs` | Dependencias vulnerables |
| Build | Trivy `image` | CVEs del sistema y de la aplicación |
| Build | Syft, Cosign | Inventario y firma del artefacto |
| Pre-deploy | Checkov, Conftest | Infraestructura mal configurada |
| Post-deploy | OWASP ZAP | Cabeceras, XSS, fugas de información |

## Reglas que valen más que los comandos

1. **Informa de todo, bloquea por poco.** Dos pasos: uno que reporta sin fallar y otro que bloquea solo lo crítico con parche disponible.
2. **Ninguna herramienta lo encuentra todo.** Gitleaks no vio la clave de AWS; Semgrep sí. Las reglas gratuitas de Semgrep no ven la inyección SQL; una regla propia de doce líneas, sí.
3. **Un control que se desactiva no protege.** Arranca informando, congela la deuda y sube el listón cuando el número sea manejable.
4. **Sube los informes en SARIF.** Los hallazgos hay que ponerlos donde la gente ya está mirando: el pull request.
5. **Ante una fuga: rotar primero**, limpiar el historial después.

---

> 💡 Todos los comandos de esta página están ejecutados y verificados contra el [repositorio de prácticas](https://github.com/pabpereza/devsecops-demo).
