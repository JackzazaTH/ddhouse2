
import React from 'react'
import { motion } from 'framer-motion'

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-panel"
        onClick={(e)=>e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">✕</button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
