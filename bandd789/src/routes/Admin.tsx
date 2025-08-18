import { useEffect, useMemo, useState } from 'react'
import { Api } from '@/lib/api'
import { load, save } from '@/lib/local'
import Modal from '@/components/Modal'

export default function Admin(){
  const [authed, setAuthed] = useState<boolean>(!!sessionStorage.getItem('bandd789_admin'))
  const [pin, setPin] = useState('')
  const [tab, setTab] = useState<'forms'|'plans'|'faq'|'reviews'>('forms')

  if(!authed){
    return (
      <div className="max-w-sm mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-white mb-4">เข้าสู่ระบบหลังบ้าน</h1>
        <input className="input mb-3" placeholder="ใส่รหัส PIN (กำหนดใน .env หรือใช้ 7890)" value={pin} onChange={e=>setPin(e.target.value)}/>
        <button className="btn w-full" onClick={()=>{
          if(pin === import.meta.env.VITE_ADMIN_PIN || pin === '7890'){
            sessionStorage.setItem('bandd789_admin','1'); setAuthed(true)
          } else alert('PIN ไม่ถูกต้อง')
        }}>เข้าสู่ระบบ</button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">หลังบ้าน — BANDD789</h1>
      <div className="flex gap-2 mb-4">
        {(['forms','plans','faq','reviews'] as const).map(t => (
          <button key={t} className={tab===t? 'btn' : 'btn-ghost'} onClick={()=>setTab(t)}>
            {t==='forms'?'ฟอร์ม':t==='plans'?'แบบบ้าน':t==='faq'?'FAQ':'รีวิว'}
          </button>
        ))}
      </div>
      {tab==='forms' && <FormsTab/>}
      {tab==='plans' && <PlansTab/>}
      {tab==='faq' && <FaqTab/>}
      {tab==='reviews' && <ReviewsTab/>}
    </div>
  )
}

function FormsTab(){
  const [items, setItems] = useState<any[]>(load('forms', []))

  useEffect(()=>{
    Api.listForms().then(res=>{
      // If server returns data, prefer it (KV). Otherwise keep local fallback.
      if(res.ok && Array.isArray(res.data) && res.data.length){
        setItems(res.data as any[])
      }
    })
  }, [])

  return (
    <div className="space-y-3">
      {items.length===0 && <div className="text-muted">ยังไม่มีแบบฟอร์ม</div>}
      {items.map((f,i)=>(
        <div key={i} className="card p-4 grid md:grid-cols-4 gap-2 text-sm">
          <div><div className="text-white font-semibold">{f.name}</div><div className="text-foreground/70">{f.phone}</div></div>
          <div>{f.type} • {f.budget}</div>
          <div className="text-foreground/70">{(f.privileges||[]).join(' • ')}</div>
          <div className="text-foreground/60">{new Date(f.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

function PlansTab(){
  const [items, setItems] = useState<any[]>(load('plans', []))
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)

  useEffect(()=>{ if(items.length===0){ Api.listPlans().then(res=>{ if(res.ok && Array.isArray(res.data)) setItems(res.data as any[]) }) }},[])
  useEffect(()=>{ save('plans', items)}, [items])

  const onSave = async () => {
    if(!editing) return
    if(!editing.id){
      // create
      const res = await Api.createPlan(editing)
      if(res.ok) setItems(prev => [editing, ...prev])
    } else {
      const res = await Api.updatePlan(editing)
      if(res.ok) setItems(prev => prev.map(p => p.id === editing.id ? editing : p))
    }
    setModalOpen(false); setEditing(null)
  }

  return (
    <div>
      <div className="mb-3"><button className="btn" onClick={()=>{ setEditing({ name:'', style:'Modern', bedrooms:3, bathrooms:2, areaSqm:140, priceTHB:2500000, image:'', tags:[] }); setModalOpen(true)}}>เพิ่มแบบบ้าน</button></div>
      <div className="space-y-3">
        {items.map((p,i)=>(
          <div key={i} className="card p-4 grid md:grid-cols-6 gap-2 text-sm">
            <div className="md:col-span-2">
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-foreground/70">{p.style} • {p.areaSqm} ตร.ม.</div>
            </div>
            <div>{p.bedrooms} นอน / {p.bathrooms} น้ำ</div>
            <div>{p.priceTHB?.toLocaleString()} ฿</div>
            <div className="truncate">{(p.tags||[]).join(', ')}</div>
            <div className="text-right">
              <button className="btn-ghost mr-2" onClick={()=>{ setEditing(p); setModalOpen(true)}}>แก้ไข</button>
              <button className="btn-ghost" onClick={async()=>{ await Api.deletePlan(p.id); setItems(prev=>prev.filter(x=>x.id!==p.id))}}>ลบ</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={editing?.id ? 'แก้ไขแบบบ้าน' : 'เพิ่มแบบบ้าน'}>
        {editing && (
          <div className="space-y-3">
            <input className="input" placeholder="ชื่อแบบ" value={editing.name||''} onChange={e=>setEditing({...editing, name:e.target.value})}/>
            <div className="grid grid-cols-2 gap-2">
              <select className="select" value={editing.style} onChange={e=>setEditing({...editing, style:e.target.value})}>
                <option>Modern</option><option>Classic</option><option>Minimal</option><option>Luxury</option>
              </select>
              <input className="input" type="number" placeholder="พื้นที่ (ตร.ม.)" value={editing.areaSqm||0} onChange={e=>setEditing({...editing, areaSqm:+e.target.value})}/>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input className="input" type="number" placeholder="ห้องนอน" value={editing.bedrooms||0} onChange={e=>setEditing({...editing, bedrooms:+e.target.value})}/>
              <input className="input" type="number" placeholder="ห้องน้ำ" value={editing.bathrooms||0} onChange={e=>setEditing({...editing, bathrooms:+e.target.value})}/>
              <input className="input" type="number" placeholder="ราคา (฿)" value={editing.priceTHB||0} onChange={e=>setEditing({...editing, priceTHB:+e.target.value})}/>
            </div>
            <input className="input" placeholder="ลิงก์รูปภาพ" value={editing.image||''} onChange={e=>setEditing({...editing, image:e.target.value})}/>
            <input className="input" placeholder="แท็ก (คั่นด้วย ,)" value={(editing.tags||[]).join(', ')} onChange={e=>setEditing({...editing, tags:e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean)})}/>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost" onClick={()=>setModalOpen(false)}>ยกเลิก</button>
              <button className="btn" onClick={onSave}>บันทึก</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function FaqTab(){
  const [items, setItems] = useState<any[]>(load('faq', []))
  useEffect(()=>{ save('faq', items) }, [items])
  const [q, setQ] = useState(''); const [a, setA] = useState('')

  const add = () => { if(!q || !a) return; setItems(prev => [...prev, { q, a }]); setQ(''); setA('') }
  const remove = (i:number) => setItems(prev=>prev.filter((_,idx)=>idx!==i))

  return (
    <div>
      <div className="card p-4 mb-4 grid md:grid-cols-2 gap-2">
        <input className="input" placeholder="คำถาม" value={q} onChange={e=>setQ(e.target.value)}/>
        <input className="input" placeholder="คำตอบ" value={a} onChange={e=>setA(e.target.value)}/>
        <div className="md:col-span-2 flex justify-end"><button className="btn" onClick={add}>เพิ่ม</button></div>
      </div>
      <div className="space-y-3">
        {items.map((it, i)=>(
          <div key={i} className="card p-4 flex justify-between items-start">
            <div>
              <div className="text-white font-semibold">{it.q}</div>
              <div className="text-foreground/80">{it.a}</div>
            </div>
            <button className="btn-ghost" onClick={()=>remove(i)}>ลบ</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewsTab(){
  const [items, setItems] = useState<any[]>(load('reviews', []))
  useEffect(()=>{ save('reviews', items) }, [items])
  const [name, setName] = useState(''); const [rating, setRating] = useState(5); const [text, setText] = useState('')

  const add = () => { if(!name || !text) return; setItems(prev => [{ name, rating, text }, ...prev]); setName(''); setText('') }
  const remove = (i:number) => setItems(prev=>prev.filter((_,idx)=>idx!==i))

  return (
    <div>
      <div className="card p-4 mb-4 grid md:grid-cols-3 gap-2">
        <input className="input" placeholder="ชื่อผู้รีวิว" value={name} onChange={e=>setName(e.target.value)}/>
        <select className="select" value={rating} onChange={e=>setRating(+e.target.value)}>
          <option value={5}>5</option><option value={4}>4</option><option value={3}>3</option><option value={2}>2</option><option value={1}>1</option>
        </select>
        <input className="input md:col-span-3" placeholder="ข้อความรีวิว" value={text} onChange={e=>setText(e.target.value)}/>
        <div className="md:col-span-3 flex justify-end"><button className="btn" onClick={add}>เพิ่ม</button></div>
      </div>
      <div className="space-y-3">
        {items.map((it, i)=>(
          <div key={i} className="card p-4 flex justify-between items-start">
            <div>
              <div className="text-white font-semibold">{it.name} — {'★'.repeat(it.rating)}{'☆'.repeat(5-it.rating)}</div>
              <div className="text-foreground/80">{it.text}</div>
            </div>
            <button className="btn-ghost" onClick={()=>remove(i)}>ลบ</button>
          </div>
        ))}
      </div>
    </div>
  )
}

