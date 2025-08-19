import { Link } from 'react-router-dom'
export default function ProjectCard({ item }){
  return (
    <Link to={`/ผลงาน/${encodeURIComponent(item.slug)}`} className="card overflow-hidden hover:shadow-md transition block">
      <div className="aspect-video bg-neutral-100">
        {item.coverUrl ? <img src={item.coverUrl} alt={item.title} loading="lazy" className="w-full h-full object-cover" /> : null}
      </div>
      <div className="p-4">
        <div className="font-semibold">{item.title}</div>
        <div className="text-sm text-neutral-600 mt-1">{item.category || '-'} • {item.area || '-'} ตร.ม. • {item.budget || '-'}</div>
        <div className="text-xs text-neutral-400 mt-1">{item.location || ''}</div>
      </div>
    </Link>
  )
}
