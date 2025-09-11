# IDE-Independent Development Container
# This Dockerfile creates a development environment that works with any editor
# Based on Node.js with essential development tools

FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Install essential development tools that work with any editor
RUN apt-get update && apt-get install -y \
    # Text editors
    vim \
    neovim \
    # Terminal tools
    tmux \
    zsh \
    # CLI utilities
    curl \
    wget \
    unzip \
    tree \
    jq \
    htop \
    # Modern CLI tools
    ripgrep \
    fd-find \
    bat \
    exa \
    fzf \
    # ZSH enhancements
    zsh-syntax-highlighting \
    zsh-autosuggestions \
    # Git tools
    git \
    git-lfs \
    # Clean up
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up symbolic links for modern tools
RUN ln -sf /usr/bin/fdfind /usr/local/bin/fd && \
    ln -sf /usr/bin/batcat /usr/local/bin/bat

# Set ZSH as the default shell
RUN chsh -s /bin/zsh vscode

# Create directories for user configuration
RUN mkdir -p /home/vscode/.config/nvim

# Set working directory
WORKDIR /workspace

# Set environment variables
ENV NODE_ENV=development
ENV EDITOR=vim
ENV SHELL=/bin/zsh

# Expose common development ports
EXPOSE 3000 9229 9230

# Switch to non-root user
USER vscode

# Default command
CMD ["/bin/zsh"]