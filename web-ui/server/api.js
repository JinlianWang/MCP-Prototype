const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const PORT = 4000;
const MCP_BASE_URL = "http://localhost:3000";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(bodyParser.json());
app.use(express.static("public"));

async function getToolsFromServer() {
  const response = await axios.get(`${MCP_BASE_URL}/tools`);
  return response.data;
}

async function callToolOnServer(toolName, args) {
  const response = await axios.post(`${MCP_BASE_URL}/tools/${toolName}`, args);
  return response.data;
}

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  const tools = await getToolsFromServer();
  const messages = [{ role: "user", content: prompt }];

  while (true) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      tools,
      tool_choice: "auto",
    });

    const msg = response.choices[0].message;

    if (msg.tool_calls && msg.tool_calls.length > 0) {
      messages.push({
        role: "assistant",
        tool_calls: msg.tool_calls.map(c => ({
          id: c.id,
          function: c.function,
          type: "function",
        })),
      });

      for (const call of msg.tool_calls) {
        const args = JSON.parse(call.function.arguments);
        const result = await callToolOnServer(call.function.name, args);
        messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result),
        });
      }
    } else {
      return res.json({ reply: msg.content });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Web UI server running at http://localhost:${PORT}`);
});
