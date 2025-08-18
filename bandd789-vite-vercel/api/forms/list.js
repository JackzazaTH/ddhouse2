
import { kv } from '@vercel/kv'

export default async function handler(req, res){
  const auth = req.headers['authorization'] || ''
  const token = (auth.startsWith('Bearer ') ? auth.slice(7) : auth).trim()
  if (token !== process.env.ADMIN_TOKEN){
    return res.status(401).json({ error: 'unauthorized' })
  }
  try {
    // Read last 200 ids
    let ids = []
    try {
      ids = await kv.lrange('forms', 0, 199)
    } catch (e) {
      // If KV not set, return empty list (front-end will fallback to localStorage)
      return res.status(200).json({ items: [] })
    }
    const items = []
    for (const key of ids) {
      try{
        const obj = await kv.hgetall(key)
        if (obj && Object.keys(obj).length) items.push(obj)
      }catch{}
    }
    // newest first (lpush already is newest first)
    return res.status(200).json({ items })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
