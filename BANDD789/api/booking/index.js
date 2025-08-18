export const runtime = 'edge'
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

function uid(){ return Math.random().toString(36).slice(2) + '-' + Date.now().toString(36) }

export default async function handler(req){
  const { method } = req
  if (method === 'OPTIONS') return new Response(null, { status: 204 })

  try {
    if (method === 'POST') {
      const body = await req.json()
      const id = uid()
      const record = { id, status: 'ใหม่', ...body, createdAt: Date.now() }
      try {
        await kv.hset(`booking:${id}`, record)
        await kv.lpush('bookings:index', id)
      } catch {}
      try {
        await put(`bandd789/bookings/${id}.json`, JSON.stringify(record), { access: 'private', contentType: 'application/json' })
      } catch {}
      try {
        const url = process.env.NOTIFY_WEBHOOK_URL
        if(url) await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ type:'booking', record }) })
      } catch {}
      return json({ ok: true, id })
    }

    if (method === 'PATCH') {
      const token = req.headers.get('x-admin-token')
      if (!token || token !== (process.env.ADMIN_TOKEN || '')) return json({ error: 'unauthorized' }, 401)
      const body = await req.json()
      const { id, status } = body||{}
      if(!id) return json({ error:'id required' }, 400)
      try {
        const obj = await kv.hgetall(`booking:${id}`)
        if (obj) {
          obj.status = status || obj.status
          await kv.hset(`booking:${id}`, obj)
          await put(`bandd789/bookings/${id}.json`, JSON.stringify(obj), { access: 'private', contentType: 'application/json' })
        }
      } catch {}
      return json({ ok: true })
    }

    if (method === 'GET') {
      const url = new URL(req.url)
      const token = url.searchParams.get('token') || req.headers.get('x-admin-token')
      if (!token || token !== (process.env.ADMIN_TOKEN || '')) return json({ error: 'unauthorized' }, 401)
      let items = []
      try {
        const ids = await kv.lrange('bookings:index', 0, 999)
        for (const id of ids) {
          const obj = await kv.hgetall(`booking:${id}`)
          if (obj) items.push(obj)
        }
      } catch {}
      items.sort((a,b)=> (b.createdAt||0)-(a.createdAt||0))
      return json({ items })
    }

    return json({ error: 'method not allowed' }, 405)
  } catch (e) {
    return json({ error: 'bad request', details: String(e) }, 400)
  }
}
