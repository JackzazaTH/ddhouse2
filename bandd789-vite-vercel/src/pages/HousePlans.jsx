
import React, { useEffect, useMemo, useState } from 'react'
import plans from '../data/housePlans.json'
import Modal from '../components/Modal'

export default function HousePlans() {
  const [q,setQ] = useState('')
  const [cat,setCat] = useState('ทั้งหมด')
  const [detail,setDetail] = useState(null)
  const cats = useMemo(()=>['ทั้งหมด',...Array.from(new Set(plans.map(p=>p.category)))],[])
  const filtered = useMemo(()=>{
    return plans.filter(p=>{
      const inCat = cat==='ทั้งหมด' || p.category===cat
      const inQ = (p.name+p.category).toLowerCase().includes(q.toLowerCase())
      return inCat && inQ
    })
  },[q,cat])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">รวมแบบบ้าน</h1>
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <input className="input md:col-span-2" placeholder="ค้นหาแบบบ้าน..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="select" value={cat} onChange={e=>setCat(e.target.value)}>
          {cats.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(p=>(
          <div key={p.id} className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={()=>setDetail(p)}>
            <img src={p.thumbnail} className="h-44 w-full object-cover rounded-xl mb-3" alt={p.name}/>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-neutral-600">{p.category} • {p.bedrooms} ห้องนอน • {p.bathrooms} ห้องน้ำ • {p.area} ตร.ม.</div>
            <div className="mt-2 text-primary-600 font-semibold">{p.price.toLocaleString()} บาท</div>
            <div className="text-xs text-neutral-500 mt-1">คลิกเพื่อดูรายละเอียด</div>
          </div>
        ))}
      </div>

      <Modal open={!!detail} onClose={()=>setDetail(null)} title={detail?.name}>
        {detail && (
          <div className="space-y-2">
            <img src={detail.thumbnail} className="h-56 w-full object-cover rounded-xl" alt={detail.name}/>
            <div className="text-sm text-neutral-700">หมวดหมู่: {detail.category}</div>
            <div className="text-sm text-neutral-700">ขนาดพื้นที่ใช้สอย: {detail.area} ตร.ม.</div>
            <div className="text-sm text-neutral-700">{detail.bedrooms} ห้องนอน • {detail.bathrooms} ห้องน้ำ</div>
            <div className="font-semibold text-primary-600">{detail.price.toLocaleString()} บาท</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
