export const runtime = 'edge'
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

export default async function handler(req){
  const token = req.headers.get('x-admin-token')
  if (!token || token !== (process.env.ADMIN_TOKEN || '')) {
    return json({ error: 'unauthorized' }, 401)
  }
  const form = await req.formData()
  const file = form.get('file')
  if(!file) return json({ error: 'file required' }, 400)
  const text = await file.text()
  const lines = text.trim().split(/\r?\n/)
  const [header, ...rows] = lines
  const cols = header.split(',')
  for(const line of rows){
    if(!line) continue
    const parts = line.split(',')
    const obj = {}
    cols.forEach((c, i)=> obj[c] = parts[i])
    const id = obj.id || Math.random().toString(36).slice(2)
    obj.id = id
    obj.createdAt = obj.createdAt ? Number(obj.createdAt) : Date.now()
    try {
      await kv.hset(`lead:${id}`, obj)
      await kv.lpush('leads:index', id)
      await put(`bandd789/leads/${id}.json`, JSON.stringify(obj), { access: 'private', contentType: 'application/json' })
    } catch {}
  }
  return json({ ok: true })
}
