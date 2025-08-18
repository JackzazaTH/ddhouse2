import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

function getScrollbarWidth(){
  if(typeof window === 'undefined') return 0
  const scrollDiv = document.createElement('div')
  scrollDiv.style.visibility = 'hidden'
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.msOverflowStyle = 'scrollbar'
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'
  scrollDiv.style.width = '50px'
  scrollDiv.style.height = '50px'
  document.body.appendChild(scrollDiv)
  const inner = document.createElement('div')
  inner.style.width = '100%'
  scrollDiv.appendChild(inner)
  const width = scrollDiv.offsetWidth - inner.offsetWidth
  document.body.removeChild(scrollDiv)
  return width
}

export default function Modal({ open, onClose, title, children, wide=false }){
  useEffect(()=>{
    if(open){
      const prevOverflow = document.body.style.overflow
      const prevPad = document.body.style.paddingRight
      const sw = getScrollbarWidth()
      // lock and compensate to prevent layout shift
      document.body.style.overflow = 'hidden'
      if(sw > 0){
        document.body.style.paddingRight = `${sw}px`
      }
      const onKey = (e)=>{ if(e.key === 'Escape') onClose?.() }
      window.addEventListener('keydown', onKey)
      return ()=> {
        document.body.style.overflow = prevOverflow
        document.body.style.paddingRight = prevPad
        window.removeEventListener('keydown', onKey)
      }
    }
  },[open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: 24, opacity: 0, scale:.98 }}
            animate={{ y: 0, opacity: 1, scale:1 }}
            exit={{ y: 16, opacity: 0, scale:.98 }}
            transition={{ type:'spring', stiffness: 200, damping: 22 }}
            className={"absolute left-1/2 top-10 -translate-x-1/2 w-[92vw] max-w-"+(wide ? "3xl" : "lg")+" card p-6"}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
              <button className="btn-outline" onClick={onClose}>ปิด</button>
            </div>
            <div className="mt-4 max-h-[70vh] overflow-auto pr-1">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
