# 🧠 Hello World MCP Agent (Node.js)

This is a multi-part Node.js project that demonstrates a fully MCP-compliant agent with both CLI and Web UI interfaces.

## 📁 Project Structure

```
.
├── client/             # CLI-based LLM agent
│   └── README.md
├── server/             # MCP tool server
│   └── README.md
├── web-ui/             # Web-based agent interface
│   └── README.md
└── README.md           # (this file)
```

## 🚀 Getting Started

Each component has its own README with setup instructions:

- **[MCP Server](server/README.md)** – exposes tools like `say_hello` and `get_time`
- **[LLM Client](client/README.md)** – CLI agent that orchestrates tool use with GPT-4
- **[Web UI](web-ui/README.md)** – Browser interface to interact with the agent

## 🧠 What is MCP?

MCP (Multi-Tool Calling Protocol) is a pattern where an LLM agent can:
- Dynamically discover available tools (`GET /tools`)
- Select the correct tools based on user prompts
- Call one or more tools in sequence (`POST /tools/<tool>`)
- Synthesize a final reply using all tool outputs
