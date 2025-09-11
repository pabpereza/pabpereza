#!/bin/bash

# IDE-Independent Development Container Setup Script
# This script configures the development environment to work with any editor

set -e

echo "🚀 Setting up IDE-independent development environment..."

# Update package lists
sudo apt-get update

# Install essential development tools that work with any editor
echo "📦 Installing essential development tools..."
sudo apt-get install -y \
    vim \
    neovim \
    tmux \
    curl \
    wget \
    unzip \
    tree \
    jq \
    htop \
    ripgrep \
    fd-find \
    bat \
    exa \
    fzf \
    zsh-syntax-highlighting \
    zsh-autosuggestions

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

# Set up better aliases for CLI development
echo "⚙️  Setting up development aliases..."
cat >> ~/.zshrc << 'EOF'

# Development aliases for better CLI experience
alias ll='exa -la'
alias la='exa -la'
alias ls='exa'
alias cat='batcat'
alias find='fd'
alias grep='rg'
alias vi='nvim'
alias vim='nvim'

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
alias dc='docker-compose'
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

# Setup basic neovim configuration
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
echo "  • Vim/NeoVim with basic configuration"
echo "  • tmux for terminal multiplexing"
echo "  • Modern CLI tools (ripgrep, fd, bat, exa, fzf)"
echo "  • Node.js development environment"
echo ""
echo "Available commands:"
echo "  npm run start  - Start Docusaurus development server"
echo "  npm run build  - Build the project"
echo "  npm run serve  - Serve built project"
echo ""
echo "Useful tools installed:"
echo "  • vim/nvim - Text editors"
echo "  • tmux - Terminal multiplexer"
echo "  • rg - Fast grep alternative"
echo "  • fd - Fast find alternative"
echo "  • bat - Cat with syntax highlighting"
echo "  • exa - Modern ls replacement"
echo "  • fzf - Fuzzy finder"
echo ""
echo "Happy coding! 🚀"
EOF

chmod +x ~/.welcome.sh

# Add welcome message to shell startup
echo "~/.welcome.sh" >> ~/.zshrc

# Create development shortcuts
echo "⚙️  Creating development shortcuts..."
sudo ln -sf /usr/bin/fdfind /usr/local/bin/fd
sudo ln -sf /usr/bin/batcat /usr/local/bin/bat

echo "✅ Development environment setup complete!"
echo "🎯 You can now use any editor with this fully configured development environment."