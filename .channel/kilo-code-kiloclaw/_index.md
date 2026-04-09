# KiloClaw para DevSecOps

- **Slug:** kilo-code-kiloclaw
- **Estado:** borrador / evaluacion de patrocinio
- **Tipo:** video patrocinado (sponsor inbound)
- **Fecha:** 2026-04-07
- **Producto unico:** KiloClaw (NO se cubre Kilo Code en este video)

## Concepto
Video monografico sobre **KiloClaw**, la version hosted de OpenClaw operada por
Kilo (9 USD/mes). El angulo NO es "probamos un asistente personal con IA" —
hay cientos de esos y no encajan con el canal. El angulo es:
**"Tengo una VM con shell, cron, browser y conexion a WhatsApp/Telegram/Slack
por 9 dolares al mes — que puede hacer un sysadmin con eso?"**

Kilo Code y OpenClaw self-hosted quedan fuera del video salvo mencion de 30
segundos para contexto (que es KiloClaw = OpenClaw hosted).

## Angulo recomendado
"KiloClaw para sysadmins: convertir un agente personal de IA en tu segundo
operador de guardia." El video muestra 3-4 casos reales de integracion con
infra DevOps tirando de lo unico que KiloClaw garantiza: shell con egress,
cron, y canales de mensajeria. Todo verificable en docs de OpenClaw.

## Audiencia
DevOps, sysadmins y homelabbers hispanohablantes. Perfil habitual del canal.
Nivel medio-alto. Ya tienen Docker, k8s, Prometheus, Tailscale o Wireguard,
y un grupo de Telegram o Slack del curro.

## Patrocinio (datos del pitch)
- Sponsor: Kilo Code (Brian, dev rel)
- Producto a destacar: KiloClaw (no Kilo Code)
- Ofrecen: pago, cuenta con creditos, afiliados
- A validar: libertad editorial, disclosure, que se pueda ser critico con
  los limites del sandbox hosted

## Riesgos editoriales
- **Vender humo**: KiloClaw es una VM compartida de 2 vCPU / 3 GB / 10 GB.
  No es Kubernetes, no es un runner de CI, no es un bastion. Hay que ser
  honesto con lo que puede y no puede hacer.
- **Sandbox hosted**: la "shell" del agente corre en infra de Kilo, NO en
  tu homelab. Cualquier integracion con infra propia pasa por egress
  (SSH saliente, API publica, tunel Tailscale, webhook entrante a traves
  del canal de chat).
- **Seguridad**: darle a un LLM acceso shell con credenciales de tu
  infraestructura es un riesgo real. Hay que tratarlo con el mismo rigor
  que darle sudo a un becario. El video tiene que dejarlo explicito.
- **Precio honesto**: 9 USD/mes es barato comparado con montarlo tu, pero
  un VPS con n8n + un LLM por API puede salir mas barato todavia y ser
  mas flexible. Lo mencionamos.

## Entregables
- research.md (Legolas)
- seo.md (Legolas)
- script.md (Frodo)
- assets.md (Merry)
