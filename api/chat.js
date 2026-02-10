export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.OPENAI_API_KEY; // Ab hum ye wali key Vercel mein daalenge

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Ya tum "gpt-4" bhi likh sakte ho agar access hai
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.error) {
       return res.status(500).json({ error: data.error.message });
    }

    const aiResponse = data.choices[0].message.content;
    return res.status(200).json({ data: aiResponse });
  } catch (error) {
    return res.status(500).json({ error: 'OpenAI connect nahi ho pa raha h' });
  }
}
