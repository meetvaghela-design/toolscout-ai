export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ data: "Server Error: Vercel mein Key nahi mili!" });
  }

  try {
    // URL ko v1beta se v1 kar diya aur model name update kiya
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ data: "Gemini Error: " + data.error.message });
    }

    // Response nikaalne ka tarika
    if (data.candidates && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ data: aiResponse });
    } else {
      return res.status(500).json({ data: "AI ne koi jawab nahi diya!" });
    }

  } catch (error) {
    return res.status(500).json({ data: "Network Error: Please try again!" });
  }
        }
