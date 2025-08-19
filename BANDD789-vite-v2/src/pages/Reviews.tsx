import React from 'react'
import { Helmet } from 'react-helmet-async'
export default function Reviews(){
  return (
    <div className="container section">
      <Helmet><title>รีวิวลูกค้า | BANDD789</title></Helmet>
      <h1 style={{marginTop:0}}>รีวิวลูกค้า</h1>
      <div className="cards">
        {['บริการดีมาก ประทับใจ','ทีมงานมืออาชีพ สื่อสารชัดเจน','งานละเอียด คุ้มค่ากับราคา'].map((t,i)=>(
          <div key={i} className="card">
            <p style={{fontSize:18, fontWeight:700}}>“{t}”</p>
            <p className="muted">— คุณลูกค้า #{i+1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
