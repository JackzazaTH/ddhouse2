import React, { useEffect, useRef, useState } from 'react'

export default function Carousel({images}:{images:string[]}){
  const [idx, setIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const t = setInterval(()=> setIdx(i => (i+1)%images.length ), 4500)
    return ()=> clearInterval(t)
  }, [images.length])

  useEffect(()=>{
    if(trackRef.current){
      trackRef.current.style.transform = `translateX(-${idx*100}%)`
    }
  }, [idx])

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef} style={{width:`${images.length*100}%`}}>
        {images.map((src,i)=>(
          <img key={i} src={src} loading="lazy" alt={`slide-${i}`} />
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_,i)=>(
          <button key={i} className={i===idx?'active':''} onClick={()=>setIdx(i)} aria-label={`go to slide ${i+1}`}></button>
        ))}
      </div>
    </div>
  )
}
