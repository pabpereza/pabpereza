# Debugging Reference

Complete guide for debugging with DAP (Debug Adapter Protocol) in this Neovim configuration.

## DAP Stack Overview

```
nvim-dap (Core DAP client)
├── nvim-dap-ui (UI panels)
├── nvim-dap-virtual-text (Inline variable values)
├── nvim-nio (Async IO for dap-ui)
└── Language-specific adapters
    ├── nvim-dap-python
    ├── nvim-dap-go
    └── mason-nvim-dap (Adapter installer)
```

## Keybindings

| Key | Action | Description |
|-----|--------|-------------|
| `<F5>` | Continue | Start/continue debugging |
| `<F10>` | Step Over | Execute current line |
| `<F11>` | Step Into | Step into function |
| `<F12>` | Step Out | Step out of function |
| `<leader>b` | Toggle Breakpoint | Set/remove breakpoint |
| `<leader>B` | Conditional Breakpoint | Breakpoint with condition |
| `<leader>lp` | Log Point | Set log point message |
| `<leader>dr` | REPL | Open DAP REPL |
| `<leader>dl` | Run Last | Repeat last debug session |
| `<leader>dh` | Hover | Show variable value |
| `<leader>dp` | Preview | Preview variable in popup |
| `<leader>df` | Frames | List stack frames |
| `<leader>ds` | Scopes | List variable scopes |

## DAP UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Scopes (Variables)  │  Breakpoints   │  Stacks  │  Watches  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      Source Code                            │
│                   (with virtual text)                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                         REPL                                │
│                       Console                               │
└─────────────────────────────────────────────────────────────┘
```

## Python Debugging

### Prerequisites

```bash
# Install debugpy via Mason
:Mason
# Search for "debugpy" and install

# Or via pip
pip install debugpy
```

### Configuration

```lua
-- lua/plugins/specs/debug.lua
{
  "mfussenegger/nvim-dap-python",
  ft = "python",
  dependencies = { "mfussenegger/nvim-dap" },
  config = function()
    require("dap-python").setup("python")
  end,
}
```

### Debug Configurations

```lua
-- Automatically provided by dap-python:
-- 1. Launch file
-- 2. Launch file with arguments
-- 3. Attach remote
-- 4. Run doctests in file

-- Add custom configuration:
require("dap").configurations.python = {
  {
    type = "python",
    request = "launch",
    name = "Django",
    program = "${workspaceFolder}/manage.py",
    args = { "runserver", "--noreload" },
    django = true,
  },
  {
    type = "python",
    request = "launch",
    name = "Flask",
    module = "flask",
    args = { "run", "--no-debugger" },
    env = { FLASK_APP = "app.py" },
  },
}
```

### Usage

1. Open Python file
2. Set breakpoints with `<leader>b`
3. Press `<F5>` to start debugging
4. Select configuration from menu

## Go Debugging

### Prerequisites

```bash
# Install delve via Mason
:Mason
# Search for "delve" and install

# Or via go
go install github.com/go-delve/delve/cmd/dlv@latest
```

### Configuration

```lua
-- lua/plugins/specs/debug.lua
{
  "leoluz/nvim-dap-go",
  ft = "go",
  dependencies = { "mfussenegger/nvim-dap" },
  opts = {
    dap_configurations = {
      {
        type = "go",
        name = "Attach remote",
        mode = "remote",
        request = "attach",
      },
    },
    delve = {
      build_flags = "",
    },
  },
}
```

### Debug Configurations

```lua
-- Automatically provided:
-- 1. Debug (compile and run)
-- 2. Debug test (current file)
-- 3. Debug test (current function)

-- Add custom:
require("dap").configurations.go = {
  {
    type = "go",
    name = "Debug Package",
    request = "launch",
    program = "${fileDirname}",
  },
  {
    type = "go",
    name = "Debug with Args",
    request = "launch",
    program = "${file}",
    args = function()
      return vim.split(vim.fn.input("Args: "), " ")
    end,
  },
}
```

## JavaScript/TypeScript Debugging

### Prerequisites

```bash
# Install js-debug-adapter via Mason
:Mason
# Search for "js-debug-adapter"
```

### Configuration

```lua
require("dap").adapters["pwa-node"] = {
  type = "server",
  host = "localhost",
  port = "${port}",
  executable = {
    command = "node",
    args = {
      require("mason-registry").get_package("js-debug-adapter"):get_install_path()
        .. "/js-debug/src/dapDebugServer.js",
      "${port}",
    },
  },
}

require("dap").configurations.javascript = {
  {
    type = "pwa-node",
    request = "launch",
    name = "Launch file",
    program = "${file}",
    cwd = "${workspaceFolder}",
  },
  {
    type = "pwa-node",
    request = "attach",
    name = "Attach",
    processId = require("dap.utils").pick_process,
    cwd = "${workspaceFolder}",
  },
}

require("dap").configurations.typescript = require("dap").configurations.javascript
```

## Adding Custom Debug Adapters

### Step 1: Define Adapter

```lua
local dap = require("dap")

dap.adapters.my_adapter = {
  type = "executable",  -- or "server"
  command = "/path/to/adapter",
  args = { "--port", "${port}" },
}

-- For server adapters:
dap.adapters.my_server_adapter = {
  type = "server",
  host = "127.0.0.1",
  port = "${port}",
  executable = {
    command = "/path/to/adapter",
    args = { "${port}" },
  },
}
```

### Step 2: Define Configurations

```lua
dap.configurations.my_filetype = {
  {
    type = "my_adapter",
    request = "launch",  -- or "attach"
    name = "Launch Program",
    program = "${file}",
    cwd = "${workspaceFolder}",
    args = {},
    env = {},
    stopOnEntry = false,
  },
}
```

### Step 3: Set Filetype

```lua
-- In ftplugin/my_filetype.lua or via autocmd
vim.api.nvim_create_autocmd("FileType", {
  pattern = "my_filetype",
  callback = function()
    -- Filetype-specific debug config
  end,
})
```

## DAP UI Configuration

```lua
{
  "rcarriga/nvim-dap-ui",
  dependencies = { "mfussenegger/nvim-dap", "nvim-neotest/nvim-nio" },
  opts = {
    icons = { expanded = "▾", collapsed = "▸", current_frame = "→" },
    mappings = {
      expand = { "<CR>", "<2-LeftMouse>" },
      open = "o",
      remove = "d",
      edit = "e",
      repl = "r",
      toggle = "t",
    },
    layouts = {
      {
        elements = {
          { id = "scopes", size = 0.25 },
          { id = "breakpoints", size = 0.25 },
          { id = "stacks", size = 0.25 },
          { id = "watches", size = 0.25 },
        },
        position = "left",
        size = 40,
      },
      {
        elements = {
          { id = "repl", size = 0.5 },
          { id = "console", size = 0.5 },
        },
        position = "bottom",
        size = 10,
      },
    },
    floating = {
      border = "rounded",
      mappings = { close = { "q", "<Esc>" } },
    },
  },
  config = function(_, opts)
    local dap, dapui = require("dap"), require("dapui")
    dapui.setup(opts)

    -- Auto open/close UI
    dap.listeners.after.event_initialized["dapui_config"] = function()
      dapui.open()
    end
    dap.listeners.before.event_terminated["dapui_config"] = function()
      dapui.close()
    end
    dap.listeners.before.event_exited["dapui_config"] = function()
      dapui.close()
    end
  end,
}
```

## Virtual Text Configuration

```lua
{
  "theHamsta/nvim-dap-virtual-text",
  opts = {
    enabled = true,
    enabled_commands = true,
    highlight_changed_variables = true,
    highlight_new_as_changed = false,
    show_stop_reason = true,
    commented = false,
    virt_text_pos = "eol",  -- or "inline"
    all_frames = false,
    virt_lines = false,
    virt_text_win_col = nil,
  },
}
```

## Breakpoints

### Types of Breakpoints

```lua
local dap = require("dap")

-- Regular breakpoint
dap.toggle_breakpoint()

-- Conditional breakpoint
dap.set_breakpoint(vim.fn.input("Condition: "))

-- Log point (prints message without stopping)
dap.set_breakpoint(nil, nil, vim.fn.input("Log message: "))

-- Hit count breakpoint
dap.set_breakpoint(nil, vim.fn.input("Hit count: "))
```

### Breakpoint Signs

```lua
vim.fn.sign_define("DapBreakpoint", {
  text = "●",
  texthl = "DapBreakpoint",
  linehl = "",
  numhl = "",
})
vim.fn.sign_define("DapBreakpointCondition", {
  text = "◆",
  texthl = "DapBreakpointCondition",
})
vim.fn.sign_define("DapLogPoint", {
  text = "◆",
  texthl = "DapLogPoint",
})
vim.fn.sign_define("DapStopped", {
  text = "→",
  texthl = "DapStopped",
  linehl = "DapStoppedLine",
})
```

## REPL Commands

Inside the DAP REPL:

| Command | Description |
|---------|-------------|
| `.exit` | Close REPL |
| `.c` | Continue |
| `.n` | Step over |
| `.s` | Step into |
| `.o` | Step out |
| `.up` | Go up stack frame |
| `.down` | Go down stack frame |
| `.scopes` | Print scopes |
| `.threads` | Print threads |
| `.frames` | Print frames |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Adapter not found | Check Mason installation, verify path |
| Breakpoint not hit | Ensure source maps, check file paths |
| UI not opening | Check dap listeners are configured |
| Variables not showing | Ensure stopped at breakpoint, check scopes |
| Can't attach | Verify process is running with debug flag |

### Debug Logging

```lua
-- Enable DAP logging
require("dap").set_log_level("TRACE")

-- View log
:lua print(vim.fn.stdpath("cache") .. "/dap.log")
```

### Check DAP Status

```lua
-- Show current session info
:lua print(vim.inspect(require("dap").session()))

-- List breakpoints
:lua print(vim.inspect(require("dap.breakpoints").get()))
```
