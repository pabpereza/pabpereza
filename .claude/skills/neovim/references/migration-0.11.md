# Neovim 0.11 Migration Guide

Guide for migrating this configuration to Neovim 0.11 and beyond.

## Version Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Neovim | 0.9.0 | 0.11+ |
| lazy.nvim | 10.0 | Latest |
| Treesitter | 0.9 | Latest |

## Breaking Changes in 0.11

### 1. vim.tbl_flatten Deprecated

**Old:**
```lua
local flat = vim.tbl_flatten({ { 1, 2 }, { 3, 4 } })
```

**New:**
```lua
local flat = vim.iter({ { 1, 2 }, { 3, 4 } }):flatten():totable()
```

**Compatibility Shim (in lua/config/compat.lua):**
```lua
if not vim.tbl_flatten then
  vim.tbl_flatten = function(t)
    return vim.iter(t):flatten():totable()
  end
end
```

### 2. vim.tbl_islist → vim.islist

**Old:**
```lua
if vim.tbl_islist(t) then
```

**New:**
```lua
if vim.islist(t) then
```

**Compatibility Shim:**
```lua
if vim.islist and not vim.tbl_islist then
  vim.tbl_islist = vim.islist
end
```

### 3. vim.lsp.buf.formatting Removed

**Old:**
```lua
vim.lsp.buf.formatting()
vim.lsp.buf.formatting_sync()
```

**New:**
```lua
vim.lsp.buf.format()
vim.lsp.buf.format({ async = false })  -- For sync
```

### 4. vim.diagnostic.disable/enable Signature Change

**Old:**
```lua
vim.diagnostic.disable(bufnr)
vim.diagnostic.enable(bufnr)
```

**New:**
```lua
vim.diagnostic.enable(false, { bufnr = bufnr })
vim.diagnostic.enable(true, { bufnr = bufnr })
```

### 5. vim.lsp.get_active_clients → vim.lsp.get_clients

**Old:**
```lua
local clients = vim.lsp.get_active_clients()
local clients = vim.lsp.get_active_clients({ bufnr = 0 })
```

**New:**
```lua
local clients = vim.lsp.get_clients()
local clients = vim.lsp.get_clients({ bufnr = 0 })
```

### 6. Inlay Hints API Change

**Old (0.10):**
```lua
vim.lsp.inlay_hint(bufnr, true)
```

**New (0.11+):**
```lua
vim.lsp.inlay_hint.enable(true, { bufnr = bufnr })
-- Or globally
vim.lsp.inlay_hint.enable(true)
```

---

## New Features in 0.11

### 1. Native Snippets

Neovim 0.11 includes native snippet support:

```lua
-- No need for LuaSnip for basic snippets
vim.snippet.expand("function ${1:name}(${2:args})\n\t${0}\nend")

-- Jump between placeholders
vim.snippet.jump(1)   -- Next
vim.snippet.jump(-1)  -- Previous

-- Check if in snippet
vim.snippet.active({ direction = 1 })
```

### 2. Enhanced LSP Defaults

Default LSP keymaps are now built-in:

```lua
-- These are now defaults (can be disabled)
vim.g.lsp_default_keymaps = true  -- Enabled by default

-- Default mappings:
-- grn - vim.lsp.buf.rename()
-- gra - vim.lsp.buf.code_action()
-- grr - vim.lsp.buf.references()
-- gri - vim.lsp.buf.implementation()
-- gO  - vim.lsp.buf.document_symbol()
-- <C-s> - vim.lsp.buf.signature_help() (insert mode)
```

### 3. vim.iter Improvements

```lua
-- Filter and map
local result = vim.iter({ 1, 2, 3, 4, 5 })
  :filter(function(x) return x % 2 == 0 end)
  :map(function(x) return x * 2 end)
  :totable()
-- { 4, 8 }

-- Flatten nested tables
local flat = vim.iter({ { 1, 2 }, { 3, 4 } }):flatten():totable()
-- { 1, 2, 3, 4 }

-- Find first match
local first_even = vim.iter({ 1, 3, 4, 5 }):find(function(x)
  return x % 2 == 0
end)
-- 4
```

### 4. Terminal Improvements

```lua
-- New terminal highlights
vim.api.nvim_set_hl(0, "TermCursor", { bg = "#ffffff" })
vim.api.nvim_set_hl(0, "TermCursorNC", { bg = "#666666" })
```

### 5. Improved vim.ui

```lua
-- vim.ui.open for system open
vim.ui.open("https://neovim.io")
vim.ui.open("/path/to/file.pdf")
```

---

## Plugin Compatibility

### Plugins That Need Updates for 0.11

| Plugin | Issue | Solution |
|--------|-------|----------|
| nvim-cmp | Snippet API | Update to latest |
| LuaSnip | Optional now | Can use native snippets |
| null-ls | Archived | Use conform.nvim + nvim-lint |
| lspconfig | API changes | Update to latest |

### Recommended Updates

1. **Replace null-ls:**
   ```lua
   -- Before (null-ls)
   null_ls.builtins.formatting.stylua
   null_ls.builtins.diagnostics.eslint

   -- After (conform + nvim-lint)
   formatters_by_ft = { lua = { "stylua" } }
   linters_by_ft = { javascript = { "eslint_d" } }
   ```

2. **Use native snippets or update LuaSnip:**
   ```lua
   -- Native snippets
   vim.keymap.set({ "i", "s" }, "<Tab>", function()
     if vim.snippet.active({ direction = 1 }) then
       return "<cmd>lua vim.snippet.jump(1)<cr>"
     else
       return "<Tab>"
     end
   end, { expr = true })
   ```

---

## Migration Checklist

### Before Upgrading

- [ ] Backup current configuration
- [ ] Check plugin compatibility
- [ ] Review breaking changes above
- [ ] Update lazy.nvim to latest

### Update Steps

1. **Update Neovim:**
   ```bash
   brew upgrade neovim
   # or
   brew install neovim --HEAD
   ```

2. **Update plugins:**
   ```vim
   :Lazy sync
   ```

3. **Check for deprecation warnings:**
   ```vim
   :checkhealth
   ```

4. **Apply compatibility shims:**
   ```lua
   -- In lua/config/compat.lua
   require("config.compat")
   ```

5. **Test critical features:**
   - LSP completions
   - Formatting
   - Diagnostics
   - Treesitter highlighting
   - DAP debugging

### After Upgrading

- [ ] Run `:checkhealth`
- [ ] Verify LSP works (`:LspInfo`)
- [ ] Check completions
- [ ] Test formatting
- [ ] Verify Treesitter (`:TSInstallInfo`)

---

## Compatibility Layer

Full compatibility module for gradual migration:

```lua
-- lua/config/compat.lua
local M = {}

M.setup = function()
  -- vim.tbl_islist → vim.islist
  if vim.islist and not vim.tbl_islist then
    vim.tbl_islist = vim.islist
  elseif vim.tbl_islist and not vim.islist then
    vim.islist = vim.tbl_islist
  end

  -- vim.tbl_flatten (deprecated in 0.11)
  if not vim.tbl_flatten then
    vim.tbl_flatten = function(t)
      return vim.iter(t):flatten():totable()
    end
  end

  -- vim.tbl_add_reverse_lookup (deprecated)
  if not vim.tbl_add_reverse_lookup then
    vim.tbl_add_reverse_lookup = function(t)
      for k, v in pairs(t) do
        t[v] = k
      end
      return t
    end
  end

  -- vim.lsp.get_active_clients → vim.lsp.get_clients
  if vim.lsp.get_clients and not vim.lsp.get_active_clients then
    vim.lsp.get_active_clients = vim.lsp.get_clients
  end

  -- Check Neovim version
  local version = vim.version()
  if version.major == 0 and version.minor >= 11 then
    -- 0.11+ specific setup
    -- Disable default LSP keymaps if you have custom ones
    -- vim.g.lsp_default_keymaps = false
  end
end

return M
```

---

## Feature Flags

Use feature detection instead of version checks:

```lua
-- Check for native snippets
local has_native_snippets = vim.snippet ~= nil

-- Check for new inlay hints API
local has_new_inlay_hints = vim.lsp.inlay_hint and vim.lsp.inlay_hint.enable

-- Check for vim.iter
local has_iter = vim.iter ~= nil

-- Use feature flags
if has_native_snippets then
  -- Use native snippets
else
  -- Use LuaSnip
end
```

---

## Deprecated Features to Avoid

| Deprecated | Replacement |
|------------|-------------|
| `vim.tbl_flatten()` | `vim.iter():flatten():totable()` |
| `vim.tbl_islist()` | `vim.islist()` |
| `vim.lsp.buf.formatting()` | `vim.lsp.buf.format()` |
| `vim.lsp.buf.range_formatting()` | `vim.lsp.buf.format({ range = ... })` |
| `vim.lsp.get_active_clients()` | `vim.lsp.get_clients()` |
| `vim.lsp.buf_get_clients()` | `vim.lsp.get_clients({ bufnr = 0 })` |
| `vim.diagnostic.disable()` | `vim.diagnostic.enable(false, opts)` |
| `vim.lsp.diagnostic` | `vim.diagnostic` |

---

## Testing Configuration

```bash
# Test with specific Neovim version
nvim --version

# Test startup
nvim --startuptime /tmp/startup.log -c "q"
cat /tmp/startup.log

# Test health
nvim --headless -c "checkhealth" -c "qa!" 2>&1 | head -100

# Test with clean config
nvim --clean

# Test specific plugin
nvim --cmd "lua vim.g.test_mode = true" -c "Lazy load telescope.nvim"
```
