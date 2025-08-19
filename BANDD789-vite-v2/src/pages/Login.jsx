import { useState } from 'react'
import { loginUser } from '../utils/db'
import { useToast } from '../components/Toast'

export default function Login(){
  const { push, el } = useToast()
  const [loading, setLoading] = useState(false)
  function submit(e){
    e.preventDefault(); setLoading(true)
    try{
      loginUser({ email: e.currentTarget.email.value, password: e.currentTarget.password.value })
      push('เข้าสู่ระบบสำเร็จ'); window.location.href = '/สมาชิก'
    }catch(err){ alert(err.message) }finally{ setLoading(false) }
  }
  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div><label className="label">อีเมล</label><input name="email" type="email" className="input" required /></div>
        <div><label className="label">รหัสผ่าน</label><input name="password" type="password" className="input" required /></div>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</button>
      </form>
      <div className="text-sm mt-3">ยังไม่มีบัญชี? <a className="link" href="/สมัครสมาชิก">สมัครสมาชิก</a></div>
      {el}
    </div>
  )
}
