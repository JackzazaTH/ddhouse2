
import React from 'react'

const faqs = [
  {q:'งบประมาณเริ่มต้นเท่าไหร่?', a:'โดยทั่วไปเริ่มต้นประมาณ 2-3 ล้านบาท ขึ้นกับขนาดและวัสดุ'},
  {q:'ระยะเวลาก่อสร้างกี่เดือน?', a:'ประมาณ 6-10 เดือน แล้วแต่ขนาดและความซับซ้อนของแบบ'},
  {q:'สามารถปรับแบบได้หรือไม่?', a:'ปรับได้ตามงบ ประโยชน์ใช้สอย และข้อจำกัดที่ดิน'}
]

export default function FAQ(){
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">คำถามที่พบบ่อย</h1>
      <div className="space-y-3">
        {faqs.map((f,i)=>(
          <details key={i} className="card">
            <summary className="font-semibold cursor-pointer">{f.q}</summary>
            <div className="text-sm text-neutral-700 mt-2">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  )
}
