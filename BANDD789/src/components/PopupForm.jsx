import React, { useState } from 'react'
import Modal from './Modal.jsx'
import { useToast } from './Toast.jsx'

const defaultOffer = {
  _hp: '', // honeypot
  name: '', phone: '', email: '',
  budget: '', location: '', houseType: 'บ้านชั้นเดียว',
  privileges: ['ส่วนลดพิเศษ'],
  subscribe: true, agree: true,
}

export default function PopupForm({open, onClose}){
  const [form, setForm] = useState(defaultOffer)
  const [submitting, setSubmitting] = useState(false)
  const phoneValid = /^0\\d{8,9}$/.test(form.phone.replace(/\\D/g,''))
  const toast = useToast()

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    // Basic rate limit (30s)
    const last = parseInt(localStorage.getItem('last_submit_ts')||'0',10)
    if(Date.now() - last < 30000){ toast.push('ส่งถี่เกินไป กรุณารอสักครู่'); return }

    if(!form.name || !form.phone || !form.agree || !phoneValid){
      toast.push('กรุณากรอกชื่อ, เบอร์ และยอมรับเงื่อนไข')
      return
    }
    setSubmitting(true)
    try {
      if(form._hp){ toast.push('bot ถูกปฏิเสธ'); return }
      const res = await fetch('/api/lead', { method:'POST', headers: { 'content-type':'application/json' }, body: JSON.stringify({ ...form, ts: Date.now() }) })
      if(!res.ok) throw new Error('Bad response')
      const data = await res.json()
      toast.push('ส่งข้อมูลสำเร็จ ขอบคุณครับ/ค่ะ')
      onClose?.()
      setForm(defaultOffer); localStorage.setItem('last_submit_ts', String(Date.now()))
    } catch (e) {
      // fallback local save
      const leads = JSON.parse(localStorage.getItem('leads')||'[]')
      leads.unshift({ id: Date.now().toString(36), ...form, ts: Date.now(), __local: true })
      localStorage.setItem('leads', JSON.stringify(leads))
      toast.push('บันทึกในเครื่องชั่วคราว (API ยังไม่ตั้งค่า)')
      onClose?.()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="รับสิทธิ์พิเศษ / ขอใบเสนอราคา">
      <div className="grid cols-2">
        <div>
          <label className="label">ชื่อ-นามสกุล*</label>
          <input className="input" value={form.name} onChange={e=>update('name', e.target.value)} placeholder="เช่น สมชาย ใจดี" />
        </div>
        <div>
          <label className="label">เบอร์โทร*</label>
          <input className="input" value={form.phone} onChange={e=>update('phone', e.target.value)} placeholder="08X-XXX-XXXX" />
        </div>
        <div>
          <input style={{display:'none'}} className="input" value={form._hp} onChange={e=>update('_hp', e.target.value)} placeholder="ห้ามกรอก" aria-hidden />
          <label className="label">อีเมล</label>
          <input className="input" value={form.email} onChange={e=>update('email', e.target.value)} placeholder="you@email.com" />
        </div>
        <div>
          <label className="label">งบประมาณโดยประมาณ</label>
          <select className="select" value={form.budget} onChange={e=>update('budget', e.target.value)}>
            <option value="">เลือกงบประมาณ</option>
            <option>ต่ำกว่า 2 ล้าน</option>
            <option>2-4 ล้าน</option>
            <option>4-6 ล้าน</option>
            <option>มากกว่า 6 ล้าน</option>
          </select>
        </div>
        <div>
          <label className="label">ทำเลก่อสร้าง</label>
          <input className="input" value={form.location} onChange={e=>update('location', e.target.value)} placeholder="จังหวัด/อำเภอ" />
        </div>
        <div>
          <label className="label">ประเภทบ้านที่สนใจ</label>
          <select className="select" value={form.houseType} onChange={e=>update('houseType', e.target.value)}>
            <option>บ้านชั้นเดียว</option>
            <option>บ้านสองชั้น</option>
            <option>ลักชัวรี่</option>
            <option>โมเดิร์น</option>
          </select>
        </div>
        <div className="row" style={{gridColumn:'1 / -1'}}>
          <div>
            <label className="label">สิทธิพิเศษ</label>
            <div style={{display:'grid', gap:8}}>
              {['ส่วนลดพิเศษ', 'อัพเกรดวัสดุ', 'ออกแบบฟรี', 'ที่ปรึกษาสินเชื่อ'].map(p => (
                <label key={p} style={{display:'flex', gap:8, alignItems:'center'}}>
                  <input type="checkbox" checked={form.privileges.includes(p)} onChange={e=>{
                    const set = new Set(form.privileges)
                    e.target.checked ? set.add(p) : set.delete(p)
                    update('privileges', Array.from(set))
                  }} />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label">ตั้งค่าเพิ่มเติม</label>
            <label style={{display:'flex', gap:8, alignItems:'center'}}>
              <input type="checkbox" checked={form.subscribe} onChange={e=>update('subscribe', e.target.checked)} />
              <span>รับข่าวสารและโปรโมชัน</span>
            </label>
            <label style={{display:'flex', gap:8, alignItems:'center'}}>
              <input type="checkbox" checked={form.agree} onChange={e=>update('agree', e.target.checked)} />
              <span>ยอมรับเงื่อนไขการติดต่อกลับ*</span>
            </label>
          </div>
        </div>
        <div style={{gridColumn:'1 / -1', display:'flex', gap:10, justifyContent:'flex-end'}}>
          <button className="btn ghost" onClick={onClose}>ยกเลิก</button>
          <button className="btn" disabled={submitting} onClick={submit}>{submitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}</button>
        </div>
      </div>
    </Modal>
  )
}
