import { currentUser, logoutUser } from '../utils/db'

export default function Member(){
  const user = currentUser()
  if(!user){
    window.location.href = '/เข้าสู่ระบบ'
    return null
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">พื้นที่สมาชิก</h1>
        <button className="btn-outline" onClick={()=>{ logoutUser(); window.location.href='/' }}>ออกจากระบบ</button>
      </div>
      <div className="card p-4">
        <div className="font-semibold">ยินดีต้อนรับ, {user.name}</div>
        <div className="text-sm text-neutral-600 mt-1">อีเมล: {user.email}</div>
        <p className="mt-3 text-neutral-700">สิทธิพิเศษสมาชิก: เข้าถึงบทความพิเศษ/แบบบ้านที่คัดสรร/รับข่าวโปรโมชั่นก่อนใคร</p>
      </div>
    </div>
  )
}
