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
    if(!open) return
    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPad = body.style.paddingRight
    const prevPos = body.style.position
    const prevTop = body.style.top
    const prevWidth = body.style.width
    const scrollY = window.scrollY || window.pageYOffset || 0
    const sw = getScrollbarWidth()
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    if(sw > 0){ body.style.paddingRight = `${sw}px` }
    const onKey = (e)=>{ if(e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return ()=> {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPad
      body.style.position = prevPos
      body.style.top = prevTop
      body.style.width = prevWidth
      window.removeEventListener('keydown', onKey)
      window.scrollTo(0, scrollY)
    }
  }, [open, onClose])

  const sizeClass = wide ? 'max-w-3xl' : 'max-w-lg'

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overscroll-contain"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true"></div>
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: 12, opacity: 0, scale:.98 }}
            animate={{ y: 0, opacity: 1, scale:1 }}
            exit={{ y: 8, opacity: 0, scale:.98 }}
            transition={{ type:'spring', stiffness: 220, damping: 22 }}
            className={`relative w-full ${sizeClass} card`}
            style={{ maxHeight: '85vh' }}
          >
            <div className="px-6 pt-6 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
              <button className="btn-outline" onClick={onClose}>ปิด</button>
            </div>
            <div className="px-6 pb-[env(safe-area-inset-bottom)] pt-4 overflow-auto" style={{ maxHeight: 'calc(85vh - 72px)' }}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
