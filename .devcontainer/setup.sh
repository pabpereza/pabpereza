#!/bin/bash

# IDE-Independent Development Container Setup Script
# This script configures the development environment to work with any editor

set -e

echo "🚀 Setting up IDE-independent development environment..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install a package if it doesn't exist
install_if_missing() {
    if ! command_exists "$1"; then
        echo "📦 Installing $1..."
        case "$1" in
            "rg"|"ripgrep")
                if ! command_exists rg; then
                    curl -LO https://github.com/BurntSushi/ripgrep/releases/download/14.1.0/ripgrep_14.1.0-1_amd64.deb
                    sudo dpkg -i ripgrep_14.1.0-1_amd64.deb || sudo apt-get install -f -y
                    rm ripgrep_14.1.0-1_amd64.deb
                fi
                ;;
            "bat")
                if ! command_exists bat && ! command_exists batcat; then
                    curl -LO https://github.com/sharkdp/bat/releases/download/v0.24.0/bat_0.24.0_amd64.deb
                    sudo dpkg -i bat_0.24.0_amd64.deb || sudo apt-get install -f -y
                    rm bat_0.24.0_amd64.deb
                fi
                ;;
            "exa")
                if ! command_exists exa; then
                    curl -LO https://github.com/ogham/exa/releases/download/v0.10.1/exa-linux-x86_64-v0.10.1.zip
                    unzip exa-linux-x86_64-v0.10.1.zip
                    sudo mv bin/exa /usr/local/bin/
                    rm -rf exa-linux-x86_64-v0.10.1.zip bin
                fi
                ;;
            "fzf")
                if ! command_exists fzf; then
                    git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
                    ~/.fzf/install --bin --key-bindings --completion --no-update-rc
                    sudo ln -sf ~/.fzf/bin/fzf /usr/local/bin/fzf
                fi
                ;;
            "nvim")
                if ! command_exists nvim; then
                    # Try to install neovim from apt first
                    sudo apt-get update
                    sudo apt-get install -y neovim || echo "NeoVim not available via apt, skipping..."
                fi
                ;;
        esac
    else
        echo "✅ $1 already installed"
    fi
}

# Update package lists
echo "📦 Updating package lists..."
sudo apt-get update

# Install basic tools that should be available
echo "📦 Installing essential development tools..."
sudo apt-get install -y \
    tmux \
    curl \
    wget \
    unzip \
    tree \
    jq \
    htop \
    2>/dev/null || echo "Some packages may not be available"

# Install modern CLI tools
echo "📦 Installing modern CLI tools..."
install_if_missing "rg"
install_if_missing "bat"
install_if_missing "exa"
install_if_missing "fzf"
install_if_missing "nvim"

# Set up symbolic links if they don't exist
echo "⚙️  Setting up symbolic links..."
if command_exists fdfind && ! command_exists fd; then
    sudo ln -sf /usr/bin/fdfind /usr/local/bin/fd
fi

if command_exists batcat && ! command_exists bat; then
    sudo ln -sf /usr/bin/batcat /usr/local/bin/bat
fi

# Install project dependencies
echo "📦 Installing project dependencies..."
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️  No package.json found in current directory"
fi

# Set up better aliases for CLI development
echo "⚙️  Setting up development aliases..."
cat >> ~/.zshrc << 'EOF'

# Development aliases for better CLI experience
if command -v exa >/dev/null 2>&1; then
    alias ll='exa -la'
    alias la='exa -la'
    alias ls='exa'
else
    alias ll='ls -la'
    alias la='ls -la'
fi

if command -v bat >/dev/null 2>&1; then
    alias cat='bat'
elif command -v batcat >/dev/null 2>&1; then
    alias cat='batcat'
fi

if command -v fd >/dev/null 2>&1; then
    alias find='fd'
fi

if command -v rg >/dev/null 2>&1; then
    alias grep='rg'
fi

if command -v nvim >/dev/null 2>&1; then
    alias vi='nvim'
    alias vim='nvim'
fi

# Project-specific aliases
alias dev='npm run start'
alias build='npm run build'
alias serve='npm run serve'

# Git aliases for faster development
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'

# Docker aliases (useful for Docker development)
alias d='docker'
alias dc='docker compose'
alias dps='docker ps'
alias di='docker images'

EOF

# Setup vim configuration for better development experience
echo "⚙️  Setting up Vim configuration..."
cat > ~/.vimrc << 'EOF'
" Basic Vim configuration for development
set number
set relativenumber
set autoindent
set smartindent
set tabstop=2
set shiftwidth=2
set expandtab
set hlsearch
set incsearch
set ignorecase
set smartcase
set wildmenu
set wildmode=list:longest
set backspace=indent,eol,start
syntax on

" Enable file type detection
filetype plugin indent on

" Better navigation
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Quick save and quit
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>
nnoremap <leader>x :x<CR>

" Better search highlighting
nnoremap <leader>/ :nohlsearch<CR>
EOF

# Setup basic neovim configuration if neovim is available
if command_exists nvim; then
    echo "⚙️  Setting up NeoVim configuration..."
    mkdir -p ~/.config/nvim
    cat > ~/.config/nvim/init.vim << 'EOF'
" Basic NeoVim configuration for development
set number
set relativenumber
set autoindent
set smartindent
set tabstop=2
set shiftwidth=2
set expandtab
set hlsearch
set incsearch
set ignorecase
set smartcase
set wildmenu
set wildmode=list:longest
set backspace=indent,eol,start
set termguicolors
syntax on

" Enable file type detection
filetype plugin indent on

" Better navigation
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Quick save and quit
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>
nnoremap <leader>x :x<CR>

" Better search highlighting
nnoremap <leader>/ :nohlsearch<CR>

" JavaScript/TypeScript specific settings
autocmd FileType javascript,typescript,json setlocal tabstop=2 shiftwidth=2 expandtab
autocmd FileType markdown setlocal tabstop=2 shiftwidth=2 expandtab wrap linebreak

" Better completion
set completeopt=menu,menuone,noselect
EOF
fi

# Setup tmux configuration for better terminal multiplexing
echo "⚙️  Setting up tmux configuration..."
cat > ~/.tmux.conf << 'EOF'
# Tmux configuration for development

# Set prefix to Ctrl-a
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# Enable mouse support
set -g mouse on

# Start windows and panes at 1, not 0
set -g base-index 1
setw -g pane-base-index 1

# Reload config file
bind r source-file ~/.tmux.conf \; display "Reloaded!"

# Split panes using | and -
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

# Switch panes using Alt-arrow without prefix
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Enable vi mode
setw -g mode-keys vi

# Status bar
set -g status-bg colour235
set -g status-fg white
set -g status-left '#[fg=green]#H'
set -g status-right '#[fg=yellow]%Y-%m-%d %H:%M'
EOF

# Create a welcome message script
echo "📝 Creating welcome message..."
cat > ~/.welcome.sh << 'EOF'
#!/bin/bash
echo "🎉 Welcome to your IDE-Independent Development Environment!"
echo ""
echo "This devContainer is configured to work with any editor:"
echo "  • Vim$(command -v nvim >/dev/null && echo "/NeoVim") with basic configuration"
echo "  • tmux for terminal multiplexing"
echo "  • Modern CLI tools ($(command -v rg >/dev/null && echo "ripgrep, ")$(command -v fd >/dev/null && echo "fd, ")$(command -v bat >/dev/null && echo "bat, ")$(command -v exa >/dev/null && echo "exa, ")$(command -v fzf >/dev/null && echo "fzf"))"
echo "  • Node.js development environment"
echo ""
echo "Available commands:"
echo "  npm run start  - Start Docusaurus development server"
echo "  npm run build  - Build the project"
echo "  npm run serve  - Serve built project"
echo ""
echo "Useful tools installed:"
echo "  • vim$(command -v nvim >/dev/null && echo "/nvim") - Text editors"
echo "  • tmux - Terminal multiplexer"
$(command -v rg >/dev/null && echo "  • rg - Fast grep alternative")
$(command -v fd >/dev/null && echo "  • fd - Fast find alternative")
$(command -v bat >/dev/null && echo "  • bat - Cat with syntax highlighting")
$(command -v exa >/dev/null && echo "  • exa - Modern ls replacement")
$(command -v fzf >/dev/null && echo "  • fzf - Fuzzy finder")
echo ""
echo "Happy coding! 🚀"
EOF

chmod +x ~/.welcome.sh

# Add welcome message to shell startup
echo "~/.welcome.sh" >> ~/.zshrc

echo "✅ Development environment setup complete!"
echo "🎯 You can now use any editor with this fully configured development environment."