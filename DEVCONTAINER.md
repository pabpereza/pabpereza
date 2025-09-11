# IDE-Independent Development Environment

This project includes a complete IDE-independent development environment that works with **any editor** (Vim, NeoVim, Emacs, VS Code, IntelliJ, etc.).

## Quick Start

### Option 1: DevContainer (Recommended)
```bash
# If using VS Code or GitHub Codespaces
1. Open the project
2. Choose "Reopen in Container" when prompted
3. Wait for setup to complete
4. Start developing with any editor you prefer!
```

### Option 2: Docker Compose (Complete IDE Independence)
```bash
# Start the development environment
docker-compose -f .devcontainer/docker-compose.yml up -d

# Connect to the container
docker-compose -f .devcontainer/docker-compose.yml exec devcontainer zsh

# Install dependencies and start development
npm install
npm run start
```

### Option 3: Setup Helper
```bash
# Run the interactive setup helper
.devcontainer/setup-devcontainer.sh
```

## What You Get

✅ **Any Editor Support** - Works with Vim, NeoVim, Emacs, VS Code, etc.  
✅ **Modern CLI Tools** - ripgrep, fd, bat, exa, fzf  
✅ **Node.js Environment** - Ready for Docusaurus development  
✅ **tmux** - Terminal multiplexer for better workflow  
✅ **ZSH** - Enhanced shell with syntax highlighting  
✅ **Git Ready** - Pre-configured for version control  

## Development Commands

```bash
npm run start    # Start development server (http://localhost:3000)
npm run build    # Build the project
npm run serve    # Serve built project

# Aliases available in the container
dev             # npm run start
build           # npm run build  
ll              # Better ls with exa
cat file        # Syntax highlighted cat with bat
```

## Full Documentation

See [.devcontainer/README.md](.devcontainer/README.md) for complete usage instructions and customization options.

---

**Philosophy**: This setup follows Docker's principle of "works everywhere" - no matter what editor or OS you use, you'll have the same development environment as your teammates.