import React, { useEffect, useState } from 'react'

const DEFAULT = [
  { id: 1, name: 'คุณเอ', text: 'งานละเอียด ทีมงานดูแลดีตั้งแต่ต้นจนจบ' },
  { id: 2, name: 'คุณบี', text: 'ออกแบบสวย ตรงใจ ครอบครัวชอบมาก' },
  { id: 3, name: 'คุณซี', text: 'บริการหลังการขายดีเยี่ยม แนะนำเลย' },
]

export default function Reviews(){
  const [items, setItems] = useState(DEFAULT)
  useEffect(()=>{
    ;(async () => {
      try {
        const res = await fetch('/api/content')
        if(res.ok){
          const data = await res.json()
          if(Array.isArray(data.reviews) && data.reviews.length) setItems(data.reviews)
        }
      } catch {}
    })()
  }, [])

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>รีวิวลูกค้า</div>
      <div className="grid cols-3">
        {items.map(x => (
          <div key={x.id || x.name} className="card">
            <div className="badge">รีวิว</div>
            <div style={{fontWeight:800, fontSize:16, marginTop:8}}>{x.name}</div>
            <div style={{color:'#4b5563', marginTop:6}}>"{x.text}"</div>
          </div>
        ))}
      </div>
    </div>
  )
}
