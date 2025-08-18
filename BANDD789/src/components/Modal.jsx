import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({open, onClose, title, children}){
  useEffect(()=>{
    if(!open) return
    const onKey = e => { if(e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal" onClick={e=>e.stopPropagation()}
            initial={{ y: 30, opacity: .8 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: .8 }}>
            <div className="modal-header">
              <div className="modal-title">{title}</div>
              <button className="btn ghost" onClick={onClose}>ปิด</button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
