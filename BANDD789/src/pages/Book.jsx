import React, { useEffect, useMemo, useState } from 'react'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'

export default function Book(){
  const toast = useToast()
  const [day, setDay] = useState(() => new Date().toISOString().slice(0,10))
  const [time, setTime] = useState('10:00')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [open, setOpen] = useState(false)

  const phoneValid = /^0\d{8,9}$/.test(phone.replace(/\D/g,''))

  const submit = async () => {
    if(!name || !phoneValid){ toast.push('กรอกชื่อและเบอร์ให้ถูกต้อง'); return }
    try {
      const res = await fetch('/api/booking', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ name, phone, day, time, notes }) })
      if(!res.ok) throw new Error('bad')
      toast.push('จองนัดหมายเรียบร้อย')
      setOpen(false); setName(''); setPhone(''); setNotes('')
    } catch {
      toast.push('บันทึกไม่สำเร็จ โปรดลองใหม่')
    }
  }

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:800, fontSize:24}}>นัดหมายปรึกษา</div>
        <button className="btn" onClick={()=>setOpen(true)}>จองเวลาพูดคุย</button>
      </div>

      <div className="card">
        <div className="label">ขั้นตอน</div>
        <ol style={{margin:0, paddingLeft:18, color:'#374151'}}>
          <li>เลือกวันและเวลาที่สะดวก</li>
          <li>ทีมงานจะติดต่อยืนยันและส่งรายละเอียด</li>
          <li>พูดคุยเพื่อเก็บความต้องการและประมาณการเบื้องต้น</li>
        </ol>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="จองเวลานัดหมาย">
        <div className="grid cols-2">
          <div>
            <div className="label">วันที่</div>
            <input className="input" type="date" value={day} onChange={e=>setDay(e.target.value)} />
          </div>
          <div>
            <div className="label">เวลา</div>
            <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
          <div>
            <div className="label">ชื่อ-นามสกุล</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="เช่น สมชาย ใจดี" />
          </div>
          <div>
            <div className="label">เบอร์โทร</div>
            <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="08X-XXX-XXXX" />
          </div>
          <div style={{gridColumn:'1 / -1'}}>
            <div className="label">รายละเอียดเพิ่มเติม</div>
            <textarea className="textarea" rows="3" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="พื้นที่ก่อสร้าง / งบประมาณ / สไตล์ที่ชอบ เป็นต้น"></textarea>
          </div>
          <div style={{gridColumn:'1 / -1', display:'flex', gap:10, justifyContent:'flex-end'}}>
            <button className="btn ghost" onClick={()=>setOpen(false)}>ยกเลิก</button>
            <button className="btn" onClick={submit}>ยืนยันการจอง</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
