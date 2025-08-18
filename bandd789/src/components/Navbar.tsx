import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }: {isActive: boolean}) =>
    `px-3 py-2 rounded-xl ${isActive ? 'bg-brand text-white' : 'hover:bg-card text-foreground'}`

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          <span className="px-2 py-1 rounded-xl bg-brand text-white mr-2">BANDD</span>789
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/plans" className={linkClass}>แบบบ้าน</NavLink>
          <NavLink to="/portfolio" className={linkClass}>ผลงาน</NavLink>
          <NavLink to="/reviews" className={linkClass}>รีวิวลูกค้า</NavLink>
          <NavLink to="/faq" className={linkClass}>คำถามที่พบบ่อย</NavLink>
          <NavLink to="/admin" className={linkClass}>หลังบ้าน</NavLink>
        </nav>
        <button aria-label="menu" onClick={() => setOpen(!open)} className="md:hidden btn-ghost"><Menu size={20}/></button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-4 pb-4">
          <div className="flex flex-col gap-2">
            <NavLink onClick={()=>setOpen(false)} to="/plans" className={linkClass}>แบบบ้าน</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/portfolio" className={linkClass}>ผลงาน</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/reviews" className={linkClass}>รีวิวลูกค้า</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/faq" className={linkClass}>คำถามที่พบบ่อย</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/admin" className={linkClass}>หลังบ้าน</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
