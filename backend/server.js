// ✅ server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("✅ Cold Email Backend is Running!");
});

// ✅ Your API Route (example)
app.post("/generate", (req, res) => {
  const { jobUrl } = req.body;

  if (!jobUrl) {
    return res.status(400).json({ error: "jobUrl is required" });
  }

  // Example dummy response (you can connect with OpenAI or other logic)
  res.json({
    success: true,
    email: `Generated cold email for job at ${jobUrl}`,
  });
});

// ✅ PORT Binding (for Render & Local)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
