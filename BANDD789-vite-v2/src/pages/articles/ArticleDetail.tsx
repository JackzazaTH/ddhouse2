import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { decodeSlug } from '../../utils/slug'

export default function ArticleDetail(){
  const { slug } = useParams()
  const s = decodeSlug(slug || '')
  return (
    <div className="container section">
      <Helmet>
        <title>{s} | บทความ — BANDD789</title>
        <meta property="og:title" content={`${s} | บทความ — BANDD789`} />
      </Helmet>
      <h1 style={{marginTop:0}}>{s}</h1>
      <p className="muted">เผยแพร่ 19 สิงหาคม 2025 • หมวด: ความรู้</p>
      <div className="card">
        <p>นี่คือเนื้อหาตัวอย่างสำหรับบทความ <strong>{s}</strong> คุณสามารถแก้ไข/เพิ่มรูป/ใส่หัวข้อย่อยได้จากหลังบ้าน และระบบจะอัปเดตเมตาแท็กสำหรับ SEO ให้อัตโนมัติในหน้านี้</p>
      </div>
    </div>
  )
}
