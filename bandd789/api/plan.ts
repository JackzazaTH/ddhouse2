// api/plan.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!body?.id) return res.status(400).json({ ok: false, error: 'Missing id' })
      try {
        await kv.hset(`plans:${body.id}`, body as any)
        await kv.zadd('plans:index', { score: Date.now(), member: body.id })
      } catch {}
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!body?.id) return res.status(400).json({ ok: false, error: 'Missing id' })
      try {
        await kv.del(`plans:${body.id}`)
        await kv.zrem('plans:index', body.id)
      } catch {}
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
