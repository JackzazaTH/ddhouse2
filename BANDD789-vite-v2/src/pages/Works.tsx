import React from 'react'
import { Helmet } from 'react-helmet-async'
export default function Works(){
  return (
    <div className="container section">
      <Helmet><title>ผลงาน | BANDD789</title></Helmet>
      <h1 style={{marginTop:0}}>ผลงาน</h1>
      <div className="cards">
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} className="card">
            <img src={`https://picsum.photos/seed/work${i}/800/480`} alt={`work-${i}`} loading="lazy" style={{borderRadius:14, width:'100%', height:160, objectFit:'cover'}} />
            <h3>โครงการบ้านตัวอย่าง #{i+1}</h3>
            <p className="muted">งานก่อสร้างคุณภาพ ส่งมอบตรงเวลา รับประกันโครงสร้าง</p>
          </div>
        ))}
      </div>
    </div>
  )
}
