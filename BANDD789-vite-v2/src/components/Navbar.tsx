import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="dot" />
          <span>BANDD789</span>
        </Link>
        <nav className="nav-links" aria-label="primary">
          <NavLink to="/แบบบ้าน" className={({isActive})=> isActive ? 'active' : ''}>แบบบ้าน</NavLink>
          <NavLink to="/ผลงาน" className={({isActive})=> isActive ? 'active' : ''}>ผลงาน</NavLink>
          <NavLink to="/รีวิวลูกค้า" className={({isActive})=> isActive ? 'active' : ''}>รีวิวลูกค้า</NavLink>
          <NavLink to="/บทความ" className={({isActive})=> isActive ? 'active' : ''}>บทความ</NavLink>
          <NavLink to="/คำถามที่พบบ่อย" className={({isActive})=> isActive ? 'active' : ''}>FAQ</NavLink>
          <NavLink to="/admin" className={({isActive})=> isActive ? 'active' : ''}>หลังบ้าน</NavLink>
        </nav>
      </div>
    </div>
  )
}
