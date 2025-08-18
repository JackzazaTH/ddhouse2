/**
 * DualRange - two-handle slider using stacked range inputs.
 */
export default function DualRange({ min=0, max=100, step=1, value={min, max}, onChange }){
  const lo = Math.min(value?.min ?? min, value?.max ?? max)
  const hi = Math.max(value?.min ?? min, value?.max ?? max)
  const left = ((lo - min) * 100) / (max - min)
  const right = 100 - ((hi - min) * 100) / (max - min)

  function setLo(v){ const n = Math.min(Number(v), hi); onChange?.({ min: n, max: hi }) }
  function setHi(v){ const n = Math.max(Number(v), lo); onChange?.({ min: lo, max: n }) }

  return (
    <div className="relative h-8">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-neutral-200 rounded-full" />
      <div className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full"
        style={{ left: `${left}%`, right: `${right}%`, background: 'linear-gradient(90deg, #e11d48, #be123c)' }} />
      <input type="range" min={min} max={max} step={step} value={lo}
        onChange={e=>setLo(e.target.value)}
        className="absolute pointer-events-auto appearance-none w-full h-8 bg-transparent" style={{ zIndex: 2 }} />
      <input type="range" min={min} max={max} step={step} value={hi}
        onChange={e=>setHi(e.target.value)}
        className="absolute pointer-events-auto appearance-none w-full h-8 bg-transparent" style={{ zIndex: 3 }} />
      <style>{`
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 9999px; background: white; border: 2px solid #e11d48; box-shadow: 0 1px 4px rgba(0,0,0,.2); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 9999px; background: white; border: 2px solid #e11d48; box-shadow: 0 1px 4px rgba(0,0,0,.2); }
        input[type="range"]::-webkit-slider-runnable-track { height: 0; }
        input[type="range"]::-moz-range-track { height: 0; }
      `}</style>
    </div>
  )
}
