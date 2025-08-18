export const runtime = 'edge'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

export default async function handler(req){
  const url = process.env.NOTIFY_WEBHOOK_URL
  if(!url) return json({ ok: false, reason: 'no webhook configured' })
  try {
    const body = await req.json()
    await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) })
    return json({ ok: true })
  } catch (e) {
    return json({ ok: false, error: String(e) }, 400)
  }
}
