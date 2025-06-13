require('dotenv').config();
const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/generate', generateRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
