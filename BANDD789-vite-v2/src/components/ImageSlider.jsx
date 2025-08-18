import { useEffect, useMemo, useRef, useState } from 'react'

export default function ImageSlider({ images=[], interval=3500 }){
  const [i, setI] = useState(0)
  const prefReduced = usePrefersReducedMotion()
  const timer = useRef(null)

  useEffect(()=>{
    if(prefReduced || images.length <= 1) return
    timer.current = setInterval(()=> setI(v => (v+1) % images.length), interval)
    return ()=> clearInterval(timer.current)
  }, [images.length, interval, prefReduced])

  function prev(){ setI((i-1+images.length)%images.length) }
  function next(){ setI((i+1)%images.length) }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200">
      {images.map((src, idx) => (
        <img
          key={src+'-'+idx}
          src={src}
          alt="สไลด์โปรโมชัน"
          loading="lazy"
          className={"w-full h-auto object-cover transition-opacity duration-500 " + (idx===i ? 'opacity-100' : 'opacity-0 absolute inset-0')}
        />
      ))}
      {images.length>1 && (
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <button aria-label="prev" onClick={prev} className="btn-outline bg-white/70 backdrop-blur">{'‹'}</button>
          <button aria-label="next" onClick={next} className="btn-outline bg-white/70 backdrop-blur">{'›'}</button>
        </div>
      )}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_,idx)=>(
          <button key={idx} aria-label={"slide "+(idx+1)} onClick={()=>setI(idx)}
            className={"w-2 h-2 rounded-full " + (idx===i ? 'bg-primary-600' : 'bg-white/70 border border-neutral-300')} />
        ))}
      </div>
    </div>
  )
}

function usePrefersReducedMotion(){
  const [pref, setPref] = useState(false)
  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = ()=> setPref(m.matches)
    update()
    m.addEventListener('change', update)
    return ()=> m.removeEventListener('change', update)
  },[])
  return pref
}
