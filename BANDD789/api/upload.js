export const runtime = 'edge'
import { put } from '@vercel/blob'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

export default async function handler(req){
  const token = req.headers.get('x-admin-token')
  if (!token || token !== (process.env.ADMIN_TOKEN || '')) {
    return json({ error: 'unauthorized' }, 401)
  }
  try {
    const form = await req.formData()
    const file = form.get('file')
    if(!file) return json({ error: 'file required' }, 400)
    const array = new Uint8Array(await file.arrayBuffer())
    const name = `bandd789/uploads/${Date.now()}-${file.name}`
    const { url } = await put(name, array, { access: 'public', contentType: file.type })
    return json({ ok: true, url })
  } catch (e) {
    return json({ error: 'upload failed', details: String(e) }, 400)
  }
}
