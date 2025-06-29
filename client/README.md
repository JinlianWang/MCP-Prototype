# 🤖 LLM Client Agent (CLI)

This directory contains a command-line version of the MCP agent that uses OpenAI GPT-4 and dynamically invokes tools from a local MCP server.

## 📄 Files

- `llm_client.js` — CLI agent that:
  - Fetches tool schema from the MCP server
  - Sends prompt to GPT-4 with tool metadata
  - Calls tools as directed by GPT
  - Synthesizes the final response

## 🚀 How to Run

1. Install dependencies:

```bash
npm install
```

2. Add your OpenAI API key to `.env`:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Run the client:

```bash
node llm_client.js
```

## 🧪 Example Prompt

```text
Say hello to Sunny and tell me the current time.
```
