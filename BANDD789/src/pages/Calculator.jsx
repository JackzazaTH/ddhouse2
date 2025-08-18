import React, { useState } from 'react'

export default function Calculator(){
  const [area, setArea] = useState(150)
  const [quality, setQuality] = useState('standard')

  const pricePer = { basic:12000, standard:15000, premium:20000 }
  const est = area * pricePer[quality]

  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>คำนวณงบประมาณเบื้องต้น</div>
      <div className="card grid cols-2">
        <div>
          <div className="label">พื้นที่ใช้สอย (ตร.ม.)</div>
          <input type="number" className="input" value={area} onChange={e=>setArea(Number(e.target.value))} />
        </div>
        <div>
          <div className="label">คุณภาพวัสดุ</div>
          <select className="select" value={quality} onChange={e=>setQuality(e.target.value)}>
            <option value="basic">ประหยัด</option>
            <option value="standard">มาตรฐาน</option>
            <option value="premium">พรีเมียม</option>
          </select>
        </div>
      </div>
      <div className="card">
        <div>งบประมาณโดยประมาณ:</div>
        <div style={{fontWeight:800, fontSize:20, color:'var(--primary)'}}>{est.toLocaleString()} บาท</div>
      </div>
    </div>
  )
}
