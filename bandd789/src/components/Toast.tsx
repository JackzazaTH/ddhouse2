import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ text }: { text?: string }){
  const [show, setShow] = useState(!!text)
  useEffect(()=>{ setShow(!!text); const t=setTimeout(()=>setShow(false), 2800); return ()=>clearTimeout(t)}, [text])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-2 rounded-2xl shadow-soft">
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
