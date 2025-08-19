import React, { useRef, useEffect } from 'react'

type Props = {
  min: number, max: number,
  value: [number, number],
  onChange: (v:[number,number])=>void,
  step?: number
}

export default function DualSlider({min, max, value, onChange, step=1}: Props){
  const trackRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{ updateRange() }, [value])

  function updateRange(){
    const track = trackRef.current!
    const [a,b] = value
    const left = ((a - min) / (max - min)) * 100
    const right = ((b - min) / (max - min)) * 100
    const range = track.querySelector('.range') as HTMLDivElement
    range!.style.left = left + '%'
    range!.style.width = (right-left) + '%'
    leftRef.current!.style.left = `calc(${left}% - 11px)`
    rightRef.current!.style.left = `calc(${right}% - 11px)`
  }

  function handleDrag(which:'left'|'right', e: React.MouseEvent){
    e.preventDefault()
    const startX = e.clientX
    const startVal = which==='left' ? value[0] : value[1]
    function onMove(ev: MouseEvent){
      const dx = ev.clientX - startX
      const track = trackRef.current!.getBoundingClientRect()
      const ratio = dx / track.width
      const dval = ratio * (max - min)
      let nv = Math.round((startVal + dval)/step)*step
      nv = Math.max(min, Math.min(max, nv))
      if(which==='left'){
        if(nv > value[1]) nv = value[1]
        onChange([nv, value[1]])
      }else{
        if(nv < value[0]) nv = value[0]
        onChange([value[0], nv])
      }
    }
    function onUp(){
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  function clickTrack(e: React.MouseEvent){
    const rect = (e.target as HTMLDivElement).closest('.slider')!.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const pos = min + ratio*(max-min)
    const mid = (value[0] + value[1]) / 2
    if(pos < mid) onChange([Math.round(pos/step)*step, value[1]])
    else onChange([value[0], Math.round(pos/step)*step])
  }

  return (
    <div className="slider" ref={trackRef} onMouseDown={clickTrack} aria-label="dual-slider">
      <div className="range"></div>
      <div className="thumb" ref={leftRef} onMouseDown={(e)=>handleDrag('left', e)} />
      <div className="thumb" ref={rightRef} onMouseDown={(e)=>handleDrag('right', e)} />
    </div>
  )
}
