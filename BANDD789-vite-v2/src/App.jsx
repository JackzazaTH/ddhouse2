import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import HouseList from './pages/HouseList'
import Portfolio from './pages/Portfolio'
import Reviews from './pages/Reviews'
import FAQ from './pages/FAQ'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrap><Home /></PageWrap>} />
            <Route path="/แบบบ้าน" element={<PageWrap><HouseList /></PageWrap>} />
            <Route path="/ผลงาน" element={<PageWrap><Portfolio /></PageWrap>} />
            <Route path="/รีวิวลูกค้า" element={<PageWrap><Reviews /></PageWrap>} />
            <Route path="/คำถามที่พบบ่อย" element={<PageWrap><FAQ /></PageWrap>} />
            <Route path="/admin" element={<PageWrap><Admin /></PageWrap>} />
            <Route path="*" element={<PageWrap><NotFound /></PageWrap>} />
          </Routes>
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
      transition={{ duration: 0.25 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {children}
    </motion.main>
  )
}
