export const runtime = 'edge'
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  })
}

export default async function handler(req) {
  const { method } = req
  if (method === 'OPTIONS') return new Response(null, { status: 204 })

  if (method === 'GET') {
    try {
      const data = await kv.get('content:site')
      if (!data) return json({})
      return json(data)
    } catch {
      // KV not configured
      // Try to read a default content snapshot from Blob (optional)
      return json({})
    }
  }

  if (method === 'POST') {
    const token = req.headers.get('x-admin-token')
    if (!token || token !== (process.env.ADMIN_TOKEN || '')) {
      return json({ error: 'unauthorized' }, 401)
    }
    try {
      const body = await req.json()
      await kv.set('content:site', body)
      try {
        await put('bandd789/content/site.json', JSON.stringify(body), { access: 'private', contentType: 'application/json' })
      } catch {}
      return json({ ok: true })
    } catch (e) {
      return json({ error: 'bad request', details: String(e) }, 400)
    }
  }

  return json({ error: 'method not allowed' }, 405)
}
