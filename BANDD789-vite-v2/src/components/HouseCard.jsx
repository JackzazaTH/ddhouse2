import { useState } from 'react'
import Modal from './Modal'

export default function HouseCard({ item }){
  const [open, setOpen] = useState(false)
  return (
    <div className="card p-4 flex flex-col">
      <div className="aspect-[4/3] rounded-2xl bg-neutral-100 overflow-hidden grid place-items-center text-neutral-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" className="w-full h-full">
          <rect width="200" height="150" fill="#f3f4f6"/>
          <polygon points="20,80 100,20 180,80" fill="#fecdd3"/>
          <rect x="40" y="80" width="120" height="60" fill="#fff1f2"/>
          <rect x="85" y="100" width="30" height="40" fill="#e11d48"/>
        </svg>
      </div>
      <div className="mt-3 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">{item.name}</h3>
          <span className="badge">{item.category}</span>
        </div>
        <div className="mt-1 text-sm text-neutral-600">พื้นที่ใช้สอย {item.area} ตร.ม. • {item.beds} ห้องนอน • {item.baths} ห้องน้ำ</div>
        <div className="mt-1 font-semibold text-primary-700">เริ่มต้น {item.price.toLocaleString()} บาท</div>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="btn-primary flex-1" onClick={()=>setOpen(true)}>ดูรายละเอียด</button>
        <a href="/แบบบ้าน" className="btn-outline">ดูทั้งหมด</a>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={item.name} wide>
        <p className="text-neutral-700">{item.description}</p>
        <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          <li className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">พื้นที่ใช้สอย {item.area} ตร.ม.</li>
          <li className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">{item.beds} ห้องนอน</li>
          <li className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">{item.baths} ห้องน้ำ</li>
          <li className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">ที่จอดรถ {item.parking} คัน</li>
          <li className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">สไตล์ {item.category}</li>
        </ul>
      </Modal>
    </div>
  )
}
