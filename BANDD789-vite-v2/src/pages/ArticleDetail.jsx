import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findArticleBySlug } from '../utils/db'

function setMeta(art){
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
  add('description', art.content.slice(0, 160))
  if(art.noindex){ const m = document.createElement('meta'); m.setAttribute('name','robots'); m.setAttribute('content','noindex'); document.head.appendChild(m) }
  add('og:title', art.title, true)
  add('og:description', art.content.slice(0, 200), true)
  add('og:type', 'article', true)
  add('og:url', window.location.href, true)
  add('og:site_name', 'BANDD789', true)
  const ogimg = art.coverUrl || (`/api/og?title=${encodeURIComponent(art.title)}&subtitle=${encodeURIComponent(art.category||'บทความ')}&brand=BANDD789`)
  add('og:image', ogimg, true)
  add('twitter:card', 'summary_large_image')
  add('twitter:title', art.title)
  add('twitter:description', art.content.slice(0, 200))
  add('twitter:image', ogimg)

  // canonical
  const oldCanon = document.querySelector('link[rel="canonical"]'); if(oldCanon) oldCanon.remove();
  const canon = document.createElement('link'); canon.setAttribute('rel','canonical'); canon.setAttribute('href', window.location.href); document.head.appendChild(canon);
}

export default function ArticleDetail(){
  const { slug } = useParams()
  const art = findArticleBySlug(decodeURIComponent(slug))

  useEffect(()=>{
    if(art){
      document.title = `${art.title} • BANDD789`
      setMeta(art)
    }
  }, [art])

  if(!art){
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">ไม่พบบทความ</h1>
        <Link className="link mt-2 inline-block" to="/บทความ">กลับไปหน้าบทความ</Link>
      </div>
    )
  }

  return (
    <article className="prose prose-neutral max-w-none">
      <nav className="text-sm mb-3"><Link className="link" to="/บทความ">← บทความ</Link></nav>
      <h1 className="!mb-2">{art.title}</h1>
      <div className="text-sm text-neutral-500">{new Date(art.createdAt).toLocaleString()} • หมวด: {art.category || '-'} • แท็ก: {(art.tags||[]).join(', ') || '-'}</div>
      {art.coverUrl ? <img src={art.coverUrl} alt="" className="w-full rounded-2xl border my-4" loading="lazy" /> : null}
      <div className="mt-6 whitespace-pre-wrap text-neutral-800">{art.content}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": art.title,
        "datePublished": art.createdAt,
        "author": { "@type": "Organization", "name": "BANDD789" },
        "publisher": { "@type": "Organization", "name": "BANDD789" },
        "articleSection": art.category || undefined,
        "keywords": (art.tags||[]).join(', '),
        "image": art.coverUrl || undefined
      })}} />
    </article>
  )
}
