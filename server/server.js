// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Tool 1: say_hello
app.post('/tools/say_hello', (req, res) => {
  const name = req.body.name || 'World';
  res.json({ message: `Hello, ${name}!` });
});

// Tool 2: get_time
app.post('/tools/get_time', (req, res) => {
  const now = new Date();
  res.json({
    time: now.toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
});

// MCP Tool List
app.get('/tools', (req, res) => {
  res.json([
    {
      type: "function",
      function: {
        name: "say_hello",
        description: "Says hello to a given person",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "get_time",
        description: "Returns the current server time using a real-time clock. Use this instead of estimating the time.",
        parameters: {
          type: "object",
          properties: {},
        },
        required: [],
      }
    }
  ]);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ MCP server running at http://localhost:${PORT}`);
});
