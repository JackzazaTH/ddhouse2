import { saveFormSubmission } from '../utils/storage'
import { useToast } from './Toast'
import { useState } from 'react'

export default function InlineLeadForm(){
  const { push, el } = useToast()
  const [styles, setStyles] = useState([])
  function toggleStyle(val){ setStyles(s => s.includes(val) ? s.filter(x=>x!==val) : [...s, val]) }

  function handleSubmit(e){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    data.styles = styles
    data.createdAt = new Date().toISOString()
    saveFormSubmission(data)
    e.currentTarget.reset(); setStyles([])
    push('ส่งข้อมูลเรียบร้อย! เก็บไว้ที่หลังบ้านแล้ว')
  }

  return (
    <section id="lead" className="card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">ลงทะเบียนให้ทีมติดต่อกลับ</h2>
          <p className="text-neutral-600 mt-1">BANDD789 ติดต่อกลับภายใน 1 วันทำการ</p>
        </div>
        <div className="hidden sm:block badge">ฟรี! ให้คำปรึกษา</div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="label">ชื่อ-นามสกุล</label><input name="name" required className="input" placeholder="สมชาย ใจดี" /></div>
        <div><label className="label">เบอร์โทรศัพท์</label><input name="phone" required className="input" placeholder="08x-xxx-xxxx" /></div>
        <div><label className="label">อีเมล</label><input name="email" type="email" className="input" placeholder="you@example.com" /></div>
        <div>
          <label className="label">งบประมาณโดยประมาณ</label>
          <select name="budget" className="input">
            <option value="ต่ำกว่า 2 ล้าน">ต่ำกว่า 2 ล้าน</option>
            <option value="2-4 ล้าน">2-4 ล้าน</option>
            <option value="4-6 ล้าน">4-6 ล้าน</option>
            <option value="มากกว่า 6 ล้าน">มากกว่า 6 ล้าน</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="label">สไตล์บ้านที่สนใจ</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['มินิมอล','โมเดิร์น','ลักซ์ชูรี่','ทรอปิคอล'].map(s => (
              <label key={s} className={"flex items-center gap-2 rounded-xl px-3 py-2 border " + (styles.includes(s) ? 'bg-primary-50 border-primary-300 text-primary-800' : 'bg-neutral-50 border-neutral-200')}>
                <input type="checkbox" checked={styles.includes(s)} onChange={()=>toggleStyle(s)} /> <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <label className="label">หมายเหตุ</label>
          <textarea name="note" rows="3" className="input" placeholder="ข้อมูลเพิ่มเติม เช่น ขนาดที่ดิน, จำนวนห้อง"></textarea>
        </div>
        <div className="lg:col-span-2 flex items-center justify-end gap-3">
          <button type="reset" className="btn-outline">ล้างฟอร์ม</button>
          <button type="submit" className="btn-primary">ส่งข้อมูล</button>
        </div>
      </form>
      {el}
    </section>
  )
}
