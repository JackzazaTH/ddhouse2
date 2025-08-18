import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PopupForm from '../components/PopupForm.jsx'
import Modal from '../components/Modal.jsx'

export default function Home(){
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(()=>{
    // Auto open popup form after short delay
    const t = setTimeout(()=> setOpen(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(()=>{
    ;(async () => {
      try {
        const res = await fetch('/api/content')
        if(res.ok){
          const data = await res.json()
          setContent(data)
          document.documentElement.style.setProperty('--theme-color', data.themeColor || '#B30000')
        } else {
          setContent(null)
        }
      } catch {}
    })()
  }, [])

  const heroTitle = content?.heroTitle || 'สร้างบ้านในฝันกับ BANDD789'
  const heroSub = content?.heroSub || 'รับสร้างบ้านคุณภาพ งานเนี้ยบ วัสดุพรีเมียม บริการครบจบในที่เดียว'
  const bullets = content?.bullets || ['ทีมสถาปนิกมืออาชีพ', 'รับประกันงานก่อสร้าง', 'ผ่อนสบาย วางแผนงบประมาณได้']

  return (
    <div className="grid" style={{gap:28}}>
      <section className="hero">
        <div>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.35}}>
            <div className="badge">BANDD789 • รับสร้างบ้าน</div>
            <h1 style={{marginTop:10}}>{heroTitle}</h1>
            <p style={{marginTop:10}}>{heroSub}</p>
            <ul style={{margin:'12px 0 18px', paddingLeft:18, color:'#374151'}}>
              {bullets.map((b,i)=> <li key={i}>• {b}</li>)}
            </ul>
            <div className="hero-cta">
              <button className="btn" onClick={()=>setOpen(true)}>ขอใบเสนอราคา</button>
              <button className="btn ghost" onClick={()=>setDetailOpen(true)}>รายละเอียดบริการ</button>
            </div>
          </motion.div>
        </div>
        <motion.div className="hero-img" initial={{scale:.96, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:.4}}>
          BANDD789
        </motion.div>
      </section>

      <div className="card" style={{position:'sticky', bottom:12}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,flexWrap:'wrap'}} className="sticky-cta">
          <div style={{fontWeight:800}}>รับสิทธิ์พิเศษเดือนนี้ • ส่วนลด/อัพเกรดวัสดุ</div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={()=>setOpen(true)}>รับสิทธิ์เลย</button>
            <a className="btn ghost" href="/book">นัดหมายปรึกษา</a>
          </div>
        </div>
      </div>

      <section className="grid cols-3">
        {[
          {t:'ดีไซน์โมเดิร์น', d:'เลือกแบบบ้านที่ใช่ ปรับแก้ได้ตามงบประมาณ'},
          {t:'วัสดุพรีเมียม', d:'มาตรฐานงานก่อสร้างระดับสูง เช็กได้ทุกขั้นตอน'},
          {t:'บริการครบ', d:'ตั้งแต่งานออกแบบ ก่อสร้าง จนส่งมอบบ้าน'},
        ].map((x,i)=> (
          <motion.div key={i} className="card" initial={{y:8, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{ once: true }} transition={{delay:i*0.05}}>
            <div className="badge">จุดเด่น</div>
            <div style={{fontWeight:800, fontSize:18, marginTop:10}}>{x.t}</div>
            <div style={{color:'#4b5563', marginTop:6}}>{x.d}</div>
          </motion.div>
        ))}
      </section>

      <div className="card" style={{position:'sticky', bottom:12}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,flexWrap:'wrap'}} className="sticky-cta">
          <div style={{fontWeight:800}}>รับสิทธิ์พิเศษเดือนนี้ • ส่วนลด/อัพเกรดวัสดุ</div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={()=>setOpen(true)}>รับสิทธิ์เลย</button>
            <a className="btn ghost" href="/book">นัดหมายปรึกษา</a>
          </div>
        </div>
      </div>

      <section className="card">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight:800, fontSize:20}}>แบบบ้านแนะนำ</div>
          <a className="btn ghost" href="/plans">ดูทั้งหมด</a>
        </div>
        <div className="grid cols-3" style={{marginTop:14}}>
          {[
            {name:'BH-101 โมเดิร์นชั้นเดียว', bed:3, bath:2, area:160},
            {name:'BH-202 สองชั้นลักชัวรี่', bed:4, bath:4, area:280},
            {name:'BH-305 โมเดิร์นเรียบหรู', bed:3, bath:3, area:220},
          ].map((p,i)=> (
            <div className="card" key={i}>
              <div className="badge">ใหม่</div>
              <div style={{fontWeight:800, fontSize:16, marginTop:8}}>{p.name}</div>
              <div style={{color:'#4b5563', marginTop:6}}>{p.bed} ห้องนอน • {p.bath} ห้องน้ำ • {p.area} ตร.ม.</div>
              <div style={{marginTop:10, display:'flex', gap:8}}>
                <a className="btn" href="/plans">ดูรายละเอียด</a>
                <button className="btn ghost" onClick={()=>setOpen(true)}>ขอราคา</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="card" style={{position:'sticky', bottom:12}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,flexWrap:'wrap'}} className="sticky-cta">
          <div style={{fontWeight:800}}>รับสิทธิ์พิเศษเดือนนี้ • ส่วนลด/อัพเกรดวัสดุ</div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={()=>setOpen(true)}>รับสิทธิ์เลย</button>
            <a className="btn ghost" href="/book">นัดหมายปรึกษา</a>
          </div>
        </div>
      </div>

      <PopupForm open={open} onClose={()=>setOpen(false)} />

      <Modal open={detailOpen} onClose={()=>setDetailOpen(false)} title="รายละเอียดบริการ">
        <div className="grid cols-2">
          <div>
            <div className="label">สิ่งที่คุณจะได้รับ</div>
            <ul style={{margin:0, paddingLeft:18, color:'#374151'}}>
              <li>ที่ปรึกษาโครงการและประเมินงบประมาณ</li>
              <li>ออกแบบสถาปัตยกรรม/โครงสร้าง/งานระบบ</li>
              <li>ควบคุมคุณภาพวัสดุและงานก่อสร้าง</li>
              <li>รับประกันโครงสร้างและบริการหลังการขาย</li>
            </ul>
          </div>
          <div>
            <div className="label">ระยะเวลาดำเนินงาน (ประมาณ)</div>
            <ul style={{margin:0, paddingLeft:18, color:'#374151'}}>
              <li>ออกแบบและขออนุญาต 30-60 วัน</li>
              <li>ก่อสร้าง 6-12 เดือนตามขนาดบ้าน</li>
              <li>ตรวจรับและส่งมอบ พร้อมรับประกัน</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}
