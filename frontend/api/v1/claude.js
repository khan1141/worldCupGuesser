import Anthropic from '@anthropic-ai/sdk'

// Vercel serverless function — replaces the old Spring Boot /api/v1/claude proxy.
// Reads ANTHROPIC_API_KEY from the environment (set it in the Vercel dashboard).
const client = new Anthropic()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { prompt } = req.body || {}
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing "prompt" in request body' })
    return
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')

    res.status(200).json({ content })
  } catch (err) {
    console.error('Claude API error:', err)
    res.status(500).json({ error: 'Claude AI request failed' })
  }
}
