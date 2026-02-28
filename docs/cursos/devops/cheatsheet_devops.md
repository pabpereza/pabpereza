# DevOps Cheatsheet 📋

Referencia rápida de comandos, conceptos y mejores prácticas de DevOps.

## 🔄 Git Avanzado

### Workflow Commands
```bash
# Feature branch workflow
git checkout -b feature/nueva-funcionalidad
git commit -m "feat: añadir nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# Code review y merge
git checkout main
git pull origin main
git merge --no-ff feature/nueva-funcionalidad
git tag v1.2.0
git push origin main --tags

# Hotfix workflow
git checkout -b hotfix/bug-critico main
git commit -m "fix: corregir bug crítico"
git checkout main && git merge hotfix/bug-critico
git checkout develop && git merge hotfix/bug-critico
```

### Conventional Commits
```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo, punto y coma faltante, etc
refactor: refactoring de código
test: añadir tests faltantes
chore: actualizar build tasks, package manager
```

### Comandos útiles
```bash
# Ver historial gráfico
git log --oneline --graph --all

# Buscar en commits
git log --grep="palabra_clave"

# Ver cambios entre branches
git diff main..feature/branch

# Rebase interactivo
git rebase -i HEAD~3

# Cherry pick
git cherry-pick <commit-hash>

# Stash avanzado
git stash push -m "mensaje" -- archivo.txt
git stash list
git stash apply stash@{0}
```

## 🏗️ Infrastructure as Code

### Terraform Basics
```hcl
# main.tf
provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  
  tags = {
    Name = "web-server"
    Environment = var.environment
  }
}

# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

# outputs.tf
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

### Terraform Commands
```bash
# Inicializar
terraform init

# Planificar cambios
terraform plan -out=tfplan

# Aplicar cambios
terraform apply tfplan

# Ver estado
terraform show
terraform state list

# Destruir infraestructura
terraform destroy

# Formatear código
terraform fmt

# Validar configuración
terraform validate
```

### Ansible Básico
```yaml
# playbook.yml
---
- hosts: webservers
  become: yes
  vars:
    http_port: 80
    max_clients: 200
  
  tasks:
    - name: Install Apache
      package:
        name: apache2
        state: present
    
    - name: Start Apache service
      service:
        name: apache2
        state: started
        enabled: yes
    
    - name: Copy index.html
      template:
        src: index.html.j2
        dest: /var/www/html/index.html
      notify: restart apache
  
  handlers:
    - name: restart apache
      service:
        name: apache2
        state: restarted
```

```bash
# Comandos Ansible
ansible-playbook -i inventory playbook.yml
ansible all -i inventory -m ping
ansible-vault encrypt secrets.yml
ansible-vault decrypt secrets.yml
```

## 🔄 CI/CD Pipelines

### GitHub Actions
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint
  
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:${{ github.sha }}
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: |
          ssh user@server "docker pull myapp:${{ github.sha }}"
          ssh user@server "docker-compose up -d"
```

### GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
    - npm run lint
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh
    - ssh user@server "docker pull $DOCKER_IMAGE"
    - ssh user@server "docker-compose up -d"
  environment:
    name: production
    url: https://myapp.com
  only:
    - main
```

### Jenkins Pipeline
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "myapp:${BUILD_NUMBER}"
    }
    
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker push ${DOCKER_IMAGE}'
                sh 'kubectl set image deployment/myapp myapp=${DOCKER_IMAGE}'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build failed. Check console output.",
                to: "team@company.com"
            )
        }
    }
}
```

## 🐳 Docker Essentials

### Dockerfile best practices
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Commands
```bash
# Build y tag
docker build -t myapp:latest .
docker tag myapp:latest myapp:v1.0.0

# Run con opciones
docker run -d --name myapp -p 3000:3000 -e NODE_ENV=production myapp:latest

# Logs y debugging
docker logs -f myapp
docker exec -it myapp /bin/sh

# Cleanup
docker system prune -a
docker volume prune

# Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down -v
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
    restart: unless-stopped
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## ☸️ Kubernetes Basics

### Deployment YAML
```yaml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### kubectl Commands
```bash
# Aplicar configuraciones
kubectl apply -f deployment.yml
kubectl apply -f https://url-to-manifest.yaml

# Ver recursos
kubectl get pods
kubectl get services
kubectl get deployments
kubectl get all -n namespace

# Describir recursos
kubectl describe pod <pod-name>
kubectl describe service <service-name>

# Logs y debugging
kubectl logs -f <pod-name>
kubectl exec -it <pod-name> -- /bin/bash

# Escalado
kubectl scale deployment myapp --replicas=5

# Rolling update
kubectl set image deployment/myapp myapp=myapp:v2.0.0

# Port forwarding
kubectl port-forward service/myapp-service 8080:80
```

## 📊 Monitoring & Observability

### Prometheus Queries
```promql
# CPU usage
rate(cpu_usage_seconds_total[5m])

# Memory usage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes

# HTTP request rate
rate(http_requests_total[5m])

# Error rate
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### Grafana Dashboard JSON snippet
```json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{handler}}"
          }
        ]
      }
    ]
  }
}
```

### ELK Stack - Logstash Config
```ruby
# logstash.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][logtype] == "nginx" {
    grok {
      match => { "message" => "%{NGINXACCESS}" }
    }
    date {
      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
```

## 🔒 Security (DevSecOps)

### Security Scanning Commands
```bash
# Dependency scanning
npm audit
npm audit fix

# SAST (Static Application Security Testing)
bandit -r . # Python
eslint --ext .js,.jsx ./ # JavaScript

# Container scanning
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:latest

# Infrastructure scanning
checkov -f main.tf
tfsec .
```

### Secrets Management
```bash
# Using environment variables
export DATABASE_URL="postgresql://user:pass@localhost/db"

# Using Docker secrets
echo "secret_password" | docker secret create db_password -

# Using Kubernetes secrets
kubectl create secret generic db-secret \
  --from-literal=username=user \
  --from-literal=password=pass

# Using HashiCorp Vault
vault kv put secret/myapp username=user password=pass
vault kv get -field=password secret/myapp
```

## 🚨 Incident Response

### Incident Response Commands
```bash
# Quick system check
top
htop
df -h
free -h
iostat

# Network debugging
netstat -tulpn
ss -tulpn
nslookup domain.com
dig domain.com

# Process debugging
ps aux | grep process_name
strace -p <pid>
lsof -p <pid>

# Log analysis
tail -f /var/log/application.log
grep "ERROR" /var/log/application.log | tail -20
journalctl -u service_name -f
```

### SRE Golden Signals
```yaml
# Latency
- P50, P90, P95, P99 response times
- Query: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Traffic
- Requests per second
- Query: rate(http_requests_total[5m])

# Errors
- Error rate percentage
- Query: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])

# Saturation
- CPU, memory, disk usage
- Query: (1 - rate(cpu_idle_time[5m])) * 100
```

## 📈 DORA Metrics

### Deployment Frequency
```bash
# Git commits to main
git log --oneline --since="1 month ago" main | wc -l

# Deployments per day
kubectl get events --field-selector reason=ScalingReplicaSet
```

### Lead Time for Changes
```bash
# Time from commit to deployment
git log --pretty=format:"%h %cd" --date=iso main | head -10
```

### Mean Time to Recovery (MTTR)
```promql
# Prometheus query for MTTR
avg_over_time(up[5m]) < 0.5
```

### Change Failure Rate
```bash
# Failed deployments ratio
kubectl get events --field-selector reason=Failed
```

---

**Este cheatsheet es una referencia rápida. Para implementaciones detalladas, consulta cada capítulo específico del curso.**
