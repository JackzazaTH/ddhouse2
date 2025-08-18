import { motion } from 'framer-motion'
import FormPopup from './FormPopup'

export default function Hero(){
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="p-8 sm:p-12">
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .5 }}
          className="text-3xl sm:text-5xl font-extrabold leading-tight">
          สร้างบ้านในฝันกับ <span className="text-white/90">BANDD789</span>
        </motion.h1>
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .6, delay: .05 }}
          className="mt-3 text-white/85 max-w-2xl">
          รับสร้างบ้านครบวงจร ดีไซน์มินิมอล ใช้งานง่าย โปร่ง โล่ง สบาย งบประมาณควบคุมได้
        </motion.p>
        <div className="mt-6 flex gap-3">
          <a href="#models" className="btn-primary">ดูแบบบ้านยอดนิยม</a>
          <a href="/แบบบ้าน" className="btn-outline bg-white text-neutral-900 border-white">ดูทั้งหมด</a>
        </div>
      </div>
      <FormPopup autoOpen />
    </div>
  )
}
