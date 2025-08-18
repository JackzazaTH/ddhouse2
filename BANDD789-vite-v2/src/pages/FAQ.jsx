import { useState } from 'react'
import { FAQS } from '../data/faqs'

export default function FAQ(){
  const [open, setOpen] = useState(null)
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">คำถามที่พบบ่อย</h1>
      <div className="mt-4 space-y-3">
        {FAQS.map((f,i) => (
          <div key={i} className="card p-4">
            <button className="w-full text-left font-semibold flex items-center justify-between" onClick={()=>setOpen(open===i ? null : i)}>
              <span>{f.q}</span> <span>{open===i ? '–' : '+'}</span>
            </button>
            {open===i && <p className="mt-2 text-neutral-700">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
