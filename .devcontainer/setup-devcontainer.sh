#!/bin/bash

# DevContainer Setup Helper
# This script helps you set up the IDE-independent development environment

echo "🚀 IDE-Independent DevContainer Setup"
echo "======================================"
echo ""
echo "Choose your preferred setup method:"
echo ""
echo "1. Feature-based devcontainer (devcontainer.json) - Recommended"
echo "   - Uses Microsoft's pre-built Node.js image with additional features"
echo "   - Faster to build and start"
echo "   - Good for most use cases"
echo ""
echo "2. Custom Dockerfile-based devcontainer"
echo "   - Uses custom Dockerfile for maximum control"
echo "   - Slower initial build but more customizable"
echo "   - Good if you need specific tools or configurations"
echo ""
echo "3. Docker Compose (Complete IDE independence)"
echo "   - Use with any tool that supports Docker Compose"
echo "   - Doesn't require devcontainer support"
echo "   - Good for teams using different tools"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "✅ Using feature-based devcontainer (default setup)"
        echo "   The current devcontainer.json is already configured for this."
        echo ""
        echo "🚀 To get started:"
        echo "   - Open this project in VSCode or GitHub Codespaces"
        echo "   - Choose 'Reopen in Container' when prompted"
        echo "   - Or use devcontainer CLI: devcontainer open ."
        ;;
    2)
        echo "✅ Switching to Dockerfile-based devcontainer"
        cp .devcontainer/devcontainer-dockerfile.json .devcontainer/devcontainer.json
        echo "   devcontainer.json has been updated to use the custom Dockerfile"
        echo ""
        echo "🚀 To get started:"
        echo "   - Open this project in VSCode or GitHub Codespaces"
        echo "   - Choose 'Rebuild Container' to use the custom image"
        echo "   - Or use devcontainer CLI: devcontainer rebuild ."
        ;;
    3)
        echo "✅ Using Docker Compose setup"
        echo ""
        echo "🚀 To get started:"
        echo "   # Start the development environment"
        echo "   docker-compose -f .devcontainer/docker-compose.yml up -d"
        echo ""
        echo "   # Connect to the container"
        echo "   docker-compose -f .devcontainer/docker-compose.yml exec devcontainer zsh"
        echo ""
        echo "   # Install dependencies and start development"
        echo "   npm install"
        echo "   npm run start"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed usage instructions, see: .devcontainer/README.md"
echo "🎯 This environment works with any editor - Vim, NeoVim, Emacs, etc."
echo ""
echo "Happy coding! 🚀"