# IDE-Independent Development Container
# This Dockerfile creates a development environment that works with any editor
# Based on Node.js devcontainer base image with post-creation setup

FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Set working directory
WORKDIR /workspace

# Set environment variables
ENV NODE_ENV=development
ENV EDITOR=vim
ENV SHELL=/bin/bash

# Expose common development ports
EXPOSE 3000 9229 9230

# Switch to non-root user
USER node

# Default command
CMD ["/bin/bash"]