import { useEffect, useState } from 'react'
import { load, save } from '@/lib/local'

type QA = { q: string; a: string }

export default function FAQ(){
  const [items, setItems] = useState<QA[]>(load('faq',[
    { q: 'เริ่มต้นอย่างไร?', a: 'ลงทะเบียนในหน้าแรกเพื่อรับคำปรึกษาฟรี ทีมงานจะติดต่อกลับโดยเร็ว' },
    { q: 'ใช้เวลาก่อสร้างนานไหม?', a: 'โดยเฉลี่ย 6-12 เดือน ขึ้นกับขนาดและรายละเอียดงาน' },
    { q: 'รับปรับแบบได้หรือไม่?', a: 'สามารถปรับแก้แบบตามฟังก์ชั่นที่ต้องการได้' },
  ]))

  useEffect(()=>{ save('faq', items)}, [items])

  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">คำถามที่พบบ่อย</h1>
      <div className="space-y-3">
        {items.map((it, idx)=>(
          <div key={idx} className="card">
            <button className="w-full text-left px-4 py-3 font-semibold text-white" onClick={()=>setOpen(open===idx?null:idx)}>
              {it.q}
            </button>
            {open===idx && <div className="px-4 pb-4 text-foreground/80">{it.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
