
import React from 'react'

const reviews = [
  {name:'คุณนัท', msg:'ทีมงานดูแลดีมาก งานเรียบร้อยและตรงเวลา'},
  {name:'คุณแนน', msg:'แบบบ้านสวย ใช้งานได้จริง ครอบครัวชอบค่ะ'},
  {name:'คุณบอล', msg:'งบโปร่งใส งานเนี๊ยบ คุณภาพสมราคา'}
]

export default function Reviews(){
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">รีวิวลูกค้า</h1>
      <div className="space-y-3">
        {reviews.map((r,i)=>(
          <div className="card" key={i}>
            <div className="font-semibold">{r.name}</div>
            <div className="text-neutral-700 text-sm">{r.msg}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
