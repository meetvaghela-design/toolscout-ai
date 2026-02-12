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
    // Is baar hum v1beta aur gemini-1.5-flash ka use kar rahe hain jo sabse stable hai
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
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
      // Agar model not found aaye, toh ye dusra model try karega
      return res.status(500).json({ data: "Gemini Error: " + data.error.message });
    }

    if (data.candidates && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ data: aiResponse });
    } else {
      return res.status(500).json({ data: "AI ne koi jawab nahi diya. Key ki limit check karein!" });
    }

  } catch (error) {
    return res.status(500).json({ data: "Network Error: Connection fail ho gaya!" });
  }
                   }
