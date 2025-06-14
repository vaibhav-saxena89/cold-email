import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateRoute from './routes/generate.js';

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

// Allow these origins for CORS:
const allowedOrigins = [
  'https://coldemailnet.netlify.app', // Your deployed frontend
  'http://localhost:3000',             // Your local frontend (for dev/testing)
];

// CORS middleware with dynamic origin check
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true, // Enable cookies/auth headers if needed
}));

// Root test route
app.get('/', (req, res) => {
  res.send('🚀 Cold Email Backend is Running');
});

// Your email generation route
app.use('/api/generate', generateRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
