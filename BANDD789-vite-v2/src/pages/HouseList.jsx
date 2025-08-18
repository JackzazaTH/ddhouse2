import { useMemo, useState } from 'react'
import { HOUSES, CATEGORIES } from '../data/houses'
import SearchBar from '../components/SearchBar'
import HouseCard from '../components/HouseCard'

export default function HouseList(){
  const [query, setQuery] = useState('')
  const [cats, setCats] = useState([])

  function onToggleCat(c){
    setCats(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])
  }

  const filtered = useMemo(()=>{
    const q = query.toLowerCase()
    return HOUSES.filter(h => {
      const qmatch = !q || [h.name, h.category, h.area, h.beds, h.baths].join(' ').toLowerCase().includes(q)
      const cmatch = !cats.length || cats.includes(h.category)
      return qmatch && cmatch
    })
  }, [query, cats])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">รวมแบบบ้าน</h1>
      <SearchBar value={query} onChange={setQuery} categories={CATEGORIES} selectedCats={cats} onToggleCat={onToggleCat} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(h => <HouseCard key={h.id} item={h} />)}
      </div>
      {!filtered.length && <div className="text-center text-neutral-500">ไม่พบผลลัพธ์ที่ค้นหา</div>}
    </div>
  )
}
