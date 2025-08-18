import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { listArticles } from '../utils/db'

export default function Articles(){
  const items = listArticles()
  const [visible, setVisible] = useState(9)
  const sentinel = useRef(null)

  useEffect(()=>{
    const top = items.slice(0,3)
    top.forEach(it => {
      const l = document.createElement('link')
      l.rel = 'prefetch'; l.href = `/บทความ/${encodeURIComponent(it.slug)}`
      document.head.appendChild(l)
      if(it.coverUrl){
        const li = document.createElement('link')
        li.rel = 'preload'; li.as = 'image'; li.href = it.coverUrl
        document.head.appendChild(li)
      }
    })
  }, [items])

  useEffect(()=>{
    const el = sentinel.current
    if(!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ setVisible(v => Math.min(v + 6, items.length)) } })
    }, { rootMargin: '200px' })
    io.observe(el)
    return ()=> io.disconnect()
  }, [items])

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">บทความ</h1>
      <div className="mt-4 [column-width:320px] sm:[column-width:360px] md:columns-2 lg:columns-3 gap-6">
        {items.slice(0,visible).map(it => (
          <Link key={it.id} to={`/บทความ/${encodeURIComponent(it.slug)}`} className="card p-4 hover:shadow-lg transition mb-6 break-inside-avoid">
            <div className="aspect-video rounded-2xl bg-neutral-100 overflow-hidden">{it.coverUrl ? <img src={it.coverUrl} alt="" loading="lazy" className="w-full h-full object-cover" /> : null}</div>
            <div className="font-semibold line-clamp-2 mt-3">{it.title}</div>
            <div className="text-xs text-neutral-500 mt-0.5">หมวด: {it.category || '-'} • แท็ก: {(it.tags||[]).join(', ') || '-'}</div>
            <div className="text-xs text-neutral-400 mt-1">{new Date(it.createdAt).toLocaleString()}</div>
          </Link>
        ))}
        {!items.length && <div className="text-neutral-500">ยังไม่มีบทความ</div>}
      </div>
      <div ref={sentinel} />
    </div>
  )
}
