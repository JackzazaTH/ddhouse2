import { useEffect, useMemo, useRef, useState } from 'react'

export default function SearchBar({ value, onChange, categories, selectedCats, onToggleCat }){
  const [q, setQ] = useState(value ?? '')
  const debounced = useDebounce(q, 200)
  useEffect(()=>{ onChange?.(debounced) }, [debounced])

  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <input
          className="input flex-1"
          placeholder="ค้นหาแบบบ้าน เช่น มินิมอล, 3 ห้องนอน, 180 ตร.ม."
          value={q}
          onChange={e=> setQ(e.target.value)}
        />
        <button onClick={()=>onChange?.(q)} className="btn-primary">ค้นหา</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map(cat => {
          const active = selectedCats.includes(cat)
          return (
            <button key={cat} onClick={()=>onToggleCat?.(cat)}
              className={"px-3 py-1 rounded-full text-sm border " + (active ? 'bg-primary-600 text-white border-primary-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100')}>
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function useDebounce(value, delay=200){
  const [v, setV] = useState(value)
  useEffect(()=>{
    const t = setTimeout(()=> setV(value), delay)
    return ()=> clearTimeout(t)
  }, [value, delay])
  return v
}
