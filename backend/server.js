import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateRoute from './routes/generate.js';

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(express.json());

// ✅ List allowed frontend origins here
const allowedOrigins = [
  'https://cold-emailn.netlify.app', // 🔁 Make sure this matches your actual Netlify domain
  'http://localhost:3000',           // ✅ Local dev support
];

// ✅ CORS middleware with origin validation
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman, curl, etc.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.error(`❌ CORS blocked for origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST'],
  credentials: true, // Enable cookies or headers with credentials
}));

// ✅ Basic route to test deployment
app.get('/', (req, res) => {
  res.send('🚀 Cold Email Backend is Running');
});

// ✅ Main API route
app.use('/api/generate', generateRoute);

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
