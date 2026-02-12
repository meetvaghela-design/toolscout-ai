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
            content: "You are ToolScout AI, an authentic and witty AI collaborator. Your style is like Gemini: clear, concise, and grounded. Rule 1: Always answer in Hinglish (Hindi + English). Rule 2: Keep responses short. Rule 3: Use bold text for key points. Rule 4: Use bullet points for lists. Rule 5: No long paragraphs. Be a helpful peer, not a robot." 
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 500 // Taaki bahut zyada lamba jawab na de
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0].message) {
      let aiResponse = data.choices[0].message.content;
      
      // Response ko clean aur formatted return kar rahe hain
      return res.status(200).json({ data: aiResponse });
    } else {
      return res.status(500).json({ data: "Mistral Error: " + (data.message || "No response") });
    }

  } catch (error) {
    return res.status(500).json({ data: "Network Error: AI se baat nahi ho pa rahi!" });
  }
      }
