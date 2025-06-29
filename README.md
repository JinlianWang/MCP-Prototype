# 🧠 Hello World MCP Agent (Node.js)

This project demonstrates a minimal, fully MCP-compliant agent setup using Node.js, OpenAI GPT-4, and a tool server. The agent can dynamically discover tools, route prompts to the correct tool(s), and orchestrate multiple tool calls in sequence.

## 📁 Project Structure

```
.
├── client/             # LLM client agent
│   ├── llm_client.js
│   ├── .env
│   └── package.json
├── server/             # MCP server exposing tools
│   ├── server.js
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. 📦 Install Dependencies

In each folder (`client/` and `server/`), run:

```bash
npm install
```

---

### 2. 🔐 Setup OpenAI API Key (Client Only)

In `client/`, create a `.env` file:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

You can create an API key at [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

---

### 3. 🖥️ Start the MCP Server

In `server/`:

```bash
node server.js
```

This starts the MCP tool server on `http://localhost:3000`, with:

- `GET /tools` — tool discovery endpoint
- `POST /tools/say_hello` — returns a greeting
- `POST /tools/get_time` — returns current server time and timezone

---

### 4. 🤖 Run the LLM Agent Client

In a second terminal, from `client/`:

```bash
node llm_client.js
```

This script:
- Loads tools from the MCP server
- Sends a prompt to GPT-4
- Lets the LLM decide which tools to call
- Routes tool calls to the server
- Sends tool outputs back to GPT for final summarization

---

## 🧪 Example Prompt

```txt
Say hello to Sunny and tell me the current time.
```

Expected output:

```
🔧 Tool calls: [ 'say_hello', 'get_time' ]
🛠️ Called say_hello({"name":"Sunny"}) → { message: 'Hello, Sunny!' }
🛠️ Called get_time({}) → { time: '...', timezone: '...' }

💬 Final GPT Reply:
Hello, Sunny! The current time is 12:34 PM in America/New_York.
```

---

## 🧠 Tools Defined in This MCP Server

| Tool        | Description                             | Endpoint                |
|-------------|-----------------------------------------|-------------------------|
| `say_hello` | Returns a greeting for a given name     | `POST /tools/say_hello` |
| `get_time`  | Returns current server time + timezone  | `POST /tools/get_time`  |

All tools are returned via `GET /tools` using OpenAI-compatible schema.

---

## 🛠️ Future Improvements (Optional Ideas)

- Format timestamps into friendly local time
- Add more tools like `fetch_url`, `summarize`, etc.
- Store conversations in a database

## 🌐 Web UI Agent

This is a browser-based interface to interact with the MCP agent using plain HTML, JavaScript, and a Node.js backend.

### 📁 Folder Structure

```
web-ui/
├── public/
│   ├── index.html       # Minimal frontend
│   └── style.css        # Optional basic styling
├── server/
│   └── api.js           # Node.js backend (CommonJS-style)
├── .env                 # OpenAI API key
├── package.json
└── README.md
```

### 🚀 Setup & Run

1. Navigate into `web-ui/`:

```bash
cd web-ui
```

2. Install dependencies:

```bash
npm install
```

3. Add your OpenAI key to `.env`:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

4. Start the server:

```bash
node server/api.js
```

5. Open your browser and go to:

```
http://localhost:4000
```

### 🧪 How It Works

- Enter a prompt like:
  > Say hello to Sunny and tell me the current time.

- The backend will:
  - Load tools from the MCP server
  - Let the LLM decide which to call
  - Call tools as needed
  - Return the GPT-synthesized reply

---

## 📜 License

MIT License — use freely, modify responsibly.
