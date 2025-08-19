import React, { useMemo, useState } from 'react'
import DualSlider from '../../components/DualSlider'
import { Helmet } from 'react-helmet-async'

type House = {
  id:number; name:string; style:'โมเดิร์น'|'มินิมอล'|'คลาสสิก';
  beds:number; baths:number; parking:number;
  price:number; area:number; img:string; tags:string[]; category:string
}

const DATA: House[] = [
  {id:1, name:'M-145', style:'โมเดิร์น', beds:3, baths:2, parking:2, price:2800000, area:145, img:'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1800&auto=format&fit=crop', tags:['ฮิต','งบประหยัด'], category:'บ้านสองชั้น'},
  {id:2, name:'MN-180', style:'มินิมอล', beds:4, baths:3, parking:2, price:4200000, area:180, img:'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1800&auto=format&fit=crop', tags:['มินิมอล'], category:'บ้านสองชั้น'},
  {id:3, name:'C-120', style:'คลาสสิก', beds:3, baths:2, parking:1, price:2400000, area:120, img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1800&auto=format&fit=crop', tags:['โครงสร้างคุ้มค่า'], category:'บ้านชั้นเดียว'},
  {id:4, name:'MN-95', style:'มินิมอล', beds:2, baths:2, parking:1, price:1800000, area:95, img:'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1800&auto=format&fit=crop', tags:['เล็กกระทัดรัด'], category:'บ้านชั้นเดียว'},
  {id:5, name:'M-230', style:'โมเดิร์น', beds:5, baths:4, parking:3, price:6800000, area:230, img:'https://images.unsplash.com/photo-1600585154340-1e4ce9a2d52f?q=80&w=1800&auto=format&fit=crop', tags:['หรูหรา'], category:'บ้านสองชั้น'},
]

export default function Houses(){
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('ทั้งหมด')
  const [style, setStyle] = useState('ทั้งหมด')
  const [parking, setParking] = useState('ทั้งหมด')
  const [price, setPrice] = useState<[number,number]>([1500000, 7000000])
  const [area, setArea] = useState<[number,number]>([80, 260])

  const filtered = useMemo(()=>{
    return DATA.filter(h=>{
      if(q && !(`${h.name} ${h.style} ${h.tags.join(' ')}`.includes(q))) return false
      if(category!=='ทั้งหมด' && h.category!==category) return false
      if(style!=='ทั้งหมด' && h.style!==style) return false
      if(parking!=='ทั้งหมด' && h.parking!==Number(parking)) return false
      if(h.price<price[0] || h.price>price[1]) return false
      if(h.area<area[0] || h.area>area[1]) return false
      return true
    })
  }, [q, category, style, parking, price, area])

  return (
    <div className="container section">
      <Helmet>
        <title>แบบบ้าน — ค้นหาด้วยตัวกรอง | BANDD789</title>
        <meta name="description" content="ค้นหาแบบบ้านตามงบ พื้นที่ สไตล์ จำนวนที่จอดรถ พร้อมตัวกรองแบบสไลเดอร์สองหัว" />
      </Helmet>
      <h1 style={{marginTop:0}}>แบบบ้าน</h1>
      <div className="card" style={{marginBottom:16}}>
        <div className="grid-2">
          <div>
            <label>ค้นหา</label>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="พิมพ์ชื่อแบบบ้าน หรือแท็ก..." />
          </div>
          <div>
            <label>หมวดหมู่</label>
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              <option>ทั้งหมด</option>
              <option>บ้านชั้นเดียว</option>
              <option>บ้านสองชั้น</option>
            </select>
          </div>
          <div>
            <label>สไตล์</label>
            <select value={style} onChange={e=>setStyle(e.target.value)}>
              <option>ทั้งหมด</option>
              <option>โมเดิร์น</option>
              <option>มินิมอล</option>
              <option>คลาสสิก</option>
            </select>
          </div>
          <div>
            <label>ที่จอดรถ</label>
            <select value={parking} onChange={e=>setParking(e.target.value)}>
              <option>ทั้งหมด</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <label>งบประมาณ (บาท) — {price[0].toLocaleString()} - {price[1].toLocaleString()}</label>
            <DualSlider min={1000000} max={8000000} step={50000} value={price} onChange={setPrice} />
          </div>
          <div>
            <label>พื้นที่ใช้สอย (ตร.ม.) — {area[0]} - {area[1]}</label>
            <DualSlider min={60} max={300} step={5} value={area} onChange={setArea} />
          </div>
        </div>
      </div>

      <div className="cards">
        {filtered.map(h=>(
          <article className="card" key={h.id}>
            <img src={h.img} alt={h.name} loading="lazy" style={{borderRadius:14, width:'100%', height:160, objectFit:'cover', marginBottom:10}} />
            <div className="badge">{h.style}</div>
            <h3 style={{margin:'8px 0 4px'}}>{h.name}</h3>
            <div className="muted">พื้นที่ {h.area} ตร.ม. • {h.beds} ห้องนอน • {h.baths} ห้องน้ำ • จอด {h.parking}</div>
            <div style={{fontWeight:800, color:'var(--primary-700)', marginTop:6}}>{h.price.toLocaleString()} บาท</div>
          </article>
        ))}
      </div>
    </div>
  )
}
