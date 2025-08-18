import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){
  const SITE = import.meta.env.VITE_SITE_NAME || 'BANDD789'
  return (
    <header className="header">
      <div className="header-inner container">
        <div className="brand">
          <div className="brand-badge">B</div>
          <div style={{lineHeight:1}}>
            <div style={{fontSize:18, fontWeight:800}}>{SITE}</div>
            <div style={{fontSize:12, color:'#6b7280'}}>รับสร้างบ้าน ดีไซน์สวย เนี้ยบทุกดีเทล</div>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/" end>หน้าแรก</NavLink>
          <NavLink to="/plans">แบบบ้าน</NavLink>
          <NavLink to="/portfolio">ผลงาน</NavLink>
          <NavLink to="/reviews">รีวิวลูกค้า</NavLink>
          <NavLink to="/faq">คำถามที่พบบ่อย</NavLink>
          <NavLink to="/about">กระบวนการ</NavLink>
          <NavLink to="/contact">ติดต่อ</NavLink>
          <NavLink to="/calculator">คำนวณงบ</NavLink>
          <NavLink to="/appointment">นัดหมาย</NavLink>
          <NavLink to="/blog">บทความ</NavLink>
          <NavLink to="/admin">หลังบ้าน</NavLink>
        </nav>
      </div>
    </header>
  )
}
