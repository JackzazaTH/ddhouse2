import { useEffect, useState } from 'react'

export default function FilterBar({ state, onChange }){
  const [local, setLocal] = useState(state)
  useEffect(()=> setLocal(state), [state])

  function setField(k, v){
    const next = { ...local, [k]: v }
    setLocal(next); onChange?.(next)
  }

  return (
    <div className="card p-4 grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
      <div className="col-span-2 md:col-span-2">
        <label className="label">ช่วงราคา (บาท) ขั้นต่ำ</label>
        <input className="input" type="number" min="0" value={local.minPrice ?? ''} onChange={e=>setField('minPrice', e.target.value ? Number(e.target.value) : undefined)} placeholder="เช่น 2,000,000" />
      </div>
      <div>
        <label className="label">ขั้นสูง</label>
        <input className="input" type="number" min="0" value={local.maxPrice ?? ''} onChange={e=>setField('maxPrice', e.target.value ? Number(e.target.value) : undefined)} placeholder="เช่น 5,000,000" />
      </div>
      <div>
        <label className="label">พื้นที่ใช้สอย (ตร.ม.) ขั้นต่ำ</label>
        <input className="input" type="number" min="0" value={local.minArea ?? ''} onChange={e=>setField('minArea', e.target.value ? Number(e.target.value) : undefined)} placeholder="เช่น 120" />
      </div>
      <div>
        <label className="label">ห้องนอน ≥</label>
        <input className="input" type="number" min="0" value={local.minBeds ?? ''} onChange={e=>setField('minBeds', e.target.value ? Number(e.target.value) : undefined)} placeholder="3" />
      </div>
      <div>
        <label className="label">ห้องน้ำ ≥</label>
        <input className="input" type="number" min="0" value={local.minBaths ?? ''} onChange={e=>setField('minBaths', e.target.value ? Number(e.target.value) : undefined)} placeholder="2" />
      </div>
    </div>
  )
}
