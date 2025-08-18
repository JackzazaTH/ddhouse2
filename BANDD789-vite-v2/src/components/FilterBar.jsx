import { useEffect, useState } from 'react'
import DualRange from './DualRange'

export default function FilterBar({ state, onChange, categories=[], selectedCats=[], onToggleCat }){
  const [local, setLocal] = useState(state)
  useEffect(()=> setLocal(state), [state])

  function setField(k, v){
    const next = { ...local, [k]: v }
    setLocal(next); onChange?.(next)
  }

  const price = local.price ?? { min: local.minPrice ?? 0, max: local.maxPrice ?? 10000000 }
  const area  = local.area  ?? { min: local.minArea  ?? 0, max: local.maxArea  ?? 500 }
  const minBeds  = local.minBeds ?? 0
  const minBaths = local.minBaths ?? 0
  const minPark  = local.minParking ?? 0

  return (
    <div className="card p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-2xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <label className="label">ช่วงราคา (บาท)</label>
            <div className="text-sm text-neutral-600">{price.min.toLocaleString()} - {price.max.toLocaleString()}</div>
          </div>
          <div className="mt-2"><DualRange min={0} max={10000000} step={50000} value={price} onChange={v=>setField('price', v)} /></div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input className="input" type="number" min="0" value={price.min} onChange={e=>setField('price', { ...price, min: Number(e.target.value)||0 })} />
            <input className="input" type="number" min="0" value={price.max} onChange={e=>setField('price', { ...price, max: Number(e.target.value)||0 })} />
          </div>
        </div>

        <div className="p-3 rounded-2xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <label className="label">พื้นที่ใช้สอย (ตร.ม.)</label>
            <div className="text-sm text-neutral-600">{area.min} - {area.max} ตร.ม.</div>
          </div>
          <div className="mt-2"><DualRange min={0} max={500} step={10} value={area} onChange={v=>setField('area', v)} /></div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <input className="input" type="number" min="0" value={area.min} onChange={e=>setField('area', { ...area, min: Number(e.target.value)||0 })} />
            <input className="input" type="number" min="0" value={minBeds} onChange={e=>setField('minBeds', Number(e.target.value)||0)} placeholder="ห้องนอน ≥" />
            <input className="input" type="number" min="0" value={minBaths} onChange={e=>setField('minBaths', Number(e.target.value)||0)} placeholder="ห้องน้ำ ≥" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-2xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <label className="label">ที่จอดรถขั้นต่ำ</label>
            <div className="text-sm text-neutral-600">{minPark} คัน</div>
          </div>
          <input className="w-full mt-2" type="range" min="0" max="4" step="1" value={minPark} onChange={e=>setField('minParking', Number(e.target.value))} />
        </div>

        <div className="p-3 rounded-2xl border border-neutral-200">
          <label className="label">สไตล์ (กดเพื่อเลือก)</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map(cat => {
              const active = selectedCats.includes(cat)
              return (
                <button key={cat} onClick={()=>onToggleCat?.(cat)}
                  className={"px-3 py-1.5 rounded-full text-sm border transition " + (active ? 'bg-primary-600 text-white border-primary-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100')}>
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
