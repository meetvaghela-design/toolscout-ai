export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.MISTRAL_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ data: "Server Error: Mistral Key nahi mili!" });
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-tiny", // Ye free tier ke liye best aur fast hai
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content;
      return res.status(200).json({ data: aiResponse });
    } else {
      return res.status(500).json({ data: "Mistral Error: " + (data.message || "No response") });
    }

  } catch (error) {
    return res.status(500).json({ data: "Network Error: Mistral connect nahi ho raha!" });
  }
}
