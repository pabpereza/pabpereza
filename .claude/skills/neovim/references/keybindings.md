# Keybindings Reference

Complete reference for all keybindings in this Neovim configuration.

## Leader Key

| Key | Function |
|-----|----------|
| `<Space>` | Leader key |
| `\` | Local leader |

## Navigation

### Window Navigation

| Key | Action | Mode |
|-----|--------|------|
| `<C-h>` | Move to left window | Normal |
| `<C-j>` | Move to lower window | Normal |
| `<C-k>` | Move to upper window | Normal |
| `<C-l>` | Move to right window | Normal |

### Buffer Navigation

| Key | Action | Mode |
|-----|--------|------|
| `<S-h>` | Previous buffer | Normal |
| `<S-l>` | Next buffer | Normal |
| `<leader>bd` | Delete buffer | Normal |
| `<leader>ba` | Delete all buffers except current | Normal |

### Harpoon (Quick Files)

| Key | Action | Mode |
|-----|--------|------|
| `<leader>a` | Add file to harpoon | Normal |
| `<C-e>` | Toggle harpoon menu | Normal |
| `<C-1>` - `<C-4>` | Navigate to file 1-4 | Normal |

### Jumps

| Key | Action | Mode |
|-----|--------|------|
| `<C-d>` | Scroll down (centered) | Normal |
| `<C-u>` | Scroll up (centered) | Normal |
| `n` | Next search result (centered) | Normal |
| `N` | Previous search result (centered) | Normal |
| `[d` | Previous diagnostic | Normal |
| `]d` | Next diagnostic | Normal |
| `[c` | Previous git change | Normal |
| `]c` | Next git change | Normal |

## Search (Telescope)

| Key | Action | Mode |
|-----|--------|------|
| `<leader>sf` | Search files | Normal |
| `<leader>sg` | Search by grep | Normal |
| `<leader>sw` | Search current word | Normal |
| `<leader>sh` | Search help tags | Normal |
| `<leader>sk` | Search keymaps | Normal |
| `<leader>sd` | Search diagnostics | Normal |
| `<leader>sr` | Resume last search | Normal |
| `<leader>ss` | Search Telescope builtins | Normal |
| `<leader>sn` | Search Neovim config files | Normal |
| `<leader><space>` | Search buffers | Normal |
| `<leader>/` | Fuzzy search in buffer | Normal |
| `<leader>?` | Search recent files | Normal |
| `<leader>gf` | Search git files | Normal |

## LSP

### Navigation

| Key | Action | Mode |
|-----|--------|------|
| `gd` | Go to definition | Normal |
| `gr` | Go to references | Normal |
| `gI` | Go to implementation | Normal |
| `gD` | Go to declaration | Normal |
| `<leader>D` | Type definition | Normal |
| `<leader>ds` | Document symbols | Normal |
| `<leader>ws` | Workspace symbols | Normal |

### Actions

| Key | Action | Mode |
|-----|--------|------|
| `K` | Hover documentation | Normal |
| `<C-k>` | Signature help | Insert |
| `<leader>rn` | Rename symbol | Normal |
| `<leader>ca` | Code action | Normal, Visual |
| `<leader>cf` | Format buffer | Normal |

## Git

### Gitsigns

| Key | Action | Mode |
|-----|--------|------|
| `<leader>hs` | Stage hunk | Normal |
| `<leader>hr` | Reset hunk | Normal |
| `<leader>hS` | Stage buffer | Normal |
| `<leader>hR` | Reset buffer | Normal |
| `<leader>hu` | Undo stage hunk | Normal |
| `<leader>hp` | Preview hunk | Normal |
| `<leader>hb` | Blame line | Normal |
| `<leader>hd` | Diff against index | Normal |
| `<leader>hD` | Diff against last commit | Normal |
| `<leader>tb` | Toggle line blame | Normal |
| `<leader>td` | Toggle deleted | Normal |

### Text Objects (Git)

| Key | Action | Mode |
|-----|--------|------|
| `ih` | Inner hunk | Operator-pending, Visual |
| `ah` | Around hunk | Operator-pending, Visual |

### Fugitive

| Key | Action | Mode |
|-----|--------|------|
| `:Git` | Git status | Command |
| `:Gdiffsplit` | Diff current file | Command |
| `:Gread` | Checkout file | Command |
| `:Gwrite` | Stage file | Command |

## Editing

### Basic

| Key | Action | Mode |
|-----|--------|------|
| `<Esc>` | Clear search highlights | Normal |
| `jk` | Exit insert mode | Insert |
| `<C-s>` | Save file | Normal, Insert |
| `<leader>q` | Quit | Normal |
| `<leader>Q` | Force quit | Normal |
| `<leader>wa` | Save all | Normal |

### Text Manipulation

| Key | Action | Mode |
|-----|--------|------|
| `J` | Move selection down | Visual |
| `K` | Move selection up | Visual |
| `<` | Indent left (keep selection) | Visual |
| `>` | Indent right (keep selection) | Visual |

### Clipboard

| Key | Action | Mode |
|-----|--------|------|
| `<leader>y` | Yank to system clipboard | Normal, Visual |
| `<leader>Y` | Yank line to clipboard | Normal |
| `<leader>d` | Delete to void register | Normal, Visual |
| `<leader>p` | Paste without yanking | Visual |
| `<C-c>` | Copy to clipboard | Visual |
| `<C-v>` | Paste from clipboard | Normal, Insert |

### Commenting

| Key | Action | Mode |
|-----|--------|------|
| `gcc` | Toggle line comment | Normal |
| `gbc` | Toggle block comment | Normal |
| `gc` | Comment motion | Normal, Visual |
| `gb` | Block comment motion | Normal, Visual |
| `gco` | Add comment below | Normal |
| `gcO` | Add comment above | Normal |
| `gcA` | Add comment at end of line | Normal |

### Surround (mini.surround)

| Key | Action | Mode |
|-----|--------|------|
| `sa` | Add surrounding | Normal, Visual |
| `sd` | Delete surrounding | Normal |
| `sr` | Replace surrounding | Normal |

## File Explorer (Neo-tree)

| Key | Action | Mode |
|-----|--------|------|
| `\` or `\\` | Toggle Neo-tree | Normal |
| `<leader>e` | Focus Neo-tree | Normal |

### Inside Neo-tree

| Key | Action |
|-----|--------|
| `?` | Show help |
| `<CR>` | Open file/folder |
| `s` | Open in horizontal split |
| `v` | Open in vertical split |
| `t` | Open in new tab |
| `a` | Add file/folder |
| `d` | Delete |
| `r` | Rename |
| `y` | Copy path |
| `x` | Cut |
| `p` | Paste |
| `c` | Copy |
| `R` | Refresh |
| `H` | Toggle hidden files |

## Completion (blink.cmp with super-tab preset)

Using `super-tab` preset - Tab/S-Tab for menu navigation and snippet jumping.

| Key | Action | Mode |
|-----|--------|------|
| `<Tab>` | Next item / Jump to next snippet placeholder | Insert, Select |
| `<S-Tab>` | Previous item / Jump to previous snippet placeholder | Insert, Select |
| `<CR>` | Confirm selection | Insert |
| `<C-Space>` | Show/toggle completion menu | Insert |
| `<C-e>` | Close completion | Insert |
| `<C-b>` | Scroll docs up | Insert |
| `<C-f>` | Scroll docs down | Insert |

**Note:** When no completion menu is visible, Tab inserts a normal tab character.

## Debugging (DAP)

| Key | Action | Mode |
|-----|--------|------|
| `<F5>` | Continue/Start | Normal |
| `<F10>` | Step over | Normal |
| `<F11>` | Step into | Normal |
| `<F12>` | Step out | Normal |
| `<leader>b` | Toggle breakpoint | Normal |
| `<leader>B` | Conditional breakpoint | Normal |
| `<leader>lp` | Log point | Normal |
| `<leader>dr` | Open REPL | Normal |
| `<leader>dl` | Run last | Normal |
| `<leader>dh` | Hover variables | Normal |

## Terminal

| Key | Action | Mode |
|-----|--------|------|
| `<C-\>` | Toggle terminal | Normal |
| `<Esc><Esc>` | Exit terminal mode | Terminal |
| `<C-h/j/k/l>` | Navigate from terminal | Terminal |

## Testing (Neotest)

| Key | Action | Mode |
|-----|--------|------|
| `<leader>tt` | Run nearest test | Normal |
| `<leader>tT` | Run all tests in file | Normal |
| `<leader>tr` | Run test suite | Normal |
| `<leader>tl` | Run last test | Normal |
| `<leader>ts` | Toggle test summary | Normal |
| `<leader>to` | Show test output | Normal |

## Flash (Motion)

| Key | Action | Mode |
|-----|--------|------|
| `s` | Flash jump | Normal |
| `S` | Flash treesitter | Normal |
| `r` | Remote flash | Operator-pending |

## Treesitter

| Key | Action | Mode |
|-----|--------|------|
| `<C-space>` | Increment selection | Normal |
| `<BS>` | Decrement selection | Visual |

### Text Objects

| Key | Action | Mode |
|-----|--------|------|
| `af` | Around function | Operator-pending, Visual |
| `if` | Inner function | Operator-pending, Visual |
| `ac` | Around class | Operator-pending, Visual |
| `ic` | Inner class | Operator-pending, Visual |
| `]f` | Next function start | Normal |
| `[f` | Previous function start | Normal |
| `]c` | Next class start | Normal |
| `[c` | Previous class start | Normal |

## Adding Custom Keybindings

### In config/keymaps.lua

```lua
-- Inside M.setup()
vim.keymap.set('n', '<leader>xx', function()
  -- Your action here
end, { desc = 'Description for which-key' })
```

### In Plugin Spec

```lua
{
  "plugin/name",
  keys = {
    { "<leader>xx", "<cmd>Command<CR>", desc = "Description" },
    { "<leader>xy", function() ... end, desc = "Lua function" },
  },
}
```

### Buffer-Local Keybindings

```lua
vim.api.nvim_create_autocmd("FileType", {
  pattern = "markdown",
  callback = function()
    vim.keymap.set('n', '<leader>mp', '<cmd>MarkdownPreview<CR>', {
      buffer = true,
      desc = "Markdown Preview",
    })
  end,
})
```

## Discovering Keybindings

| Command | Description |
|---------|-------------|
| `<leader>sk` | Search keymaps with Telescope |
| `:map` | List all mappings |
| `:nmap <leader>` | List leader mappings |
| `:verbose map <key>` | Show where mapping is defined |
| Press `<leader>` and wait | Which-key popup |
