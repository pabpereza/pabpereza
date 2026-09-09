---
title: "Cheatsheet Tmux"
tags: [tmux, cheatsheet, referencia, terminal]
description: "Guía rápida de comandos y configuraciones esenciales de Tmux para mejorar tu productividad en terminal."
keywords: [tmux, cheatsheet, terminal, productividad]
image: 'https://pabpereza.dev/img/banner_tmux.png'
sidebar_label: "Cheatsheet Tmux"
---

# 📋 Cheatsheet Tmux

## 🔑 Conceptos clave

- **Prefix**: Combinación de teclas para activar comandos (por defecto `Ctrl+b`)
- **Sesión**: Contenedor principal, persiste al cerrar terminal
- **Ventana**: Equivalente a pestañas en navegadores
- **Panel**: División de ventana (split horizontal/vertical)

## 🎮 Sesiones

### Gestión básica
| Comando | Acción |
|---------|--------|
| `tmux` | Nueva sesión |
| `tmux new -s nombre` | Nueva sesión con nombre |
| `tmux ls` | Listar sesiones |
| `tmux attach -t nombre` | Conectar a sesión |
| `tmux kill-session -t nombre` | Eliminar sesión |

### Dentro de tmux
| Comando | Acción |
|---------|--------|
| `prefix + d` | Desconectar (detach) |
| `prefix + s` | Listar y cambiar sesiones |
| `prefix + $` | Renombrar sesión actual |
| `prefix + (` | Sesión anterior |
| `prefix + )` | Sesión siguiente |

## 🪟 Ventanas

| Comando | Acción |
|---------|--------|
| `prefix + c` | Nueva ventana |
| `prefix + ,` | Renombrar ventana |
| `prefix + &` | Cerrar ventana |
| `prefix + n` | Siguiente ventana |
| `prefix + p` | Ventana anterior |
| `prefix + l` | Última ventana activa |
| `prefix + 0-9` | Ir a ventana número |
| `prefix + w` | Lista de ventanas |
| `prefix + f` | Buscar ventana |

## 📱 Paneles

### Crear paneles
| Comando | Acción |
|---------|--------|
| `prefix + %` | Split vertical |
| `prefix + "` | Split horizontal |
| `prefix + x` | Cerrar panel |

### Navegar paneles
| Comando | Acción |
|---------|--------|
| `prefix + →` | Panel derecha |
| `prefix + ←` | Panel izquierda |
| `prefix + ↑` | Panel arriba |
| `prefix + ↓` | Panel abajo |
| `prefix + o` | Siguiente panel |
| `prefix + ;` | Último panel activo |
| `prefix + q` | Mostrar números de panel |
| `prefix + q + número` | Ir a panel número |

### Redimensionar paneles
| Comando | Acción |
|---------|--------|
| `prefix + Ctrl + →` | Agrandar derecha |
| `prefix + Ctrl + ←` | Agrandar izquierda |
| `prefix + Ctrl + ↑` | Agrandar arriba |
| `prefix + Ctrl + ↓` | Agrandar abajo |
| `prefix + Alt + →` | Redimensionar 5 chars derecha |
| `prefix + Alt + ←` | Redimensionar 5 chars izquierda |
| `prefix + Alt + ↑` | Redimensionar 5 chars arriba |
| `prefix + Alt + ↓` | Redimensionar 5 chars abajo |

### Organizar paneles
| Comando | Acción |
|---------|--------|
| `prefix + {` | Mover panel izquierda |
| `prefix + }` | Mover panel derecha |
| `prefix + space` | Cambiar layout |
| `prefix + !` | Convertir panel en ventana |
| `prefix + z` | Zoom/unzoom panel |

## 📋 Copy Mode (modo copia)

### Entrar y navegar
| Comando | Acción |
|---------|--------|
| `prefix + [` | Entrar copy mode |
| `q` | Salir copy mode |
| `h,j,k,l` | Navegar (como vim) |
| `w` | Siguiente palabra |
| `b` | Palabra anterior |
| `g` | Inicio de buffer |
| `G` | Final de buffer |
| `/` | Buscar hacia adelante |
| `?` | Buscar hacia atrás |
| `n` | Siguiente resultado |
| `N` | Resultado anterior |

### Seleccionar y copiar
| Comando | Acción |
|---------|--------|
| `space` | Comenzar selección |
| `enter` | Copiar selección |
| `v` | Selección rectangular |
| `y` | Copiar (sin salir) |

### Pegar
| Comando | Acción |
|---------|--------|
| `prefix + ]` | Pegar |
| `prefix + =` | Lista de buffers |

## ⚙️ Configuración común

### Archivo ~/.tmux.conf

```bash
# Cambiar prefix a Ctrl+a
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# Splits más intuitivos
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

# Navegación estilo vim
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Redimensionar paneles
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# Habilitar mouse
set -g mouse on

# Comenzar ventanas y paneles en 1
set -g base-index 1
setw -g pane-base-index 1

# Renumerar ventanas automáticamente
set -g renumber-windows on

# No delay para escape key
set -sg escape-time 0

# Aumentar history
set -g history-limit 10000

# Recargar configuración
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# Copy mode estilo vim
setw -g mode-keys vi
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "xclip -selection clipboard"

# Colores
set -g default-terminal "screen-256color"
```

## 🎨 Personalización visual

### Status bar
```bash
# Configuración de status bar
set -g status-bg black
set -g status-fg white
set -g status-left "#[fg=green]#S "
set -g status-right "#[fg=yellow]%d %b %R"
set -g status-justify centre

# Colores de ventanas
setw -g window-status-current-style fg=black,bg=white
```

### Themes populares
- **tmux-powerline**: Status bar avanzado
- **oh-my-tmux**: Configuración completa
- **tmux-themepack**: Temas pre-hechos

## 🔗 Integración con vim

### Navegación seamless (vim-tmux-navigator)
```bash
# En ~/.tmux.conf
is_vim="ps -o state= -o comm= -t '#{pane_tty}' \
    | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|n?vim?x?)(diff)?$'"
bind-key -n 'C-h' if-shell "$is_vim" 'send-keys C-h'  'select-pane -L'
bind-key -n 'C-j' if-shell "$is_vim" 'send-keys C-j'  'select-pane -D'
bind-key -n 'C-k' if-shell "$is_vim" 'send-keys C-k'  'select-pane -U'
bind-key -n 'C-l' if-shell "$is_vim" 'send-keys C-l'  'select-pane -R'
```

## 🚀 Workflows comunes

### Desarrollo web
```bash
# Sesión para proyecto web
tmux new-session -d -s web
tmux rename-window -t web:0 'editor'
tmux send-keys -t web:0 'nvim .' Enter
tmux new-window -t web -n 'server'
tmux send-keys -t web:server 'npm run dev' Enter
tmux new-window -t web -n 'git'
tmux send-keys -t web:git 'git status' Enter
tmux attach -t web
```

### DevOps
```bash
# Sesión para monitoreo
tmux new-session -d -s monitor
tmux split-window -h
tmux split-window -v
tmux send-keys -t monitor:0.0 'htop' Enter
tmux send-keys -t monitor:0.1 'watch kubectl get pods' Enter
tmux send-keys -t monitor:0.2 'tail -f /var/log/nginx/access.log' Enter
tmux attach -t monitor
```

## 🎯 Comandos avanzados

### Scripteo
| Comando | Acción |
|---------|--------|
| `tmux send-keys 'comando' Enter` | Enviar comando a sesión |
| `tmux capture-pane -p` | Capturar contenido de panel |
| `tmux list-sessions -F '#{session_name}'` | Listar solo nombres |

### Sesiones múltiples
```bash
# Trabajar con múltiples sesiones
tmux new-session -d -s trabajo
tmux new-session -d -s personal
tmux new-session -d -s experimentos

# Cambiar entre sesiones rápidamente
tmux switch-client -t trabajo
```

## 🔧 Comandos de línea útiles

```bash
# Crear sesión completa desde script
tmux new-session -d -s proyecto \; \
  send-keys 'cd /path/to/project' Enter \; \
  split-window -h \; \
  send-keys 'git status' Enter \; \
  select-pane -L \; \
  send-keys 'nvim .' Enter

# Backup de sesión
tmux capture-pane -p > session_backup.txt

# Listar todas las sesiones con detalles
tmux list-sessions -F "#{session_name}: #{session_windows} windows (created #{session_created_string}) [#{session_width}x#{session_height}]"
```

## 🐛 Troubleshooting

### Problemas comunes
- **Colors no funcionan**: Revisar `$TERM` variable
- **Copy/paste no funciona**: Instalar `xclip` o `pbcopy`
- **Prefix no responde**: Verificar conflictos con otros shortcuts
- **Mouse no funciona**: Añadir `set -g mouse on` a config

### Reset completo
```bash
# Matar todas las sesiones
tmux kill-server

# Recargar config
tmux source-file ~/.tmux.conf
```

---

**💡 Pro tip**: Creemos aliases para nuestras sesiones más comunes. Por ejemplo: `alias dev='tmux new-session -d -s development || tmux attach -t development'`
