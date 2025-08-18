import { useEffect, useState } from 'react'
import { Api } from '@/lib/api'
import { load, save } from '@/lib/local'

type Review = { name: string; rating: number; text: string }

export default function Reviews(){
  const [items, setItems] = useState<Review[]>(load('reviews',[
    { name: 'คุณนิดา', rating: 5, text: 'ทีมงานมืออาชีพ งานเนี้ยบ ส่งมอบตรงเวลา ประทับใจมากค่ะ' },
    { name: 'คุณเอก', rating: 4, text: 'ดีไซน์สวย ใช้งานจริง ลงรายละเอียดครบถ้วน' },
    { name: 'คุณฟ้า', rating: 5, text: 'ฟังก์ชั่นจัดวางดี เหมาะกับครอบครัวเรา' },
  ]))

  useEffect(()=>{ save('reviews', items)}, [items])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">รีวิวลูกค้า</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((r,i)=>(
          <div key={i} className="card p-5">
            <div className="font-semibold text-white">{r.name}</div>
            <div className="text-brand">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
            <p className="text-foreground/80 mt-2">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
