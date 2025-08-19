import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { encodeSlug } from '../../utils/slug'

const articles = [
  {title:'คู่มือสร้างบ้านมินิมอล เริ่มต้นอย่างไรดี', slug:'คู่มือสร้างบ้านมินิมอล-เริ่มต้นอย่างไรดี', tag:'ความรู้', excerpt:'สรุปขั้นตอนและงบประมาณเบื้องต้น'},
  {title:'เลือกผู้รับเหมาอย่างไรให้ปลอดภัย', slug:'เลือกผู้รับเหมาอย่างไรให้ปลอดภัย', tag:'ทิปส์', excerpt:'เช็กลิสต์เอกสารและข้อควรรู้'},
  {title:'ออกแบบพื้นที่จอดรถให้พอดีการใช้งาน', slug:'ออกแบบพื้นที่จอดรถให้พอดีการใช้งาน', tag:'ไอเดีย', excerpt:'แนะนำขนาดและการเว้นระยะ'},
]

export default function Articles(){
  return (
    <div className="container section">
      <Helmet>
        <title>บทความ | BANDD789</title>
        <meta name="description" content="บทความ ความรู้ ทิปส์ และไอเดียเกี่ยวกับการสร้างบ้าน พร้อม URL ภาษาไทยเพื่อ SEO" />
      </Helmet>
      <h1 style={{marginTop:0}}>บทความ</h1>
      <div className="cards">
        {articles.map(a=>(
          <article key={a.slug} className="card">
            <div className="badge">{a.tag}</div>
            <h3 style={{margin:'8px 0'}}>{a.title}</h3>
            <p className="muted">{a.excerpt}</p>
            <Link to={`/บทความ/${encodeSlug(a.slug)}`} aria-label={`อ่าน: ${a.title}`}><button>อ่านต่อ</button></Link>
          </article>
        ))}
      </div>
    </div>
  )
}
