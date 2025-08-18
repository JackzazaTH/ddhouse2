import Hero from '../components/Hero'
import HouseCard from '../components/HouseCard'
import InlineLeadForm from '../components/InlineLeadForm'
import { HOUSES } from '../data/houses'

export default function Home(){
  const featured = HOUSES.slice(0,3)
  return (
    <div className="space-y-10">
      <Hero />

      <InlineLeadForm />

      <section id="models">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">แบบบ้านยอดนิยม</h2>
          <a href="/แบบบ้าน" className="link">ดูทั้งหมด</a>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(h => <HouseCard key={h.id} item={h} />)}
        </div>
      </section>
    </div>
  )
}
