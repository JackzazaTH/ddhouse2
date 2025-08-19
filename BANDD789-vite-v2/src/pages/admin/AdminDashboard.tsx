import React, { useEffect, useState } from 'react'
import { storage } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'

type Lead = { id:number; name:string; phone:string; email?:string; budget?:string; area?:string; interest?:string; note?:string }

export default function AdminDashboard(){
  const nav = useNavigate()
  const [tab, setTab] = useState<'leads'|'articles'|'reviews'|'faq'|'videos'|'banners'>('leads')
  const [leads, setLeads] = useState<Lead[]>(storage.get('leads', []))
  const [articles, setArticles] = useState(storage.get('articles', [] as any[]))
  const [reviews, setReviews] = useState(storage.get('reviews', [] as any[]))
  const [faqs, setFaqs] = useState(storage.get('faqs', [] as any[]))
  const [videos, setVideos] = useState(storage.get('videos', [] as any[]))
  const [banners, setBanners] = useState(storage.get('banners', [] as any[]))

  useEffect(()=>{
    const s = storage.get('session', {loggedIn:false})
    if(!s.loggedIn){ nav('/admin') }
  }, [nav])

  function exportCSV(){
    const header = ['id','name','phone','email','budget','area','interest','note']
    const rows = leads.map(l => header.map(h=> (l as any)[h] ?? '').join(','))
    const csv = [header.join(','), ...rows].join('\n')
    const blob = new Blob([csv], {type:'text/csv'})
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'leads.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function addArticle(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const rec = Object.fromEntries(fd.entries())
    const list = [...articles, { ...rec, created: Date.now() }]
    setArticles(list); storage.set('articles', list); (e.target as HTMLFormElement).reset()
  }

  function addReview(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...reviews, { ...Object.fromEntries(fd.entries()), created: Date.now() }]
    setReviews(list); storage.set('reviews', list); (e.target as HTMLFormElement).reset()
  }

  function addFaq(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...faqs, { q: fd.get('q'), a: fd.get('a') }]
    setFaqs(list); storage.set('faqs', list); (e.target as HTMLFormElement).reset()
  }

  function addVideo(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...videos, { title: fd.get('title'), url: fd.get('url') }]
    setVideos(list); storage.set('videos', list); (e.target as HTMLFormElement).reset()
  }

  function addBanner(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...banners, { img: fd.get('img') }]
    setBanners(list); storage.set('banners', list); (e.target as HTMLFormElement).reset()
  }

  return (
    <div className="container section">
      <h1 style={{marginTop:0}}>หลังบ้าน</h1>
      <div className="card" style={{marginBottom:12}}>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <button onClick={()=>setTab('leads')}>ฟอร์มที่รับมา</button>
          <button onClick={()=>setTab('articles')}>จัดการบทความ</button>
          <button onClick={()=>setTab('reviews')}>จัดการรีวิว</button>
          <button onClick={()=>setTab('faq')}>จัดการ FAQ</button>
          <button onClick={()=>setTab('videos')}>จัดการวิดีโอ</button>
          <button onClick={()=>setTab('banners')}>จัดการแบนเนอร์</button>
          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <button onClick={exportCSV} style={{background:'#111827'}}>Export CSV</button>
            <button onClick={()=>{ storage.set('session',{loggedIn:false}); nav('/admin')}}>ออกจากระบบ</button>
          </div>
        </div>
      </div>

      {tab==='leads' && (
        <div className="card">
          <h3>รายการฟอร์ม ({leads.length})</h3>
          <div className="cards">
            {leads.map(l=>(
              <div key={l.id} className="card">
                <strong>{l.name}</strong> • {l.phone}
                <div className="muted">{l.email}</div>
                <div className="muted">{l.budget} • {l.area} • {l.interest}</div>
                <div>{l.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='articles' && (
        <div className="grid-2">
          <div className="card">
            <h3>เพิ่มบทความ</h3>
            <form onSubmit={addArticle} className="grid-2">
              <div style={{gridColumn:'1/-1'}}>
                <label>หัวข้อ</label>
                <input name="title" required />
              </div>
              <div>
                <label>แท็ก/หมวด</label>
                <input name="tag" placeholder="เช่น ความรู้, ไอเดีย" />
              </div>
              <div>
                <label>Slug (ภาษาไทยได้)</label>
                <input name="slug" placeholder="ตัวอย่าง: คู่มือสร้างบ้าน-งบประมาณ" />
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label>คำนำ/คำอธิบาย</label>
                <textarea name="excerpt" rows={3} />
              </div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}>
                <button type="submit">บันทึก</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3>รายการบทความ</h3>
            <ul>
              {articles.map((a:any, i:number)=>(
                <li key={i}><strong>{a.title}</strong> — <span className="muted">{a.tag}</span> — <code style={{background:'#f3f4f6', padding:'2px 6px', borderRadius:8}}>{a.slug}</code></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab==='reviews' && (
        <div className="grid-2">
          <div className="card">
            <h3>เพิ่มรีวิว</h3>
            <form onSubmit={addReview} className="grid-2">
              <div>
                <label>ชื่อผู้รีวิว</label>
                <input name="name" required />
              </div>
              <div>
                <label>คะแนน (1–5)</label>
                <input type="number" name="score" min="1" max="5" required />
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label>ข้อความรีวิว</label>
                <textarea name="text" rows={3} />
              </div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}>
                <button type="submit">บันทึก</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3>รายการรีวิว</h3>
            <ul>
              {reviews.map((r:any,i:number)=>(
                <li key={i}><strong>{r.name}</strong> — {r.score}★ — <span className="muted">{r.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab==='faq' && (
        <div className="grid-2">
          <div className="card">
            <h3>เพิ่มคำถาม</h3>
            <form onSubmit={addFaq} className="grid-2">
              <div style={{gridColumn:'1/-1'}}>
                <label>คำถาม</label>
                <input name="q" required />
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label>คำตอบ</label>
                <textarea name="a" rows={3} required />
              </div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}>
                <button type="submit">บันทึก</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3>รายการคำถาม</h3>
            <ul>
              {faqs.map((f:any,i:number)=>(
                <li key={i}><strong>{f.q}</strong> — <span className="muted">{f.a}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab==='videos' && (
        <div className="grid-2">
          <div className="card">
            <h3>เพิ่มวิดีโอ</h3>
            <form onSubmit={addVideo} className="grid-2">
              <div style={{gridColumn:'1/-1'}}>
                <label>หัวข้อ</label>
                <input name="title" required />
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label>URL (YouTube embed หรือ mp4)</label>
                <input name="url" placeholder="https://www.youtube.com/embed/xxxx" required />
              </div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}>
                <button type="submit">บันทึก</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3>รายการวิดีโอ</h3>
            <ul>
              {videos.map((v:any,i:number)=>(
                <li key={i}><strong>{v.title}</strong> — <span className="muted">{v.url}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab==='banners' && (
        <div className="grid-2">
          <div className="card">
            <h3>เพิ่มแบนเนอร์ (รูปภาพ)</h3>
            <form onSubmit={addBanner} className="grid-2">
              <div style={{gridColumn:'1/-1'}}>
                <label>Image URL</label>
                <input name="img" placeholder="https://..." required />
              </div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}>
                <button type="submit">บันทึก</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3>รายการแบนเนอร์</h3>
            <ul>
              {banners.map((b:any,i:number)=>(
                <li key={i}><span className="muted">{b.img}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  )
}
