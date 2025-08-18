
import React from 'react'

const items = [
  {img:'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop', name:'Modern Minimal'},
  {img:'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop', name:'Tropical Breeze'},
  {img:'https://images.unsplash.com/photo-1525973132219-a04334a76080?q=80&w=1200&auto=format&fit=crop', name:'Loft Warmth'},
  {img:'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop', name:'Resort Lake'}
]

export default function Portfolio(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">ผลงาน</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it,i)=>(
          <div className="overflow-hidden rounded-2xl shadow group" key={i}>
            <img src={it.img} alt={it.name} className="h-56 w-full object-cover group-hover:scale-105 transition-transform"/>
            <div className="p-3">{it.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
