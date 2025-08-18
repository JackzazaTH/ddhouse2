import React, { useEffect, useState } from 'react'

const DEFAULT_FAQ = [
  { q: 'งบประมาณเริ่มต้นเท่าไร?', a: 'ขึ้นกับขนาดบ้านและวัสดุ โดยทั่วไปเริ่มต้นราว ๆ 2 ล้านบาท' },
  { q: 'ใช้เวลาก่อสร้างนานแค่ไหน?', a: 'ประมาณ 6-12 เดือนตามขนาดและความซับซ้อน' },
  { q: 'สามารถปรับแบบบ้านได้ไหม?', a: 'ปรับได้ตามความต้องการและงบประมาณ' },
]

export default function FAQ(){
  const [faq, setFaq] = useState(DEFAULT_FAQ)

  useEffect(()=>{
    ;(async () => {
      try {
        const res = await fetch('/api/content')
        if(res.ok){
          const data = await res.json()
          if (Array.isArray(data.faq)) setFaq(data.faq)
        }
      } catch {}
    })()
  }, [])

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>คำถามที่พบบ่อย</div>
      <div className="grid cols-2">
        {faq.map((x, i) => (
          <div key={i} className="card">
            <div style={{fontWeight:800}}>{x.q}</div>
            <div style={{color:'#4b5563', marginTop:6}}>{x.a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
