import { useState, useCallback } from 'react'

const cache = new Map()

export function useClaudeInsight() {
  const [loading, setLoading] = useState(false)
  const [insight, setInsight] = useState(null)
  const [error, setError] = useState(null)

  const fetchInsight = useCallback(async (teamName) => {
    if (!teamName) return
    const key = `analysis:${teamName}`

    if (cache.has(key)) {
      setInsight(cache.get(key))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const prompt =
        `Analyze ${teamName}'s FIFA World Cup 2026 chances in exactly 3 short bullet points. ` +
        `Format: "• [Strength]", "• [Weakness]", "• [Key Player to watch]". ` +
        `Be specific and concise. Max 20 words per bullet.`

      const res = await fetch('/api/v1/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      const content = data.content || 'No analysis available.'
      cache.set(key, content)
      setInsight(content)
    } catch {
      setError('Claude AI unavailable. Set ANTHROPIC_API_KEY on the backend.')
      setInsight(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { insight, loading, error, fetchInsight }
}
