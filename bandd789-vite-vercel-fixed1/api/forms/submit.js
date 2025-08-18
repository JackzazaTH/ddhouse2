
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'

export default async function handler(req, res){
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  try {
    const body = req.body || req?.json?.() // Vercel/node gives req.body
    const data = typeof body === 'function' ? await body() : body
    const required = ['name','phone']
    for (const k of required){
      if(!data?.[k]) return res.status(400).json({ error: `กรอก ${k} ให้ครบถ้วน`})
    }
    const id = 'f_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6)
    const item = {
      _id: id,
      _at: new Date().toISOString(),
      name: String(data.name||'').trim(),
      phone: String(data.phone||'').trim(),
      lineId: String(data.lineId||'').trim(),
      email: String(data.email||'').trim(),
      projectType: String(data.projectType||''),
      budget: String(data.budget||''),
      province: String(data.province||''),
      consent: !!data.consent,
      source: String(data.source||'')
    }

    // Save to KV (if configured)
    try{
      await kv.hset(`form:${id}`, item)
      await kv.lpush('forms', `form:${id}`)
    }catch(e){
      console.warn('KV save failed (likely not configured).', e?.message)
    }

    // Mirror to Blob as JSON (if configured)
    try {
      await put(`forms/${id}.json`, JSON.stringify(item, null, 2), { access: 'private' })
    }catch(e){
      console.warn('Blob save failed (likely not configured).', e?.message)
    }

    return res.status(200).json({ ok: true, id })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
