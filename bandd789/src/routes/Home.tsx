import Hero from '@/components/Hero'
import PromoForm from '@/components/PromoForm'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-3 gap-4">
        {[
          {title: 'ทีมวิศวกรมืออาชีพ', desc:'ควบคุมงานตามมาตรฐาน โครงสร้างปลอดภัย'},
          {title: 'ดีไซน์ทันสมัย', desc:'มินิมอล โทนแดง เรียบง่ายแต่โดดเด่น'},
          {title: 'ดูแลงานแบบ End-to-End', desc:'ตั้งแต่วางแผน ออกแบบ ก่อสร้าง ส่งมอบ'},
        ].map((c,i)=> (
          <motion.div key={i} className="card p-5"
            initial={{ y: 20, opacity: 0}} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true}} transition={{ duration: .4, delay: i*0.06}}>
            <div className="text-white font-semibold">{c.title}</div>
            <p className="text-foreground/80">{c.desc}</p>
          </motion.div>
        ))}
      </section>

      <div className="mt-10">
        <PromoForm />
      </div>

      <section className="max-w-6xl mx-auto px-4 mt-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">เลือกแบบบ้านที่ใช่สำหรับคุณ</h2>
        <p className="text-foreground/80 mt-2">กรองตามสไตล์/ขนาด/งบประมาณ และดูรายละเอียดครบถ้วน</p>
        <Link to="/plans" className="btn mt-4">ไปหน้ารวมแบบบ้าน</Link>
      </section>
    </div>
  )
}
