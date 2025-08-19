import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
export default function FAQ(){
  const [open, setOpen] = useState<number|null>(0)
  const items = [
    {q:'ใช้เวลาสร้างบ้านกี่เดือน?', a:'โดยเฉลี่ย 6–12 เดือน ขึ้นกับขนาดและรายละเอียดแบบ'},
    {q:'มีรับประกันหรือไม่?', a:'รับประกันโครงสร้าง 10 ปี ระบบภายใน 1–2 ปี'},
    {q:'สามารถปรับแบบได้แค่ไหน?', a:'ปรับได้ยืดหยุ่นตามงบและความต้องการของลูกค้า'}
  ]
  return (
    <div className="container section">
      <Helmet><title>คำถามที่พบบ่อย | BANDD789</title></Helmet>
      <h1 style={{marginTop:0}}>คำถามที่พบบ่อย</h1>
      <div className="cards">
        {items.map((it,i)=>(
          <div key={i} className="card" onClick={()=> setOpen(open===i?null:i)} style={{cursor:'pointer'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3 style={{margin:0}}>{it.q}</h3>
              <span className="badge">{open===i?'-':'+'}</span>
            </div>
            {open===i && <p className="muted" style={{marginTop:10}}>{it.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
