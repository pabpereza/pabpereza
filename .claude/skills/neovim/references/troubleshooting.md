# Troubleshooting Guide

Comprehensive solutions for common Neovim configuration issues.

## Quick Diagnostics

```vim
:checkhealth              " Full system check
:Lazy                     " Plugin status
:LspInfo                  " LSP status
:Mason                    " Installed tools
:messages                 " Recent messages/errors
```

---

## Startup Issues

### Neovim Won't Start

**Symptom:** Error on launch, blank screen, or crash

**Solutions:**

```bash
# 1. Start with minimal config
nvim --clean

# 2. Start without plugins
nvim -u NONE

# 3. Check for syntax errors
nvim --startuptime /tmp/startup.log
cat /tmp/startup.log | grep -i error

# 4. Verbose mode
nvim -V10/tmp/nvim.log
cat /tmp/nvim.log | grep -i error
```

### Slow Startup

**Symptom:** >100ms startup time

**Diagnosis:**

```vim
:Lazy profile
```

**Solutions:**

1. **Check plugin load times** - Look for plugins >10ms
2. **Verify lazy loading** - Ensure `lazy = true` is set
3. **Check event triggers** - Use appropriate events
4. **Disable heavy startup plugins:**
   ```lua
   {
     "plugin/name",
     event = "VeryLazy",  -- Defer loading
   }
   ```

### Plugin Installation Fails

**Symptom:** Lazy.nvim can't install plugins

**Solutions:**

```bash
# 1. Clear plugin cache
rm -rf ~/.local/share/nvim/lazy

# 2. Clear lazy-lock.json
rm ~/.config/nvim/lazy-lock.json

# 3. Check network
curl -I https://github.com

# 4. Reinstall
nvim --headless "+Lazy! sync" +qa
```

---

## LSP Issues

### LSP Not Starting

**Symptom:** No completions, no diagnostics

**Diagnosis:**

```vim
:LspInfo
:LspLog
```

**Solutions:**

1. **Server not installed:**
   ```vim
   :Mason
   " Search and install the server
   ```

2. **Wrong filetype:**
   ```vim
   :set filetype?
   :set filetype=python  " Manually set
   ```

3. **Root directory not detected:**
   ```lua
   -- Add root markers
   root_dir = lspconfig.util.root_pattern(".git", "setup.py", "pyproject.toml")
   ```

4. **Check server logs:**
   ```vim
   :LspLog
   ```

### Completions Not Working

**Symptom:** No autocompletion popup

**Solutions:**

1. **Check completion source:**
   ```vim
   :lua print(vim.inspect(require("cmp").get_config().sources))
   ```

2. **Verify LSP is attached:**
   ```vim
   :LspInfo
   ```

3. **Check capabilities:**
   ```lua
   -- Ensure capabilities are passed
   local capabilities = require("cmp_nvim_lsp").default_capabilities()
   lspconfig.server.setup({ capabilities = capabilities })
   ```

4. **Trigger manually:**
   ```
   Press <C-Space> in insert mode
   ```

### Formatting Not Working

**Symptom:** `:lua vim.lsp.buf.format()` does nothing

**Solutions:**

1. **Check conform.nvim:**
   ```vim
   :ConformInfo
   ```

2. **Verify formatter installed:**
   ```vim
   :Mason
   " Search for stylua, prettierd, etc.
   ```

3. **Check formatter config:**
   ```lua
   formatters_by_ft = {
     lua = { "stylua" },
     python = { "ruff_format" },
   }
   ```

4. **Format manually:**
   ```vim
   :lua require("conform").format({ async = true })
   ```

### Diagnostics Not Showing

**Symptom:** No error/warning highlights

**Solutions:**

1. **Check diagnostics exist:**
   ```vim
   :lua print(vim.inspect(vim.diagnostic.get(0)))
   ```

2. **Check virtual text config:**
   ```lua
   vim.diagnostic.config({
     virtual_text = true,
     signs = true,
     underline = true,
   })
   ```

3. **Check severity filter:**
   ```lua
   -- May be filtering warnings
   virtual_text = {
     severity = { min = vim.diagnostic.severity.ERROR },  -- Too strict?
   }
   ```

---

## Plugin Issues

### Plugin Not Loading

**Symptom:** Plugin commands/features unavailable

**Diagnosis:**

```vim
:Lazy
" Check if plugin shows "not loaded"
```

**Solutions:**

1. **Trigger loading event:**
   ```lua
   -- Plugin loads on BufReadPre but you haven't opened a file
   event = "VeryLazy"  -- Change to VeryLazy for immediate load
   ```

2. **Check dependencies:**
   ```lua
   dependencies = { "nvim-lua/plenary.nvim" }  -- Missing?
   ```

3. **Force load:**
   ```vim
   :Lazy load plugin-name
   ```

### Plugin Conflicts

**Symptom:** Unexpected behavior, errors mentioning multiple plugins

**Solutions:**

1. **Check load order:**
   ```lua
   priority = 1000  -- Higher loads first
   ```

2. **Check for overlapping keymaps:**
   ```vim
   :verbose map <key>
   ```

3. **Disable one plugin:**
   ```lua
   { "plugin/name", enabled = false }
   ```

### Telescope Errors

**Symptom:** Telescope commands fail

**Solutions:**

1. **Install dependencies:**
   ```bash
   brew install ripgrep fd
   ```

2. **Rebuild fzf-native:**
   ```vim
   :Lazy build telescope-fzf-native.nvim
   ```

3. **Check picker config:**
   ```vim
   :Telescope find_files find_command=fd
   ```

### Treesitter Errors

**Symptom:** Highlighting broken, parser errors

**Solutions:**

1. **Update parsers:**
   ```vim
   :TSUpdate
   ```

2. **Reinstall specific parser:**
   ```vim
   :TSInstall! lua
   ```

3. **Check parser status:**
   ```vim
   :TSInstallInfo
   ```

4. **Disable for large files:**
   ```lua
   highlight = {
     disable = function(lang, buf)
       local max_filesize = 100 * 1024
       local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
       return ok and stats and stats.size > max_filesize
     end,
   }
   ```

---

## UI Issues

### Icons Not Displaying

**Symptom:** Boxes or question marks instead of icons

**Solutions:**

1. **Install Nerd Font:**
   ```bash
   brew install --cask font-jetbrains-mono-nerd-font
   ```

2. **Configure terminal to use Nerd Font**

3. **Verify font in terminal:**
   ```vim
   :echo &guifont
   ```

### Colors Wrong

**Symptom:** Wrong or missing colors

**Solutions:**

1. **Enable true color:**
   ```lua
   vim.opt.termguicolors = true
   ```

2. **Check colorscheme loaded:**
   ```vim
   :colorscheme
   ```

3. **Check terminal supports true color:**
   ```bash
   echo $TERM
   # Should be xterm-256color or similar
   ```

### Noice.nvim Errors

**Symptom:** cmdline or messages not working

**Solutions:**

1. **Check dependencies:**
   ```lua
   dependencies = { "MunifTanjim/nui.nvim", "rcarriga/nvim-notify" }
   ```

2. **Reset noice:**
   ```vim
   :Noice dismiss
   :Noice disable
   :Noice enable
   ```

3. **Check presets:**
   ```lua
   presets = {
     command_palette = true,
     lsp_doc_border = true,
   }
   ```

---

## Debugging Issues

### DAP Not Connecting

**Symptom:** F5 does nothing, no debug UI

**Solutions:**

1. **Check adapter installed:**
   ```vim
   :Mason
   " Look for debugpy, delve, etc.
   ```

2. **Check configuration:**
   ```vim
   :lua print(vim.inspect(require("dap").configurations))
   ```

3. **Enable DAP logging:**
   ```lua
   require("dap").set_log_level("TRACE")
   -- Check ~/.cache/nvim/dap.log
   ```

### Breakpoints Not Hit

**Symptom:** Breakpoints set but not stopping

**Solutions:**

1. **Verify source mapping** - Ensure paths match
2. **Check breakpoint set:**
   ```vim
   :lua print(vim.inspect(require("dap.breakpoints").get()))
   ```

3. **Use log point to debug:**
   ```vim
   <leader>lp  " Set log point
   ```

---

## Git Issues

### Gitsigns Not Showing

**Symptom:** No git signs in gutter

**Solutions:**

1. **Check if in git repo:**
   ```bash
   git status
   ```

2. **Check gitsigns status:**
   ```vim
   :Gitsigns debug_messages
   ```

3. **Refresh:**
   ```vim
   :Gitsigns refresh
   ```

### Fugitive Commands Fail

**Symptom:** `:Git` errors

**Solutions:**

1. **Check git available:**
   ```bash
   which git
   ```

2. **Check git config:**
   ```bash
   git config --list
   ```

---

## Performance Issues

### High Memory Usage

**Symptom:** Neovim using >500MB RAM

**Solutions:**

1. **Check memory:**
   ```vim
   :lua print(collectgarbage("count") .. " KB")
   ```

2. **Force garbage collection:**
   ```vim
   :lua collectgarbage("collect")
   ```

3. **Check large buffers:**
   ```vim
   :ls
   ```

4. **Close unused buffers:**
   ```vim
   :bd [buffer_number]
   ```

### Lag When Typing

**Symptom:** Input delay

**Solutions:**

1. **Disable heavy plugins in insert mode:**
   ```lua
   event = "BufReadPost"  -- Not InsertEnter
   ```

2. **Reduce updatetime:**
   ```lua
   vim.opt.updatetime = 250
   ```

3. **Disable LSP in insert:**
   ```lua
   vim.lsp.handlers["textDocument/publishDiagnostics"] = vim.lsp.with(
     vim.lsp.diagnostic.on_publish_diagnostics, {
       update_in_insert = false,
     }
   )
   ```

---

## Reset & Recovery

### Full Reset

```bash
# Backup first!
mv ~/.config/nvim ~/.config/nvim.bak
mv ~/.local/share/nvim ~/.local/share/nvim.bak
mv ~/.local/state/nvim ~/.local/state/nvim.bak
mv ~/.cache/nvim ~/.cache/nvim.bak

# Fresh start
git clone <your-config-repo> ~/.config/nvim
nvim
```

### Clear Caches Only

```bash
rm -rf ~/.cache/nvim
rm -rf ~/.local/state/nvim
rm ~/.config/nvim/lazy-lock.json
```

### Disable All Plugins Temporarily

```bash
nvim -u NONE
# or
nvim --clean
```

---

## Getting Help

1. **Check health:** `:checkhealth`
2. **Read logs:** `:messages`, `:LspLog`
3. **Search keymaps:** `:Telescope keymaps`
4. **Check verbose:** `:verbose set option?`
5. **Plugin docs:** `:help plugin-name`
