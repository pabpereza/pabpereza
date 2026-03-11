# Configuration Reference

Complete reference for core Neovim configuration options.

## Entry Point (init.lua)

The startup sequence:

```lua
-- 1. Enable module caching
vim.loader.enable()

-- 2. Disable built-in plugins for performance
vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1
-- ... (16 built-ins disabled)

-- 3. Bootstrap phase
require('config.compat')      -- Compatibility layer
require('config.lazy')        -- Plugin manager

-- 4. Deferred phase (non-blocking)
vim.defer_fn(function()
  require('config.options').setup()
  require('config.keymaps').setup()
  require('config.autocmds').setup()
end, 0)
```

## Options (lua/config/options.lua)

### Essential Options

```lua
-- Line numbers
vim.opt.number = true
vim.opt.relativenumber = true

-- Indentation
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.expandtab = true
vim.opt.smartindent = true

-- Search
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.hlsearch = true
vim.opt.incsearch = true

-- Visual
vim.opt.termguicolors = true
vim.opt.signcolumn = "yes"
vim.opt.cursorline = true
vim.opt.scrolloff = 8
vim.opt.sidescrolloff = 8

-- Behavior
vim.opt.mouse = "a"
vim.opt.clipboard = "unnamedplus"
vim.opt.undofile = true
vim.opt.swapfile = false
vim.opt.backup = false

-- Splits
vim.opt.splitright = true
vim.opt.splitbelow = true

-- Performance
vim.opt.updatetime = 250
vim.opt.timeoutlen = 300
```

### Adding New Options

```lua
-- In lua/config/options.lua, inside M.setup():
vim.opt.your_option = value

-- For buffer-local options:
vim.opt_local.wrap = true

-- For global variables:
vim.g.some_plugin_setting = "value"
```

## Lazy.nvim Configuration (lua/config/lazy.lua)

```lua
require("lazy").setup({
  spec = {
    { import = "plugins.specs.core" },
    { import = "plugins.specs.ui" },
    { import = "plugins.specs.editor" },
    { import = "plugins.specs.lsp" },
    { import = "plugins.specs.git" },
    { import = "plugins.specs.ai" },
    { import = "plugins.specs.debug" },
    { import = "plugins.specs.tools" },
    { import = "plugins.specs.treesitter" },
    { import = "kickstart.plugins" },
  },
  defaults = {
    lazy = true,        -- Lazy load by default
    version = false,    -- Use latest commits
  },
  install = {
    colorscheme = { "tokyonight", "habamax" },
  },
  checker = {
    enabled = true,     -- Check for updates
    notify = false,     -- Don't notify on startup
  },
  performance = {
    cache = {
      enabled = true,
      ttl = 3600 * 24 * 7,  -- 1 week cache
    },
    rtp = {
      disabled_plugins = {
        "gzip", "matchit", "matchparen", "netrwPlugin",
        "tarPlugin", "tohtml", "tutor", "zipPlugin",
      },
    },
  },
})
```

## Leaders (lua/config/leaders.lua)

```lua
vim.g.mapleader = " "       -- Space as leader
vim.g.maplocalleader = "\\" -- Backslash as local leader
```

## Autocommands (lua/config/autocmds.lua)

### Common Autocommand Patterns

```lua
-- Highlight on yank
vim.api.nvim_create_autocmd("TextYankPost", {
  callback = function()
    vim.highlight.on_yank({ timeout = 200 })
  end,
})

-- Filetype-specific settings
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "markdown", "text" },
  callback = function()
    vim.opt_local.wrap = true
    vim.opt_local.spell = true
  end,
})

-- Auto-resize splits
vim.api.nvim_create_autocmd("VimResized", {
  callback = function()
    vim.cmd("tabdo wincmd =")
  end,
})

-- Remove trailing whitespace on save
vim.api.nvim_create_autocmd("BufWritePre", {
  pattern = "*",
  callback = function()
    local save_cursor = vim.fn.getpos(".")
    vim.cmd([[%s/\s\+$//e]])
    vim.fn.setpos(".", save_cursor)
  end,
})
```

### Creating Autocommand Groups

```lua
local group = vim.api.nvim_create_augroup("MyAutoGroup", { clear = true })

vim.api.nvim_create_autocmd("BufEnter", {
  group = group,
  pattern = "*.lua",
  callback = function()
    -- Lua-specific setup
  end,
})
```

## Performance (lua/config/performance.lua)

### Disabled Built-in Plugins

```lua
local disabled = {
  "gzip", "zip", "zipPlugin", "tar", "tarPlugin",
  "getscript", "getscriptPlugin", "vimball", "vimballPlugin",
  "2html_plugin", "logipat", "rrhelper", "spellfile_plugin",
  "matchit", "matchparen", "netrw", "netrwPlugin",
}

for _, plugin in pairs(disabled) do
  vim.g["loaded_" .. plugin] = 1
end
```

### Disabled Providers

```lua
-- Disable unused language providers
vim.g.loaded_node_provider = 0
vim.g.loaded_perl_provider = 0
vim.g.loaded_ruby_provider = 0
```

### GC Optimization

```lua
-- Aggressive GC during startup
collectgarbage("setstepmul", 200)

-- Relax after startup
vim.api.nvim_create_autocmd("User", {
  pattern = "VeryLazy",
  callback = function()
    collectgarbage("setstepmul", 100)
  end,
})
```

## Compatibility (lua/config/compat.lua)

Provides shims for deprecated functions:

```lua
-- vim.tbl_islist → vim.islist
if vim.islist then
  vim.tbl_islist = vim.islist
end

-- vim.tbl_flatten (deprecated in 0.11)
if not vim.tbl_flatten then
  vim.tbl_flatten = function(t)
    return vim.iter(t):flatten():totable()
  end
end
```

## Constants (lua/config/constants.lua)

Centralized configuration values:

```lua
return {
  -- UI
  border = "rounded",
  icons = {
    diagnostics = {
      Error = " ",
      Warn = " ",
      Info = " ",
      Hint = " ",
    },
  },

  -- Paths
  paths = {
    cache = vim.fn.stdpath("cache"),
    data = vim.fn.stdpath("data"),
    config = vim.fn.stdpath("config"),
  },
}
```
