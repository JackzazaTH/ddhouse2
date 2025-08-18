import React, { useState, useEffect } from 'react'
import { useToast } from '../components/Toast.jsx'

export default function Appointment(){
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const toast = useToast()
  const [list, setList] = useState([])

  const submit = async () => {
    if(!name||!phone||!date){ toast.push('กรอกชื่อ เบอร์ วันที่'); return }
    try {
      const res = await fetch('/api/appointment',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,phone,date,notes,ts:Date.now()})})
      if(!res.ok) throw new Error('fail')
      toast.push('จองนัดหมายแล้ว')
      setName('');setPhone('');setDate('');setNotes('')
      load()
    } catch { toast.push('บันทึกไม่สำเร็จ') }
  }

  const load = async () => {
    try {
      const res = await fetch('/api/appointment')
      if(res.ok){ const data=await res.json(); setList(data.items||[]) }
    } catch {}
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>จองนัดหมายเข้าพบ/ดูไซต์งาน</div>
      <div className="card grid cols-2">
        <div>
          <div className="label">ชื่อ*</div>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <div className="label">เบอร์โทร*</div>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
        <div>
          <div className="label">วันที่นัด*</div>
          <input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div>
          <div className="label">หมายเหตุ</div>
          <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>
      </div>
      <button className="btn" onClick={submit}>ยืนยันการนัดหมาย</button>
      <div className="card">
        <div style={{fontWeight:800}}>รายการนัดหมาย</div>
        <ul>
          {list.map((a,i)=>(<li key={i}>{a.name} • {a.phone} • {a.date}</li>))}
        </ul>
      </div>
    </div>
  )
}
