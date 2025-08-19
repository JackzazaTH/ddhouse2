import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findProjectBySlug } from '../utils/db'

function setMeta(p){
  const keys = ['description','og:title','og:description','og:type','og:url','og:site_name','og:image','twitter:card','twitter:title','twitter:description','twitter:image']
  keys.forEach(name => {
    const sel = name.startsWith('og:') || name.startsWith('twitter:') ? `meta[property="${name}"], meta[name="${name}"]` : `meta[name="${name}"]`
    document.head.querySelectorAll(sel).forEach(n => n.remove())
  })
  const add = (attr, content, prop=false)=>{
    if(!content) return
    const m = document.createElement('meta')
    if(prop){ m.setAttribute('property', attr) } else { m.setAttribute('name', attr) }
    m.setAttribute('content', content)
    document.head.appendChild(m)
  }
  const desc = [p.category, p.location, p.budget, p.area ? (p.area + ' ตร.ม.') : ''].filter(Boolean).join(' • ') + ' — ' + (p.description || '').slice(0,120)
  add('description', desc)
  add('og:title', p.title, true)
  add('og:description', desc, true)
  add('og:type', 'article', true)
  add('og:url', window.location.href, true)
  add('og:site_name', 'BANDD789', true)
  const ogimg = p.coverUrl || (`/api/og?title=${encodeURIComponent(p.title)}&subtitle=${encodeURIComponent(p.category||'ผลงาน')}&brand=BANDD789`)
  add('og:image', ogimg, true)
  add('twitter:card', 'summary_large_image')
  add('twitter:title', p.title)
  add('twitter:description', desc)
  add('twitter:image', ogimg)
  const oldCanon = document.querySelector('link[rel="canonical"]'); if(oldCanon) oldCanon.remove();
  const canon = document.createElement('link'); canon.setAttribute('rel','canonical'); canon.setAttribute('href', window.location.href); document.head.appendChild(canon);
}

export default function ProjectDetail(){
  const { slug } = useParams()
  const p = findProjectBySlug(decodeURIComponent(slug))

  useEffect(()=>{ if(p){ document.title = `${p.title} • BANDD789`; setMeta(p) } }, [p])

  if(!p){
    return <div className="text-center py-20"><h1 className="text-2xl font-bold">ไม่พบผลงาน</h1><Link className="link mt-2 inline-block" to="/ผลงาน">กลับไปหน้าผลงาน</Link></div>
  }

  return (
    <article className="prose prose-neutral max-w-none">
      <nav className="text-sm mb-3"><Link className="link" to="/ผลงาน">← ผลงาน</Link></nav>
      <h1 className="!mb-2">{p.title}</h1>
      <div className="text-sm text-neutral-500">{p.category || '-'} • {p.location || '-'} • {p.area || '-'} ตร.ม. • {p.budget || '-'}</div>
      {p.coverUrl ? <img src={p.coverUrl} alt="" className="w-full rounded-2xl border my-4" loading="lazy" /> : null}
      {Array.isArray(p.gallery) && p.gallery.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
          {p.gallery.map((src,idx)=> <img key={idx} src={src} alt="" className="w-full rounded-xl border" loading="lazy" />)}
        </div>
      ) : null}
      <div className="mt-6 whitespace-pre-wrap text-neutral-800">{p.description}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": p.title,
        "description": p.description,
        "image": p.coverUrl || undefined,
        "keywords": p.category,
        "contentLocation": p.location || undefined
      })}} />
    </article>
  )
}
