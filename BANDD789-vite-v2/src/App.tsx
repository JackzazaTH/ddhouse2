import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { HelmetProvider } from 'react-helmet-async'

const Houses = lazy(()=> import('./pages/houses/Houses'))
const Works = lazy(()=> import('./pages/Works'))
const Reviews = lazy(()=> import('./pages/Reviews'))
const FAQ = lazy(()=> import('./pages/FAQ'))
const Articles = lazy(()=> import('./pages/articles/Articles'))
const ArticleDetail = lazy(()=> import('./pages/articles/ArticleDetail'))
const AdminIndex = lazy(()=> import('./pages/admin')) 
const AdminDashboard = lazy(()=> import('./pages/admin/AdminDashboard'))

export default function App(){
  return (
    <HelmetProvider>
      <Navbar />
      <Suspense fallback={<div className="container section">กำลังโหลด...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/แบบบ้าน" element={<Houses />} />
          <Route path="/ผลงาน" element={<Works />} />
          <Route path="/รีวิวลูกค้า" element={<Reviews />} />
          <Route path="/คำถามที่พบบ่อย" element={<FAQ />} />
          <Route path="/บทความ" element={<Articles />} />
          <Route path="/บทความ/:slug" element={<ArticleDetail />} />
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
      <Footer />
    </HelmetProvider>
  )
}
