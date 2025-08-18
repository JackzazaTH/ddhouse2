import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open, onClose, title, children, wide=false }){
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
          <motion.div
            initial={{ y: 30, opacity: 0, scale:.98 }}
            animate={{ y: 0, opacity: 1, scale:1 }}
            exit={{ y: 20, opacity: 0, scale:.98 }}
            transition={{ type:'spring', stiffness: 170, damping: 20 }}
            className={"absolute left-1/2 top-10 -translate-x-1/2 w-[92vw] max-w-"+(wide ? "3xl" : "lg")+" card p-6"}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
              <button className="btn-outline" onClick={onClose}>ปิด</button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
