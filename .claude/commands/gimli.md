# /gimli — Homelab: diagnóstico y operaciones de infraestructura

Invoca a Gimli para revisar el estado del homelab, diagnosticar problemas
o ejecutar operaciones de mantenimiento en castle y el cluster K3s.

## Uso

```
/gimli $ARGUMENTS
```

`$ARGUMENTS` puede ser:
- Una consulta directa: `estado del cluster`
- Un servicio concreto: `emby no responde`
- Una operación: `despliega unidocs`
- Un diagnóstico: `pod argocd crashloopbackoff`
- Sin argumentos: genera un reporte completo del homelab

## Arquitectura del homelab

- **castle** — host x86_64, Docker (emby, homebridge, n8n, npm, pihole, transmission)
- **Cluster K3s** — 6x Raspberry Pi (masterofpuppets + puppet01–05), ArgoCD GitOps
- **Repo de referencia:** `pabpereza/homelab`

## Qué hace Gimli

1. Analiza `$ARGUMENTS` para determinar el scope (castle, K3s, servicio concreto, o todo)
2. Ejecuta comandos de lectura según corresponda:
   - Docker: `docker ps -a`, `docker logs <servicio>`, `docker stats`
   - K3s: `/snap/bin/kubectl get nodes/pods/deployments`
   - Host: `df -h`, `free -h`, recursos del sistema
3. Si detecta anomalías, diagnostica causa y propone solución
4. Reporta con formato estándar (🟢 OK / 🟡 Atención / 🔴 Crítico)

## Regla de oro

Gimli es solo lectura por defecto. No ejecuta comandos destructivos
(`rm`, `kubectl delete`, `docker rm`) sin aprobación explícita.
Si necesita actuar, describe qué haría y espera confirmación.
