
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './pages/Home'
import HousePlans from './pages/HousePlans'
import Portfolio from './pages/Portfolio'
import Reviews from './pages/Reviews'
import FAQ from './pages/FAQ'
import Admin from './pages/Admin'

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <span className="inline-block w-3 h-6 rounded-sm bg-primary-500"></span>
          <span>BANDD789</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          <NavLink to="/plans" className={({isActive}) => isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'}>แบบบ้าน</NavLink>
          <NavLink to="/portfolio" className={({isActive}) => isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'}>ผลงาน</NavLink>
          <NavLink to="/reviews" className={({isActive}) => isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'}>รีวิวลูกค้า</NavLink>
          <NavLink to="/faq" className={({isActive}) => isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'}>คำถามที่พบบ่อย</NavLink>
          <a href="/admin" className="text-neutral-500 hover:text-neutral-800">หลังบ้าน</a>
          <a href="#form" className="btn btn-primary">รับสิทธิ์</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600">
        © {new Date().getFullYear()} BANDD789 • Minimal Home Builder
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<HousePlans />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
