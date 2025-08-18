// api/plans.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { kv } from '@vercel/kv'

const sample = [
  { id: 'P-101', name: 'BANDD M1', style: 'Modern', bedrooms: 3, bathrooms: 3, areaSqm: 180, priceTHB: 3290000, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1730&auto=format&fit=crop', tags: ['ครอบครัว', 'ระเบียง']},
  { id: 'P-102', name: 'BANDD C1', style: 'Classic', bedrooms: 4, bathrooms: 3, areaSqm: 240, priceTHB: 4590000, image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1730&auto=format&fit=crop', tags: ['หรูหรา', 'เพดานสูง']},
  { id: 'P-103', name: 'BANDD X-Min', style: 'Minimal', bedrooms: 2, bathrooms: 2, areaSqm: 120, priceTHB: 2190000, image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1730&auto=format&fit=crop', tags: ['มินิมอล', 'ประหยัดพลังงาน']},
  { id: 'P-104', name: 'BANDD LX', style: 'Luxury', bedrooms: 5, bathrooms: 5, areaSqm: 380, priceTHB: 10900000, image: 'https://images.unsplash.com/photo-1613977257593-930b4e1639ce?q=80&w=1740&auto=format&fit=crop', tags: ['สระว่ายน้ำ', 'สเปซกว้าง']},
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      let ids: string[] = []
      try {
        const range = await kv.zrange<string[]>('plans:index', 0, -1)
        ids = range || []
      } catch {}
      if (!ids.length) return res.status(200).json({ ok: true, data: sample })

      const items: any[] = []
      for (const id of ids) {
        try {
          const item = await kv.hgetall<Record<string, any>>(`plans:${id}`)
          if (item) items.push(item)
        } catch {}
      }
      return res.status(200).json({ ok: true, data: items })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const id = body.id || cryptoRandomId()
      const data = { ...body, id }
      try {
        await kv.hset(`plans:${id}`, data as any)
        await kv.zadd('plans:index', { score: Date.now(), member: id })
      } catch {}
      return res.status(200).json({ ok: true, data })
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
