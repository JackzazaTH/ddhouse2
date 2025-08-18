import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block mb-4 badge">บ้านใหม่ โทนแดง มินิมอล</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            BANDD789 — สร้างบ้านในฝัน <span className="text-brand">เรียบง่าย</span> และ <span className="text-brand">ใช้งานได้จริง</span>
          </h1>
          <p className="mt-4 text-foreground/80">ดีไซน์ทันสมัย โครงสร้างได้มาตรฐาน ทีมมืออาชีพ ดูแลงานตั้งแต่เริ่มจนส่งมอบ</p>
          <div className="mt-6 flex gap-3">
            <a href="#promo" className="btn">รับสิทธิพิเศษวันนี้</a>
            <a href="/plans" className="btn-ghost">ดูแบบบ้านทั้งหมด</a>
          </div>
        </motion.div>
        <motion.img
          initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1613977257593-930b4e1639ce?q=80&w=1740&auto=format&fit=crop"
          alt="Modern House"
          className="rounded-2xl shadow-soft border border-border"
        />
      </div>
    </section>
  )
}
