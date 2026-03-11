# Plugin Reference

Complete reference for all 82 plugins organized by category.

## Plugin Spec Structure

```lua
{
  "author/plugin-name",        -- GitHub short URL
  version = "*",               -- Use latest stable (or false for HEAD)
  enabled = true,              -- Enable/disable plugin
  cond = function() end,       -- Conditional loading
  dependencies = {},           -- Required plugins
  init = function() end,       -- Run before loading
  opts = {},                   -- Options passed to setup()
  config = function(_, opts)   -- Configuration function
    require("plugin").setup(opts)
  end,

  -- Loading triggers (pick one)
  lazy = true,                 -- Default lazy
  event = "VeryLazy",          -- On event
  cmd = "CommandName",         -- On command
  ft = "filetype",             -- On filetype
  keys = { ... },              -- On keypress
}
```

## Core Plugins

### plenary.nvim
Lua utility library required by many plugins.

```lua
{ "nvim-lua/plenary.nvim", lazy = true }
```

### nui.nvim
UI component library for neo-tree, noice, etc.

```lua
{ "MunifTanjim/nui.nvim", lazy = true }
```

### nvim-web-devicons
File icons support.

```lua
{
  "nvim-tree/nvim-web-devicons",
  lazy = true,
  opts = { default = true },
}
```

## UI Plugins

### tokyonight.nvim
Colorscheme.

```lua
{
  "folke/tokyonight.nvim",
  lazy = false,
  priority = 1000,
  opts = { style = "night" },
  config = function(_, opts)
    require("tokyonight").setup(opts)
    vim.cmd.colorscheme("tokyonight")
  end,
}
```

### lualine.nvim
Status line.

```lua
{
  "nvim-lualine/lualine.nvim",
  event = "VeryLazy",
  opts = {
    options = {
      theme = "tokyonight",
      component_separators = "|",
      section_separators = "",
    },
  },
}
```

### bufferline.nvim
Buffer tabs.

```lua
{
  "akinsho/bufferline.nvim",
  event = "VeryLazy",
  opts = {
    options = {
      diagnostics = "nvim_lsp",
      offsets = {
        { filetype = "neo-tree", text = "File Explorer" },
      },
    },
  },
}
```

### noice.nvim
Enhanced UI for messages, cmdline, popupmenu.

```lua
{
  "folke/noice.nvim",
  event = "VeryLazy",
  dependencies = { "MunifTanjim/nui.nvim", "rcarriga/nvim-notify" },
  opts = {
    lsp = {
      override = {
        ["vim.lsp.util.convert_input_to_markdown_lines"] = true,
        ["vim.lsp.util.stylize_markdown"] = true,
        ["cmp.entry.get_documentation"] = true,
      },
    },
    presets = {
      command_palette = true,
      lsp_doc_border = true,
    },
  },
}
```

### which-key.nvim
Keybinding hints.

```lua
{
  "folke/which-key.nvim",
  event = "VeryLazy",
  opts = {
    plugins = { spelling = true },
  },
  config = function(_, opts)
    local wk = require("which-key")
    wk.setup(opts)
    wk.register({
      ["<leader>"] = {
        c = { name = "+code" },
        g = { name = "+git" },
        s = { name = "+search" },
        -- Add more groups
      },
    })
  end,
}
```

## Editor Plugins

### flash.nvim
Enhanced motion.

```lua
{
  "folke/flash.nvim",
  event = "VeryLazy",
  opts = {},
  keys = {
    { "s", function() require("flash").jump() end, desc = "Flash" },
    { "S", function() require("flash").treesitter() end, desc = "Flash Treesitter" },
  },
}
```

### harpoon
Quick file navigation.

```lua
{
  "ThePrimeagen/harpoon",
  branch = "harpoon2",
  dependencies = { "nvim-lua/plenary.nvim" },
  keys = {
    { "<leader>a", function() require("harpoon"):list():add() end },
    { "<C-e>", function() require("harpoon").ui:toggle_quick_menu(require("harpoon"):list()) end },
  },
}
```

### nvim-autopairs
Auto bracket pairing.

```lua
{
  "windwp/nvim-autopairs",
  event = "InsertEnter",
  opts = {
    check_ts = true,
    fast_wrap = {},
  },
}
```

### toggleterm.nvim
Terminal integration.

```lua
{
  "akinsho/toggleterm.nvim",
  cmd = "ToggleTerm",
  keys = { { "<C-\\>", "<cmd>ToggleTerm<cr>" } },
  opts = {
    size = 20,
    direction = "float",
    float_opts = { border = "rounded" },
  },
}
```

## LSP Plugins

### nvim-lspconfig
LSP configuration.

```lua
{
  "neovim/nvim-lspconfig",
  event = { "BufReadPre", "BufNewFile" },
  dependencies = {
    "williamboman/mason.nvim",
    "williamboman/mason-lspconfig.nvim",
  },
  config = function()
    -- See references/lsp.md for full config
  end,
}
```

### mason.nvim
LSP/DAP/Linter installer.

```lua
{
  "williamboman/mason.nvim",
  cmd = "Mason",
  opts = {
    ui = { border = "rounded" },
  },
}
```

### conform.nvim
Code formatting.

```lua
{
  "stevearc/conform.nvim",
  event = { "BufWritePre" },
  cmd = { "ConformInfo" },
  opts = {
    formatters_by_ft = {
      lua = { "stylua" },
      python = { "ruff_format" },
      javascript = { "prettierd", "prettier" },
      typescript = { "prettierd", "prettier" },
      json = { "prettierd" },
      yaml = { "prettierd" },
      markdown = { "prettierd" },
    },
    format_on_save = {
      timeout_ms = 500,
      lsp_fallback = true,
    },
  },
}
```

### trouble.nvim
Diagnostics viewer.

```lua
{
  "folke/trouble.nvim",
  cmd = { "TroubleToggle", "Trouble" },
  opts = {},
  keys = {
    { "<leader>xx", "<cmd>Trouble diagnostics toggle<cr>" },
    { "<leader>xX", "<cmd>Trouble diagnostics toggle filter.buf=0<cr>" },
  },
}
```

## Git Plugins

### gitsigns.nvim
Git signs in gutter.

```lua
{
  "lewis6991/gitsigns.nvim",
  event = { "BufReadPre", "BufNewFile" },
  opts = {
    signs = {
      add = { text = "▎" },
      change = { text = "▎" },
      delete = { text = "" },
    },
    on_attach = function(buffer)
      -- See references/keybindings.md for git keymaps
    end,
  },
}
```

### vim-fugitive
Git commands.

```lua
{
  "tpope/vim-fugitive",
  cmd = { "Git", "G", "Gdiffsplit", "Gread", "Gwrite", "Ggrep", "GMove", "GDelete", "GBrowse" },
}
```

### diffview.nvim
Diff viewer.

```lua
{
  "sindrets/diffview.nvim",
  cmd = { "DiffviewOpen", "DiffviewFileHistory" },
  opts = {},
}
```

## AI Plugins

### copilot.vim
GitHub Copilot.

```lua
{
  "github/copilot.vim",
  event = "InsertEnter",
  config = function()
    vim.g.copilot_no_tab_map = true
    vim.keymap.set("i", "<C-J>", 'copilot#Accept("\\<CR>")', {
      expr = true,
      replace_keycodes = false,
    })
  end,
}
```

### ChatGPT.nvim
ChatGPT integration.

```lua
{
  "jackMort/ChatGPT.nvim",
  cmd = { "ChatGPT", "ChatGPTActAs", "ChatGPTEditWithInstructions" },
  dependencies = {
    "MunifTanjim/nui.nvim",
    "nvim-lua/plenary.nvim",
    "nvim-telescope/telescope.nvim",
  },
  opts = {
    api_key_cmd = "pass show api/openai",
  },
}
```

## Debug Plugins

### nvim-dap
Debug adapter protocol.

```lua
{
  "mfussenegger/nvim-dap",
  dependencies = {
    "rcarriga/nvim-dap-ui",
    "theHamsta/nvim-dap-virtual-text",
    "nvim-neotest/nvim-nio",
  },
  keys = {
    { "<F5>", function() require("dap").continue() end },
    { "<F10>", function() require("dap").step_over() end },
    { "<F11>", function() require("dap").step_into() end },
    { "<F12>", function() require("dap").step_out() end },
    { "<leader>b", function() require("dap").toggle_breakpoint() end },
  },
}
```

### nvim-dap-ui
DAP UI.

```lua
{
  "rcarriga/nvim-dap-ui",
  dependencies = { "mfussenegger/nvim-dap", "nvim-neotest/nvim-nio" },
  opts = {},
  config = function(_, opts)
    local dap, dapui = require("dap"), require("dapui")
    dapui.setup(opts)
    dap.listeners.after.event_initialized["dapui_config"] = function()
      dapui.open()
    end
    dap.listeners.before.event_terminated["dapui_config"] = function()
      dapui.close()
    end
  end,
}
```

## Tools Plugins

### telescope.nvim
Fuzzy finder.

```lua
{
  "nvim-telescope/telescope.nvim",
  cmd = "Telescope",
  dependencies = {
    "nvim-lua/plenary.nvim",
    { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
  },
  keys = {
    { "<leader>sf", "<cmd>Telescope find_files<cr>" },
    { "<leader>sg", "<cmd>Telescope live_grep<cr>" },
    { "<leader><space>", "<cmd>Telescope buffers<cr>" },
    { "<leader>sh", "<cmd>Telescope help_tags<cr>" },
  },
  opts = {
    defaults = {
      mappings = {
        i = {
          ["<C-j>"] = "move_selection_next",
          ["<C-k>"] = "move_selection_previous",
        },
      },
    },
  },
}
```

### neo-tree.nvim
File explorer.

```lua
{
  "nvim-neo-tree/neo-tree.nvim",
  branch = "v3.x",
  cmd = "Neotree",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-tree/nvim-web-devicons",
    "MunifTanjim/nui.nvim",
  },
  keys = {
    { "\\", "<cmd>Neotree toggle<cr>" },
    { "<leader>e", "<cmd>Neotree focus<cr>" },
  },
  opts = {
    filesystem = {
      follow_current_file = { enabled = true },
      use_libuv_file_watcher = true,
    },
  },
}
```

## Treesitter Plugins

### nvim-treesitter
Syntax parsing.

```lua
{
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  event = { "BufReadPost", "BufNewFile" },
  opts = {
    ensure_installed = {
      "lua", "python", "javascript", "typescript", "go",
      "json", "yaml", "markdown", "markdown_inline",
      "bash", "vim", "vimdoc", "query",
    },
    highlight = { enable = true },
    indent = { enable = true },
    incremental_selection = {
      enable = true,
      keymaps = {
        init_selection = "<C-space>",
        node_incremental = "<C-space>",
        node_decremental = "<bs>",
      },
    },
  },
  config = function(_, opts)
    require("nvim-treesitter.configs").setup(opts)
  end,
}
```

### nvim-treesitter-textobjects
Enhanced text objects.

```lua
{
  "nvim-treesitter/nvim-treesitter-textobjects",
  dependencies = "nvim-treesitter/nvim-treesitter",
  opts = {
    textobjects = {
      select = {
        enable = true,
        lookahead = true,
        keymaps = {
          ["af"] = "@function.outer",
          ["if"] = "@function.inner",
          ["ac"] = "@class.outer",
          ["ic"] = "@class.inner",
        },
      },
      move = {
        enable = true,
        goto_next_start = {
          ["]f"] = "@function.outer",
          ["]c"] = "@class.outer",
        },
        goto_previous_start = {
          ["[f"] = "@function.outer",
          ["[c"] = "@class.outer",
        },
      },
    },
  },
}
```
