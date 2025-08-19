import React, { useState } from 'react'
import Modal from './Modal'

function HouseCard({ item }){
  const [open, setOpen] = useState(false)
  return (
    <div className="card overflow-hidden">
      <img src={item.img} alt={item.name} loading="lazy" className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-neutral-600 mt-1">{item.category} • {item.area} ตร.ม. • {item.beds} นอน • {item.baths} น้ำ • จอด {item.parking}</div>
        <div className="mt-2 font-bold text-primary-700">{item.price.toLocaleString()} บาท</div>
        <div className="mt-3"><button className="btn-outline" onClick={()=>setOpen(true)}>ดูรายละเอียด</button></div>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} title={item.name} wide>
        <div className="grid md:grid-cols-2 gap-4">
          <img src={item.img} alt={item.name} className="w-full max-h-[50vh] object-cover rounded-xl" />
          <div>
            <div className="font-semibold">{item.category}</div>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700">
              <li>พื้นที่ใช้สอย: {item.area} ตร.ม.</li>
              <li>ห้องนอน: {item.beds} ห้อง</li>
              <li>ห้องน้ำ: {item.baths} ห้อง</li>
              <li>ที่จอดรถ: {item.parking} คัน</li>
              <li>ราคาโดยประมาณ: {item.price.toLocaleString()} บาท</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(HouseCard)
