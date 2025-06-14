import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post('/', async (req, res) => {
  const { jobUrl } = req.body;

  console.log("🟡 jobUrl received:", jobUrl);
  console.log("🟡 GROQ_API_KEY present:", !!GROQ_API_KEY);

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ API key not configured in server.' });
  }

  if (!jobUrl) {
    return res.status(400).json({ error: 'jobUrl is required' });
  }

  const prompt = `
You are a job application assistant. Given the job posting URL: ${jobUrl}, do two things:
1. Generate a professional cold email to apply for the job.
2. Extract and list the top 5 key skills required.

Respond ONLY in raw JSON format with NO extra text or explanation. Format strictly like this (keep email as a single-line string, use \\n for line breaks):

{
  "generatedEmail": "Your cold email here with \\n for line breaks",
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
}
`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiText = response.data.choices[0].message.content.trim();
    console.log("🟢 AI Response:", aiText);

    // Extract JSON from AI response string
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No JSON object found in AI response:\n', aiText);
      return res.status(500).json({ error: 'No valid JSON found in AI response.' });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError.message);
      console.error('AI Response:', aiText);
      return res.status(500).json({ error: 'Invalid JSON format in AI response.' });
    }

    // Respond with parsed JSON
    res.json(parsed);
  } catch (error) {
    console.error('❌ Groq API Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate email using Groq.' });
  }
});

export default router;
