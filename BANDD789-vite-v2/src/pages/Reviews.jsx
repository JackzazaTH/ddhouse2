import { REVIEWS } from '../data/reviews'
import { listPublicReviews } from '../utils/db'

export default function Reviews(){
  const custom = listPublicReviews()
  const all = [...REVIEWS, ...custom]
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">รีวิวลูกค้า</h1>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {all.map((r,i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{r.name}</div>
              <div className="text-primary-700">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
            </div>
            <p className="mt-3 text-neutral-700">{r.text}</p>
          </div>
        ))}
      </div>
      {!all.length && <div className="text-neutral-500 mt-4">ยังไม่มีรีวิว</div>}
    </div>
  )
}
