/**
 * Vercel Serverless Function — Proxy to Mistral AI
 * Keeps the API key server-side (never exposed to the browser)
 * 
 * Environment variable required: MISTRAL_API_KEY (set in Vercel dashboard)
 */

const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'MISTRAL_API_KEY not configured on server' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid "messages" array' });
  }

  try {
    const response = await fetch(MISTRAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errData?.message || response.statusText,
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Je n'ai pas pu répondre. Veuillez réessayer.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Mistral API error:', err);
    return res.status(500).json({ error: 'Erreur de connexion au serveur IA' });
  }
}
