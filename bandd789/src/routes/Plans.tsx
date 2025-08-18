import { useEffect, useMemo, useState } from 'react'
import { samplePlans, type Plan } from '@/data/sample'
import PlanCard from '@/components/PlanCard'
import Modal from '@/components/Modal'
import SearchBar from '@/components/SearchBar'

export default function Plans(){
  const [plans, setPlans] = useState<Plan[]>(samplePlans)
  const [q, setQ] = useState('')
  const [styles, setStyles] = useState<string[]>([])
  const [active, setActive] = useState<Plan | null>(null)

  const filtered = useMemo(()=>{
    return plans.filter(p => {
      const text = (p.name + ' ' + p.style + ' ' + p.tags.join(' ')).toLowerCase()
      const matchQ = text.includes(q.toLowerCase())
      const matchStyle = styles.length ? styles.includes(p.style) : true
      return matchQ && matchStyle
    })
  }, [plans, q, styles])

  const toggleStyle = (s: string) => setStyles(arr => arr.includes(s) ? arr.filter(x=>x!==s) : [...arr, s])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">รวมแบบบ้าน</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-3">
          <SearchBar q={q} setQ={setQ} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Modern','Classic','Minimal','Luxury'].map(s=> (
            <button key={s} onClick={()=>toggleStyle(s)}
              className={styles.includes(s) ? 'btn' : 'btn-ghost'}>{s}</button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(p => <PlanCard key={p.id} plan={p} onClick={()=>setActive(p)}/>)}
      </div>

      <Modal open={!!active} onClose={()=>setActive(null)} title={active?.name}>
        {active && (
          <div className="space-y-2">
            <img src={active.image} alt={active.name} className="w-full h-48 object-cover rounded-xl border border-border" />
            <div className="text-sm text-foreground/90">
              สไตล์: {active.style} • {active.bedrooms} ห้องนอน • {active.bathrooms} ห้องน้ำ • {active.areaSqm} ตร.ม.
            </div>
            <div className="font-semibold text-brand">{active.priceTHB.toLocaleString()} ฿</div>
            <p className="text-foreground/80">ดีไซน์โปร่งโล่ง เน้นฟังก์ชั่นใช้งานจริง เหมาะกับครอบครัวยุคใหม่</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
