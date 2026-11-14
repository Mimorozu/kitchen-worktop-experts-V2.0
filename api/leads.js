// api/leads.js
/* global process */
// Server-side proxy for the quote form. Holds the CRM URL and API key in
// Vercel env vars (CRM_API_URL, CRM_API_KEY) so the key never ships in the
// browser bundle. Validates input and rate limits per IP before forwarding.

const MAX_REQUESTS_PER_MINUTE = 10
const WINDOW_MS = 60_000
const MAX_BODY_CHARS = 2_000

const MATERIALS = ['quartz', 'granite', 'marble', 'porcelain', 'unsure']
const SIZES = ['small', 'medium', 'large']

// Per-instance in-memory counter. Serverless instances don't share memory, so
// this limits bursts per instance; Vercel Firewall rate limiting is the
// stronger control across instances.
const hits = new Map()

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

// Returns true if the IP is over the limit for the current window.
function isRateLimited(ip, now = Date.now()) {
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > MAX_REQUESTS_PER_MINUTE
}

const clean = (value) => (typeof value === 'string' ? value.trim() : '')

// Returns { errors, data }. Only the whitelisted fields are kept.
function validateLead(body) {
  const errors = []
  const name = clean(body.name)
  const email = clean(body.email)
  const postcode = clean(body.postcode).toUpperCase()
  const phone = clean(body.phone)
  const material = clean(body.material).toLowerCase()
  const size = clean(body.size).toLowerCase()

  if (name.length < 2 || name.length > 100) errors.push('name must be 2-100 characters')
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email is not valid')
  if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/.test(postcode)) errors.push('postcode is not valid')
  if (!/^\+?[0-9\s()-]{7,20}$/.test(phone)) errors.push('phone is not valid')
  if (!MATERIALS.includes(material)) errors.push('material is not valid')
  if (!SIZES.includes(size)) errors.push('size is not valid')

  return {
    errors,
    data: { name, email, postcode, phone, material, size, source: 'Website' },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (isRateLimited(clientIp(req))) {
    res.setHeader('Retry-After', '60')
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' })
  }

  const crmUrl = process.env.CRM_API_URL
  const crmKey = process.env.CRM_API_KEY
  if (!crmUrl || !crmKey) {
    console.error('CRM_API_URL or CRM_API_KEY is not set')
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    if (body.length > MAX_BODY_CHARS) return res.status(413).json({ error: 'Request too large' })
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' })
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Expected a JSON object' })
  }

  const { errors, data } = validateLead(body)
  if (errors.length) {
    return res.status(400).json({ error: 'Invalid lead', details: errors })
  }

  try {
    const upstream = await fetch(`${crmUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': crmKey,
      },
      body: JSON.stringify(data),
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
