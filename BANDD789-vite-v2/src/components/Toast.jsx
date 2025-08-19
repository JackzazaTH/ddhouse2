import { useState } from 'react'
export function useToast(){
  const [items, setItems] = useState([])
  function push(text){
    const id = Math.random().toString(36).slice(2)
    setItems(s => [...s, { id, text }])
    setTimeout(()=> setItems(s => s.filter(x => x.id !== id)), 2500)
  }
  const el = (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 space-y-2">
      {items.map(it => <div key={it.id} className="px-4 py-2 bg-neutral-900 text-white rounded-xl shadow">{it.text}</div>)}
    </div>
  )
  return { push, el }
}
