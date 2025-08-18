import { useEffect, useMemo, useState } from 'react'
import Modal from './Modal'
import { saveFormSubmission } from '../utils/storage'
import { useToast } from './Toast'

const SESSION_KEY = 'bandd789_form_shown'

export default function FormPopup({ autoOpen=false }){
  const [open, setOpen] = useState(false)
  const [priv, setPriv] = useState('yes')
  const [styles, setStyles] = useState([])
  const { push, el } = useToast()

  useEffect(()=>{
    if(autoOpen && !sessionStorage.getItem(SESSION_KEY)){
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, '1')
    }
  },[autoOpen])

  function toggleStyle(val){
    setStyles(s => s.includes(val) ? s.filter(x=>x!==val) : [...s, val])
  }

  function handleSubmit(e){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    data.styles = styles
    data.privilege = priv
    data.createdAt = new Date().toISOString()
    saveFormSubmission(data)
    setOpen(false)
    e.currentTarget.reset()
    setStyles([])
    setPriv('yes')
    push('ส่งข้อมูลเรียบร้อย! เก็บไว้ที่หลังบ้านแล้ว')
  }

  return (
    <>
      <button className="btn-primary" onClick={()=>setOpen(true)}>รับสิทธิพิเศษ</button>
      <Modal open={open} onClose={()=>setOpen(false)} title="รับสิทธิพิเศษสำหรับลูกค้าใหม่" wide>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">ชื่อ-นามสกุล</label>
            <input name="name" required className="input" placeholder="สมชาย ใจดี" />
          </div>
          <div>
            <label className="label">เบอร์โทรศัพท์</label>
            <input name="phone" required className="input" placeholder="08x-xxx-xxxx" />
          </div>
          <div>
            <label className="label">อีเมล</label>
            <input name="email" type="email" className="input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="label">งบประมาณโดยประมาณ</label>
            <select name="budget" className="input">
              <option value="ต่ำกว่า 2 ล้าน">ต่ำกว่า 2 ล้าน</option>
              <option value="2-4 ล้าน">2-4 ล้าน</option>
              <option value="4-6 ล้าน">4-6 ล้าน</option>
              <option value="มากกว่า 6 ล้าน">มากกว่า 6 ล้าน</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">สไตล์บ้านที่สนใจ</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['มินิมอล','โมเดิร์น','ลักซ์ชูรี่','ทรอปิคอล'].map(s => (
                <label key={s} className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 cursor-pointer">
                  <input type="checkbox" checked={styles.includes(s)} onChange={()=>toggleStyle(s)} /> <span>{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="label">ต้องการขอรับสิทธิพิเศษ?</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="priv" checked={priv==='yes'} onChange={()=>setPriv('yes')} /> ใช่</label>
              <label className="flex items-center gap-2"><input type="radio" name="priv" checked={priv==='no'} onChange={()=>setPriv('no')} /> ไม่</label>
            </div>
          </div>
          {priv==='yes' && (
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">เลือกสิทธิพิเศษ</label>
                <select name="privilege_type" className="input">
                  <option value="ส่วนลดพิเศษ">ส่วนลดพิเศษ</option>
                  <option value="อัพเกรดวัสดุ">อัพเกรดวัสดุ</option>
                  <option value="ของแถมตกแต่ง">ของแถมตกแต่ง</option>
                </select>
              </div>
              <div>
                <label className="label">โค้ดโปรโมชั่น (ถ้ามี)</label>
                <input name="promo_code" className="input" placeholder="BANDD789-NEW" />
              </div>
            </div>
          )}
          <div className="sm:col-span-2">
            <label className="label">หมายเหตุ</label>
            <textarea name="note" rows="3" className="input" placeholder="ข้อมูลเพิ่มเติม เช่น ขนาดที่ดิน, จำนวนห้อง"></textarea>
          </div>
          <div className="sm:col-span-2 flex items-center justify-end gap-3">
            <button type="button" className="btn-outline" onClick={()=>setOpen(false)}>ยกเลิก</button>
            <button type="submit" className="btn-primary">ส่งข้อมูล</button>
          </div>
        </form>
        {el}
      </Modal>
    </>
  )
}
