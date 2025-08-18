export default function SearchBar({ q, setQ }: { q: string, setQ: (v:string)=>void }){
  return (
    <input className="input" placeholder="ค้นหาแบบบ้าน เช่น Minimal, 3 ห้องนอน..." value={q} onChange={e=>setQ(e.target.value)} />
  )
}
