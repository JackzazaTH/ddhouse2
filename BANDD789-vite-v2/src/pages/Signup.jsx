import { useState } from 'react'
import { createUser, loginUser } from '../utils/db'
import { useToast } from '../components/Toast'

export default function Signup(){
  const { push, el } = useToast()
  const [loading, setLoading] = useState(false)
  function submit(e){
    e.preventDefault(); setLoading(true)
    try{
      const name = e.currentTarget.name.value
      const email = e.currentTarget.email.value
      const password = e.currentTarget.password.value
      createUser({ name, email, password })
      loginUser({ email, password })
      push('สมัครและเข้าสู่ระบบสำเร็จ'); window.location.href = '/สมาชิก'
    }catch(err){ alert(err.message) }finally{ setLoading(false) }
  }
  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-bold">สมัครสมาชิก</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div><label className="label">ชื่อ-นามสกุล</label><input name="name" className="input" required /></div>
        <div><label className="label">อีเมล</label><input name="email" type="email" className="input" required /></div>
        <div><label className="label">รหัสผ่าน</label><input name="password" type="password" className="input" required /></div>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}</button>
      </form>
      <div className="text-sm mt-3">มีบัญชีแล้ว? <a className="link" href="/เข้าสู่ระบบ">เข้าสู่ระบบ</a></div>
      {el}
    </div>
  )
}
