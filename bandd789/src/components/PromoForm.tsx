import { useState } from 'react'
import Modal from './Modal'
import Toast from './Toast'
import { Api } from '@/lib/api'
import { save, load } from '@/lib/local'

type Priv = 'ส่วนลดพิเศษ' | 'อัปเกรดวัสดุฟรี' | 'ผ่อนชำระยืดหยุ่น' | 'ออกแบบปรับแก้ฟรี'

export default function PromoForm(){
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    type: 'บ้านเดี่ยว', province: '', budget: '2-3 ล้าน',
    privileges: [] as Priv[], agree: false
  })
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState<string | undefined>()

  const togglePrivilege = (p: Priv) => {
    setForm(f => ({
      ...f,
      privileges: f.privileges.includes(p) ? f.privileges.filter(x => x!==p) : [...f.privileges, p]
    }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!form.name || !form.phone || !form.agree){
      setToast('กรุณากรอกชื่อ/เบอร์โทร และยอมรับเงื่อนไข'); return
    }
    const payload = { ...form, createdAt: new Date().toISOString() }
    const res = await Api.submitForm(payload)
    // fallback store
    const existing = load<any[]>('forms', [])
    existing.unshift({ id: cryptoRandomId(), ...payload, persisted: res.persisted ?? false })
    save('forms', existing)
    setSuccess(true)
  }

  return (
    <section id="promo" className="max-w-6xl mx-auto px-4">
      <div className="card p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">ลงทะเบียนรับสิทธิ์พิเศษ</h2>
          <p className="text-foreground/80">แบบฟอร์มจะแสดงทันทีบนหน้าแรก (ไม่ต้องกด) — หลังส่งข้อมูล ระบบจะเก็บไว้หลังบ้าน</p>
        </div>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">ชื่อ-นามสกุล</label>
            <input className="input" placeholder="สมชาย ใจดี" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm mb-1">เบอร์โทร</label>
            <input className="input" placeholder="08x-xxx-xxxx" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm mb-1">อีเมล (ถ้ามี)</label>
            <input className="input" placeholder="name@example.com" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm mb-1">จังหวัด</label>
            <input className="input" placeholder="กรุงเทพฯ" value={form.province} onChange={e=>setForm({...form, province:e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm mb-1">ประเภท</label>
            <select className="select" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
              <option>บ้านเดี่ยว</option>
              <option>ทาวน์โฮม</option>
              <option>รีโนเวท</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">งบประมาณโดยประมาณ</label>
            <select className="select" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})}>
              <option>ต่ำกว่า 2 ล้าน</option>
              <option>2-3 ล้าน</option>
              <option>3-5 ล้าน</option>
              <option>มากกว่า 5 ล้าน</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-2">สิทธิพิเศษที่สนใจ</label>
            <div className="flex flex-wrap gap-2">
              {(['ส่วนลดพิเศษ','อัปเกรดวัสดุฟรี','ผ่อนชำระยืดหยุ่น','ออกแบบปรับแก้ฟรี'] as Priv[]).map(p=>(
                <button key={p} type="button"
                  onClick={()=>togglePrivilege(p)}
                  className={`px-3 py-1 rounded-full border ${form.privileges.includes(p)?'bg-brand text-white border-transparent':'bg-transparent text-foreground border-border'}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <input id="agree" type="checkbox" checked={form.agree} onChange={e=>setForm({...form, agree:e.target.checked})}/>
            <label htmlFor="agree" className="text-sm text-foreground/90">ฉันยินยอมให้ติดต่อกลับตามข้อมูลที่ให้ไว้</label>
          </div>
          <div className="md:col-span-2">
            <button className="btn w-full">ส่งข้อมูลเพื่อรับสิทธิ์</button>
          </div>
        </form>
      </div>

      <Modal open={success} onClose={()=>setSuccess(false)} title="ส่งข้อมูลสำเร็จ 🎉">
        <p className="text-foreground/90">ขอบคุณที่ลงทะเบียน ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
        <div className="mt-4 flex justify-end">
          <button className="btn" onClick={()=>setSuccess(false)}>ปิด</button>
        </div>
      </Modal>
      <Toast text={toast}/>
    </section>
  )
}

function cryptoRandomId() {
  const arr = new Uint8Array(8)
  crypto.getRandomValues(arr)
  return [...arr].map(b => b.toString(16).padStart(2,'0')).join('')
}
