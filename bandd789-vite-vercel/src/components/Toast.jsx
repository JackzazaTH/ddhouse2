
import React, { useEffect } from 'react'

export default function Toast({ msg, show, onHide, duration=2500 }) {
  useEffect(()=>{
    if (!show) return
    const t = setTimeout(onHide, duration)
    return () => clearTimeout(t)
  }, [show, duration, onHide])
  if (!show) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black text-white rounded-full px-4 py-2 shadow">{msg}</div>
    </div>
  )
}
