---
name: kubernetes-specialist
description: Use when deploying or managing Kubernetes workloads. Invoke to create deployment manifests, configure pod security policies, set up service accounts, define network isolation rules, debug pod crashes, analyze resource limits, inspect container logs, or right-size workloads. Use for Helm charts, RBAC policies, NetworkPolicies, storage configuration, performance optimization, GitOps pipelines, and multi-cluster management.
license: MIT
metadata:
  author: https://github.com/Jeffallan
  version: "1.2.0"
  domain: infrastructure
  triggers: Kubernetes, K8s, kubectl, Helm, container orchestration, pod deployment, RBAC, NetworkPolicy, Ingress, StatefulSet, Operator, CRD, CustomResourceDefinition, ArgoCD, Flux, GitOps, Istio, Linkerd, service mesh, multi-cluster, cost optimization, VPA, spot instances
  role: specialist
  scope: infrastructure
  output-format: manifests
  related-skills: devops-engineer, cloud-architect, sre-engineer
---

# Kubernetes Specialist

## Convenciones de este repositorio (IMPORTANTE)

El curso de Kubernetes vive en `docs/cursos/kubernetes/`. Todo contenido nuevo o revisado debe respetar estas convenciones:

### Estructura y formato del curso
- **Numeración**: `1XX.Nombre.md` para el bloque común/básico (101-126). Las especializaciones (CKA, CKAD, CKS) se definen en el índice del `README.md` del curso — consultar ahí antes de crear ficheros nuevos.
- **Frontmatter obligatorio**: `title`, `description`, `keywords` (lista, 8-12 entradas SEO), `sidebar_label` (`N. Título corto`), `tags` (incluir la certificación si aplica: `CKA`, `CKAD`, `CKS`), `image: 'https://pabpereza.dev/img/banner_kubernetes.png'` y `slug` (snake_case derivado del título). **Nunca** usar `:` dentro de los valores del frontmatter.
- **Cierre de cada lección** (footer fijo):
  ```markdown
  ---
  * Lista de vídeos en Youtube: [Curso Kubernetes](https://www.youtube.com/playlist?list=PLQhxXeq1oc2k9MFcKxqXy5GV4yy7wqSma)

  [Volver al índice](README.md#índice)
  ```
- **Idioma y tono**: español, conversacional pero profesional, con analogías para conceptos complejos. Párrafos de máximo 4-5 líneas. Explicar acrónimos en su primera aparición.
- **Diagramas**: usar Mermaid para ilustrar conceptos (arquitectura, flujos de tráfico, ciclos de vida).
- **Enlaces internos**: relativos entre lecciones (`./108.Deployments.md`).

### Enfoque a certificaciones (CKA, CKAD, CKS)
- Todo el contenido debe preparar para los exámenes oficiales de la CNCF. Incluir en cada lección los comandos `kubectl` que se usan en el examen.
- **Los exámenes son prácticos y con tiempo limitado**: los comandos imperativos (`kubectl run`, `kubectl create deployment ... --dry-run=client -o yaml`, `kubectl expose`) son válidos y recomendables en este contexto, aunque en producción se prefiera YAML declarativo.
- Incluir trucos de examen donde aplique: generación de YAML con `--dry-run=client -o yaml`, uso de `kubectl explain`, alias `k`, búsqueda en `kubernetes.io/docs` (única documentación permitida en el examen).
- Marcar con claridad qué temas pertenecen a cada certificación.

### Versiones y características actuales (no enseñar contenido obsoleto)
- Asumir **Kubernetes v1.33+** y `containerd` como runtime. Repositorios de paquetes en `pkgs.k8s.io` (los antiguos `apt.kubernetes.io` / `packages.cloud.google.com` están retirados).
- **PodSecurityPolicy fue ELIMINADO en v1.25**: enseñar **Pod Security Admission** (labels `pod-security.kubernetes.io/enforce|audit|warn` en namespaces) y validación con OPA Gatekeeper/Kyverno.
- **Sidecars nativos** (estable desde v1.29): `initContainers` con `restartPolicy: Always`.
- **Gateway API es GA** y es el sucesor de Ingress; el curso tiene lección propia (113).
- Versiones de ejemplo en comandos (`kubeadm`, `kubelet`, `kubectl`) deben usar el formato actual de paquete: `1.33.x-1.1`, no `1.23.1-00`.
- `kubectl exec pod -- comando` (con `--`), tokens de ServiceAccount efímeros (`kubectl create token`), y `etcdctl` con `ETCDCTL_API=3` implícito (etcd ≥3.4).

## When to Use This Skill

- Deploying workloads (Deployments, StatefulSets, DaemonSets, Jobs)
- Configuring networking (Services, Ingress, NetworkPolicies)
- Managing configuration (ConfigMaps, Secrets, environment variables)
- Setting up persistent storage (PV, PVC, StorageClasses)
- Creating Helm charts for application packaging
- Troubleshooting cluster and workload issues
- Implementing security best practices

## Core Workflow

1. **Analyze requirements** — Understand workload characteristics, scaling needs, security requirements
2. **Design architecture** — Choose workload types, networking patterns, storage solutions
3. **Implement manifests** — Create declarative YAML with proper resource limits, health checks
4. **Secure** — Apply RBAC, NetworkPolicies, Pod Security Standards, least privilege
5. **Validate** — Run `kubectl rollout status`, `kubectl get pods -w`, and `kubectl describe pod <name>` to confirm health; roll back with `kubectl rollout undo` if needed

## Reference Guide

Load detailed guidance based on context:

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Workloads | `references/workloads.md` | Deployments, StatefulSets, DaemonSets, Jobs, CronJobs |
| Networking | `references/networking.md` | Services, Ingress, NetworkPolicies, DNS |
| Configuration | `references/configuration.md` | ConfigMaps, Secrets, environment variables |
| Storage | `references/storage.md` | PV, PVC, StorageClasses, CSI drivers |
| Helm Charts | `references/helm-charts.md` | Chart structure, values, templates, hooks, testing, repositories |
| Troubleshooting | `references/troubleshooting.md` | kubectl debug, logs, events, common issues |
| Custom Operators | `references/custom-operators.md` | CRD, Operator SDK, controller-runtime, reconciliation |
| Service Mesh | `references/service-mesh.md` | Istio, Linkerd, traffic management, mTLS, canary |
| GitOps | `references/gitops.md` | ArgoCD, Flux, progressive delivery, sealed secrets |
| Cost Optimization | `references/cost-optimization.md` | VPA, HPA tuning, spot instances, quotas, right-sizing |
| Multi-Cluster | `references/multi-cluster.md` | Cluster API, federation, cross-cluster networking, DR |

## Constraints

### MUST DO
- Use declarative YAML manifests for production examples (imperative kubectl commands are fine — and encouraged — in exam-prep context, see repo conventions above)
- Set resource requests and limits on all containers
- Include liveness and readiness probes
- Use secrets for sensitive data (never hardcode credentials)
- Apply least privilege RBAC permissions
- Implement NetworkPolicies for network segmentation
- Use namespaces for logical isolation
- Label resources consistently for organization
- Document configuration decisions in annotations

### MUST NOT DO
- Deploy to production without resource limits
- Store secrets in ConfigMaps or as plain environment variables
- Use default ServiceAccount for application pods
- Allow unrestricted network access (default allow-all)
- Run containers as root without justification
- Skip health checks (liveness/readiness probes)
- Use latest tag for production images
- Expose unnecessary ports or services

## Common YAML Patterns

### Deployment with resource limits, probes, and security context

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: my-namespace
  labels:
    app: my-app
    version: "1.2.3"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        version: "1.2.3"
    spec:
      serviceAccountName: my-app-sa   # never use default SA
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      containers:
        - name: my-app
          image: my-registry/my-app:1.2.3   # never use latest
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 20
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
          envFrom:
            - secretRef:
                name: my-app-secret   # pull credentials from Secret, not ConfigMap
```

### Minimal RBAC (least privilege)

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  namespace: my-namespace
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: my-app-role
  namespace: my-namespace
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]   # grant only what is needed
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: my-app-rolebinding
  namespace: my-namespace
subjects:
  - kind: ServiceAccount
    name: my-app-sa
    namespace: my-namespace
roleRef:
  kind: Role
  name: my-app-role
  apiGroup: rbac.authorization.k8s.io
```

### NetworkPolicy (default-deny + explicit allow)

```yaml
# Deny all ingress and egress by default
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: my-namespace
spec:
  podSelector: {}
  policyTypes: ["Ingress", "Egress"]
---
# Allow only specific traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-my-app
  namespace: my-namespace
spec:
  podSelector:
    matchLabels:
      app: my-app
  policyTypes: ["Ingress"]
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
```

## Validation Commands

After deploying, verify health and security posture:

```bash
# Watch rollout complete
kubectl rollout status deployment/my-app -n my-namespace

# Stream pod events to catch crash loops or image pull errors
kubectl get pods -n my-namespace -w

# Inspect a specific pod for failures
kubectl describe pod <pod-name> -n my-namespace

# Check container logs
kubectl logs <pod-name> -n my-namespace --previous   # use --previous for crashed containers

# Verify resource usage vs. limits
kubectl top pods -n my-namespace

# Audit RBAC permissions for a service account
kubectl auth can-i --list --as=system:serviceaccount:my-namespace:my-app-sa

# Roll back a failed deployment
kubectl rollout undo deployment/my-app -n my-namespace
```

## Output Templates

When implementing Kubernetes resources, provide:
1. Complete YAML manifests with proper structure
2. RBAC configuration if needed (ServiceAccount, Role, RoleBinding)
3. NetworkPolicy for network isolation
4. Brief explanation of design decisions and security considerations
