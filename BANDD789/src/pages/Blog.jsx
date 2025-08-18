import React, { useEffect, useMemo, useState } from 'react'
import Skeleton from '../components/Skeleton.jsx'

export default function Blog(){
  const [posts, setPosts] = useState(null)
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('ทั้งหมด')

  useEffect(()=>{
    ;(async () => {
      try {
        const res = await fetch('/api/content')
        if(res.ok){
          const data = await res.json()
          if(Array.isArray(data.blog)) setPosts(data.blog)
        }
      } catch {}
      if(!posts) setPosts([])
    })()
  }, [])

  const tags = useMemo(()=>['ทั้งหมด', ...Array.from(new Set((posts||[]).flatMap(p => p.tags||[])))], [posts])

  const filtered = useMemo(()=>{
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return (posts||[]).filter(p => {
      const hay = (p.title + ' ' + (p.tags||[]).join(' ') + ' ' + (p.summary||'')).toLowerCase()
      const byQ = words.every(w => hay.includes(w))
      const byTag = tag==='ทั้งหมด' || (p.tags||[]).includes(tag)
      return byQ && byTag
    })
  }, [posts, q, tag])

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:10, flexWrap:'wrap'}}>
        <div style={{fontWeight:800, fontSize:24}}>บทความ</div>
        <div className="searchbar">
          <input className="input" placeholder="ค้นหาบทความ" value={q} onChange={e=>setQ(e.target.value)} />
          <select className="select" value={tag} onChange={e=>setTag(e.target.value)}>
            {tags.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {posts===null ? (
        <div className="grid cols-3">
          {Array.from({length:6}).map((_,i)=>(<div key={i} className="card"><Skeleton h={160}/><div style={{marginTop:10}}><Skeleton/><Skeleton w="60%"/></div></div>))}
        </div>
      ):(
        <div className="grid cols-3">
          {filtered.map(p => (
            <a key={p.id||p.title} className="card" href={p.url||'#'} target="_blank" rel="noreferrer">
              {p.cover && <img src={p.cover} alt={p.title} style={{width:'100%', height:160, objectFit:'cover', borderRadius:12}} />}
              <div style={{fontWeight:800, fontSize:16, marginTop:8}}>{p.title}</div>
              <div style={{color:'#6b7280', marginTop:6}}>{p.summary||''}</div>
              <div style={{marginTop:8, display:'flex', gap:6, flexWrap:'wrap'}}>
                {(p.tags||[]).map(t => <span key={t} className="badge">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
