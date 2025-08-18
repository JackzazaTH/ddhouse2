import React from 'react'
export default function NotFound(){
  return (
    <div className="grid" style={{gap:18, textAlign:'center'}}>
      <div style={{fontWeight:800, fontSize:28}}>ไม่พบหน้าที่ต้องการ (404)</div>
      <a className="btn" href="/">กลับหน้าแรก</a>
    </div>
  )
}
