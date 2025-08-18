import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastCtx = createContext({ push: () => {} })
export function useToast(){ return useContext(ToastCtx) }

export default function ToastProvider(){
  const [toasts, setToasts] = useState([])
  const push = useCallback((msg) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, msg }])
    setTimeout(()=> setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  return (
    <ToastCtx.Provider value={{ push }}>
      <div className="toast-wrap">
        {toasts.map(t => <div key={t.id} className="toast">{t.msg}</div>)}
      </div>
    </ToastCtx.Provider>
  )
}
