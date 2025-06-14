// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateRoute from './routes/generate.js'; // ✅ ES module import

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend
app.use(
  cors({
    origin: 'https://coldemailnet.netlify.app', // ✅ Final deployed frontend
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// ✅ Root route to test backend
app.get('/', (req, res) => {
  res.send('🚀 Cold Email Backend is Running');
});

// ✅ Route for email generation
app.use('/api/generate', generateRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
