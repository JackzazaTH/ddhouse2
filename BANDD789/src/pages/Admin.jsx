import React, { useEffect, useMemo, useState } from 'react'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Admin(){
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
  const [authed, setAuthed] = useState(false)
  const [leads, setLeads] = useState([])
  const [bookings, setBookings] = useState([])
  const [q, setQ] = useState('')
  const [content, setContent] = useState({ heroTitle:'สร้างบ้านในฝันกับ BANDD789', heroSub:'รับสร้างบ้านคุณภาพ งานเนี้ยบ วัสดุพรีเมียม', themeColor:'#B30000', bullets:['ทีมสถาปนิกมืออาชีพ','รับประกันงานก่อสร้าง','ผ่อนสบาย วางแผนงบประมาณได้'], faq: [], portfolio: [], reviews: [] })
  const [uploading, setUploading] = useState(false)
  const toast = useToast()

  const fetchLeads = async (tk) => {
    fetchBookings(tk);

    try {
      const res = await fetch('/api/lead?token=' + encodeURIComponent(tk))
      if(!res.ok) throw new Error('not ok')
      const data = await res.json()
      const arr = (data.items || []).map(x => ({ status: 'ใหม่', ...x }))
      setLeads(arr)
      toast.push('โหลดข้อมูลลูกค้าแล้ว')
    }

  const fetchBookings = async (tk) => {
    try {
      const res = await fetch('/api/booking?token=' + encodeURIComponent(tk))
      if(!res.ok) throw new Error('not ok')
      const data = await res.json()
      setBookings(data.items||[])
    } catch {
      setBookings([])
    }
  } catch (e) {
      const items = JSON.parse(localStorage.getItem('leads')||'[]')
      setLeads(items)
      toast.push('โหมดออฟไลน์: โหลดจากเครื่อง')
    }
  }

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content')
      if(res.ok){
        const data = await res.json()
        setContent(prev => ({ ...prev, ...data }))
      }
    } catch {}
  }

  useEffect(()=>{ fetchContent() }, [])

  const doLogin = async () => {
    localStorage.setItem('admin_token', token)
    setAuthed(true)
    fetchLeads(token)
  }

  const filtered = useMemo(()=>{
    // dashboard stats
    }, [leads, q])

  const stats = useMemo(()=>{
    const byStatus = {}
    for(const l of leads){ byStatus[l.status||'ใหม่'] = (byStatus[l.status||'ใหม่']||0)+1 }
    const last7 = Array.from({length:7}).map((_,i)=>{
      const day = new Date(); day.setDate(day.getDate()-(6-i)); day.setHours(0,0,0,0)
      const end = new Date(day); end.setDate(day.getDate()+1)
      const count = leads.filter(l => (l.createdAt||l.ts||0) >= +day && (l.createdAt||l.ts||0) < +end).length
      return { d: `${day.getMonth()+1}/${day.getDate()}`, c: count }
    })
    return { byStatus, last7 }
  }, [leads])

    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return leads.filter(l => {
      const hay = JSON.stringify(l).toLowerCase()
      return words.every(w => hay.includes(w))
    })
  }, [leads, q])

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/lead', { method:'PATCH', headers:{'content-type':'application/json','x-admin-token': token}, body: JSON.stringify({ id, status }) })
      if(res.ok) toast.push('อัปเดตสถานะแล้ว')
    } catch {}
    setLeads(ls => ls.map(x => x.id===id ? { ...x, status } : x))
  }

  const exportCSV = async () => {
    try {
      const res = await fetch('/api/lead/export?token='+encodeURIComponent(token))
      const text = await res.text()
      const blob = new Blob([text], { type: 'text/csv;charset=utf-8' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'leads.csv'
      a.click()
      URL.revokeObjectURL(a.href)
    } catch { toast.push('ส่งออกไม่สำเร็จ') }
  }

  const importCSV = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    setUploading(true)
    try {
      const res = await fetch('/api/lead/import', { method:'POST', headers:{'x-admin-token': token}, body: fd })
      if(res.ok){ toast.push('นำเข้าแล้ว'); fetchLeads(token) } else { toast.push('นำเข้าไม่สำเร็จ') }
    } catch { toast.push('เกิดข้อผิดพลาด') } finally { setUploading(false) }
  }

  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method:'POST', headers:{'x-admin-token': token}, body: fd })
      const data = await res.json()
      if(data.url){ toast.push('อัปโหลดสำเร็จ'); return data.url }
    } catch {}
    toast.push('อัปโหลดไม่สำเร็จ')
    return ''
  }

  const addPortfolio = () => setContent(c => ({ ...c, portfolio: [...(c.portfolio||[]), { id: Date.now(), name:'โครงการใหม่', desc:'คำอธิบาย', img:'' }] }))
  const removePortfolio = (i) => setContent(c => ({ ...c, portfolio: c.portfolio.filter((_,idx)=>idx!==i) }))

  const addReview = () => setContent(c => ({ ...c, reviews: [...(c.reviews||[]), { id: Date.now(), name:'ชื่อลูกค้า', text:'รีวิว' }] }))
  const removeReview = (i) => setContent(c => ({ ...c, reviews: c.reviews.filter((_,idx)=>idx!==i) }))

  const addBullet = () => setContent(c => ({ ...c, bullets: [...(c.bullets||[]), 'จุดเด่นใหม่'] }))
  const removeBullet = (i) => setContent(c => ({ ...c, bullets: c.bullets.filter((_,idx)=>idx!==i) }))

  const addFaq = () => setContent(c => ({ ...c, faq: [...(c.faq||[]), {q:'คำถามใหม่', a:'คำตอบ'}] }))
  const removeFaq = (i) => setContent(c => ({ ...c, faq: c.faq.filter((_,idx)=>idx!==i) }))

  const saveContent = async () => {
    try {
      const res = await fetch('/api/content', { method:'POST', headers:{'x-admin-token': token}, body: JSON.stringify(content) })
      if(!res.ok) throw new Error('not ok')
      toast.push('บันทึกคอนเทนต์แล้ว')
      document.documentElement.style.setProperty('--theme-color', content.themeColor || '#B30000')
    } catch (e) {
      localStorage.setItem('content', JSON.stringify(content))
      toast.push('บันทึกในเครื่อง (API ยังไม่ตั้งค่า)')
    }
  }

  if(!authed){
    return (
      <div className="grid" style={{gap:18}}>
        <div style={{fontWeight:800, fontSize:24}}>หลังบ้าน</div>
        <div className="card">
        <div style={{fontWeight:800, marginBottom:8}}>แดชบอร์ด</div>
        <div className="grid cols-3">
          <div className="card"><div className="label">Leads ทั้งหมด</div><div style={{fontWeight:800, fontSize:24}}>{leads.length}</div></div>
          <div className="card"><div className="label">จำนวนนัดหมาย</div><div style={{fontWeight:800, fontSize:24}}>{bookings.length}</div></div>
          <div className="card"><div className="label">สถานะยอดนิยม</div><div>{Object.entries(stats.byStatus).sort((a,b)=>b[1]-a[1]).slice(0,1).map(([k,v])=>`${k} (${v})`)}</div></div>
        </div>
        <div className="card" style={{marginTop:10}}>
          <div className="label">Lead 7 วันล่าสุด</div>
          <svg viewBox="0 0 300 100" style={{width:'100%', height:120}}>
            {stats.last7.map((pt,i)=>{
              const x = i*(300/6); const y = 90 - Math.min(pt.c*15, 80)
              return <circle key={i} cx={x} cy={y} r={3} />
            })}
            {stats.last7.map((pt,i)=>{
              if(i===0) return null
              const x1 = (i-1)*(300/6); const y1 = 90 - Math.min(stats.last7[i-1].c*15, 80)
              const x2 = i*(300/6); const y2 = 90 - Math.min(pt.c*15, 80)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2" />
            })}
            <line x1="0" y1="90" x2="300" y2="90" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      <div className="card">
          <div className="label">กรอกรหัสผู้ดูแล (ADMIN_TOKEN)</div>
          <input className="input" placeholder="ใส่รหัส..." value={token} onChange={e=>setToken(e.target.value)} />
          <div style={{display:'flex', gap:10, marginTop:12}}>
            <button className="btn" onClick={doLogin}>เข้าสู่ระบบ</button>
            <button className="btn ghost" onClick={fetchContent}>รีเฟรชคอนเทนต์</button>
          </div>
          <div style={{marginTop:10, color:'#6b7280'}}>หากยังไม่ได้ตั้งค่า API ระบบจะบันทึกข้อมูลในเครื่องคุณชั่วคราว</div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>หลังบ้าน</div>

      <div className="card">
        <div className="label">ค้นหารายการลูกค้า (Lead)</div>
        <input className="input" placeholder="ค้นหาจากชื่อ/เบอร์/ประเภท/ทำเล/..." value={q} onChange={e=>setQ(e.target.value)} />
        <div style={{marginTop:12, display:'flex', gap:10, flexWrap:'wrap'}}>
          <button className="btn" onClick={()=>fetchLeads(token)}>รีเฟรช</button>
          <button className="btn ghost" onClick={exportCSV}>ส่งออก CSV</button>
          <label className="btn ghost" style={{cursor:'pointer'}}>
            นำเข้า CSV
            <input type="file" accept=".csv" style={{display:'none'}} onChange={e=>e.target.files[0] && importCSV(e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card">
          <div style={{fontWeight:800, marginBottom:8}}>รายการ Lead รวม ({filtered.length})</div>
          <div className="grid" style={{gap:10}}>
            {filtered.map(l => (
              <div key={l.id} className="card" style={{padding:12}}>
                <div style={{display:'flex', justifyContent:'space-between', gap:10, alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:800}}>{l.name} <span className="badge">{l.houseType}</span></div>
                    <div style={{color:'#6b7280', fontSize:14, marginTop:6}}>
                      {new Date(l.ts||Date.now()).toLocaleString()} • {l.location || '—'} • {l.budget || '—'}
                    </div>
                  </div>
                  <select className="select" value={l.status || 'ใหม่'} onChange={e=>updateStatus(l.id, e.target.value)} style={{maxWidth:160}}>
                    <option>ใหม่</option>
                    <option>ติดต่อแล้ว</option>
                    <option>นัดหมาย</option>
                    <option>เสนอราคา</option>
                    <option>ปิดการขาย</option>
                    <option>ยกเลิก</option>
                  </select>
                </div>
                <div style={{marginTop:6, display:'flex', flexWrap:'wrap', gap:6}}>
                  {(l.privileges||[]).map(p => <span key={p} className="badge">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{fontWeight:800, marginBottom:8}}>แก้ไขคอนเทนต์หน้าแรก/ธีม/FAQ/ผลงาน/รีวิว</div>
          <div className="grid" style={{gap:10}}>
            <div>
              <div className="label">Hero Title</div>
              <input className="input" value={content.heroTitle} onChange={e=>setContent({...content, heroTitle:e.target.value})} />
            </div>
            <div>
              <div className="label">Hero Sub</div>
              <input className="input" value={content.heroSub} onChange={e=>setContent({...content, heroSub:e.target.value})} />
            </div>
            <div>
              <div className="label">สี Theme (Hex)</div>
              <input className="input" value={content.themeColor} onChange={e=>setContent({...content, themeColor:e.target.value})} />
            </div>

            <div>
              <div className="label">Bullet Points</div>
              <div className="grid">
                {(content.bullets||[]).map((b,i)=>(
                  <div key={i} style={{display:'flex', gap:8}}>
                    <input className="input" value={b} onChange={e=>{
                      const copy = [...content.bullets]; copy[i]=e.target.value; setContent({...content, bullets: copy})
                    }} />
                    <button className="btn ghost" onClick={()=>removeBullet(i)}>ลบ</button>
                  </div>
                ))}
              </div>
              <div style={{marginTop:8}}><button className="btn" onClick={addBullet}>เพิ่ม Bullet</button></div>
            </div>

            <div>
              <div className="label">FAQ</div>
              <div className="grid">
                {(content.faq||[]).map((f,i)=>(
                  <div key={i} className="grid cols-2">
                    <input className="input" placeholder="คำถาม" value={f.q} onChange={e=>{
                      const copy = [...content.faq]; copy[i] = { ...copy[i], q: e.target.value }; setContent({...content, faq: copy})
                    }} />
                    <div style={{display:'flex', gap:8}}>
                      <input className="input" placeholder="คำตอบ" value={f.a} onChange={e=>{
                        const copy = [...content.faq]; copy[i] = { ...copy[i], a: e.target.value }; setContent({...content, faq: copy})
                      }} />
                      <button className="btn ghost" onClick={()=>removeFaq(i)}>ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:8}}><button className="btn" onClick={addFaq}>เพิ่ม FAQ</button></div>
            </div>

            <div>
              <div className="label">ผลงาน (Portfolio)</div>
              <div className="grid">
                {(content.portfolio||[]).map((p,i)=>(
                  <div key={i} className="card">
                    <div className="grid cols-2">
                      <input className="input" placeholder="ชื่อโครงการ" value={p.name} onChange={e=>{
                        const copy = [...content.portfolio]; copy[i] = { ...copy[i], name: e.target.value }; setContent({...content, portfolio: copy})
                      }} />
                      <input className="input" placeholder="คำอธิบาย" value={p.desc} onChange={e=>{
                        const copy = [...content.portfolio]; copy[i] = { ...copy[i], desc: e.target.value }; setContent({...content, portfolio: copy})
                      }} />
                    </div>
                    <div style={{display:'flex', gap:8, marginTop:8, alignItems:'center'}}>
                      <input className="input" placeholder="URL รูป" value={p.img||''} onChange={e=>{
                        const copy = [...content.portfolio]; copy[i] = { ...copy[i], img: e.target.value }; setContent({...content, portfolio: copy})
                      }} />
                      <label className="btn ghost" style={{cursor:'pointer'}}>
                        อัปโหลดรูป
                        <input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{
                          const f = e.target.files[0]; if(!f) return
                          const url = await uploadImage(f)
                          if(url){
                            const copy = [...content.portfolio]; copy[i] = { ...copy[i], img: url }; setContent({...content, portfolio: copy})
                          }
                        }} />
                      </label>
                      <button className="btn ghost" onClick={()=>removePortfolio(i)}>ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:8}}><button className="btn" onClick={addPortfolio}>เพิ่มโครงการ</button></div>
            </div>

            <div>
              <div className="label">รีวิวลูกค้า</div>
              <div className="grid">
                {(content.reviews||[]).map((r,i)=>(
                  <div key={i} className="grid cols-2">
                    <input className="input" placeholder="ชื่อ" value={r.name} onChange={e=>{
                      const copy = [...content.reviews]; copy[i] = { ...copy[i], name: e.target.value }; setContent({...content, reviews: copy})
                    }} />
                    <div style={{display:'flex', gap:8}}>
                      <input className="input" placeholder="รีวิว" value={r.text} onChange={e=>{
                        const copy = [...content.reviews]; copy[i] = { ...copy[i], text: e.target.value }; setContent({...content, reviews: copy})
                      }} />
                      <button className="btn ghost" onClick={()=>removeReview(i)}>ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:8}}><button className="btn" onClick={addReview}>เพิ่มรีวิว</button></div>
            </div>

            <div style={{display:'flex', gap:10}}>
              <button className="btn" onClick={saveContent}>บันทึกคอนเทนต์</button>
              <button className="btn ghost" onClick={fetchContent}>โหลดจากเซิร์ฟเวอร์</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


<div className="card">
  <div style={{fontWeight:800, marginBottom:8}}>รายการนัดหมาย ({bookings.length})</div>
  <div className="grid" style={{gap:10}}>
    {bookings.map(b => (
      <div key={b.id} className="card" style={{padding:12}}>
        <div style={{display:'flex', justifyContent:'space-between', gap:10, alignItems:'center'}}>
          <div>
            <div style={{fontWeight:800}}>{b.name} <span className="badge">{b.day} {b.time}</span></div>
            <div style={{color:'#6b7280', fontSize:14, marginTop:6}}>โทร {b.phone} • {b.notes || '—'}</div>
          </div>
          <select className="select" value={b.status || 'ใหม่'} onChange={async e=>{
            const status = e.target.value
            try {
              await fetch('/api/booking', { method:'PATCH', headers:{'content-type':'application/json','x-admin-token': token}, body: JSON.stringify({ id: b.id, status }) })
            } catch {}
            setBookings(arr => arr.map(x => x.id===b.id ? { ...x, status } : x))
          }} style={{maxWidth:160}}>
            <option>ใหม่</option>
            <option>ยืนยันแล้ว</option>
            <option>เสร็จสิ้น</option>
            <option>ยกเลิก</option>
          </select>
        </div>
      </div>
    ))}
  </div>
  <div style={{marginTop:12, display:'flex', gap:10, flexWrap:'wrap'}}>
    <a className="btn ghost" href={'/api/booking/export?token='+encodeURIComponent(token)}>ส่งออก CSV</a>
  </div>
</div>
