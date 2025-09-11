# IDE-Independent Development Container

This devContainer is designed to provide a complete development environment that works with **any editor** (Vim, NeoVim, Emacs, etc.) without requiring a specific IDE like VSCode or IntelliJ.

## Philosophy

Following Docker's principle of "works everywhere", this development environment ensures that all team members can develop with the same tools and dependencies, regardless of their preferred editor or operating system.

## What's Included

### Development Tools
- **Node.js 20** - JavaScript runtime
- **npm/yarn** - Package managers
- **Git & Git LFS** - Version control
- **Vim & NeoVim** - Text editors with basic configuration
- **tmux** - Terminal multiplexer for session management

### Modern CLI Tools
- **ripgrep (rg)** - Fast grep alternative
- **fd** - Fast find alternative
- **bat** - Cat with syntax highlighting
- **exa** - Modern ls replacement
- **fzf** - Fuzzy finder
- **jq** - JSON processor
- **tree** - Directory tree viewer

### Shell Environment
- **ZSH** with Oh My Zsh
- **Syntax highlighting** and **autosuggestions**
- **Custom aliases** for faster development

## Usage Methods

### Method 1: Using devcontainer.json (Recommended)

This works with any editor that supports devcontainers:

```bash
# Clone the repository
git clone https://github.com/pabpereza/pabpereza.git
cd pabpereza

# Open with any devcontainer-compatible tool
# - VSCode: Open with "Dev Containers: Reopen in Container"
# - GitHub Codespaces: Works automatically
# - Command line: Use devcontainer CLI
```

### Method 2: Using Docker Compose

For complete IDE independence:

```bash
# Clone the repository
git clone https://github.com/pabpereza/pabpereza.git
cd pabpereza

# Start the development container
docker-compose -f .devcontainer/docker-compose.yml up -d

# Connect to the container
docker-compose -f .devcontainer/docker-compose.yml exec devcontainer zsh

# Install dependencies and start development
npm install
npm run start
```

### Method 3: Using Docker directly

```bash
# Build the development image
docker build -t pabpereza-dev .devcontainer

# Run the container
docker run -it -p 3000:3000 -v $(pwd):/workspace pabpereza-dev

# Install dependencies and start development
npm install
npm run start
```

## Development Workflow

### Starting Development

```bash
# Install dependencies (first time or after package.json changes)
npm install

# Start the development server
npm run start
# or use the alias
dev

# The server will be available at http://localhost:3000
```

### Using with Vim/NeoVim

The container comes with pre-configured Vim and NeoVim setups:

```bash
# Edit files with Vim
vim docs/some-file.md

# Edit files with NeoVim
nvim docs/some-file.md

# Use tmux for multiple terminals
tmux new-session -s dev
```

### Common Commands

```bash
# Project commands
npm run start    # Start development server
npm run build    # Build the project
npm run serve    # Serve built project

# Available aliases
dev             # npm run start
build           # npm run build
serve           # npm run serve

# Git aliases
gs              # git status
ga              # git add
gc              # git commit
gp              # git push
gl              # git log --oneline

# Modern CLI tools
ll              # exa -la (better ls)
cat file.txt    # bat file.txt (syntax highlighted)
find . -name    # fd (faster find)
grep pattern    # rg pattern (faster grep)
```

### Using tmux for Better Development

```bash
# Create a new tmux session
tmux new-session -s development

# Split terminal horizontally
Ctrl-a |

# Split terminal vertically
Ctrl-a -

# Navigate between panes
Alt + Arrow Keys

# Example workflow:
# - Pane 1: Run development server (npm run start)
# - Pane 2: Edit files with vim/nvim
# - Pane 3: Run git commands
```

## File Structure

```
.devcontainer/
├── devcontainer.json    # Main devcontainer configuration
├── Dockerfile          # Custom development image
├── docker-compose.yml  # Compose file for standalone usage
├── setup.sh            # Post-creation setup script
└── README.md           # This file
```

## Customization

### Adding Your Own Tools

Modify `.devcontainer/setup.sh` to install additional tools:

```bash
# Add to setup.sh
sudo apt-get install -y your-favorite-tool
```

### Vim/NeoVim Configuration

- Vim config: `~/.vimrc`
- NeoVim config: `~/.config/nvim/init.vim`

### Shell Configuration

- ZSH config: `~/.zshrc`
- tmux config: `~/.tmux.conf`

## Benefits

✅ **IDE Independent** - Works with any editor  
✅ **Consistent Environment** - Same tools for all team members  
✅ **Fast Setup** - No local installations needed  
✅ **Isolated** - Doesn't affect your local system  
✅ **Reproducible** - Works exactly the same everywhere  
✅ **Modern Tools** - Includes best CLI development tools  
✅ **Git Ready** - Pre-configured for version control  

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it:

```bash
npm run start -- --port 3001
```

### Permission Issues
If you encounter permission issues, make sure the container user has the right permissions:

```bash
sudo chown -R vscode:vscode /workspace
```

### Container Won't Start
Make sure Docker is running and you have enough resources allocated to Docker.

## Contributing

This devContainer configuration can be improved! Feel free to:
- Add more useful development tools
- Improve the Vim/NeoVim configuration
- Add language-specific tools
- Enhance the shell experience

Happy coding! 🚀