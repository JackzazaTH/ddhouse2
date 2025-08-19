import { useState } from 'react'
import DualRange from './DualRange'

export default function FilterBar({ state={}, onChange }){
  const [local, setLocal] = useState({
    price: state.price || { min: 0, max: 10000000 },
    area: state.area || { min: 60, max: 500 },
    minBeds: state.minBeds || 0,
    minBaths: state.minBaths || 0,
    minParking: state.minParking || 0,
  })

  function setPatch(p){
    const next = { ...local, ...p }
    setLocal(next)
    onChange?.(next)
  }

  return (
    <div className="card p-4 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label">ช่วงราคา (บาท)</label>
            <div className="text-sm text-neutral-600">{local.price.min.toLocaleString()} - {local.price.max.toLocaleString()}</div>
          </div>
          <DualRange min={0} max={10000000} step={50000} value={local.price} onChange={v=>setPatch({ price: v })} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label">พื้นที่ใช้สอย (ตร.ม.)</label>
            <div className="text-sm text-neutral-600">{local.area.min} - {local.area.max}</div>
          </div>
          <DualRange min={60} max={500} step={10} value={local.area} onChange={v=>setPatch({ area: v })} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="label">ขั้นต่ำ ห้องนอน</label>
          <select className="input" value={local.minBeds} onChange={e=>setPatch({ minBeds: Number(e.target.value) })}>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? 'ไม่กำหนด' : `อย่างน้อย ${n}`}</option>)}
          </select>
        </div>
        <div>
          <label className="label">ขั้นต่ำ ห้องน้ำ</label>
          <select className="input" value={local.minBaths} onChange={e=>setPatch({ minBaths: Number(e.target.value) })}>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? 'ไม่กำหนด' : `อย่างน้อย ${n}`}</option>)}
          </select>
        </div>
        <div>
          <label className="label">ขั้นต่ำ ที่จอดรถ</label>
          <select className="input" value={local.minParking} onChange={e=>setPatch({ minParking: Number(e.target.value) })}>
            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n === 0 ? 'ไม่กำหนด' : `อย่างน้อย ${n}`}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
