import React, { useEffect, useState } from 'react'
import { storage } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'

type Lead = { id:number; name:string; phone:string; email?:string; budget?:string; area?:string; interest?:string; note?:string }

type Editable<T> = T & { _edit?: boolean }

export default function AdminDashboard(){
  const nav = useNavigate()
  const [tab, setTab] = useState<'leads'|'articles'|'reviews'|'faq'|'videos'|'banners'>('leads')
  const [leads, setLeads] = useState<Editable<Lead>[]>(storage.get('leads', []))
  const [articles, setArticles] = useState<Editable<any>[]>(storage.get('articles', [] as any[]))
  const [reviews, setReviews] = useState<Editable<any>[]>(storage.get('reviews', [] as any[]))
  const [faqs, setFaqs] = useState<Editable<any>[]>(storage.get('faqs', [] as any[]))
  const [videos, setVideos] = useState<Editable<any>[]>(storage.get('videos', [] as any[]))
  const [banners, setBanners] = useState<Editable<any>[]>(storage.get('banners', [] as any[]))

  useEffect(()=>{
    const s = storage.get('session', {loggedIn:false})
    if(!s.loggedIn){ nav('/admin') }
  }, [nav])

  // ------- helpers -------
  function save(key:string, val:any){ storage.set(key, val) }

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

  // ------- add handlers -------
  function addArticle(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const rec = Object.fromEntries(fd.entries())
    const list = [...articles, { ...rec, created: Date.now() }]
    setArticles(list); save('articles', list); (e.target as HTMLFormElement).reset()
  }
  function addReview(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...reviews, { ...Object.fromEntries(fd.entries()), created: Date.now() }]
    setReviews(list); save('reviews', list); (e.target as HTMLFormElement).reset()
  }
  function addFaq(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...faqs, { q: fd.get('q'), a: fd.get('a') }]
    setFaqs(list); save('faqs', list); (e.target as HTMLFormElement).reset()
  }
  function addVideo(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...videos, { title: fd.get('title'), url: fd.get('url') }]
    setVideos(list); save('videos', list); (e.target as HTMLFormElement).reset()
  }
  function addBanner(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const list = [...banners, { img: fd.get('img') }]
    setBanners(list); save('banners', list); (e.target as HTMLFormElement).reset()
  }

  // ------- generic edit/delete helpers -------
  function toggleEdit<T>(idx:number, items: Editable<T>[], set:(v:Editable<T>[])=>void){
    const next = items.map((it,i)=> i===idx ? ({...it, _edit: !it._edit}) : it)
    set(next)
  }
  function updateItem<T>(idx:number, items: Editable<T>[], set:(v:Editable<T>[])=>void, patch:any){
    const next = items.map((it,i)=> i===idx ? ({...it, ...patch, _edit:false}) : it)
    set(next)
  }
  function deleteItem<T>(idx:number, items: Editable<T>[], set:(v:Editable<T>[])=>void){
    const next = items.filter((_,i)=> i!==idx)
    set(next)
  }

  // persist on every state change
  useEffect(()=>{ save('leads', leads) }, [leads])
  useEffect(()=>{ save('articles', articles) }, [articles])
  useEffect(()=>{ save('reviews', reviews) }, [reviews])
  useEffect(()=>{ save('faqs', faqs) }, [faqs])
  useEffect(()=>{ save('videos', videos) }, [videos])
  useEffect(()=>{ save('banners', banners) }, [banners])

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
            {leads.map((l, i)=>(
              <div key={l.id} className="card">
                {!l._edit ? (
                  <>
                    <strong>{l.name}</strong> • {l.phone}
                    <div className="muted">{l.email}</div>
                    <div className="muted">{l.budget} • {l.area} • {l.interest}</div>
                    <div>{l.note}</div>
                    <div style={{display:'flex', gap:8, marginTop:8}}>
                      <button onClick={()=>toggleEdit(i, leads, setLeads)} style={{background:'#111827'}}>แก้ไข</button>
                      <button onClick={()=>deleteItem(i, leads, setLeads)}>ลบ</button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(i, leads, setLeads, Object.fromEntries(fd.entries())) }} className="grid-2">
                    <input name="name" defaultValue={l.name} placeholder="ชื่อ" />
                    <input name="phone" defaultValue={l.phone} placeholder="โทร" />
                    <input name="email" defaultValue={l.email} placeholder="อีเมล" />
                    <input name="budget" defaultValue={l.budget} placeholder="งบ" />
                    <input name="area" defaultValue={l.area} placeholder="พื้นที่" />
                    <input name="interest" defaultValue={l.interest} placeholder="สนใจ" />
                    <textarea name="note" defaultValue={l.note as any} rows={2} placeholder="โน้ต"></textarea>
                    <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                      <button type="submit">บันทึก</button>
                      <button type="button" onClick={()=>toggleEdit(i, leads, setLeads)} style={{background:'#111827'}}>ยกเลิก</button>
                    </div>
                  </form>
                )}
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
            <div className="cards">
              {articles.map((a, i)=>(
                <div key={i} className="card">
                  {!a._edit ? (
                    <>
                      <strong>{a.title}</strong> — <span className="muted">{a.tag}</span> — <code style={{background:'#f3f4f6', padding:'2px 6px', borderRadius:8}}>{a.slug}</code>
                      <div className="muted">{a.excerpt}</div>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={()=>toggleEdit(i, articles, setArticles)} style={{background:'#111827'}}>แก้ไข</button>
                        <button onClick={()=>deleteItem(i, articles, setArticles)}>ลบ</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(i, articles, setArticles, Object.fromEntries(fd.entries())) }} className="grid-2">
                      <input name="title" defaultValue={a.title} />
                      <input name="tag" defaultValue={a.tag} />
                      <input name="slug" defaultValue={a.slug} />
                      <textarea name="excerpt" defaultValue={a.excerpt} rows={2} style={{gridColumn:'1/-1'}} />
                      <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                        <button type="submit">บันทึก</button>
                        <button type="button" onClick={()=>toggleEdit(i, articles, setArticles)} style={{background:'#111827'}}>ยกเลิก</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
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
            <div className="cards">
              {reviews.map((r,i)=>(
                <div key={i} className="card">
                  {!r._edit ? (
                    <>
                      <strong>{r.name}</strong> — {r.score}★
                      <div className="muted">{r.text}</div>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={()=>toggleEdit(i, reviews, setReviews)} style={{background:'#111827'}}>แก้ไข</button>
                        <button onClick={()=>deleteItem(i, reviews, setReviews)}>ลบ</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(i, reviews, setReviews, Object.fromEntries(fd.entries())) }} className="grid-2">
                      <input name="name" defaultValue={r.name} />
                      <input name="score" type="number" min="1" max="5" defaultValue={r.score} />
                      <textarea name="text" defaultValue={r.text} rows={2} style={{gridColumn:'1/-1'}} />
                      <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                        <button type="submit">บันทึก</button>
                        <button type="button" onClick={()=>toggleEdit(i, reviews, setReviews)} style={{background:'#111827'}}>ยกเลิก</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
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
            <div className="cards">
              {faqs.map((f,i)=>(
                <div key={i} className="card">
                  {!f._edit ? (
                    <>
                      <strong>{f.q}</strong>
                      <div className="muted">{f.a}</div>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={()=>toggleEdit(i, faqs, setFaqs)} style={{background:'#111827'}}>แก้ไข</button>
                        <button onClick={()=>deleteItem(i, faqs, setFaqs)}>ลบ</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(i, faqs, setFaqs, Object.fromEntries(fd.entries())) }} className="grid-2">
                      <input name="q" defaultValue={f.q} />
                      <textarea name="a" defaultValue={f.a} rows={2} style={{gridColumn:'1/-1'}} />
                      <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                        <button type="submit">บันทึก</button>
                        <button type="button" onClick={()=>toggleEdit(i, faqs, setFaqs)} style={{background:'#111827'}}>ยกเลิก</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
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
            <div className="cards">
              {videos.map((v,i)=>(
                <div key={i} className="card">
                  {!v._edit ? (
                    <>
                      <strong>{v.title}</strong>
                      <div className="muted">{v.url}</div>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={()=>toggleEdit(i, videos, setVideos)} style={{background:'#111827'}}>แก้ไข</button>
                        <button onClick={()=>deleteItem(i, videos, setVideos)}>ลบ</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(i, videos, setVideos, Object.fromEntries(fd.entries())) }} className="grid-2">
                      <input name="title" defaultValue={v.title} />
                      <input name="url" defaultValue={v.url} />
                      <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                        <button type="submit">บันทึก</button>
                        <button type="button" onClick={()=>toggleEdit(i, videos, setVideos)} style={{background:'#111827'}}>ยกเลิก</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
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
            <div className="cards">
              {banners.map((b,i)=>(
                <div key={i} className="card">
                  {!b._edit ? (
                    <>
                      <div className="muted">{b.img}</div>
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        <button onClick={()=>toggleEdit(i, banners, setBanners)} style={{background:'#111827'}}>แก้ไข</button>
                        <button onClick={()=>deleteItem(i, banners, setBanners)}>ลบ</button>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(i, banners, setBanners, Object.fromEntries(fd.entries())) }} className="grid-2">
                      <input name="img" defaultValue={b.img} />
                      <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                        <button type="submit">บันทึก</button>
                        <button type="button" onClick={()=>toggleEdit(i, banners, setBanners)} style={{background:'#111827'}}>ยกเลิก</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
