import React, { useEffect, useState } from 'react'

const DEFAULT = [
  { id: 1, name: 'โครงการ A', desc: 'บ้านสองชั้นโมเดิร์น 280 ตร.ม. ย่านบางนา', img: '' },
  { id: 2, name: 'โครงการ B', desc: 'บ้านชั้นเดียว 160 ตร.ม. จ.เชียงใหม่', img: '' },
  { id: 3, name: 'โครงการ C', desc: 'บ้านสไตล์นอร์ดิก 120 ตร.ม. จ.ขอนแก่น', img: '' },
  { id: 4, name: 'โครงการ D', desc: 'ลักชัวรี่พูลวิลล่า 350 ตร.ม. ภูเก็ต', img: '' },
]

export default function Portfolio(){
  const [items, setItems] = useState(DEFAULT)
  useEffect(()=>{
    ;(async () => {
      try {
        const res = await fetch('/api/content')
        if(res.ok){
          const data = await res.json()
          if(Array.isArray(data.portfolio) && data.portfolio.length) setItems(data.portfolio)
        }
      } catch {}
    })()
  }, [])

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>ผลงาน</div>
      <div className="grid cols-3">
        {items.map(x => (
          <div key={x.id || x.name} className="card">
            <div className="badge">โครงการ</div>
            <div style={{fontWeight:800, fontSize:16, marginTop:8}}>{x.name}</div>
            <div style={{color:'#4b5563', marginTop:6}}>{x.desc}</div>
            {x.img && <img src={x.img} alt={x.name} style={{width:'100%', height:180, objectFit:'cover', borderRadius:12, marginTop:10}} />}
          </div>
        ))}
      </div>
    </div>
  )
}
