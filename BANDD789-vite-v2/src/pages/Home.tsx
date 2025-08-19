import React, { useState } from 'react'
import Carousel from '../components/Carousel'
import Toast from '../components/Toast'
import { storage } from '../utils/storage'
import { Helmet } from 'react-helmet-async'

export default function Home(){
  const [showToast, setShowToast] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const record = Object.fromEntries(fd.entries())
    const leads = storage.get('leads', [])
    leads.push({ id: Date.now(), ...record })
    storage.set('leads', leads)
    setShowToast(true)
    setTimeout(()=> setShowToast(false), 2000)
    e.currentTarget.reset()
    window.scrollTo({top:0, behavior:'smooth'})
  }

  return (
    <>
      <Helmet>
        <title>BANDD789 — รับสิทธิ์พิเศษ สร้างบ้านวันนี้</title>
        <meta name="description" content="ฟอร์มรับสิทธิ์อยู่หน้าแรกทันที ไม่ต้องกด ปรับดีไซน์มินิมอล แอนิเมชันลื่นไหล" />
      </Helmet>
      <div className="container">
        <section className="hero">
          <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop" alt="modern home" />
          <div className="hero-overlay">
            <div>
              <h1 style={{fontSize:36, margin:0, fontWeight:900}}>รับสร้างบ้านสไตล์มินิมอล</h1>
              <p style={{opacity:.95, marginTop:8}}>ออกแบบโดยมืออาชีพ ใช้งานง่าย ปรับแต่งได้ตามงบ</p>
              <div className="hero-bubbles">
                <span className="bubble" style={{left:'10%', top:'70%'}} />
                <span className="bubble" style={{left:'45%', top:'30%', animationDelay:'1s'}} />
                <span className="bubble" style={{left:'80%', top:'60%', animationDelay:'2s'}} />
              </div>
            </div>
          </div>
        </section>

        <section className="section grid-2" aria-label="landing">
          <div>
            <h2 style={{marginTop:0}}>โปรโมชัน &amp; ไฮไลต์</h2>
            <Carousel images={[
              'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1616596874505-15af7765e9df?q=80&w=1600&auto=format&fit=crop'
            ]} />
            <ul>
              <li>ฟรี ออกแบบเบื้องต้น</li>
              <li>รับประกันโครงสร้างนาน 10 ปี</li>
              <li>ส่วนลดสูงสุด 200,000 บาท*</li>
            </ul>
          </div>
          <div>
            <div className="card">
              <h3 style={{marginTop:0}}>กรอกฟอร์มเพื่อรับสิทธิ์พิเศษ</h3>
              <form onSubmit={onSubmit} className="grid-2">
                <div>
                  <label>ชื่อ-นามสกุล</label>
                  <input name="name" placeholder="เช่น กานต์ภัส จ. " required />
                </div>
                <div>
                  <label>เบอร์โทร</label>
                  <input name="phone" placeholder="089-xxx-xxxx" required />
                </div>
                <div>
                  <label>อีเมล</label>
                  <input name="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label>งบประมาณโดยประมาณ (บาท)</label>
                  <select name="budget">
                    <option>ไม่ระบุ</option>
                    <option>{'<'} 2 ล้าน</option>
                    <option>2–4 ล้าน</option>
                    <option>4–6 ล้าน</option>
                    <option>{'>'} 6 ล้าน</option>
                  </select>
                </div>
                <div>
                  <label>พื้นที่ใช้สอยที่ต้องการ (ตร.ม.)</label>
                  <select name="area">
                    <option>ไม่ระบุ</option>
                    <option>{'<'} 140</option>
                    <option>140–200</option>
                    <option>200–300</option>
                    <option>{'>'} 300</option>
                  </select>
                </div>
                <div>
                  <label>ความสนใจ</label>
                  <select name="interest">
                    <option>บ้านชั้นเดียว</option>
                    <option>บ้านสองชั้น</option>
                    <option>ลอฟท์/โมเดิร์น</option>
                    <option>สไตล์คลาสสิก</option>
                  </select>
                </div>
                <div style={{gridColumn:'1/-1'}}>
                  <label>รายละเอียดเพิ่มเติม</label>
                  <textarea name="note" rows={3} placeholder="ระบุทำเล/แบบบ้านที่สนใจ"></textarea>
                </div>
                <div style={{gridColumn:'1/-1', display:'flex', alignItems:'center', gap:10}}>
                  <input type="checkbox" name="consent" value="yes" required style={{width:18, height:18}} />
                  <span className="muted" style={{fontSize:13}}>ยินยอมให้ติดต่อกลับตามข้อมูลที่ระบุ</span>
                </div>
                <div style={{gridColumn:'1/-1', display:'flex', gap:10, justifyContent:'flex-end'}}>
                  <button type="submit">ส่งข้อมูล</button>
                  <button type="reset" style={{background:'#111827'}}>ล้างฟอร์ม</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Toast show={showToast} message="ส่งข้อมูลเรียบร้อย บันทึกในหลังบ้านแล้ว" />
    </>
  )
}
