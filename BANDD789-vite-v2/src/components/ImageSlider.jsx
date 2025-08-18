import { useEffect, useRef, useState } from 'react'

export default function ImageSlider({ images=[], interval=3500 }){
  const [i, setI] = useState(0)
  const timer = useRef(null)
  const prefReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(()=>{
    if(prefReduced || images.length <= 1) return
    timer.current = setInterval(()=> setI(v => (v+1) % images.length), interval)
    return ()=> clearInterval(timer.current)
  }, [images.length, interval, prefReduced])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200">
      {images.map((src, idx) => (
        <img key={src+'-'+idx} src={src} alt="สไลด์" loading="lazy"
          className={"w-full h-auto object-cover transition-opacity duration-500 " + (idx===i ? 'opacity-100' : 'opacity-0 absolute inset-0')} />
      ))}
      {images.length>1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_,idx)=>(
            <button key={idx} aria-label={"slide "+(idx+1)} onClick={()=>setI(idx)}
              className={"w-2 h-2 rounded-full " + (idx===i ? 'bg-primary-600' : 'bg-white/70 border border-neutral-300')} />
          ))}
        </div>
      )}
    </div>
  )
}
