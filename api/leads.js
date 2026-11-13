// api/leads.js
/* global process */
// Server-side proxy for the quote form. Holds the CRM URL and API key in
// Vercel env vars (CRM_API_URL, CRM_API_KEY) so the key never ships in the
// browser bundle.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const crmUrl = process.env.CRM_API_URL
  const crmKey = process.env.CRM_API_KEY
  if (!crmUrl || !crmKey) {
    console.error('CRM_API_URL or CRM_API_KEY is not set')
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  try {
    const upstream = await fetch(`${crmUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': crmKey,
      },
      body: JSON.stringify(body),
    })

    const text = await upstream.text()
    res.status(upstream.status)
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
    return res.send(text)
  } catch (error) {
    console.error('CRM request failed:', error)
    return res.status(502).json({ error: 'Upstream CRM unavailable' })
  }
}
