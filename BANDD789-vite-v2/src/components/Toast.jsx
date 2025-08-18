import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function useToast(){
  const [toasts, setToasts] = useState([])
  function push(msg){ setToasts(t => [...t, { id: crypto.randomUUID(), msg }]) }
  function remove(id){ setToasts(t => t.filter(x => x.id !== id)) }
  const el = <ToastList toasts={toasts} onClose={remove} />
  return { push, el }
}
function ToastList({ toasts, onClose }){
  useEffect(()=>{
    const timers = toasts.map(t => setTimeout(()=>onClose(t.id), 2200))
    return ()=> timers.forEach(clearTimeout)
  },[toasts])
  return (
    <div className="fixed top-4 right-4 z-[60] space-y-2">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 py-2 rounded-xl bg-primary-600 text-white shadow-soft">
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
