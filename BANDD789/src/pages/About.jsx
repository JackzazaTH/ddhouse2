import React from 'react'

export default function About(){
  const steps = [
    {t:'1) ปรึกษาและเก็บความต้องการ', d:'กำหนดงบประมาณ ขนาด พื้นที่ และสไตล์'},
    {t:'2) ออกแบบและประเมินราคา', d:'จัดทำแบบสถาปัตย์/วิศวกรรม และเสนอราคา'},
    {t:'3) ขออนุญาตและเซ็นสัญญา', d:'จัดเตรียมเอกสารและยื่นขออนุญาตปลูกสร้าง'},
    {t:'4) ก่อสร้างและควบคุมคุณภาพ', d:'อัปเดตความคืบหน้า ตรวจงานทุกขั้นตอน'},
    {t:'5) ส่งมอบบ้านและรับประกัน', d:'ตรวจรับงาน พร้อมบริการหลังการขาย'},
  ]
  return (
    <div className="grid" style={{gap:18}}>
      <div style={{fontWeight:800, fontSize:24}}>กระบวนการทำงาน</div>
      <div className="grid cols-3">
        {steps.map((s,i)=>(
          <div key={i} className="card">
            <div className="badge">ขั้นตอน</div>
            <div style={{fontWeight:800, fontSize:18, marginTop:8}}>{s.t}</div>
            <div style={{color:'#4b5563', marginTop:6}}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
