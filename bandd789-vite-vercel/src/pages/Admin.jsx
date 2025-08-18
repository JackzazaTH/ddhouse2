
import React, { useEffect, useMemo, useState } from 'react'

export default function Admin(){
  const [token, setToken] = useState(localStorage.getItem('bandd789_admin_token') || '')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function load(){
    setLoading(true); setError('')
    try{
      let res = await fetch('/api/forms/list', { headers: { 'Authorization':'Bearer '+token }})
      if (res.status === 401) throw new Error('TOKEN ไม่ถูกต้อง')
      const data = await res.json()
      setItems(data.items || [])
    }catch(e){
      setError(e.message)
      // fallback: localStorage preview
      const cacheKey = 'bandd789_forms'
      const local = JSON.parse(localStorage.getItem(cacheKey) || '[]')
      setItems(local)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(token){
      localStorage.setItem('bandd789_admin_token', token)
      load()
    }
    // eslint-disable-next-line
  }, [])

  function exportCSV(){
    const header = ['id','ชื่อ','เบอร์','LINE','อีเมล','ประเภท','งบ','จังหวัด','เวลา'].join(',')
    const rows = items.map(x => [
      x._id || '',
      (x.name||'').replaceAll(',',' '),
      x.phone||'',
      x.lineId||'',
      x.email||'',
      x.projectType||'',
      x.budget||'',
      x.province||'',
      x._at||''
    ].join(','))
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'forms.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">หลังบ้าน • Forms</h1>

      <div className="card mb-4">
        <div className="text-sm text-neutral-600 mb-2">ใส่ TOKEN เพื่อดึงข้อมูลจาก KV</div>
        <div className="flex items-center gap-2">
          <input className="input flex-1" placeholder="ADMIN TOKEN" value={token} onChange={e=>setToken(e.target.value)} />
          <button className="btn btn-primary" onClick={load}>ดึงข้อมูล</button>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
        </div>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </div>

      {loading ? <div>กำลังโหลด...</div> : (
        <div className="grid md:grid-cols-2 gap-3">
          {items.map((x,i)=>(
            <div key={i} className="card">
              <div className="text-sm text-neutral-500">{x._id}</div>
              <div className="font-semibold">{x.name} <span className="badge ml-2">{x.projectType}</span></div>
              <div className="text-sm">โทร: {x.phone} · LINE: {x.lineId || '-'}</div>
              <div className="text-sm">อีเมล: {x.email || '-'}</div>
              <div className="text-sm">งบ: {x.budget || '-'} · จังหวัด: {x.province || '-'}</div>
              <div className="text-xs text-neutral-500 mt-2">{x._at}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
