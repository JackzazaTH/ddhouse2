import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AnimatePresence, motion } from 'framer-motion'

const Home = lazy(()=>import('./pages/Home'))
const HouseList = lazy(()=>import('./pages/HouseList'))
const Portfolio = lazy(()=>import('./pages/Portfolio'))
const ProjectDetail = lazy(()=>import('./pages/ProjectDetail'))
const Reviews = lazy(()=>import('./pages/Reviews'))
const FAQ = lazy(()=>import('./pages/FAQ'))
const Admin = lazy(()=>import('./pages/Admin'))
const Articles = lazy(()=>import('./pages/Articles'))
const ArticleDetail = lazy(()=>import('./pages/ArticleDetail'))
const Login = lazy(()=>import('./pages/Login'))
const Signup = lazy(()=>import('./pages/Signup'))
const Member = lazy(()=>import('./pages/Member'))
const NotFound = lazy(()=>import('./pages/NotFound'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<Fallback />}>
            <Routes>
              <Route path="/" element={<PageWrap><Home /></PageWrap>} />
              <Route path="/แบบบ้าน" element={<PageWrap><HouseList /></PageWrap>} />
              <Route path="/ผลงาน" element={<PageWrap><Portfolio /></PageWrap>} />
              <Route path="/ผลงาน/:slug" element={<PageWrap><ProjectDetail /></PageWrap>} />
              <Route path="/รีวิวลูกค้า" element={<PageWrap><Reviews /></PageWrap>} />
              <Route path="/คำถามที่พบบ่อย" element={<PageWrap><FAQ /></PageWrap>} />
              <Route path="/บทความ" element={<PageWrap><Articles /></PageWrap>} />
              <Route path="/บทความ/:slug" element={<PageWrap><ArticleDetail /></PageWrap>} />
              <Route path="/เข้าสู่ระบบ" element={<PageWrap><Login /></PageWrap>} />
              <Route path="/สมัครสมาชิก" element={<PageWrap><Signup /></PageWrap>} />
              <Route path="/สมาชิก" element={<PageWrap><Member /></PageWrap>} />
              <Route path="/admin" element={<PageWrap><Admin /></PageWrap>} />
              <Route path="*" element={<PageWrap><NotFound /></PageWrap>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

function PageWrap({ children }){
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {children}
    </motion.main>
  )
}

function Fallback(){
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse grid gap-4">
        <div className="h-10 w-64 bg-neutral-200 rounded-xl"></div>
        <div className="h-40 bg-neutral-200 rounded-3xl"></div>
        <div className="h-40 bg-neutral-200 rounded-3xl"></div>
      </div>
    </div>
  )
}
