import { useMemo, useState } from 'react'
import { listProjects } from '../utils/db'
import ProjectCard from '../components/ProjectCard'

export default function Portfolio(){
  const all = listProjects()
  const cats = Array.from(new Set(all.map(p => p.category).filter(Boolean)))
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState([])
  function toggle(c){ setSelected(s => s.includes(c) ? s.filter(x=>x!==c) : [...s, c]) }

  const filtered = useMemo(()=>{
    const qq = q.toLowerCase()
    return all.filter(p => {
      const cmatch = !selected.length || selected.includes(p.category)
      const qmatch = !qq || [p.title, p.category, p.location, p.budget, p.area].join(' ').toLowerCase().includes(qq)
      return cmatch && qmatch
    })
  }, [q, selected, all])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">ผลงาน</h1>
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input className="input flex-1" placeholder="ค้นหาผลงาน เช่น มินิมอล, 180 ตร.ม., กรุงเทพ" value={q} onChange={e=>setQ(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            {cats.map(c => {
              const active = selected.includes(c)
              return <button key={c} onClick={()=>toggle(c)} className={"px-3 py-1.5 rounded-full border text-sm " + (active ? 'bg-primary-600 text-white border-primary-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100')}>{c}</button>
            })}
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => <ProjectCard key={p.id} item={p} />)}
      </div>
      {!filtered.length && <div className="text-neutral-500">ยังไม่มีผลงาน</div>}
    </div>
  )
}
