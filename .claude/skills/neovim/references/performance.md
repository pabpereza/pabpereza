# Performance Optimization Reference

Complete guide for optimizing Neovim startup and runtime performance.

## Target Metrics

| Metric | Target | Measure With |
|--------|--------|--------------|
| Startup Time | <50ms | `:Lazy profile` |
| Plugin Count | 82 | `:Lazy` |
| Lazy Loaded | ~95% | `:Lazy` |
| Memory (startup) | <50MB | `:lua print(collectgarbage("count"))` |

## Startup Optimization Layers

### Layer 1: Module Caching (~50ms savings)

```lua
-- init.lua (first line)
vim.loader.enable()
```

This caches Lua bytecode for faster subsequent loads.

### Layer 2: Skip vim._defaults (~180ms savings)

```lua
-- init.lua
vim.g.skip_defaults = true  -- Skip default vim settings
```

### Layer 3: Disable Providers (~10ms savings)

```lua
-- lua/config/performance.lua
vim.g.loaded_node_provider = 0
vim.g.loaded_perl_provider = 0
vim.g.loaded_ruby_provider = 0
```

### Layer 4: Disable Built-in Plugins (~20ms savings)

```lua
local disabled_builtins = {
  "gzip",
  "zip",
  "zipPlugin",
  "tar",
  "tarPlugin",
  "getscript",
  "getscriptPlugin",
  "vimball",
  "vimballPlugin",
  "2html_plugin",
  "logipat",
  "rrhelper",
  "spellfile_plugin",
  "matchit",
  "matchparen",
  "netrw",
  "netrwPlugin",
}

for _, plugin in pairs(disabled_builtins) do
  vim.g["loaded_" .. plugin] = 1
end
```

### Layer 5: Deferred Configuration (~30ms savings)

```lua
-- init.lua
vim.defer_fn(function()
  require('config.options').setup()
  require('config.keymaps').setup()
  require('config.autocmds').setup()
end, 0)
```

### Layer 6: Event-Based Plugin Loading (Variable)

| Loading Strategy | When Loaded | Best For |
|-----------------|-------------|----------|
| `lazy = true` | On demand | Default for all plugins |
| `event = "VeryLazy"` | After UI | UI enhancements |
| `event = "BufReadPre"` | Opening files | Treesitter, gitsigns |
| `event = "InsertEnter"` | Start typing | Completion, autopairs |
| `cmd = "Command"` | On command | Heavy tools |
| `ft = "filetype"` | On filetype | Language plugins |
| `keys = {...}` | On keypress | Motion plugins |

## Lazy.nvim Performance Config

```lua
require("lazy").setup({
  -- Plugin specs...
}, {
  defaults = {
    lazy = true,  -- Lazy load by default
    version = false,  -- Use latest commits
  },
  performance = {
    cache = {
      enabled = true,
      ttl = 3600 * 24 * 7,  -- 1 week cache
    },
    reset_packpath = true,
    rtp = {
      reset = true,
      disabled_plugins = {
        "gzip", "matchit", "matchparen", "netrwPlugin",
        "tarPlugin", "tohtml", "tutor", "zipPlugin",
      },
    },
  },
})
```

## Profiling Tools

### Lazy Profile

```vim
:Lazy profile
```

Shows:
- Total startup time
- Time per plugin
- Loading order
- Event triggers

### Startup Time Breakdown

```bash
# From command line
nvim --startuptime startup.log

# View results
nvim startup.log
```

### Memory Usage

```lua
-- Current memory (KB)
:lua print(collectgarbage("count"))

-- Force garbage collection
:lua collectgarbage("collect")
:lua print(collectgarbage("count"))
```

### Plugin Loading

```vim
:Lazy              " Show all plugins and status
:Lazy health       " Check lazy.nvim health
:Lazy profile      " Detailed timing
```

## GC Optimization

```lua
-- lua/config/performance.lua
M.setup = function()
  -- Aggressive GC during startup
  collectgarbage("setstepmul", 200)

  -- Relax GC after startup
  vim.api.nvim_create_autocmd("User", {
    pattern = "VeryLazy",
    callback = function()
      collectgarbage("setstepmul", 100)
    end,
  })
end
```

## Plugin-Specific Optimizations

### Treesitter

```lua
{
  "nvim-treesitter/nvim-treesitter",
  event = { "BufReadPost", "BufNewFile" },
  opts = {
    highlight = {
      enable = true,
      disable = function(lang, buf)
        -- Disable for large files
        local max_filesize = 100 * 1024  -- 100 KB
        local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
        if ok and stats and stats.size > max_filesize then
          return true
        end
      end,
    },
  },
}
```

### Telescope

```lua
{
  "nvim-telescope/telescope.nvim",
  cmd = "Telescope",  -- Only load on command
  dependencies = {
    {
      "nvim-telescope/telescope-fzf-native.nvim",
      build = "make",  -- Compiled for performance
    },
  },
}
```

### LSP

```lua
-- Debounce diagnostics
vim.lsp.handlers["textDocument/publishDiagnostics"] = vim.lsp.with(
  vim.lsp.diagnostic.on_publish_diagnostics, {
    update_in_insert = false,  -- Don't update in insert mode
    virtual_text = {
      severity = { min = vim.diagnostic.severity.WARN },
    },
  }
)
```

### Completion

```lua
{
  "saghen/blink.cmp",
  event = "InsertEnter",  -- Only on insert
  opts = {
    trigger = {
      completion = {
        debounce_ms = 100,  -- Debounce completions
      },
    },
  },
}
```

## Runtime Optimizations

### Reduce Redraws

```lua
vim.opt.lazyredraw = true  -- Don't redraw during macros
```

### Syntax Optimization

```lua
vim.opt.synmaxcol = 240  -- Only highlight first 240 columns
```

### Fold Optimization

```lua
-- Use treesitter folding with fallback
vim.opt.foldmethod = "expr"
vim.opt.foldexpr = "nvim_treesitter#foldexpr()"
vim.opt.foldlevelstart = 99  -- Start with all folds open
```

### Timeout Optimization

```lua
vim.opt.updatetime = 250   -- Faster CursorHold
vim.opt.timeoutlen = 300   -- Faster key sequence
```

## Large File Handling

```lua
vim.api.nvim_create_autocmd("BufReadPre", {
  callback = function(args)
    local ok, stats = pcall(vim.loop.fs_stat, args.file)
    if ok and stats and stats.size > 1024 * 1024 then  -- 1MB
      -- Disable expensive features
      vim.cmd("syntax off")
      vim.opt_local.foldmethod = "manual"
      vim.opt_local.spell = false
      vim.opt_local.swapfile = false
      vim.opt_local.undofile = false
    end
  end,
})
```

## Monitoring Performance

### Create Performance Report

```lua
local function performance_report()
  local stats = {
    startup_time = vim.fn.reltimefloat(vim.fn.reltime(vim.g.start_time)) * 1000,
    memory = collectgarbage("count"),
    buffers = #vim.fn.getbufinfo({ buflisted = 1 }),
    windows = #vim.api.nvim_list_wins(),
    plugins = require("lazy").stats().count,
    loaded = require("lazy").stats().loaded,
  }

  print(string.format([[
Performance Report:
  Startup: %.2fms
  Memory: %.2f KB
  Buffers: %d
  Windows: %d
  Plugins: %d/%d loaded
  ]], stats.startup_time, stats.memory, stats.buffers,
      stats.windows, stats.loaded, stats.plugins))
end

vim.api.nvim_create_user_command("PerformanceReport", performance_report, {})
```

## Troubleshooting Slow Startup

1. **Profile with Lazy:**
   ```vim
   :Lazy profile
   ```

2. **Check for slow plugins:**
   Look for plugins taking >10ms in profile

3. **Verify lazy loading:**
   ```vim
   :Lazy
   ```
   Check plugins show "not loaded" until used

4. **Check startup log:**
   ```bash
   nvim --startuptime /tmp/startup.log && cat /tmp/startup.log
   ```

5. **Identify culprits:**
   - Look for `require()` calls in init.lua
   - Check for synchronous operations
   - Look for large file reads

## Best Practices

1. **Always lazy load** - Set `lazy = true` as default
2. **Use events wisely** - `VeryLazy` for UI, `BufReadPre` for editing
3. **Defer non-critical** - Use `vim.defer_fn()` for setup that can wait
4. **Profile regularly** - Check `:Lazy profile` after changes
5. **Avoid sync operations** - Use async where possible
6. **Limit startup plugins** - Only core/theme need to load at start
7. **Cache aggressively** - Let `vim.loader` do its job
