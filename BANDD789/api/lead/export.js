export const runtime = 'edge'
import { kv } from '@vercel/kv'

export default async function handler(req){
  const url = new URL(req.url)
  const token = url.searchParams.get('token') || req.headers.get('x-admin-token')
  if (!token || token !== (process.env.ADMIN_TOKEN || '')) {
    return new Response('unauthorized', { status: 401 })
  }
  let items = []
  try {
    const ids = await kv.lrange('leads:index', 0, 999)
    for (const id of ids) {
      const obj = await kv.hgetall(`lead:${id}`)
      if (obj) items.push(obj)
    }
  } catch {}
  const cols = ['id','name','phone','email','budget','location','houseType','privileges','subscribe','status','createdAt']
  const rows = [cols.join(',')]
  for (const it of items) {
    rows.push(cols.map(c => {
      let v = it[c]
      if (Array.isArray(v)) v = v.join('|')
      if (typeof v === 'string' && v.includes(',')) v = `"${v.replace(/"/g,'""')}"`
      return v ?? ''
    }).join(','))
  }
  return new Response(rows.join('\n'), { headers: { 'content-type': 'text/csv; charset=utf-8' } })
}
