import React, { useMemo, useState } from 'react'
import Modal from '../components/Modal.jsx'
import PopupForm from '../components/PopupForm.jsx'
import { PLANS, CATEGORIES } from '../data/plans.js'

const PAGE_SIZE = 6

export default function Plans(){
  const [q, setQ] = useState('')
  const [cats, setCats] = useState([])
  const [sort, setSort] = useState('relevant')
  const [page, setPage] = useState(1)
  const [detail, setDetail] = useState(null)
  const [openForm, setOpenForm] = useState(false)

  const resultsAll = useMemo(()=>{
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    const base = PLANS.filter(p => {
      const hay = (p.name + ' ' + p.cats.join(' ') + ' ' + p.bed + ' ' + p.bath + ' ' + p.area + ' ' + p.price).toLowerCase()
      const byCat = cats.length ? cats.every(c => p.cats.includes(c)) : true
      const byQ = words.every(w => hay.includes(w))
      return byCat && byQ
    })
    const sorted = [...base]
    if (sort === 'area-asc') sorted.sort((a,b)=>a.area-b.area)
    if (sort === 'area-desc') sorted.sort((a,b)=>b.area-a.area)
    if (sort === 'price-asc') sorted.sort((a,b)=>a.price-b.price)
    if (sort === 'price-desc') sorted.sort((a,b)=>b.price-a.price)
    return sorted
  }, [q, cats, sort])

  const total = resultsAll.length
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const results = resultsAll.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  const toggleCat = (c) => { setPage(1); setCats(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c]) }

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, flexWrap:'wrap'}}>
        <div style={{fontWeight:800, fontSize:24}}>รวมแบบบ้าน</div>
        <div className="searchbar">
          <input className="input" placeholder="ค้นหา: โมเดิร์น, 3 ห้องนอน, 200 ตร.ม., ..." value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} />
          <select className="select" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="relevant">เรียงตามความเกี่ยวข้อง</option>
            <option value="area-asc">พื้นที่ใช้สอย น้อย→มาก</option>
            <option value="area-desc">พื้นที่ใช้สอย มาก→น้อย</option>
            <option value="price-asc">ราคา น้อย→มาก</option>
            <option value="price-desc">ราคา มาก→น้อย</option>
          </select>
          <button className="btn" onClick={()=>setOpenForm(true)}>ขอราคา</button>
        </div>
      </div>

      <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
        {CATEGORIES.map(c => (
          <button key={c}
            className="btn ghost"
            style={{background: cats.includes(c) ? 'var(--primary)' : 'transparent', color: cats.includes(c) ? '#fff' : 'var(--primary)'}}
            onClick={()=>toggleCat(c)}>{c}</button>
        ))}
        {cats.length>0 && <button className="btn secondary" onClick={()=>setCats([])}>ล้างตัวกรอง</button>}
      </div>

      <div className="grid cols-3">
        {results.map(p => (
          <div key={p.id} className="card">
            <div className="badge">{p.cats.join(' • ')}</div>
            <div style={{fontWeight:800, fontSize:16, marginTop:8}}>{p.name}</div>
            <div style={{color:'#4b5563', marginTop:6}}>{p.bed} นอน • {p.bath} น้ำ • {p.area} ตร.ม. • ~{(p.price/1e6).toFixed(1)} ล.</div>
            <div style={{marginTop:10, display:'flex', gap:8}}>
              <button className="btn" onClick={()=>setDetail(p)}>ดูรายละเอียด</button>
              <button className="btn ghost" onClick={()=>setOpenForm(true)}>ขอราคา</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>ผลลัพธ์ {total} รายการ</div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button className="btn ghost" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>ก่อนหน้า</button>
          <div>หน้า {page}/{maxPage}</div>
          <button className="btn ghost" disabled={page>=maxPage} onClick={()=>setPage(p=>Math.min(maxPage,p+1))}>ถัดไป</button>
        </div>
      </div>

      <Modal open={!!detail} onClose={()=>setDetail(null)} title={detail?.name || 'รายละเอียดแบบบ้าน'}>
        {detail && (
          <div className="grid cols-2">
            <div>
              <div className="label">ข้อมูลเบื้องต้น</div>
              <ul style={{margin:0, paddingLeft:18, color:'#374151'}}>
                <li>ห้องนอน: {detail.bed}</li>
                <li>ห้องน้ำ: {detail.bath}</li>
                <li>พื้นที่ใช้สอย: {detail.area} ตร.ม.</li>
                <li>หมวดหมู่: {detail.cats.join(', ')}</li>
                <li>ราคาโดยประมาณ: ~{(detail.price/1e6).toFixed(1)} ล้านบาท</li>
              </ul>
            </div>
            <div>
              <div className="label">วัสดุและสเปก (ตัวอย่าง)</div>
              <ul style={{margin:0, paddingLeft:18, color:'#374151'}}>
                <li>โครงสร้างเสาคานคอนกรีตเสริมเหล็ก</li>
                <li>หลังคาเมทัลชีทฉนวนกันร้อน</li>
                <li>พื้นกระเบื้องแกรนิตโต้ 60x60 ซม.</li>
                <li>ระบบไฟฟ้ามาตรฐาน มอก.</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>

      <PopupForm open={openForm} onClose={()=>setOpenForm(false)} />
    </div>
  )
}
