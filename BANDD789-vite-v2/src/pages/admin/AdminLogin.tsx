import React from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../utils/storage'

export default function AdminLogin(){
  const nav = useNavigate()
  function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const user = fd.get('user') as string
    const pass = fd.get('pass') as string
    const acc = storage.get('admin', {user:'admin', pass:'bandd789'})
    if(user===acc.user && pass===acc.pass){
      storage.set('session', {loggedIn:true, at:Date.now()})
      nav('/admin/dashboard')
    }else{
      alert('บัญชีหรือรหัสผ่านไม่ถูกต้อง')
    }
  }
  return (
    <div className="container section">
      <div className="card" style={{maxWidth:460, margin:'0 auto'}}>
        <h1 style={{marginTop:0}}>เข้าสู่ระบบหลังบ้าน</h1>
        <form onSubmit={onSubmit} className="grid-2">
          <div style={{gridColumn:'1/-1'}}>
            <label>ผู้ใช้</label>
            <input name="user" defaultValue="admin" required />
          </div>
          <div style={{gridColumn:'1/-1'}}>
            <label>รหัสผ่าน</label>
            <input name="pass" type="password" defaultValue="bandd789" required />
          </div>
          <div style={{gridColumn:'1/-1', display:'flex', justifyContent:'flex-end'}}>
            <button type="submit">เข้าสู่ระบบ</button>
          </div>
        </form>
      </div>
    </div>
  )
}
