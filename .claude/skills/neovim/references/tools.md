# Tools & Utilities Reference

Command-line tools, Neovim utilities, and AI-assisted workflow patterns for this configuration.

## Neovim Built-in Tools

### Health Checks

```vim
:checkhealth              " Full system health check
:checkhealth lazy         " Lazy.nvim health
:checkhealth mason        " Mason health
:checkhealth lspconfig    " LSP configuration health
:checkhealth treesitter   " Treesitter health
```

### LSP Tools

```vim
:LspInfo                  " Show active LSP clients
:LspLog                   " Open LSP log file
:LspRestart               " Restart all LSP clients
:LspStop                  " Stop all LSP clients
:LspStart                 " Start LSP for current buffer

" Debug
:lua vim.lsp.set_log_level("debug")
:lua print(vim.lsp.get_log_path())
```

### Mason (Package Manager)

```vim
:Mason                    " Open Mason UI
:MasonInstall <pkg>       " Install package
:MasonUninstall <pkg>     " Uninstall package
:MasonUpdate              " Update all packages
:MasonLog                 " Open Mason log
```

### Lazy.nvim

```vim
:Lazy                     " Open Lazy dashboard
:Lazy sync                " Update and install plugins
:Lazy update              " Update plugins
:Lazy clean               " Remove unused plugins
:Lazy profile             " Show startup profile
:Lazy health              " Check Lazy health
:Lazy log                 " Show plugin changelog
```

### Treesitter

```vim
:TSInstall <lang>         " Install parser
:TSUpdate                 " Update all parsers
:TSInstallInfo            " Show installed parsers
:TSModuleInfo             " Show module status
:InspectTree              " Show syntax tree
:Inspect                  " Show highlight groups under cursor
```

### Telescope

```vim
:Telescope                " Open Telescope
:Telescope find_files     " Find files
:Telescope live_grep      " Search in files
:Telescope help_tags      " Search help
:Telescope keymaps        " Search keybindings
:Telescope commands       " Search commands
:Telescope diagnostics    " Search diagnostics
```

## CLI Tools

### Required

| Tool | Purpose | Install |
|------|---------|---------|
| `git` | Plugin management | System package manager |
| `ripgrep` | Telescope grep | `brew install ripgrep` |
| `fd` | Telescope find | `brew install fd` |

### Optional

| Tool | Purpose | Install |
|------|---------|---------|
| `node` | Copilot, markdown-preview | `brew install node` |
| `python` | Python LSP, DAP | `brew install python` |
| `go` | Go LSP, DAP | `brew install go` |
| `lua-language-server` | Lua LSP | Via Mason |
| `stylua` | Lua formatter | Via Mason |

### Performance Tools

```bash
# Startup time analysis
nvim --startuptime /tmp/startup.log
cat /tmp/startup.log | sort -k2 -n -r | head -20

# Memory usage
nvim --cmd 'lua print(collectgarbage("count"))' --cmd 'q'

# Profile with verbose
nvim -V10/tmp/nvim.log
```

## Lua Utilities

### Debug Helpers

```lua
-- Print table contents
:lua print(vim.inspect(some_table))

-- Get current buffer info
:lua print(vim.inspect(vim.api.nvim_buf_get_name(0)))

-- List all keymaps
:lua print(vim.inspect(vim.api.nvim_get_keymap("n")))

-- Check loaded modules
:lua print(vim.inspect(package.loaded))

-- Reload module
:lua package.loaded["module.name"] = nil
:lua require("module.name")
```

### LSP Utilities

```lua
-- Get active clients
:lua print(vim.inspect(vim.lsp.get_active_clients()))

-- Get client capabilities
:lua print(vim.inspect(vim.lsp.get_active_clients()[1].server_capabilities))

-- Format document
:lua vim.lsp.buf.format({ async = true })

-- Get diagnostics
:lua print(vim.inspect(vim.diagnostic.get(0)))
```

### Treesitter Utilities

```lua
-- Get current node type
:lua print(vim.treesitter.get_node():type())

-- Get parser info
:lua print(vim.inspect(vim.treesitter.get_parser():lang()))

-- Query highlights
:lua print(vim.inspect(vim.treesitter.get_captures_at_cursor(0)))
```

## AI Integration

### ChatGPT.nvim Commands

```vim
:ChatGPT                  " Open ChatGPT
:ChatGPTActAs             " Act as a persona
:ChatGPTEditWithInstructions  " Edit with AI
:ChatGPTRun <action>      " Run specific action
```

Actions: `grammar_correction`, `translate`, `keywords`, `docstring`, `add_tests`, `optimize_code`, `summarize`, `fix_bugs`, `explain_code`, `roxygen_edit`, `code_readability_analysis`

### Copilot Commands

```vim
:Copilot enable           " Enable Copilot
:Copilot disable          " Disable Copilot
:Copilot status           " Check status
:Copilot panel            " Open suggestion panel
:Copilot setup            " Configure Copilot
```

### MCP Hub (mcphub.nvim)

```vim
:MCPHub                   " Open MCP Hub
```

Provides integration with Model Context Protocol servers.

## Claude Code Workflow Tips

### Working with This Configuration

When modifying this Neovim configuration with Claude Code:

1. **Plugin Changes:**
   ```
   Edit lua/plugins/specs/<category>.lua
   Then run :Lazy sync in Neovim
   ```

2. **Keymap Changes:**
   ```
   Edit lua/config/keymaps.lua
   Then source with :source % or restart
   ```

3. **LSP Changes:**
   ```
   Edit lua/plugins/specs/lsp.lua
   Then :LspRestart or restart Neovim
   ```

4. **Test Changes:**
   ```bash
   # Quick syntax check
   luacheck lua/

   # Full test
   nvim --headless -c "checkhealth" -c "q"
   ```

### Common Tasks

**Add a new plugin:**
```lua
-- In appropriate lua/plugins/specs/*.lua
{
  "author/plugin-name",
  event = "VeryLazy",
  opts = {},
}
```

**Add a keybinding:**
```lua
-- In lua/config/keymaps.lua M.setup()
vim.keymap.set('n', '<leader>xx', function()
  -- action
end, { desc = 'Description' })
```

**Add an LSP server:**
```lua
-- In mason-tool-installer ensure_installed
"server_name",

-- In servers config
server_name = { settings = {} },
```

**Add a formatter:**
```lua
-- In conform.nvim formatters_by_ft
filetype = { "formatter_name" },
```

### Validation Commands

```bash
# Check Lua syntax
luacheck lua/

# Validate config loads
nvim --headless -c "lua require('config.lazy')" -c "q"

# Run health checks
nvim --headless -c "checkhealth" -c "qa!" 2>&1

# Profile startup
nvim --startuptime /tmp/startup.log -c "q" && cat /tmp/startup.log
```

## External Tool Integration

### Git Integration

| Command | Description |
|---------|-------------|
| `:Git` | Full Git interface (fugitive) |
| `:Git blame` | Line-by-line blame |
| `:Git log` | Commit history |
| `:DiffviewOpen` | Visual diff viewer |
| `:DiffviewFileHistory` | File history |

### Database (vim-dadbod)

```vim
:DB <connection>          " Connect to database
:DBUI                     " Open database UI
```

### HTTP Client (rest.nvim)

```vim
:Rest run                 " Execute HTTP request under cursor
```

### Markdown Preview

```vim
:MarkdownPreview          " Open preview in browser
:MarkdownPreviewStop      " Stop preview
```

### Terminal (toggleterm)

```vim
:ToggleTerm               " Toggle terminal
:TermExec cmd="command"   " Execute command in terminal

" Keybinding: <C-\>
```

## File Management

### Neo-tree

```vim
:Neotree toggle           " Toggle file tree
:Neotree reveal           " Reveal current file
:Neotree float            " Floating file tree
:Neotree buffers          " Show buffers
:Neotree git_status       " Show git status
```

### Oil.nvim

```vim
:Oil                      " Open parent directory as buffer
```

### Harpoon

```vim
" Add file: <leader>a
" Toggle menu: <C-e>
" Navigate: <C-1> through <C-4>
```

## Search & Replace

### Telescope

```vim
:Telescope live_grep      " Search in files
:Telescope grep_string    " Search word under cursor
```

### Spectre

```vim
:Spectre                  " Open search/replace panel
```

### Grug-far

```vim
:GrugFar                  " Find and replace across files
```

## Quickfix & Location List

```vim
:copen                    " Open quickfix
:cclose                   " Close quickfix
:cnext                    " Next item
:cprev                    " Previous item
:cdo <cmd>                " Execute on each item

:lopen                    " Open location list
:lnext                    " Next location
:lprev                    " Previous location
```

### BQF (Better Quickfix)

Provides enhanced quickfix with preview, fzf integration, and more.
