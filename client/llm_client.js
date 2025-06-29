// llm_client.js
const axios = require("axios");
const { OpenAI } = require("openai");
require("dotenv").config();

const MCP_BASE_URL = "http://localhost:3000";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getToolsFromServer() {
  const response = await axios.get(`${MCP_BASE_URL}/tools`);
  return response.data;
}

async function callToolOnServer(toolName, args) {
  const response = await axios.post(`${MCP_BASE_URL}/tools/${toolName}`, args);
  return response.data;
}

async function agentLoop(prompt) {
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

    // 🔍 If GPT calls tools
    if (msg.tool_calls && msg.tool_calls.length > 0) {
      console.log("🔧 Tool calls:", msg.tool_calls.map(tc => tc.function.name));
      messages.push({
        role: "assistant",
        tool_calls: msg.tool_calls.map(c => ({
          id: c.id,
          function: c.function,
          type: "function",
        })),
      });

      for (const toolCall of msg.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments);
        const toolName = toolCall.function.name;

        const result = await callToolOnServer(toolName, args);

        console.log(`🛠️ Called ${toolName}(${JSON.stringify(args)}) →`, result);

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }
    } else {
      // ✅ Final natural reply
      if (msg.content) {
        console.log("\n💬 Final GPT Reply:\n", msg.content);
      } else {
        console.log("✅ No further response.");
      }
      break;
    }
  }
}

// 🔁 Run the agent
agentLoop("Say hello to Sunny and tell me the current time.");
