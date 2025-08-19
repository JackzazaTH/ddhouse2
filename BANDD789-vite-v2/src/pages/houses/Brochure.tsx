import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HOUSES } from '../../store/houses'
import { Helmet } from 'react-helmet-async'

export default function Brochure(){
  const { id } = useParams()
  const hid = Number(id)
  const h = HOUSES.find(x => x.id === hid)
  useEffect(()=>{
    // Preload image to ensure better print quality
    if(h?.img){ const i = new Image(); i.src = h.img }
  }, [h])
  if(!h) return <div className="container section">ไม่พบแบบบ้าน</div>
  return (
    <div className="container section">
      <Helmet>
        <title>โบรชัวร์ {h.name} | BANDD789</title>
      </Helmet>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8}}>
          <h1 style={{margin:0}}>โบรชัวร์: {h.name}</h1>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>window.print()}>พิมพ์/บันทึกเป็น PDF</button>
            <Link to={`/แบบบ้าน/${h.id}`}><button style={{background:'#111827'}}>กลับหน้ารายละเอียด</button></Link>
          </div>
        </div>
        <img src={h.img} alt={h.name} style={{width:'100%', borderRadius:14, marginTop:12}} />
        <p className="muted">สไตล์ {h.style} • {h.category}</p>
        <p>พื้นที่ใช้สอย {h.area} ตร.ม. • {h.beds} ห้องนอน • {h.baths} ห้องน้ำ • จอดรถ {h.parking}</p>
        <p style={{fontWeight:800, color:'var(--primary-700)'}}>{h.price.toLocaleString()} บาท</p>
        {h.description && <p>{h.description}</p>}
      </div>
      <style>{`
        @media print {
          .nav, .footer, .container > :not(.card) { display:none !important; }
          .card { border:none; box-shadow:none; }
          body { background: #fff; }
          button, a { display:none !important; }
        }
      `}</style>
    </div>
  )
}
