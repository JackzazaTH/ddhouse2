// api/forms.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import { kv } from '@vercel/kv'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      // List latest 200 forms from KV index
      let ids: string[] = []
      try {
        const range = await kv.zrange<string[]>('forms:index', -200, -1)
        ids = (range || []).reverse()
      } catch {}
      const items: any[] = []
      for (const id of ids) {
        try {
          const item = await kv.hgetall<Record<string, any>>(`forms:${id}`)
          if (item) items.push(item)
        } catch {}
      }
      return res.status(200).json({ ok: true, data: items })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const id = cryptoRandomId()
      const data = { id, ...body }
      let persisted = false

      try {
        await kv.hset(`forms:${id}`, data as any)
        await kv.zadd('forms:index', { score: Date.now(), member: id })
        persisted = true
      } catch {}

      try {
        await put(`forms/${id}.json`, JSON.stringify(data, null, 2), { contentType: 'application/json' })
        persisted = true
      } catch {}

      return res.status(200).json({ ok: true, persisted, data })
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}

function cryptoRandomId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}
