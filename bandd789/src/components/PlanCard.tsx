import { motion } from 'framer-motion'

export default function PlanCard({ plan, onClick }: { plan: any, onClick?: ()=>void }){
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
      className="card overflow-hidden">
      <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
          <span className="badge">{plan.style}</span>
        </div>
        <div className="mt-2 text-sm text-foreground/80">{plan.bedrooms} ห้องนอน • {plan.bathrooms} ห้องน้ำ • {plan.areaSqm} ตร.ม.</div>
        <div className="mt-2 font-semibold text-brand">{plan.priceTHB.toLocaleString()} ฿</div>
        <div className="mt-3 flex flex-wrap gap-1">
          {plan.tags?.map((t: string) => <span key={t} className="badge">{t}</span>)}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="btn" onClick={onClick}>ดูรายละเอียด</button>
        </div>
      </div>
    </motion.div>
  )
}
