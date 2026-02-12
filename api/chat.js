export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    // Ye Google ka sabse naya aur stable endpoint hai
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

    // Agar error aata hai toh hum model badal kar try karenge (Auto-Fallback)
    if (data.error) {
       // Agar flash nahi mil raha, toh purana pro try karte hain
       const retryResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
       });
       const retryData = await retryResponse.json();
       
       if (retryData.candidates) {
         return res.status(200).json({ data: retryData.candidates[0].content.parts[0].text });
       }
       return res.status(500).json({ data: "Gemini Error: " + (data.error.message || "Model not responding") });
    }

    if (data.candidates && data.candidates[0].content) {
      return res.status(200).json({ data: data.candidates[0].content.parts[0].text });
    }
    
    return res.status(500).json({ data: "Bhai, AI ne khali jawab bheja h!" });

  } catch (error) {
    return res.status(500).json({ data: "Network Error: Connection fail!" });
  }
                                      }
