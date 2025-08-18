import React, { useState } from 'react'
import PopupForm from '../components/PopupForm.jsx'

export default function Contact(){
  const [open, setOpen] = useState(false)
  return (
    <div className="grid" style={{gap:18}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontWeight:800, fontSize:24}}>ติดต่อเรา</div>
        <button className="btn" onClick={()=>setOpen(true)}>ขอใบเสนอราคา</button>
      </div>
      <div className="grid cols-2">
        <div className="card">
          <div className="label">ที่อยู่</div>
          <div>123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110</div>
          <div style={{marginTop:10}}>
            โทร 02-XXX-XXXX<br/>อีเมล hello@bandd789.com<br/>เวลาทำการ 09:00-18:00 น. (จ.-ส.)
          </div>
        </div>
        <div className="card">
          <div className="label">แผนที่ (ตัวอย่าง)</div>
          <iframe title="map" style={{width:'100%', height:280, border:0, borderRadius:12}}
            src="https://maps.google.com/maps?q=bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
      <PopupForm open={open} onClose={()=>setOpen(false)} />
    </div>
  )
}
