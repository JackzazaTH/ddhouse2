import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/แบบบ้าน', label: 'แบบบ้าน' },
  { to: '/ผลงาน', label: 'ผลงาน' },
  { to: '/รีวิวลูกค้า', label: 'รีวิวลูกค้า' },
  { to: '/คำถามที่พบบ่อย', label: 'คำถามที่พบบ่อย' },
  { to: '/admin', label: 'หลังบ้าน' },
]

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: .9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-9 h-9 rounded-2xl bg-primary-600 grid place-items-center text-white font-black shadow-soft">B</motion.div>
            <div className="font-extrabold text-lg tracking-tight text-neutral-900">BANDD<span className="text-primary-600">789</span></div>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(n => (
              <NavLink key={n.to} to={n.to}
                className={({isActive}) => 'px-3 py-2 rounded-xl font-medium transition ' + (isActive ? 'text-white bg-primary-600' : 'text-neutral-700 hover:bg-neutral-100')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
