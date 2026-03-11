# LSP Configuration Reference

Complete guide for configuring Language Server Protocol in this Neovim setup.

## LSP Stack Overview

```
mason.nvim (Package Manager)
├── mason-lspconfig.nvim → nvim-lspconfig (LSP servers)
├── mason-tool-installer.nvim (Auto-install tools)
└── mason-nvim-dap.nvim → nvim-dap (Debug adapters)

nvim-lspconfig (LSP Client)
├── blink.cmp / nvim-cmp (Completion)
├── conform.nvim (Formatting)
├── nvim-lint (Linting)
└── trouble.nvim (Diagnostics UI)
```

## Installing LSP Servers

### Via Mason (Recommended)

```vim
:Mason
```

Then search and install servers interactively, or:

### Via Configuration

```lua
-- In lua/plugins/specs/lsp.lua
{
  "WhoIsSethDaniel/mason-tool-installer.nvim",
  opts = {
    ensure_installed = {
      -- LSP Servers
      "lua_ls",
      "pyright",
      "tsserver",
      "gopls",
      "rust_analyzer",
      "yamlls",
      "jsonls",

      -- Formatters
      "stylua",
      "prettierd",
      "ruff",
      "gofumpt",

      -- Linters
      "eslint_d",
      "luacheck",
      "shellcheck",
    },
  },
}
```

## Configuring LSP Servers

### Basic Server Configuration

```lua
-- In lua/plugins/specs/lsp.lua
local servers = {
  lua_ls = {
    settings = {
      Lua = {
        workspace = { checkThirdParty = false },
        telemetry = { enable = false },
        diagnostics = {
          globals = { "vim" },
        },
      },
    },
  },

  pyright = {
    settings = {
      python = {
        analysis = {
          typeCheckingMode = "basic",
          autoSearchPaths = true,
          useLibraryCodeForTypes = true,
        },
      },
    },
  },

  gopls = {
    settings = {
      gopls = {
        analyses = {
          unusedparams = true,
        },
        staticcheck = true,
        gofumpt = true,
      },
    },
  },

  tsserver = {},
  jsonls = {},
  yamlls = {},
}
```

### Server with Custom on_attach

```lua
{
  "neovim/nvim-lspconfig",
  config = function()
    local lspconfig = require("lspconfig")
    local capabilities = require("cmp_nvim_lsp").default_capabilities()

    local on_attach = function(client, bufnr)
      -- Buffer-local keymaps
      local map = function(keys, func, desc)
        vim.keymap.set("n", keys, func, { buffer = bufnr, desc = desc })
      end

      map("gd", vim.lsp.buf.definition, "[G]oto [D]efinition")
      map("gr", vim.lsp.buf.references, "[G]oto [R]eferences")
      map("gI", vim.lsp.buf.implementation, "[G]oto [I]mplementation")
      map("<leader>D", vim.lsp.buf.type_definition, "Type [D]efinition")
      map("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
      map("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
      map("K", vim.lsp.buf.hover, "Hover Documentation")

      -- Highlight references under cursor
      if client.server_capabilities.documentHighlightProvider then
        vim.api.nvim_create_autocmd({ "CursorHold", "CursorHoldI" }, {
          buffer = bufnr,
          callback = vim.lsp.buf.document_highlight,
        })
        vim.api.nvim_create_autocmd("CursorMoved", {
          buffer = bufnr,
          callback = vim.lsp.buf.clear_references,
        })
      end
    end

    for server, config in pairs(servers) do
      config.capabilities = capabilities
      config.on_attach = on_attach
      lspconfig[server].setup(config)
    end
  end,
}
```

## LSP Keybindings

| Key | Action | Description |
|-----|--------|-------------|
| `gd` | `vim.lsp.buf.definition` | Go to definition |
| `gr` | `vim.lsp.buf.references` | List references |
| `gI` | `vim.lsp.buf.implementation` | Go to implementation |
| `gD` | `vim.lsp.buf.declaration` | Go to declaration |
| `K` | `vim.lsp.buf.hover` | Hover documentation |
| `<C-k>` | `vim.lsp.buf.signature_help` | Signature help (insert) |
| `<leader>D` | `vim.lsp.buf.type_definition` | Type definition |
| `<leader>rn` | `vim.lsp.buf.rename` | Rename symbol |
| `<leader>ca` | `vim.lsp.buf.code_action` | Code actions |
| `<leader>ds` | `vim.lsp.buf.document_symbol` | Document symbols |
| `<leader>ws` | `vim.lsp.buf.workspace_symbol` | Workspace symbols |
| `[d` | `vim.diagnostic.goto_prev` | Previous diagnostic |
| `]d` | `vim.diagnostic.goto_next` | Next diagnostic |

## Completion (blink.cmp)

### Keymap Presets

blink.cmp provides keymap presets for common configurations:

| Preset | Navigation | Description |
|--------|------------|-------------|
| `default` | `<C-n>`/`<C-p>` | Classic Vim-style navigation |
| `super-tab` | `<Tab>`/`<S-Tab>` | Tab navigates items and snippet placeholders |
| `enter` | `<C-n>`/`<C-p>` | Enter confirms, Tab for snippets only |

### Current Configuration (super-tab)

```lua
{
  "saghen/blink.cmp",
  version = "*",
  event = "InsertEnter",
  dependencies = { "rafamadriz/friendly-snippets" },
  opts = {
    keymap = { preset = "super-tab" },  -- Tab/S-Tab navigation
    sources = {
      default = { "lsp", "path", "snippets", "buffer" },
    },
    completion = {
      menu = { auto_show = true },
      documentation = { auto_show = true },
    },
  },
}
```

### super-tab Preset Keybindings

| Key | Action |
|-----|--------|
| `<Tab>` | Select next item / Jump to next snippet placeholder |
| `<S-Tab>` | Select previous item / Jump to previous snippet placeholder |
| `<CR>` | Accept completion |
| `<C-Space>` | Show/toggle completion menu |
| `<C-e>` | Hide completion menu |
| `<C-b>` | Scroll documentation up |
| `<C-f>` | Scroll documentation down |

### Custom Keymap Configuration

For custom keymaps instead of a preset:

```lua
opts = {
  keymap = {
    ["<C-space>"] = { "show", "show_documentation", "hide_documentation" },
    ["<C-e>"] = { "hide" },
    ["<CR>"] = { "accept", "fallback" },
    ["<Tab>"] = { "select_next", "snippet_forward", "fallback" },
    ["<S-Tab>"] = { "select_prev", "snippet_backward", "fallback" },
    ["<C-b>"] = { "scroll_documentation_up", "fallback" },
    ["<C-f>"] = { "scroll_documentation_down", "fallback" },
  },
}
```

## Formatting (conform.nvim)

```lua
{
  "stevearc/conform.nvim",
  event = "BufWritePre",
  cmd = { "ConformInfo" },
  opts = {
    formatters_by_ft = {
      lua = { "stylua" },
      python = { "ruff_format" },
      javascript = { "prettierd", "prettier" },
      typescript = { "prettierd", "prettier" },
      javascriptreact = { "prettierd", "prettier" },
      typescriptreact = { "prettierd", "prettier" },
      json = { "prettierd" },
      yaml = { "prettierd" },
      markdown = { "prettierd" },
      go = { "gofumpt", "goimports" },
      rust = { "rustfmt" },
      sh = { "shfmt" },
    },
    format_on_save = {
      timeout_ms = 500,
      lsp_fallback = true,
    },
  },
  keys = {
    {
      "<leader>cf",
      function()
        require("conform").format({ async = true, lsp_fallback = true })
      end,
      desc = "[C]ode [F]ormat",
    },
  },
}
```

## Linting (nvim-lint)

```lua
{
  "mfussenegger/nvim-lint",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local lint = require("lint")

    lint.linters_by_ft = {
      javascript = { "eslint_d" },
      typescript = { "eslint_d" },
      python = { "ruff" },
      lua = { "luacheck" },
      sh = { "shellcheck" },
      markdown = { "markdownlint" },
    }

    vim.api.nvim_create_autocmd({ "BufWritePost", "BufReadPost", "InsertLeave" }, {
      callback = function()
        lint.try_lint()
      end,
    })
  end,
}
```

## Diagnostics Configuration

```lua
vim.diagnostic.config({
  virtual_text = {
    prefix = "●",
    severity = { min = vim.diagnostic.severity.WARN },
  },
  signs = {
    text = {
      [vim.diagnostic.severity.ERROR] = " ",
      [vim.diagnostic.severity.WARN] = " ",
      [vim.diagnostic.severity.INFO] = " ",
      [vim.diagnostic.severity.HINT] = " ",
    },
  },
  underline = true,
  update_in_insert = false,
  severity_sort = true,
  float = {
    focusable = true,
    border = "rounded",
    source = "always",
  },
})
```

## Trouble.nvim (Diagnostics Viewer)

```lua
{
  "folke/trouble.nvim",
  cmd = { "Trouble" },
  opts = {},
  keys = {
    { "<leader>xx", "<cmd>Trouble diagnostics toggle<cr>", desc = "Diagnostics" },
    { "<leader>xX", "<cmd>Trouble diagnostics toggle filter.buf=0<cr>", desc = "Buffer Diagnostics" },
    { "<leader>cs", "<cmd>Trouble symbols toggle<cr>", desc = "Symbols" },
    { "<leader>xL", "<cmd>Trouble loclist toggle<cr>", desc = "Location List" },
    { "<leader>xQ", "<cmd>Trouble qflist toggle<cr>", desc = "Quickfix List" },
  },
}
```

## Adding a New LSP Server

1. **Install via Mason:**
   ```vim
   :Mason
   " Search for and install the server
   ```

2. **Add to auto-install list:**
   ```lua
   -- In mason-tool-installer opts
   ensure_installed = {
     "your_server",
   }
   ```

3. **Configure the server:**
   ```lua
   local servers = {
     your_server = {
       settings = {
         -- Server-specific settings
       },
       filetypes = { "your_filetype" },
       root_dir = lspconfig.util.root_pattern(".git", "package.json"),
     },
   }
   ```

4. **Restart Neovim or run:**
   ```vim
   :LspRestart
   ```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| LSP not starting | `:LspInfo`, check server is installed via `:Mason` |
| No completions | Check `:LspInfo` for active clients |
| Formatting not working | `:ConformInfo`, verify formatter installed |
| Diagnostics not showing | `:lua vim.diagnostic.setloclist()` |
| Wrong root directory | Check `root_dir` in server config |

### Debug Commands

```vim
:LspInfo                      " Show active LSP clients
:LspLog                       " Open LSP log file
:LspRestart                   " Restart LSP clients
:Mason                        " Open Mason installer
:ConformInfo                  " Show formatter info
:lua vim.lsp.set_log_level("debug")  " Enable debug logging
```
