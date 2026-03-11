# Plugin Deep-Dives

In-depth configuration guides for the most important plugins.

## lazy.nvim (Plugin Manager)

### Architecture

```
~/.local/share/nvim/lazy/     # Plugin install location
├── lazy.nvim/                # Self-managed
├── plenary.nvim/
├── telescope.nvim/
└── ...

~/.config/nvim/lazy-lock.json # Version lock file
```

### Advanced Configuration

```lua
require("lazy").setup({
  spec = { import = "plugins.specs" },
  defaults = {
    lazy = true,
    version = false,
  },
  install = {
    missing = true,
    colorscheme = { "tokyonight", "habamax" },
  },
  checker = {
    enabled = true,
    concurrency = 4,
    notify = false,
    frequency = 3600,
  },
  change_detection = {
    enabled = true,
    notify = false,
  },
  performance = {
    cache = { enabled = true },
    reset_packpath = true,
    rtp = {
      reset = true,
      disabled_plugins = { "netrw", "netrwPlugin" },
    },
  },
  ui = {
    border = "rounded",
    icons = {
      loaded = "●",
      not_loaded = "○",
    },
  },
})
```

### Plugin Spec Options

| Option | Type | Description |
|--------|------|-------------|
| `enabled` | boolean/function | Enable/disable plugin |
| `cond` | boolean/function | Conditional loading |
| `dependencies` | string/table | Required plugins |
| `init` | function | Runs before loading |
| `opts` | table/function | Options for setup() |
| `config` | function/true | Configuration function |
| `build` | string/function | Build command |
| `branch` | string | Git branch |
| `tag` | string | Git tag |
| `version` | string | Semver version |
| `pin` | boolean | Don't update |
| `priority` | number | Load priority (higher first) |

### Loading Triggers

```lua
-- Event-based
event = "VeryLazy"
event = { "BufReadPre", "BufNewFile" }
event = "InsertEnter"
event = "CmdlineEnter"

-- Command-based
cmd = "Telescope"
cmd = { "Git", "Gdiffsplit" }

-- Filetype-based
ft = "lua"
ft = { "python", "javascript" }

-- Key-based
keys = {
  { "<leader>ff", "<cmd>Telescope find_files<cr>", desc = "Find Files" },
  { "<leader>fg", mode = { "n", "v" }, "<cmd>Telescope live_grep<cr>" },
}

-- Module-based (loads when require() is called)
-- Automatic for lazy = true plugins
```

---

## Telescope.nvim (Fuzzy Finder)

### Core Configuration

```lua
{
  "nvim-telescope/telescope.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
    "nvim-telescope/telescope-ui-select.nvim",
  },
  opts = {
    defaults = {
      prompt_prefix = " ",
      selection_caret = " ",
      path_display = { "truncate" },
      sorting_strategy = "ascending",
      layout_config = {
        horizontal = {
          prompt_position = "top",
          preview_width = 0.55,
        },
        vertical = { mirror = false },
        width = 0.87,
        height = 0.80,
        preview_cutoff = 120,
      },
      mappings = {
        i = {
          ["<C-j>"] = "move_selection_next",
          ["<C-k>"] = "move_selection_previous",
          ["<C-n>"] = "cycle_history_next",
          ["<C-p>"] = "cycle_history_prev",
          ["<C-c>"] = "close",
          ["<CR>"] = "select_default",
          ["<C-x>"] = "select_horizontal",
          ["<C-v>"] = "select_vertical",
          ["<C-t>"] = "select_tab",
          ["<C-u>"] = "preview_scrolling_up",
          ["<C-d>"] = "preview_scrolling_down",
        },
        n = {
          ["q"] = "close",
          ["<Esc>"] = "close",
        },
      },
    },
    pickers = {
      find_files = {
        hidden = true,
        find_command = { "fd", "--type", "f", "--strip-cwd-prefix" },
      },
      live_grep = {
        additional_args = function()
          return { "--hidden" }
        end,
      },
      buffers = {
        show_all_buffers = true,
        sort_lastused = true,
        mappings = {
          i = { ["<C-d>"] = "delete_buffer" },
        },
      },
    },
    extensions = {
      fzf = {
        fuzzy = true,
        override_generic_sorter = true,
        override_file_sorter = true,
        case_mode = "smart_case",
      },
      ["ui-select"] = {
        require("telescope.themes").get_dropdown(),
      },
    },
  },
  config = function(_, opts)
    local telescope = require("telescope")
    telescope.setup(opts)
    telescope.load_extension("fzf")
    telescope.load_extension("ui-select")
  end,
}
```

### Custom Pickers

```lua
-- Find in Neovim config
vim.keymap.set("n", "<leader>sn", function()
  require("telescope.builtin").find_files({
    cwd = vim.fn.stdpath("config"),
  })
end, { desc = "Search Neovim config" })

-- Search TODOs
vim.keymap.set("n", "<leader>st", function()
  require("telescope.builtin").grep_string({
    search = "TODO|FIXME|HACK|NOTE",
    use_regex = true,
  })
end, { desc = "Search TODOs" })

-- Custom picker
local pickers = require("telescope.pickers")
local finders = require("telescope.finders")
local conf = require("telescope.config").values

local my_picker = function(opts)
  opts = opts or {}
  pickers.new(opts, {
    prompt_title = "My Picker",
    finder = finders.new_table({
      results = { "item1", "item2", "item3" },
    }),
    sorter = conf.generic_sorter(opts),
  }):find()
end
```

---

## nvim-lspconfig (LSP Client)

### Server Configuration Pattern

```lua
local lspconfig = require("lspconfig")
local capabilities = require("cmp_nvim_lsp").default_capabilities()

-- Shared on_attach
local on_attach = function(client, bufnr)
  -- Keymaps
  local map = function(keys, func, desc)
    vim.keymap.set("n", keys, func, { buffer = bufnr, desc = desc })
  end

  map("gd", vim.lsp.buf.definition, "Go to Definition")
  map("gr", vim.lsp.buf.references, "Go to References")
  map("K", vim.lsp.buf.hover, "Hover")
  map("<leader>rn", vim.lsp.buf.rename, "Rename")
  map("<leader>ca", vim.lsp.buf.code_action, "Code Action")

  -- Highlight references
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

  -- Inlay hints (Neovim 0.10+)
  if client.server_capabilities.inlayHintProvider then
    vim.lsp.inlay_hint.enable(true, { bufnr = bufnr })
  end
end

-- Configure servers
local servers = {
  lua_ls = {
    settings = {
      Lua = {
        runtime = { version = "LuaJIT" },
        workspace = {
          checkThirdParty = false,
          library = vim.api.nvim_get_runtime_file("", true),
        },
        diagnostics = { globals = { "vim" } },
        telemetry = { enable = false },
        hint = { enable = true },
      },
    },
  },

  pyright = {
    settings = {
      python = {
        analysis = {
          typeCheckingMode = "basic",
          autoSearchPaths = true,
          diagnosticMode = "workspace",
          useLibraryCodeForTypes = true,
        },
      },
    },
  },

  gopls = {
    settings = {
      gopls = {
        analyses = { unusedparams = true, shadow = true },
        staticcheck = true,
        gofumpt = true,
        hints = {
          assignVariableTypes = true,
          compositeLiteralFields = true,
          constantValues = true,
          functionTypeParameters = true,
          parameterNames = true,
          rangeVariableTypes = true,
        },
      },
    },
  },

  tsserver = {
    settings = {
      typescript = {
        inlayHints = {
          includeInlayParameterNameHints = "all",
          includeInlayFunctionParameterTypeHints = true,
          includeInlayVariableTypeHints = true,
        },
      },
    },
  },
}

for server, config in pairs(servers) do
  config.capabilities = capabilities
  config.on_attach = on_attach
  lspconfig[server].setup(config)
end
```

### Custom Language Server

```lua
-- For non-Mason servers
lspconfig.my_custom_server.setup({
  cmd = { "/path/to/server" },
  filetypes = { "myfiletype" },
  root_dir = lspconfig.util.root_pattern(".git", "setup.py"),
  settings = {},
})
```

---

## nvim-treesitter (Syntax)

### Full Configuration

```lua
{
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  event = { "BufReadPost", "BufNewFile" },
  dependencies = {
    "nvim-treesitter/nvim-treesitter-textobjects",
    "nvim-treesitter/nvim-treesitter-context",
  },
  opts = {
    ensure_installed = {
      "bash", "c", "cpp", "go", "lua", "python", "rust",
      "javascript", "typescript", "tsx", "json", "yaml",
      "html", "css", "markdown", "markdown_inline",
      "vim", "vimdoc", "query", "regex",
    },
    auto_install = true,
    highlight = {
      enable = true,
      disable = function(lang, buf)
        local max_filesize = 100 * 1024
        local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
        if ok and stats and stats.size > max_filesize then
          return true
        end
      end,
      additional_vim_regex_highlighting = false,
    },
    indent = { enable = true },
    incremental_selection = {
      enable = true,
      keymaps = {
        init_selection = "<C-space>",
        node_incremental = "<C-space>",
        scope_incremental = false,
        node_decremental = "<bs>",
      },
    },
    textobjects = {
      select = {
        enable = true,
        lookahead = true,
        keymaps = {
          ["af"] = "@function.outer",
          ["if"] = "@function.inner",
          ["ac"] = "@class.outer",
          ["ic"] = "@class.inner",
          ["aa"] = "@parameter.outer",
          ["ia"] = "@parameter.inner",
          ["ai"] = "@conditional.outer",
          ["ii"] = "@conditional.inner",
          ["al"] = "@loop.outer",
          ["il"] = "@loop.inner",
        },
      },
      move = {
        enable = true,
        set_jumps = true,
        goto_next_start = {
          ["]f"] = "@function.outer",
          ["]c"] = "@class.outer",
          ["]a"] = "@parameter.inner",
        },
        goto_next_end = {
          ["]F"] = "@function.outer",
          ["]C"] = "@class.outer",
        },
        goto_previous_start = {
          ["[f"] = "@function.outer",
          ["[c"] = "@class.outer",
          ["[a"] = "@parameter.inner",
        },
        goto_previous_end = {
          ["[F"] = "@function.outer",
          ["[C"] = "@class.outer",
        },
      },
      swap = {
        enable = true,
        swap_next = { ["<leader>a"] = "@parameter.inner" },
        swap_previous = { ["<leader>A"] = "@parameter.inner" },
      },
    },
  },
  config = function(_, opts)
    require("nvim-treesitter.configs").setup(opts)
  end,
}
```

### Custom Queries

```lua
-- Create custom highlight query
-- ~/.config/nvim/after/queries/lua/highlights.scm
;; extends
(function_call
  name: (identifier) @function.builtin
  (#eq? @function.builtin "require"))
```

---

## gitsigns.nvim (Git Integration)

### Full Configuration

```lua
{
  "lewis6991/gitsigns.nvim",
  event = { "BufReadPre", "BufNewFile" },
  opts = {
    signs = {
      add = { text = "▎" },
      change = { text = "▎" },
      delete = { text = "" },
      topdelete = { text = "" },
      changedelete = { text = "▎" },
      untracked = { text = "▎" },
    },
    signcolumn = true,
    numhl = false,
    linehl = false,
    word_diff = false,
    watch_gitdir = { interval = 1000, follow_files = true },
    attach_to_untracked = true,
    current_line_blame = false,
    current_line_blame_opts = {
      virt_text = true,
      virt_text_pos = "eol",
      delay = 500,
      ignore_whitespace = false,
    },
    current_line_blame_formatter = "<author>, <author_time:%Y-%m-%d> - <summary>",
    sign_priority = 6,
    update_debounce = 100,
    status_formatter = nil,
    max_file_length = 40000,
    preview_config = {
      border = "rounded",
      style = "minimal",
      relative = "cursor",
      row = 0,
      col = 1,
    },
    on_attach = function(bufnr)
      local gs = package.loaded.gitsigns

      local function map(mode, l, r, opts)
        opts = opts or {}
        opts.buffer = bufnr
        vim.keymap.set(mode, l, r, opts)
      end

      -- Navigation
      map("n", "]c", function()
        if vim.wo.diff then return "]c" end
        vim.schedule(function() gs.next_hunk() end)
        return "<Ignore>"
      end, { expr = true, desc = "Next hunk" })

      map("n", "[c", function()
        if vim.wo.diff then return "[c" end
        vim.schedule(function() gs.prev_hunk() end)
        return "<Ignore>"
      end, { expr = true, desc = "Previous hunk" })

      -- Actions
      map("n", "<leader>hs", gs.stage_hunk, { desc = "Stage hunk" })
      map("n", "<leader>hr", gs.reset_hunk, { desc = "Reset hunk" })
      map("v", "<leader>hs", function()
        gs.stage_hunk({ vim.fn.line("."), vim.fn.line("v") })
      end, { desc = "Stage hunk" })
      map("v", "<leader>hr", function()
        gs.reset_hunk({ vim.fn.line("."), vim.fn.line("v") })
      end, { desc = "Reset hunk" })
      map("n", "<leader>hS", gs.stage_buffer, { desc = "Stage buffer" })
      map("n", "<leader>hu", gs.undo_stage_hunk, { desc = "Undo stage" })
      map("n", "<leader>hR", gs.reset_buffer, { desc = "Reset buffer" })
      map("n", "<leader>hp", gs.preview_hunk, { desc = "Preview hunk" })
      map("n", "<leader>hb", function()
        gs.blame_line({ full = true })
      end, { desc = "Blame line" })
      map("n", "<leader>tb", gs.toggle_current_line_blame, { desc = "Toggle blame" })
      map("n", "<leader>hd", gs.diffthis, { desc = "Diff this" })
      map("n", "<leader>hD", function()
        gs.diffthis("~")
      end, { desc = "Diff ~" })
      map("n", "<leader>td", gs.toggle_deleted, { desc = "Toggle deleted" })

      -- Text object
      map({ "o", "x" }, "ih", ":<C-U>Gitsigns select_hunk<CR>", { desc = "Select hunk" })
    end,
  },
}
```

---

## blink.cmp (Completion)

### Configuration

```lua
{
  "saghen/blink.cmp",
  version = "*",
  event = "InsertEnter",
  dependencies = {
    "rafamadriz/friendly-snippets",
    "L3MON4D3/LuaSnip",
  },
  opts = {
    keymap = {
      preset = "default",
      ["<C-space>"] = { "show", "show_documentation", "hide_documentation" },
      ["<C-e>"] = { "hide", "fallback" },
      ["<CR>"] = { "accept", "fallback" },
      ["<Tab>"] = { "select_next", "snippet_forward", "fallback" },
      ["<S-Tab>"] = { "select_prev", "snippet_backward", "fallback" },
      ["<Up>"] = { "select_prev", "fallback" },
      ["<Down>"] = { "select_next", "fallback" },
      ["<C-p>"] = { "select_prev", "fallback" },
      ["<C-n>"] = { "select_next", "fallback" },
      ["<C-b>"] = { "scroll_documentation_up", "fallback" },
      ["<C-f>"] = { "scroll_documentation_down", "fallback" },
    },
    appearance = {
      use_nvim_cmp_as_default = true,
      nerd_font_variant = "mono",
    },
    sources = {
      default = { "lsp", "path", "snippets", "buffer" },
      cmdline = {},
    },
    completion = {
      accept = { auto_brackets = { enabled = true } },
      menu = {
        border = "rounded",
        draw = {
          columns = {
            { "kind_icon" },
            { "label", "label_description", gap = 1 },
          },
        },
      },
      documentation = {
        auto_show = true,
        auto_show_delay_ms = 200,
        window = { border = "rounded" },
      },
      ghost_text = { enabled = true },
    },
    signature = { enabled = true },
    snippets = {
      expand = function(snippet)
        require("luasnip").lsp_expand(snippet)
      end,
      active = function(filter)
        if filter and filter.direction then
          return require("luasnip").jumpable(filter.direction)
        end
        return require("luasnip").in_snippet()
      end,
      jump = function(direction)
        require("luasnip").jump(direction)
      end,
    },
  },
}
```

---

## neo-tree.nvim (File Explorer)

### Full Configuration

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
    { "\\", "<cmd>Neotree toggle<cr>", desc = "Toggle Explorer" },
    { "<leader>e", "<cmd>Neotree focus<cr>", desc = "Focus Explorer" },
    { "<leader>ge", "<cmd>Neotree git_status<cr>", desc = "Git Explorer" },
    { "<leader>be", "<cmd>Neotree buffers<cr>", desc = "Buffer Explorer" },
  },
  opts = {
    close_if_last_window = true,
    popup_border_style = "rounded",
    enable_git_status = true,
    enable_diagnostics = true,
    sort_case_insensitive = true,
    default_component_configs = {
      indent = {
        with_expanders = true,
        expander_collapsed = "",
        expander_expanded = "",
      },
      icon = {
        folder_closed = "",
        folder_open = "",
        folder_empty = "",
      },
      modified = { symbol = "●" },
      git_status = {
        symbols = {
          added = "",
          modified = "",
          deleted = "✖",
          renamed = "󰁕",
          untracked = "",
          ignored = "",
          unstaged = "󰄱",
          staged = "",
          conflict = "",
        },
      },
    },
    window = {
      position = "left",
      width = 35,
      mappings = {
        ["<space>"] = "none",
        ["<CR>"] = "open",
        ["o"] = "open",
        ["s"] = "open_split",
        ["v"] = "open_vsplit",
        ["t"] = "open_tabnew",
        ["a"] = { "add", config = { show_path = "relative" } },
        ["A"] = "add_directory",
        ["d"] = "delete",
        ["r"] = "rename",
        ["y"] = "copy_to_clipboard",
        ["x"] = "cut_to_clipboard",
        ["p"] = "paste_from_clipboard",
        ["c"] = "copy",
        ["m"] = "move",
        ["q"] = "close_window",
        ["R"] = "refresh",
        ["?"] = "show_help",
        ["<"] = "prev_source",
        [">"] = "next_source",
        ["H"] = "toggle_hidden",
        ["/"] = "fuzzy_finder",
        ["f"] = "filter_on_submit",
        ["<C-x>"] = "clear_filter",
        ["[g"] = "prev_git_modified",
        ["]g"] = "next_git_modified",
      },
    },
    filesystem = {
      bind_to_cwd = false,
      follow_current_file = { enabled = true },
      use_libuv_file_watcher = true,
      filtered_items = {
        visible = false,
        hide_dotfiles = false,
        hide_gitignored = true,
        hide_by_name = { ".git", "node_modules", "__pycache__" },
        never_show = { ".DS_Store" },
      },
    },
    buffers = {
      follow_current_file = { enabled = true },
      group_empty_dirs = true,
    },
    git_status = {
      window = { position = "float" },
    },
  },
}
```
