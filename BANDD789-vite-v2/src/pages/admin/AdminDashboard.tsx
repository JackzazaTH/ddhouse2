import React, { useEffect, useState } from 'react'
import { storage } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'

type Lead = { id:number; name:string; phone:string; email?:string; budget?:string; area?:string; interest?:string; note?:string }
type Article = { title:string; tag?:string; slug?:string; excerpt?:string; created?:number, _edit?:boolean }
type Review = { name:string; score:number; text?:string; created?:number, _edit?:boolean }
type QA = { q:string; a:string; _edit?:boolean }
type Video = { title:string; url:string; _edit?:boolean }
type Banner = { img:string; _edit?:boolean }
type House = {
  id:number; name:string; style:string; category:string;
  beds:number; baths:number; parking:number; price:number; area:number;
  img:string; images?:string[]; floorplan?:string; tags?:string[]; description?:string; _edit?:boolean;
}

export default function AdminDashboard(){
  const nav = useNavigate()

  // tabs
  const [tab, setTab] = useState<'leads'|'articles'|'reviews'|'faq'|'videos'|'banners'|'houses'|'settings'>('leads')

  // states
  const [leads, setLeads] = useState<Lead[]>(storage.get('leads', []))
  const [articles, setArticles] = useState<Article[]>(storage.get('articles', []))
  const [reviews, setReviews] = useState<Review[]>(storage.get('reviews', []))
  const [faqs, setFaqs] = useState<QA[]>(storage.get('faqs', []))
  const [videos, setVideos] = useState<Video[]>(storage.get('videos', []))
  const [banners, setBanners] = useState<Banner[]>(storage.get('banners', []))
  const [houses, setHouses] = useState<House[]>(storage.get('houses', []))
  const [adminAcc, setAdminAcc] = useState<{user:string; pass:string}>(storage.get('admin', {user:'admin', pass:'bandd789'}))

  // auth
  useEffect(()=>{
    const s = storage.get('session', {loggedIn:false})
    if(!s.loggedIn){ nav('/admin') }
  }, [nav])

  // persist
  useEffect(()=>{ storage.set('leads', leads) }, [leads])
  useEffect(()=>{ storage.set('articles', articles) }, [articles])
  useEffect(()=>{ storage.set('reviews', reviews) }, [reviews])
  useEffect(()=>{ storage.set('faqs', faqs) }, [faqs])
  useEffect(()=>{ storage.set('videos', videos) }, [videos])
  useEffect(()=>{ storage.set('banners', banners) }, [banners])
  useEffect(()=>{ storage.set('houses', houses) }, [houses])
  useEffect(()=>{ storage.set('admin', adminAcc) }, [adminAcc])

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

  // CRUD add handlers
  function addArticle(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const rec = Object.fromEntries(fd.entries()) as any
    const list = [...articles, { ...rec, created: Date.now() } as Article]
    setArticles(list); (e.currentTarget as HTMLFormElement).reset()
  }
  function addReview(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const rec = Object.fromEntries(fd.entries()) as any
    const list = [...reviews, { name: String(rec.name||''), score: Number(rec.score||0), text: String(rec.text||''), created: Date.now() }]
    setReviews(list); (e.currentTarget as HTMLFormElement).reset()
  }
  function addFaq(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const q = String(fd.get('q')||''); const a = String(fd.get('a')||'')
    const list = [...faqs, { q, a }]
    setFaqs(list); (e.currentTarget as HTMLFormElement).reset()
  }
  function addVideo(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const title = String(fd.get('title')||''); const url = String(fd.get('url')||'')
    const list = [...videos, { title, url }]
    setVideos(list); (e.currentTarget as HTMLFormElement).reset()
  }
  function addBanner(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const img = String(fd.get('img')||'')
    const list = [...banners, { img }]
    setBanners(list); (e.currentTarget as HTMLFormElement).reset()
  }
  function addHouse(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const obj:any = Object.fromEntries(fd.entries())
    const list: House[] = [...houses, {
      id: Date.now(),
      name: String(obj.name||''),
      style: String(obj.style||'มินิมอล'),
      category: String(obj.category||'บ้านสองชั้น'),
      beds: Number(obj.beds||0),
      baths: Number(obj.baths||0),
      parking: Number(obj.parking||0),
      price: Number(obj.price||0),
      area: Number(obj.area||0),
      img: String(obj.img||''),
      images: String(obj.images||'').split(',').map((s:string)=>s.trim()).filter((s:string)=>!!s),
      floorplan: String(obj.floorplan||''),
      tags: String(obj.tags||'').split(',').map((s:string)=>s.trim()).filter((s:string)=>!!s),
      description: String(obj.description||'')
    }]
    setHouses(list); (e.currentTarget as HTMLFormElement).reset()
  }
  function saveCredentials(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    setAdminAcc({ user: String(fd.get('user')||'admin'), pass: String(fd.get('pass')||'bandd789') })
    alert('บันทึกบัญชีผู้ใช้แล้ว')
  }

  // generic toggles
  function toggleEdit<T extends {_edit?:boolean}>(items:T[], set:(v:T[])=>void, idx:number){
    const next = items.map((it,i)=> i===idx ? ({...it, _edit: !it._edit}) : it)
    set(next)
  }
  function updateItem<T>(items:T[], set:(v:T[])=>void, idx:number, patch:any){
    const next = items.map((it,i)=> i===idx ? ({...it, ...patch, _edit:false}) as any : it)
    set(next)
  }
  function deleteItem<T>(items:T[], set:(v:T[])=>void, idx:number){
    const next = items.filter((_,i)=> i!==idx)
    set(next)
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
          <button onClick={()=>setTab('houses')}>จัดการแบบบ้าน</button>
          <button onClick={()=>setTab('settings')}>ตั้งค่า</button>
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
                {!(' _edit' in l) ? (
                  <>
                    <strong>{l.name}</strong> • {l.phone}
                    <div className="muted">{l.email}</div>
                    <div className="muted">{l.budget} • {l.area} • {l.interest}</div>
                    <div>{l.note}</div>
                    <div style={{display:'flex', gap:8, marginTop:8}}>
                      <button onClick={()=>toggleEdit(leads as any, setLeads as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                      <button onClick={()=>deleteItem(leads, setLeads, i)}>ลบ</button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); updateItem(leads as any, setLeads as any, i, Object.fromEntries(fd.entries())) }} className="grid-2">
                    <input name="name" defaultValue={l.name} placeholder="ชื่อ" />
                    <input name="phone" defaultValue={l.phone} placeholder="โทร" />
                    <input name="email" defaultValue={l.email} placeholder="อีเมล" />
                    <input name="budget" defaultValue={l.budget} placeholder="งบ" />
                    <input name="area" defaultValue={l.area} placeholder="พื้นที่" />
                    <input name="interest" defaultValue={l.interest} placeholder="สนใจ" />
                    <textarea name="note" defaultValue={l.note as any} rows={2} placeholder="โน้ต"></textarea>
                    <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                      <button type="submit">บันทึก</button>
                      <button type="button" onClick={()=>toggleEdit(leads as any, setLeads as any, i)} style={{background:'#111827'}}>ยกเลิก</button>
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
            <ul>
              {articles.map((a, i)=>(
                <li key={i}>
                  <strong>{a.title}</strong> — <span className="muted">{a.tag}</span> — <code style={{background:'#f3f4f6', padding:'2px 6px', borderRadius:8}}>{a.slug}</code>
                  <div className="muted">{a.excerpt}</div>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <button onClick={()=>toggleEdit(articles as any, setArticles as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                    <button onClick={()=>deleteItem(articles, setArticles, i)}>ลบ</button>
                  </div>
                </li>
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
              {reviews.map((r,i)=>(
                <li key={i}>
                  <strong>{r.name}</strong> — {r.score}★ — <span className="muted">{r.text}</span>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <button onClick={()=>toggleEdit(reviews as any, setReviews as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                    <button onClick={()=>deleteItem(reviews, setReviews, i)}>ลบ</button>
                  </div>
                </li>
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
              {faqs.map((f,i)=>(
                <li key={i}>
                  <strong>{f.q}</strong> — <span className="muted">{f.a}</span>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <button onClick={()=>toggleEdit(faqs as any, setFaqs as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                    <button onClick={()=>deleteItem(faqs, setFaqs, i)}>ลบ</button>
                  </div>
                </li>
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
              {videos.map((v,i)=>(
                <li key={i}>
                  <strong>{v.title}</strong> — <span className="muted">{v.url}</span>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <button onClick={()=>toggleEdit(videos as any, setVideos as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                    <button onClick={()=>deleteItem(videos, setVideos, i)}>ลบ</button>
                  </div>
                </li>
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
              {banners.map((b,i)=>(
                <li key={i}>
                  <span className="muted">{b.img}</span>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <button onClick={()=>toggleEdit(banners as any, setBanners as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                    <button onClick={()=>deleteItem(banners, setBanners, i)}>ลบ</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab==='houses' && (
        <div className="grid-2">
          <div className="card">
            <h3>เพิ่มแบบบ้าน</h3>
            <form onSubmit={addHouse} className="grid-2">
              <div><label>รหัส/ชื่อแบบ</label><input name="name" required /></div>
              <div><label>สไตล์</label><select name="style"><option>โมเดิร์น</option><option>มินิมอล</option><option>คลาสสิก</option></select></div>
              <div><label>หมวด</label><select name="category"><option>บ้านชั้นเดียว</option><option>บ้านสองชั้น</option></select></div>
              <div><label>ห้องนอน</label><input type="number" name="beds" min="0" /></div>
              <div><label>ห้องน้ำ</label><input type="number" name="baths" min="0" /></div>
              <div><label>ที่จอดรถ</label><input type="number" name="parking" min="0" /></div>
              <div><label>ราคา (บาท)</label><input type="number" name="price" min="0" /></div>
              <div><label>พื้นที่ (ตร.ม.)</label><input type="number" name="area" min="0" /></div>
              <div style={{gridColumn:'1/-1'}}><label>ปก (Image URL)</label><input name="img" placeholder="https://..." /></div>
              <div style={{gridColumn:'1/-1'}}><label>แกลเลอรี (คั่นด้วย , )</label><input name="images" placeholder="https://..., https://..." /></div>
              <div style={{gridColumn:'1/-1'}}><label>แปลน (Floorplan URL)</label><input name="floorplan" placeholder="https://..." /></div>
              <div style={{gridColumn:'1/-1'}}><label>แท็ก (คั่นด้วย , )</label><input name="tags" placeholder="ฮิต, มินิมอล" /></div>
              <div style={{gridColumn:'1/-1'}}><label>รายละเอียด</label><textarea name="description" rows={3} /></div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}><button type="submit">บันทึก</button></div>
            </form>
          </div>
          <div className="card">
            <h3>รายการแบบบ้าน</h3>
            <ul>
              {houses.map((h, i)=>(
                <li key={h.id}>
                  <strong>{h.name}</strong> — <span className="muted">{h.style}</span> — {h.price.toLocaleString()} บาท
                  <div className="muted">{h.category} • {h.area} ตร.ม. • นอน {h.beds} • น้ำ {h.baths} • จอด {h.parking}</div>
                  <div className="muted" style={{fontSize:12, wordBreak:'break-all'}}>แกลเลอรี: {(h.images||[]).join(', ')}</div>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <button onClick={()=>toggleEdit(houses as any, setHouses as any, i)} style={{background:'#111827'}}>แก้ไข</button>
                    <button onClick={()=>deleteItem(houses, setHouses, i)}>ลบ</button>
                  </div>
                  {h._edit && (
                    <form onSubmit={(e)=>{e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); const patch:any=Object.fromEntries(fd.entries()); const n=[...houses]; n[i]={...n[i], name:String(patch.name||n[i].name), style:String(patch.style||n[i].style), category:String(patch.category||n[i].category), beds:Number(patch.beds||n[i].beds), baths:Number(patch.baths||n[i].baths), parking:Number(patch.parking||n[i].parking), price:Number(patch.price||n[i].price), area:Number(patch.area||n[i].area), img:String(patch.img||n[i].img), images:String(patch.images||'').split(',').map((s:string)=>s.trim()).filter((s:string)=>!!s), floorplan:String(patch.floorplan||n[i].floorplan||''), tags:String(patch.tags||'').split(',').map((s:string)=>s.trim()).filter((s:string)=>!!s), description:String(patch.description||n[i].description||'') , _edit:false}; setHouses(n) }} className="grid-2" style={{marginTop:8}}>
                      <div><label>ชื่อแบบ</label><input name="name" defaultValue={h.name} /></div>
                      <div><label>สไตล์</label><input name="style" defaultValue={h.style} /></div>
                      <div><label>หมวด</label><input name="category" defaultValue={h.category} /></div>
                      <div><label>นอน</label><input name="beds" type="number" defaultValue={h.beds} /></div>
                      <div><label>น้ำ</label><input name="baths" type="number" defaultValue={h.baths} /></div>
                      <div><label>จอด</label><input name="parking" type="number" defaultValue={h.parking} /></div>
                      <div><label>ราคา</label><input name="price" type="number" defaultValue={h.price} /></div>
                      <div><label>พื้นที่</label><input name="area" type="number" defaultValue={h.area} /></div>
                      <div style={{gridColumn:'1/-1'}}><label>ปก</label><input name="img" defaultValue={h.img} /></div>
                      <div style={{gridColumn:'1/-1'}}><label>แกลเลอรี</label><input name="images" defaultValue={(h.images||[]).join(', ')} /></div>
                      <div style={{gridColumn:'1/-1'}}><label>แปลน</label><input name="floorplan" defaultValue={h.floorplan||''} /></div>
                      <div style={{gridColumn:'1/-1'}}><label>แท็ก</label><input name="tags" defaultValue={(h.tags||[]).join(', ')} /></div>
                      <div style={{gridColumn:'1/-1'}}><label>รายละเอียด</label><textarea name="description" rows={3} defaultValue={h.description||''} /></div>
                      <div style={{gridColumn:'1/-1', display:'flex', gap:8, justifyContent:'flex-end'}}>
                        <button type="submit">บันทึก</button>
                        <button type="button" onClick={()=>{ const n=[...houses]; n[i]._edit=false; setHouses(n) }} style={{background:'#111827'}}>ยกเลิก</button>
                      </div>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab==='settings' && (
        <div className="grid-2">
          <div className="card">
            <h3>ตั้งค่าบัญชีผู้ดูแล</h3>
            <form onSubmit={saveCredentials} className="grid-2">
              <div style={{gridColumn:'1/-1'}}><label>ผู้ใช้</label><input name="user" defaultValue={adminAcc.user} required /></div>
              <div style={{gridColumn:'1/-1'}}><label>รหัสผ่าน</label><input name="pass" type="password" defaultValue={adminAcc.pass} required /></div>
              <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}><button type="submit">บันทึก</button></div>
            </form>
          </div>
          <div className="card">
            <h3>หมายเหตุ</h3>
            <p className="muted">ข้อมูลเก็บในเบราว์เซอร์ (localStorage) — หากต้องการใช้งานจริงร่วมกันหลายคน แนะนำเชื่อมฐานข้อมูลภายนอก เช่น Supabase/Firebase</p>
          </div>
        </div>
      )}

    </div>
  )
}
