import { useMemo, useState } from 'react'
import { HOUSES, CATEGORIES } from '../data/houses'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import HouseCard from '../components/HouseCard'

export default function HouseList(){
  const [query, setQuery] = useState('')
  const [cats, setCats] = useState([])
  const [flt, setFlt] = useState({})

  function onToggleCat(c){ setCats(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c]) }

  const filtered = useMemo(()=>{
    const q = query.toLowerCase()
    return HOUSES.filter(h => {
      const qmatch = !q || [h.name, h.category, h.area, h.beds, h.baths].join(' ').toLowerCase().includes(q)
      const cmatch = !cats.length || cats.includes(h.category)
      const priceOk = (!flt.price || (h.price >= (flt.price.min ?? 0) && h.price <= (flt.price.max ?? 10000000)))
      const areaOk  = (!flt.area  || (h.area  >= (flt.area.min ?? 0)  && h.area  <= (flt.area.max ?? 500)))
      const bedsOk  = (!flt.minBeds || h.beds >= flt.minBeds)
      const bathsOk = (!flt.minBaths || h.baths >= flt.minBaths)
      const parkOk  = (!flt.minParking || h.parking >= flt.minParking)
      return qmatch && cmatch && priceOk && areaOk && bedsOk && bathsOk && parkOk
    })
  }, [query, cats, flt])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">รวมแบบบ้าน</h1>
      <SearchBar value={query} onChange={setQuery} categories={CATEGORIES} selectedCats={cats} onToggleCat={onToggleCat} />
      <FilterBar state={flt} onChange={setFlt} categories={CATEGORIES} selectedCats={cats} onToggleCat={onToggleCat} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(h => <HouseCard key={h.id} item={h} />)}
      </div>
      {!filtered.length && <div className="text-center text-neutral-500">ไม่พบผลลัพธ์ที่ค้นหา</div>}
    </div>
  )
}
