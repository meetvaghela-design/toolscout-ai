export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.MISTRAL_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ data: "Server Error: Mistral Key missing!" });
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          { 
            role: "system", 
            content: "You are ToolScout AI. Answer in Hinglish. Rule 1: Keep it short. Rule 2: Use bold for key points. Rule 3: Always add TWO empty lines (double space) between every point or sentence. Rule 4: Every new point must start on a new line with a bullet. Be a friendly and helpful peer." 
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0].message) {
      return res.status(200).json({ data: data.choices[0].message.content });
    } else {
      return res.status(500).json({ data: "Mistral Error: " + (data.message || "No response") });
    }

  } catch (error) {
    return res.status(500).json({ data: "Network Error: AI connect nahi ho raha!" });
  }
}
