import { motion } from 'framer-motion'
import ImageSlider from './ImageSlider'
import { Link } from 'react-router-dom'

export default function Hero(){
  const sliderImages = ['/slides/slide1.jpg','/slides/slide2.jpg','/slides/slide3.jpg']
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl text-white border border-neutral-200">
        <VideoBg />
        <div className="relative z-10 p-8 sm:p-12">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .3 }}
            className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
            สร้างบ้านในฝันกับ <span className="text-white/95">BANDD789</span>
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .35, delay: .05 }}
            className="mt-3 text-white/90 max-w-2xl drop-shadow">
            รับสร้างบ้านครบวงจร ดีไซน์มินิมอล ใช้งานง่าย โปร่ง โล่ง สบาย งบประมาณควบคุมได้
          </motion.p>
          <div className="mt-6 flex gap-3">
            <a href="#models" className="btn-primary">ดูแบบบ้านยอดนิยม</a>
            <Link to="/แบบบ้าน" className="btn-outline bg-white text-neutral-900 border-white">ดูทั้งหมด</Link>
          </div>
        </div>
      </div>
      <ImageSlider images={sliderImages} />
    </div>
  )
}

function VideoBg(){
  return (
    <div className="absolute inset-0">
      <video className="w-full h-full object-cover" src="/hero.mp4" autoPlay loop muted playsInline poster="/slides/slide1.jpg" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
    </div>
  )
}
