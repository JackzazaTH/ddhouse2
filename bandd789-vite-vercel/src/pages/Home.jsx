
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { motion } from 'framer-motion'

export default function Home() {
  const [showForm, setShowForm] = useState(true) // show on first load
  const [toast, setToast] = useState({show:false, msg:''})
  const [form, setForm] = useState({
    name:'', phone:'', lineId:'', email:'',
    projectType:'สร้างบ้านใหม่', budget:'', province:'',
    consent: true, source:'หน้าแรก'
  })
  const [submitting, setSubmitting] = useState(false)

  function onChange(e){
    const {name,value,type,checked} = e.target
    setForm(prev=>({...prev,[name]: type==='checkbox' ? checked : value}))
  }

  async function submit(e){
    e.preventDefault()
    setSubmitting(true)
    try{
      const res = await fetch('/api/forms/submit', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.error || 'ส่งข้อมูลไม่สำเร็จ')
      // Fallback save to localStorage if backend not configured
      const cacheKey = 'bandd789_forms'
      const prev = JSON.parse(localStorage.getItem(cacheKey) || '[]')
      prev.unshift({ ...form, _id: data.id, _at: new Date().toISOString() })
      localStorage.setItem(cacheKey, JSON.stringify(prev))

      setToast({show:true, msg:'ส่งข้อมูลสำเร็จ!'})
      setShowForm(false)
      setForm({...form, name:'', phone:'', lineId:'', email:'', budget:'', province:''})
    }catch(err){
      console.error(err)
      setToast({show:true, msg:'บันทึกแบบชั่วคราว (ออฟไลน์)'})
      const cacheKey = 'bandd789_forms'
      const prev = JSON.parse(localStorage.getItem(cacheKey) || '[]')
      prev.unshift({ ...form, _id: 'local-'+Date.now(), _at: new Date().toISOString() })
      localStorage.setItem(cacheKey, JSON.stringify(prev))
      setShowForm(false)
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <div>
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1560185009-5bf9f2849488?q=80&w=1600&auto=format&fit=crop" className="w-full h-[52vh] object-cover" alt="hero"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:left-12 text-white">
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl md:text-5xl font-bold">BANDD789</motion.h1>
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0, delay:0.1}} className="text-lg md:text-xl mt-2">รับสร้างบ้าน ดีไซน์มินิมอล ใช้งานง่าย</motion.p>
          <div className="mt-4">
            <a href="#form" onClick={(e)=>{e.preventDefault(); setShowForm(true)}} className="btn btn-primary">รับสิทธิ์ปรึกษาฟรี</a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-4">
        {[
          ['ออกแบบก่อสร้าง','ครบวงจร'],
          ['ควบคุมงบประมาณ','โปร่งใส'],
          ['รับประกันงาน','มั่นใจได้']
        ].map(([t,s],i)=>(
          <motion.div key={i} initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="card">
            <div className="badge mb-2 bg-primary-50 text-primary-700">จุดเด่น</div>
            <div className="font-semibold">{t}</div>
            <div className="text-sm text-neutral-600">{s}</div>
          </motion.div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">แบบบ้านยอดนิยม</h2>
          <a className="text-sm text-primary-600" href="/plans">ดูทั้งหมด →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {name:'บ้านโมเดิร์น 2 ชั้น',img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop'},
            {name:'บ้านชั้นเดียว L-Shape',img:'https://images.unsplash.com/photo-1560185008-b033106af2f9?q=80&w=1200&auto=format&fit=crop'},
            {name:'บ้านสไตล์ลอฟท์',img:'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1200&auto=format&fit=crop'}
          ].map((p,i)=>(
            <div key={i} className="overflow-hidden rounded-2xl shadow group">
              <img src={p.img} alt={p.name} className="h-56 w-full object-cover group-hover:scale-105 transition-transform"/>
              <div className="p-3 font-semibold">{p.name}</div>
            </div>
          ))}
        </div>
      </section>

      <Modal open={showForm} onClose={()=>setShowForm(false)} title="ลงทะเบียนรับสิทธิ์พิเศษ" >
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
          <input className="input" placeholder="ชื่อ - นามสกุล" name="name" value={form.name} onChange={onChange} required/>
          <input className="input" placeholder="เบอร์ติดต่อ" name="phone" value={form.phone} onChange={onChange} required/>
          <input className="input" placeholder="LINE ID (ถ้ามี)" name="lineId" value={form.lineId} onChange={onChange}/>
          <input type="email" className="input" placeholder="อีเมล (ถ้ามี)" name="email" value={form.email} onChange={onChange}/>
          <select className="select" name="projectType" value={form.projectType} onChange={onChange}>
            <option>สร้างบ้านใหม่</option>
            <option>ต่อเติม/รีโนเวท</option>
            <option>ออกแบบสถาปัตย์</option>
          </select>
          <input className="input" placeholder="งบประมาณโดยประมาณ (บาท)" name="budget" value={form.budget} onChange={onChange}/>
          <input className="input md:col-span-2" placeholder="จังหวัด" name="province" value={form.province} onChange={onChange}/>
          <label className="md:col-span-2 text-sm text-neutral-600 flex items-center gap-2">
            <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} className="h-4 w-4"/>
            ยินยอมให้ติดต่อกลับตามนโยบายความเป็นส่วนตัว
          </label>
          <div className="md:col-span-2 flex items-center gap-2">
            <button className="btn btn-primary" disabled={submitting}>{submitting?'กำลังส่ง...':'ส่งข้อมูล'}</button>
            <button type="button" className="btn" onClick={()=>setShowForm(false)}>ปิด</button>
          </div>
        </form>
      </Modal>

      <Toast show={toast.show} msg={toast.msg} onHide={()=>setToast({show:false,msg:''})} />
    </div>
  )
}
