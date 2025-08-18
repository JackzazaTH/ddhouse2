export const runtime = 'edge'
export default async function handler() {
  return new Response(JSON.stringify({ ok: true, time: Date.now() }), {
    headers: { 'content-type': 'application/json' }
  })
}
