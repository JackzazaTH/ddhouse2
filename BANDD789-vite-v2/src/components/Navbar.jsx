import { Link, NavLink } from 'react-router-dom'
import { currentUser } from '../utils/db'

const navItems = [
  { to: '/', label: 'หน้าแรก' },
  { to: '/แบบบ้าน', label: 'แบบบ้าน' },
  { to: '/ผลงาน', label: 'ผลงาน' },
  { to: '/รีวิวลูกค้า', label: 'รีวิวลูกค้า' },
  { to: '/คำถามที่พบบ่อย', label: 'คำถามที่พบบ่อย' },
  { to: '/บทความ', label: 'บทความ' },
]

export default function Navbar(){
  const user = currentUser()
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl text-primary-700">BANDD789</Link>
        <nav className="hidden md:flex gap-4">
          {navItems.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => (isActive?'text-primary-700':'text-neutral-700 hover:text-neutral-900')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <a className="btn-outline" href="/สมาชิก">สมาชิก</a>
          ) : (
            <a className="btn-primary" href="/#lead">รับข้อเสนอพิเศษ</a>
          )}
        </div>
      </div>
    </header>
  )
}
