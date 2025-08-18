export const runtime = 'edge'
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'

function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{'content-type':'application/json'}})}

export default async function handler(req){
  const { method } = req
  if(method==='GET'){
    try{const data=await kv.get('blog:posts'); return json({posts:data||[]})}catch{return json({posts:[]})}
  }
  if(method==='POST'){
    const token=req.headers.get('x-admin-token'); if(!token||token!==(process.env.ADMIN_TOKEN||'')) return json({error:'unauthorized'},401)
    const body=await req.json()
    try{await kv.set('blog:posts',body); await put('bandd789/content/blog.json',JSON.stringify(body),{access:'private'})}catch{}
    return json({ok:true})
  }
  return json({error:'method not allowed'},405)
}
