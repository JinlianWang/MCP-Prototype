# 🌐 Web UI Agent

This is a browser-based interface for the MCP agent using plain HTML, JavaScript, and Node.js.

## 📁 Structure

```
web-ui/
├── public/
│   ├── index.html
│   └── style.css
├── server/
│   └── api.js
├── .env
└── package.json
```

## 🚀 How to Run

1. Install dependencies:

```bash
npm install
```

2. Add your OpenAI API key to `.env`:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Start the server:

```bash
node server/api.js
```

4. Open your browser at:

```
http://localhost:4000
```

## 🧠 How It Works

- Loads tools from the MCP server
- Sends prompt to GPT-4
- Lets GPT choose and invoke tools
- Displays the final reply in the browser
