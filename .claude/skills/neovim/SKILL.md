---
name: neovim
description: Comprehensive guide for this Neovim configuration - a modular, performance-optimized Lua-based IDE. Use when configuring plugins, adding keybindings, setting up LSP servers, debugging, or extending the configuration. Covers lazy.nvim, 82+ plugins across 9 categories, DAP debugging, AI integrations, and performance optimization.
---

# Neovim Configuration Skill

A comprehensive guide for working with this modular, performance-optimized Neovim configuration built on lazy.nvim.

## Quick Reference

| Metric | Value |
|--------|-------|
| Plugin Manager | lazy.nvim |
| Total Plugins | 82 |
| Target Startup | <50ms |
| Module Pattern | `M.setup()` |
| Leader Key | `<Space>` |

## Architecture Overview

```
~/.config/nvim/
├── init.lua                  # Entry point
├── lua/
│   ├── config/               # Core configuration (11 modules)
│   │   ├── lazy.lua          # Plugin manager bootstrap
│   │   ├── options.lua       # Vim options
│   │   ├── keymaps.lua       # Key bindings
│   │   ├── autocmds.lua      # Autocommands
│   │   └── performance.lua   # Startup optimization
│   ├── plugins/specs/        # Plugin specs (9 categories)
│   │   ├── core.lua          # Foundation (plenary, nui, devicons)
│   │   ├── ui.lua            # UI (lualine, bufferline, noice)
│   │   ├── editor.lua        # Editor (autopairs, flash, harpoon)
│   │   ├── lsp.lua           # LSP (lspconfig, mason, conform)
│   │   ├── git.lua           # Git (fugitive, gitsigns, diffview)
│   │   ├── ai.lua            # AI (copilot, ChatGPT)
│   │   ├── debug.lua         # DAP (nvim-dap, dap-ui)
│   │   ├── tools.lua         # Tools (telescope, neo-tree)
│   │   └── treesitter.lua    # Syntax (treesitter, textobjects)
│   ├── kickstart/            # Kickstart-derived modules
│   └── utils/                # Utility functions
└── lazy-lock.json            # Plugin version lock
```

## Standard Module Pattern

All configuration modules follow the `M.setup()` pattern:

```lua
local M = {}

M.setup = function()
  -- Configuration logic here
end

return M
```

## Plugin Management (lazy.nvim)

### Adding a New Plugin

Add to the appropriate category file in `lua/plugins/specs/`:

```lua
-- lua/plugins/specs/tools.lua
return {
  -- Existing plugins...

  {
    "author/plugin-name",
    event = "VeryLazy",           -- Loading strategy
    dependencies = { "dep/name" }, -- Required plugins
    opts = {
      -- Plugin options
    },
    config = function(_, opts)
      require("plugin-name").setup(opts)
    end,
  },
}
```

### Loading Strategies

| Strategy | When to Use | Example |
|----------|-------------|---------|
| `lazy = true` | Default, load on demand | Most plugins |
| `event = "VeryLazy"` | After UI loads | UI enhancements |
| `event = "BufReadPre"` | When opening files | Treesitter, gitsigns |
| `event = "InsertEnter"` | When typing | Completion, autopairs |
| `cmd = "CommandName"` | On command invocation | Heavy tools |
| `ft = "filetype"` | For specific filetypes | Language plugins |
| `keys = {...}` | On keypress | Motion plugins |

### Plugin Commands

| Command | Description |
|---------|-------------|
| `:Lazy` | Open lazy.nvim dashboard |
| `:Lazy sync` | Update and install plugins |
| `:Lazy profile` | Show startup time analysis |
| `:Lazy clean` | Remove unused plugins |
| `:Lazy health` | Check plugin health |

## LSP Configuration

See [references/lsp.md](references/lsp.md) for complete LSP reference.

### LSP Stack

```
mason.nvim (installer)
    ├── mason-lspconfig.nvim → nvim-lspconfig
    ├── mason-tool-installer.nvim (auto-install)
    └── mason-nvim-dap.nvim → nvim-dap

nvim-lspconfig
    ├── blink.cmp (completion)
    ├── conform.nvim (formatting)
    ├── nvim-lint (linting)
    └── trouble.nvim (diagnostics)
```

### Adding an LSP Server

```lua
-- In lua/plugins/specs/lsp.lua, add to mason-tool-installer list:
ensure_installed = {
  "lua_ls",
  "pyright",
  "your_new_server",  -- Add here
}

-- Configure in lspconfig setup:
servers = {
  your_new_server = {
    settings = {
      -- Server-specific settings
    },
  },
}
```

### LSP Keybindings

| Key | Action |
|-----|--------|
| `gd` | Go to definition |
| `gr` | Go to references |
| `gI` | Go to implementation |
| `gD` | Go to declaration |
| `K` | Hover documentation |
| `<leader>rn` | Rename symbol |
| `<leader>ca` | Code action |
| `<leader>D` | Type definition |
| `<leader>ds` | Document symbols |
| `<leader>ws` | Workspace symbols |

## Keybindings

See [references/keybindings.md](references/keybindings.md) for complete reference.

### Core Navigation

| Key | Action |
|-----|--------|
| `<C-h/j/k/l>` | Window navigation |
| `<S-h>` / `<S-l>` | Previous/next buffer |
| `<leader>sf` | Search files |
| `<leader>sg` | Search by grep |
| `<leader><space>` | Search buffers |
| `\\` | Toggle Neo-tree |

### Adding Keybindings

```lua
-- In lua/config/keymaps.lua M.setup():
vim.keymap.set('n', '<leader>xx', function()
  -- Your action
end, { desc = 'Description for which-key' })

-- Or in a plugin spec:
keys = {
  { "<leader>xx", "<cmd>Command<CR>", desc = "Description" },
}
```

## Debugging (DAP)

See [references/debugging.md](references/debugging.md) for complete reference.

### DAP Keybindings

| Key | Action |
|-----|--------|
| `<F5>` | Continue/Start debugging |
| `<F10>` | Step over |
| `<F11>` | Step into |
| `<F12>` | Step out |
| `<leader>b` | Toggle breakpoint |
| `<leader>B` | Conditional breakpoint |

### Adding a Debug Adapter

```lua
-- In lua/plugins/specs/debug.lua
local dap = require("dap")

dap.adapters.your_adapter = {
  type = "executable",
  command = "path/to/adapter",
}

dap.configurations.your_filetype = {
  {
    type = "your_adapter",
    request = "launch",
    name = "Launch",
    program = "${file}",
  },
}
```

## Performance Optimization

### Startup Optimization Layers

| Layer | Technique | Savings |
|-------|-----------|---------|
| 1 | `vim.loader.enable()` | ~50ms |
| 2 | Skip `vim._defaults` | ~180ms |
| 3 | Disable providers | ~10ms |
| 4 | Disable builtins | ~20ms |
| 5 | Deferred config | ~30ms |
| 6 | Event-based loading | Variable |

### Profiling Startup

```vim
:Lazy profile
```

### Deferred Loading Pattern

```lua
-- In init.lua
vim.defer_fn(function()
  require('config.options').setup()
  require('config.keymaps').setup()
  require('config.autocmds').setup()
end, 0)
```

## Common Tasks

### Adding an Autocommand

```lua
-- In lua/config/autocmds.lua M.setup():
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "markdown", "text" },
  callback = function()
    vim.opt_local.wrap = true
    vim.opt_local.spell = true
  end,
})
```

### Adding Vim Options

```lua
-- In lua/config/options.lua M.setup():
vim.opt.your_option = value
```

### Creating a Utility Function

```lua
-- In lua/utils/init.lua
local M = {}

M.your_function = function(args)
  -- Implementation
end

return M

-- Usage: require('utils').your_function(args)
```

## Plugin Categories

### Core (4 plugins)
`plenary.nvim`, `nui.nvim`, `nvim-web-devicons`, `lazy.nvim`

### UI (11 plugins)
`tokyonight`, `alpha-nvim`, `lualine`, `bufferline`, `noice`, `nvim-notify`, `which-key`, `indent-blankline`, `mini.indentscope`, `fidget`, `nvim-scrollbar`

### Editor (13 plugins)
`nvim-autopairs`, `flash.nvim`, `clever-f`, `nvim-spectre`, `grug-far`, `harpoon`, `persistence`, `smartyank`, `vim-sleuth`, `vim-illuminate`, `tabular`, `todo-comments`, `toggleterm`

### LSP (12 plugins)
`nvim-lspconfig`, `mason`, `mason-lspconfig`, `mason-tool-installer`, `lazydev`, `luvit-meta`, `SchemaStore`, `conform`, `nvim-lint`, `trouble`, `blink.cmp`/`nvim-cmp`, `LuaSnip`

### Git (7 plugins)
`vim-fugitive`, `vim-rhubarb`, `gitsigns`, `diffview`, `vim-flog`, `git-conflict`, `octo`

### AI (3 plugins)
`copilot.vim`, `ChatGPT.nvim`, `mcphub.nvim`

### Debug (8 plugins)
`nvim-dap`, `nvim-dap-ui`, `nvim-dap-virtual-text`, `nvim-dap-python`, `nvim-dap-go`, `mason-nvim-dap`, `telescope-dap`, `nvim-nio`

### Tools (14 plugins)
`telescope`, `telescope-fzf-native`, `telescope-ui-select`, `neo-tree`, `oil.nvim`, `nvim-bqf`, `rest.nvim`, `vim-dadbod`, `vim-dadbod-ui`, `vim-dadbod-completion`, `iron.nvim`, `markdown-preview`, `nvim-puppeteer`, `obsidian.nvim`

### Treesitter (3 plugins)
`nvim-treesitter`, `nvim-treesitter-context`, `nvim-treesitter-textobjects`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Plugins not loading | `:Lazy sync` |
| LSP not starting | `:LspInfo`, `:Mason` |
| Icons missing | Install a Nerd Font |
| Slow startup | `:Lazy profile` |
| Treesitter errors | `:TSUpdate` |
| Keybinding conflicts | `:verbose map <key>` |

### Health Check

```vim
:checkhealth
```

### Debug Logging

```lua
-- Temporarily add to plugin config:
log_level = vim.log.levels.DEBUG,
```

## Resources

- [lazy.nvim](https://github.com/folke/lazy.nvim)
- [Mason.nvim](https://github.com/williamboman/mason.nvim)
- [Neovim Documentation](https://neovim.io/doc/)
- [Kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim)

## References

- [references/configuration.md](references/configuration.md) - Core configuration options
- [references/plugins.md](references/plugins.md) - All 82 plugins detailed
- [references/plugin-deepdives.md](references/plugin-deepdives.md) - In-depth plugin guides
- [references/lsp.md](references/lsp.md) - LSP server configuration
- [references/keybindings.md](references/keybindings.md) - Complete keybinding reference
- [references/debugging.md](references/debugging.md) - DAP debugging guide
- [references/performance.md](references/performance.md) - Optimization techniques
- [references/tools.md](references/tools.md) - CLI tools, utilities, and workflows
- [references/troubleshooting.md](references/troubleshooting.md) - Common issues and solutions
- [references/migration-0.11.md](references/migration-0.11.md) - Neovim 0.11 migration guide
