import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { HOUSES } from '../../store/houses'
import { Helmet } from 'react-helmet-async'
import Carousel from '../../components/Carousel'

export default function HouseDetail(){
  const { id } = useParams()
  const hid = Number(id)
  const h = HOUSES.find(x => x.id === hid)
  if(!h) return <div className="container section">ไม่พบแบบบ้าน</div>
  const gallery = h.images && h.images.length ? h.images : [h.img]

  return (
    <div className="container section">
      <Helmet>
        <title>{h.name} — รายละเอียดแบบบ้าน | BANDD789</title>
        <meta name="description" content={`รายละเอียดแบบบ้าน ${h.name} สไตล์ ${h.style} พื้นที่ ${h.area} ตร.ม.`} />
        <meta property="og:image" content={h.img} />
      </Helmet>

      <div className="grid-2">
        <div className="card">
          <Carousel images={gallery} />
        </div>
        <div className="card">
          <div className="badge">{h.style}</div>
          <h1 style={{margin:'8px 0 0'}}>{h.name}</h1>
          <p className="muted">{h.category}</p>
          <p>พื้นที่ใช้สอย {h.area} ตร.ม. • {h.beds} ห้องนอน • {h.baths} ห้องน้ำ • ที่จอดรถ {h.parking}</p>
          <p style={{fontWeight:800, color:'var(--primary-700)'}}>{h.price.toLocaleString()} บาท</p>
          {h.description && <p>{h.description}</p>}
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <Link to="/"><button>หน้าแรก</button></Link>
            <Link to="/แบบบ้าน"><button style={{background:'#111827'}}>กลับไปหน้าแบบบ้าน</button></Link>
            <Link to={`/แบบบ้าน/${h.id}/brochure`}><button>ดาวน์โหลดโบรชัวร์ (PDF)</button></Link>
          </div>
        </div>
      </div>

      {h.floorplan && (
        <div className="card" style={{marginTop:16}}>
          <h3>แปลนบ้าน (Floor Plan)</h3>
          <img src={h.floorplan} alt="floor plan" style={{width:'100%', borderRadius:14}} />
        </div>
      )}
    </div>
  )
}
