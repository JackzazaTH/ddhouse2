// api/faq.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      try {
        const raw = await kv.get<string>('faq:items')
        const items = raw ? JSON.parse(raw) : []
        return res.status(200).json({ ok: true, data: items })
      } catch {}
      return res.status(200).json({ ok: true, data: [] })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      try {
        await kv.set('faq:items', JSON.stringify(body?.items || []))
      } catch {}
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
