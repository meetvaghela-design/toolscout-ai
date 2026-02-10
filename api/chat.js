export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY; // Ye hum Vercel mein set karenge

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    return res.status(200).json({ data: aiResponse });
  } catch (error) {
    return res.status(500).json({ error: 'AI connect nahi ho pa raha h' });
  }
}
