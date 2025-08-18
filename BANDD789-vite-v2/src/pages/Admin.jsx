import { useState } from 'react'
import { listSubmissions, removeSubmission, clearAll } from '../utils/storage'
import { toCSV } from '../utils/csv'
import { loginAdmin, isAuthed, logoutAdmin } from '../components/AdminGuard'
import { useToast } from '../components/Toast'

export default function Admin(){
  const [authed, setAuthed] = useState(isAuthed())
  const { push, el } = useToast()

  if(!authed){
    return <Login onSuccess={()=>{ setAuthed(true); push('เข้าสู่ระบบหลังบ้านสำเร็จ'); }} toastEl={el} />
  }
  return <Dashboard onLogout={()=>{ logoutAdmin(); setAuthed(false); push('ออกจากระบบแล้ว'); }} toastEl={el} />
}

function Login({ onSuccess, toastEl }){
  function submit(e){
    e.preventDefault()
    const u = e.currentTarget.username.value
    const p = e.currentTarget.password.value
    const ok = loginAdmin(u,p)
    if(ok) onSuccess()
    else alert('รหัสผ่านไม่ถูกต้อง (hint: admin / bandd789)')
  }
  return (
    <div className="max-w-sm mx-auto card p-6">
      <h1 className="text-xl font-bold">เข้าสู่ระบบหลังบ้าน</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div><label className="label">ชื่อผู้ใช้</label><input name="username" className="input" defaultValue="admin" /></div>
        <div><label className="label">รหัสผ่าน</label><input name="password" type="password" className="input" defaultValue="bandd789" /></div>
        <button className="btn-primary w-full" type="submit">เข้าสู่ระบบ</button>
      </form>
      {toastEl}
    </div>
  )
}

function Dashboard({ onLogout, toastEl }){
  const [rows, setRows] = useState(listSubmissions())

  function del(i){
    if(confirm('ลบข้อมูลนี้?')){
      removeSubmission(i); setRows(listSubmissions())
    }
  }
  function exportCSV(){
    const csv = toCSV(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'bandd789-forms.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">หลังบ้าน • ฟอร์มที่ลูกค้าส่งมา</h1>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={exportCSV}>Export CSV</button>
          <button className="btn-outline" onClick={()=>{ if(confirm('ลบทั้งหมด?')){ clearAll(); setRows([]) } }}>ลบทั้งหมด</button>
          <button className="btn-primary" onClick={onLogout}>ออกจากระบบ</button>
        </div>
      </div>
      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              {['ชื่อ','โทร','อีเมล','งบ','สไตล์','รับสิทธิ','โค้ด','บันทึก','เวลา',''].map(h => <th key={h} className="px-3 py-2 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i) => (
              <tr key={i} className="border-t border-neutral-200">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.phone}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.budget}</td>
                <td className="px-3 py-2">{Array.isArray(r.styles) ? r.styles.join(', ') : r.styles}</td>
                <td className="px-3 py-2">{r.privilege === 'yes' ? 'ใช่' : 'ไม่'}</td>
                <td className="px-3 py-2">{r.promo_code || '-'}</td>
                <td className="px-3 py-2">{r.note || '-'}</td>
                <td className="px-3 py-2 whitespace-nowrap">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-3 py-2 text-right"><button className="btn-outline" onClick={()=>del(i)}>ลบ</button></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan="10" className="px-3 py-6 text-center text-neutral-500">ยังไม่มีข้อมูลฟอร์ม</td></tr>}
          </tbody>
        </table>
      </div>
      {toastEl}
      <p className="text-xs text-neutral-500">* ระบบนี้เก็บข้อมูลไว้ที่เบราว์เซอร์ของหลังบ้าน (localStorage) สำหรับเดโม หากต้องการเชื่อมฐานข้อมูลจริงสามารถต่อภายหลัง</p>
    </div>
  )
}
