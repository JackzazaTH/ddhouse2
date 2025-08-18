export default function Portfolio(){
  const items = [
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1730&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616137466210-5d1be29b39d7?q=80&w=1730&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1730&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1613977257362-6057a1b5a92b?q=80&w=1730&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154154-7153c8b3a0d8?q=80&w=1730&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601918774946-25832a4be0d4?q=80&w=1730&auto=format&fit=crop',
  ]
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">ผลงาน</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((src,i)=>(
          <img key={i} src={src} className="rounded-2xl border border-border" alt={`portfolio-${i}`} />
        ))}
      </div>
    </div>
  )
}
