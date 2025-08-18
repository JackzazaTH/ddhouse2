import { useState } from 'react'
import Modal from '../components/Modal'
import { PORTFOLIO } from '../data/portfolio'

export default function Portfolio(){
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">ผลงาน</h1>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO.map(item => (
          <div key={item.id} className="card p-4 cursor-pointer" onClick={()=>{ setActive(item); setOpen(true) }}>
            <div className="aspect-video rounded-2xl bg-neutral-100 grid place-items-center text-neutral-500">{item.title}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="font-semibold">{item.title}</div>
              <span className="badge">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} title={active?.title ?? 'รายละเอียด'} wide>
        <p className="text-neutral-700">ภาพตัวอย่างและรายละเอียดโครงการจะถูกแสดงใน POPUP นี้</p>
      </Modal>
    </div>
  )
}
