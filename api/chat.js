export default async function handler(req, res) {
  // 1. Sirf POST allow karo
  if (req.method !== 'POST') {
    return res.status(405).json({ data: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  // 2. Check karo ki key mil rahi hai ya nahi
  if (!API_KEY) {
    return res.status(500).json({ data: "Server Error: Vercel mein Key nahi mili!" });
  }

  try {
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

    // 3. Agar Gemini ne koi error bheja ho
    if (data.error) {
      return res.status(500).json({ data: "Gemini Error: " + data.error.message });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ data: aiResponse });

  } catch (error) {
    return res.status(500).json({ data: "Network Error: AI connect nahi ho pa raha!" });
  }
}
