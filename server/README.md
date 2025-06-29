# 🛠️ MCP Server

This directory contains a basic MCP-compliant tool server using Express.

## 📄 Files

- `server.js` — Exposes the following endpoints:
  - `GET /tools` — returns tool list in OpenAI function format
  - `POST /tools/say_hello` — returns a greeting
  - `POST /tools/get_time` — returns the current time and timezone

## 🚀 How to Run

```bash
npm install
node server.js
```

## 🧰 Available Tools

| Tool        | Description                             |
|-------------|-----------------------------------------|
| `say_hello` | Greets a user by name                   |
| `get_time`  | Returns current server time + timezone  |
