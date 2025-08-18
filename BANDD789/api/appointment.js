export const runtime = 'edge'
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'
function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{'content-type':'application/json'}})}

function uid(){return Math.random().toString(36).slice(2)}

export default async function handler(req){
  const { method } = req
  if(method==='GET'){
    try{const items=await kv.lrange('appts:index',0,199);const arr=[];for(const id of items){const o=await kv.hgetall('appt:'+id);if(o)arr.push(o)};return json({items:arr})}catch{return json({items:[]})}
  }
  if(method==='POST'){
    const body=await req.json();const id=uid();const obj={id,...body}
    try{await kv.hset('appt:'+id,obj);await kv.lpush('appts:index',id);await put('bandd789/appointments/'+id+'.json',JSON.stringify(obj),{access:'private'})}catch{}
    return json({ok:true,id})
  }
  return json({error:'method not allowed'},405)
}
