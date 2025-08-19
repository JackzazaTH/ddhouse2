import { useState } from 'react'
import { listSubmissions, removeSubmission, clearAll } from '../utils/storage'
import { toCSV } from '../utils/csv'
import { loginAdmin, isAuthed, logoutAdmin } from '../components/AdminGuard'
import { useToast } from '../components/Toast'
import { addArticle, listArticles, removeArticle, updateArticle, addPublicReview, listPublicReviews, removePublicReview, updatePublicReview, listUsers, addProject, listProjects, updateProject, removeProject } from '../utils/db'

function downloadFile(name, content, type){
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = name; a.click()
  URL.revokeObjectURL(url)
}
function buildSitemapXML(base, articles){
  const urls = [
    '/', '/แบบบ้าน', '/ผลงาน', '/รีวิวลูกค้า', '/คำถามที่พบบ่อย', '/บทความ',
    ...articles.map(a => `/บทความ/${encodeURIComponent(a.slug)}`)
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u}</loc></url>`).join('\n')}
</urlset>`
  return xml
}
function buildRSSXML(base, articles){
  const items = articles.slice(0,50).map(a => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${base}/บทความ/${encodeURIComponent(a.slug)}</link>
      <guid>${base}/บทความ/${encodeURIComponent(a.slug)}</guid>
      <pubDate>${new Date(a.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${(a.content||'').slice(0,300)}]]></description>
    </item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>BANDD789</title>
    <link>${base}</link>
    <description>ข่าวสารและบทความจาก BANDD789</description>
    ${items}
  </channel>
</rss>`
  return xml
}

export default function Admin(){
  const [authed, setAuthed] = useState(isAuthed())
  const { push, el } = useToast()

  if(!authed){
    return <Login onSuccess={()=>{ setAuthed(true); push('เข้าสู่ระบบหลังบ้านสำเร็จ'); }} toastEl={el} />
  }
  return <Dashboard onLogout={()=>{ logoutAdmin(); setAuthed(false); push('ออกจากระบบแล้ว'); }} toastEl={el} />
}

function Login({ onSuccess, toastEl }){
  function submit(e){
    e.preventDefault()
    const u = e.currentTarget.username.value
    const p = e.currentTarget.password.value
    const ok = loginAdmin(u,p)
    if(ok) onSuccess()
    else alert('รหัสผ่านไม่ถูกต้อง (hint: admin / bandd789)')
  }
  return (
    <div className="max-w-sm mx-auto card p-6">
      <h1 className="text-xl font-bold">เข้าสู่ระบบหลังบ้าน (ผู้ดูแล)</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div><label className="label">ชื่อผู้ใช้</label><input name="username" className="input" defaultValue="admin" /></div>
        <div><label className="label">รหัสผ่าน</label><input name="password" type="password" className="input" defaultValue="bandd789" /></div>
        <button className="btn-primary w-full" type="submit">เข้าสู่ระบบ</button>
      </form>
      {toastEl}
    </div>
  )
}

function Dashboard({ onLogout, toastEl }){
  const [tab, setTab] = useState('forms')
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">หลังบ้าน • แดชบอร์ด</h1>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={onLogout}>ออกจากระบบ</button>
        </div>
      </div>
      <div className="card p-2 flex flex-wrap gap-2">
        {['forms','articles','portfolio','reviews','members'].map(t => (
          <button key={t} className={'px-3 py-1 rounded-xl ' + (tab===t ? 'bg-primary-600 text-white' : 'bg-neutral-100')} onClick={()=>setTab(t)}>
            {t==='forms'?'ฟอร์ม':t==='articles'?'บทความ':t==='portfolio'?'ผลงาน':t==='reviews'?'รีวิว':'สมาชิก'}
          </button>
        ))}
      </div>
      {tab==='forms' && <FormsPanel />}
      {tab==='articles' && <ArticlesPanel />}
      {tab==='portfolio' && <PortfolioPanel />}
      {tab==='reviews' && <ReviewsPanel />}
      {tab==='members' && <MembersPanel />}
      {toastEl}
    </div>
  )
}

function FormsPanel(){
  const [rows, setRows] = useState(listSubmissions())
  function del(i){ if(confirm('ลบข้อมูลนี้?')){ removeSubmission(i); setRows(listSubmissions()) } }
  function exportCSV(){
    const csv = toCSV(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'bandd789-forms.csv'; a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">ฟอร์มจากหน้าแรก</h2>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={exportCSV}>Export CSV</button>
          <button className="btn-outline" onClick={()=>{ if(confirm('ลบทั้งหมด?')){ clearAll(); setRows([]) } }}>ลบทั้งหมด</button>
        </div>
      </div>
      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>{['ชื่อ','โทร','อีเมล','งบ','สไตล์','บันทึก','เวลา',''].map(h => <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r,i) => (
              <tr key={i} className="border-t border-neutral-200">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.phone}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.budget}</td>
                <td className="px-3 py-2">{Array.isArray(r.styles) ? r.styles.join(', ') : r.styles}</td>
                <td className="px-3 py-2">{r.note || '-'}</td>
                <td className="px-3 py-2 whitespace-nowrap">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-3 py-2 text-right"><button className="btn-outline" onClick={()=>del(i)}>ลบ</button></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan="10" className="px-3 py-6 text-center text-neutral-500">ยังไม่มีข้อมูลฟอร์ม</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ArticlesPanel(){
  const [items, setItems] = useState(listArticles())
  const [editingArt, setEditingArt] = useState(null)

  function submit(e){
    e.preventDefault()
    const title = e.currentTarget.title.value.trim()
    const content = e.currentTarget.content.value.trim()
    const category = e.currentTarget.category.value.trim()
    const tags = e.currentTarget.tags.value.split(',').map(s => s.trim()).filter(Boolean)
    const coverUrl = e.currentTarget.coverUrl.value.trim()
    const slug = e.currentTarget.slug.value.trim()
    const noindex = e.currentTarget.noindex.checked
    if(!title || !content) return alert('กรอกหัวข้อและเนื้อหาให้ครบ')
    addArticle({ title, content, category, tags, coverUrl, slug, noindex })
    setItems(listArticles())
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">เพิ่มบทความ</h2>
      <form onSubmit={submit} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" className="input md:col-span-2" placeholder="หัวข้อบทความ" />
        <input name="category" className="input" placeholder="หมวดหมู่ (เช่น เคล็ดลับสร้างบ้าน)" />
        <input name="tags" className="input" placeholder="แท็ก (คั่นด้วย ,)" />
        <input name="coverUrl" className="input md:col-span-2" placeholder="ลิงก์ภาพปก (URL) เช่น https://..." />
        <input name="slug" className="input md:col-span-2" placeholder="กำหนด slug เอง (เว้นว่างให้ระบบสร้าง)" />
        <textarea name="content" rows="6" className="input md:col-span-2" placeholder="เนื้อหา"></textarea>
        <label className="flex items-center gap-2 md:col-span-2"><input type="checkbox" name="noindex" /> ไม่ทำดัชนี (noindex)</label>
        <div className="md:col-span-2 text-right"><button className="btn-primary">บันทึก</button></div>
      </form>
      <h3 className="text-lg font-semibold">รายการบทความ</h3>
      <div className="grid gap-3">
        {items.map(it => (
          <div key={it.id} className="card p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {it.coverUrl ? <img src={it.coverUrl} alt="" className="w-16 h-16 object-cover rounded-xl border" loading="lazy" /> : <div className="w-16 h-16 rounded-xl bg-neutral-200 grid place-items-center text-neutral-500">ไม่มีรูป</div>}
              <div className="min-w-0">
                <div className="font-semibold truncate">{it.title}</div>
                <div className="text-sm text-neutral-500 break-all">slug: {it.slug} • หมวด: {it.category || '-' } • แท็ก: {(it.tags||[]).join(', ') || '-'} {it.noindex ? '• noindex' : ''}</div>
                <div className="text-xs text-neutral-400">{new Date(it.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <a className="btn-outline" href={"/บทความ/"+encodeURIComponent(it.slug)} target="_blank">ดูหน้าเว็บ</a>
              <button className="btn-outline" onClick={()=> setEditingArt(it)}>แก้ไข</button>
              <button className="btn-outline" onClick={()=>{ removeArticle(it.id); setItems(listArticles()) }}>ลบ</button>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-neutral-500">ยังไม่มีบทความ</div>}
      </div>
      <div className="flex flex-wrap gap-2">
        <input id="base-url" className="input" placeholder="Base URL (เช่น https://your-domain.com)" />
        <button className="btn-outline" onClick={()=>{
          const base = document.getElementById('base-url').value || window.location.origin
          const pro = listProjects();
          const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${['/','/แบบบ้าน','/ผลงาน','/รีวิวลูกค้า','/คำถามที่พบบ่อย','/บทความ', ...listArticles().map(a=>\`/บทความ/\${encodeURIComponent(a.slug)}\`), ...pro.map(p=>\`/ผลงาน/\${encodeURIComponent(p.slug)}\`)].map(u=>\`  <url><loc>\${base}\${u}</loc></url>\`).join('\\n')}\n</urlset>`
          downloadFile('sitemap.xml', xml, 'application/xml')
        }}>Export sitemap.xml</button>
        <button className="btn-outline" onClick={()=>{
          const base = document.getElementById('base-url').value || window.location.origin
          const xml = buildRSSXML(base, listArticles())
          downloadFile('rss.xml', xml, 'application/rss+xml')
        }}>Export rss.xml</button>
      </div>

      {editingArt && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card p-4 w-full max-w-3xl">
            <div className="flex items-center justify-between"><div className="font-semibold">แก้ไขบทความ</div><button className="btn-outline" onClick={()=>setEditingArt(null)}>ปิด</button></div>
            <form onSubmit={(e)=>{
              e.preventDefault()
              const patch = {
                title: e.currentTarget.title.value.trim(),
                content: e.currentTarget.content.value.trim(),
                category: e.currentTarget.category.value.trim(),
                tags: e.currentTarget.tags.value.split(',').map(s=>s.trim()).filter(Boolean),
                coverUrl: e.currentTarget.coverUrl.value.trim(),
                slug: e.currentTarget.slug.value.trim(),
                noindex: e.currentTarget.noindex.checked
              }
              updateArticle(editingArt.id, patch)
              setItems(listArticles()); setEditingArt(null)
            }} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="title" className="input md:col-span-2" defaultValue={editingArt.title} />
              <input name="category" className="input" defaultValue={editingArt.category} />
              <input name="tags" className="input" defaultValue={(editingArt.tags||[]).join(', ')} />
              <input name="coverUrl" className="input md:col-span-2" defaultValue={editingArt.coverUrl} />
              <input name="slug" className="input md:col-span-2" defaultValue={editingArt.slug} />
              <textarea name="content" rows="6" className="input md:col-span-2" defaultValue={editingArt.content}></textarea>
              <label className="flex items-center gap-2 md:col-span-2"><input type="checkbox" name="noindex" defaultChecked={!!editingArt.noindex} /> ไม่ทำดัชนี (noindex)</label>
              <div className="md:col-span-2 text-right"><button className="btn-primary">บันทึกการแก้ไข</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function PortfolioPanel(){
  const [items, setItems] = useState(listProjects())
  const [editing, setEditing] = useState(null)

  function submit(e){
    e.preventDefault()
    const title = e.currentTarget.title.value.trim()
    const description = e.currentTarget.description.value.trim()
    const category = e.currentTarget.category.value.trim()
    const coverUrl = e.currentTarget.coverUrl.value.trim()
    const gallery = e.currentTarget.gallery.value.split(',').map(s=>s.trim()).filter(Boolean)
    const budget = e.currentTarget.budget.value.trim()
    const area = e.currentTarget.area.value.trim()
    const location = e.currentTarget.location.value.trim()
    const completedAt = e.currentTarget.completedAt.value.trim()
    const slug = e.currentTarget.slug.value.trim()
    if(!title) return alert('กรอกชื่อผลงาน')
    addProject({ title, description, category, coverUrl, gallery, budget, area, location, completedAt, slug })
    setItems(listProjects())
    e.currentTarget.reset()
  }

  function saveEdit(e){
    e.preventDefault()
    const id = editing.id
    const patch = {
      title: e.currentTarget.title.value.trim(),
      description: e.currentTarget.description.value.trim(),
      category: e.currentTarget.category.value.trim(),
      coverUrl: e.currentTarget.coverUrl.value.trim(),
      gallery: e.currentTarget.gallery.value.split(',').map(s=>s.trim()).filter(Boolean),
      budget: e.currentTarget.budget.value.trim(),
      area: e.currentTarget.area.value.trim(),
      location: e.currentTarget.location.value.trim(),
      completedAt: e.currentTarget.completedAt.value.trim(),
      slug: e.currentTarget.slug.value.trim(),
    }
    updateProject(id, patch); setItems(listProjects()); setEditing(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">เพิ่มผลงาน</h2>
      <form onSubmit={submit} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" className="input md:col-span-2" placeholder="ชื่อผลงาน" />
        <input name="category" className="input" placeholder="สไตล์/หมวด (เช่น มินิมอล)" />
        <input name="slug" className="input" placeholder="slug (เว้นว่างให้ระบบสร้าง)" />
        <input name="coverUrl" className="input md:col-span-2" placeholder="ภาพปก (URL)" />
        <input name="gallery" className="input md:col-span-2" placeholder="แกลเลอรี (URL คั่นด้วย ,)" />
        <input name="budget" className="input" placeholder="งบประมาณ (เช่น 3-5 ล้าน)" />
        <input name="area" className="input" placeholder="พื้นที่ใช้สอย (ตร.ม.)" />
        <input name="location" className="input" placeholder="สถานที่ (เช่น กรุงเทพฯ)" />
        <input name="completedAt" className="input" placeholder="แล้วเสร็จ (เช่น 2024-08)" />
        <textarea name="description" rows="5" className="input md:col-span-2" placeholder="รายละเอียด"></textarea>
        <div className="md:col-span-2 text-right"><button className="btn-primary">บันทึก</button></div>
      </form>

      <h3 className="text-lg font-semibold">รายการผลงาน</h3>
      <div className="grid gap-3">
        {items.map(it => (
          <div key={it.id} className="card p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {it.coverUrl ? <img src={it.coverUrl} alt="" className="w-16 h-16 object-cover rounded-xl border" loading="lazy" /> : <div className="w-16 h-16 rounded-xl bg-neutral-200 grid place-items-center text-neutral-500">—</div>}
              <div className="min-w-0">
                <div className="font-semibold truncate">{it.title}</div>
                <div className="text-sm text-neutral-500 break-all">slug: {it.slug} • {it.category || '-'} • {it.location || '-'}</div>
                <div className="text-xs text-neutral-400">{new Date(it.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <a className="btn-outline" href={"/ผลงาน/"+encodeURIComponent(it.slug)} target="_blank">ดูหน้าเว็บ</a>
              <button className="btn-outline" onClick={()=> setEditing(it)}>แก้ไข</button>
              <button className="btn-outline" onClick={()=>{ if(confirm('ลบผลงานนี้?')){ removeProject(it.id); setItems(listProjects()) } }}>ลบ</button>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-neutral-500">ยังไม่มีผลงาน</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card p-4 w-full max-w-3xl">
            <div className="flex items-center justify-between"><div className="font-semibold">แก้ไขผลงาน</div><button className="btn-outline" onClick={()=>setEditing(null)}>ปิด</button></div>
            <form onSubmit={saveEdit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="title" className="input md:col-span-2" defaultValue={editing.title} />
              <input name="category" className="input" defaultValue={editing.category} />
              <input name="slug" className="input" defaultValue={editing.slug} />
              <input name="coverUrl" className="input md:col-span-2" defaultValue={editing.coverUrl} />
              <input name="gallery" className="input md:col-span-2" defaultValue={(editing.gallery||[]).join(', ')} />
              <input name="budget" className="input" defaultValue={editing.budget} />
              <input name="area" className="input" defaultValue={editing.area} />
              <input name="location" className="input" defaultValue={editing.location} />
              <input name="completedAt" className="input" defaultValue={editing.completedAt} />
              <textarea name="description" rows="5" className="input md:col-span-2" defaultValue={editing.description}></textarea>
              <div className="md:col-span-2 text-right"><button className="btn-primary">บันทึกการแก้ไข</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ReviewsPanel(){
  const [items, setItems] = useState(listPublicReviews())
  const [editingRev, setEditingRev] = useState(null)

  function submit(e){
    e.preventDefault()
    const name = e.currentTarget.name.value.trim()
    const text = e.currentTarget.text.value.trim()
    const rating = e.currentTarget.rating.value
    if(!name || !text) return alert('กรอกให้ครบ')
    addPublicReview({ name, text, rating })
    setItems(listPublicReviews())
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">เพิ่มรีวิวลูกค้า</h2>
      <form onSubmit={submit} className="card p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input name="name" className="input md:col-span-1" placeholder="ชื่อลูกค้า" />
        <select name="rating" className="input md:col-span-1">
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ดาว</option>)}
        </select>
        <input name="text" className="input md:col-span-2" placeholder="ข้อความรีวิว" />
        <div className="md:col-span-4 text-right"><button className="btn-primary">บันทึก</button></div>
      </form>
      <h3 className="text-lg font-semibold">รายการรีวิว</h3>
      <div className="grid gap-3">
        {items.map(it => (
          <div key={it.id} className="card p-4 flex items-center justify-between">
            <div><span className="font-semibold">{it.name}</span> — {'★'.repeat(it.rating)}{'☆'.repeat(5-it.rating)}</div>
            <div className="text-neutral-700">{it.text}</div>
            <div className="flex gap-2">
              <button className="btn-outline" onClick={()=> setEditingRev(it)}>แก้ไข</button>
              <button className="btn-outline" onClick={()=>{ removePublicReview(it.id); setItems(listPublicReviews()) }}>ลบ</button>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-neutral-500">ยังไม่มีรีวิว</div>}
      </div>

      {editingRev && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card p-4 w-full max-w-xl">
            <div className="flex items-center justify-between"><div className="font-semibold">แก้ไขรีวิว</div><button className="btn-outline" onClick={()=>setEditingRev(null)}>ปิด</button></div>
            <form onSubmit={(e)=>{
              e.preventDefault()
              const patch = { name: e.currentTarget.name.value.trim(), text: e.currentTarget.text.value.trim(), rating: Number(e.currentTarget.rating.value) }
              updatePublicReview(editingRev.id, patch)
              setItems(listPublicReviews()); setEditingRev(null)
            }} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input name="name" className="input md:col-span-1" defaultValue={editingRev.name} />
              <select name="rating" className="input md:col-span-1" defaultValue={editingRev.rating}>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ดาว</option>)}
              </select>
              <input name="text" className="input md:col-span-3" defaultValue={editingRev.text} />
              <div className="md:col-span-3 text-right"><button className="btn-primary">บันทึกการแก้ไข</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function MembersPanel(){
  const users = listUsers()
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">สมาชิกทั้งหมด</h2>
      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50"><tr><th className="px-3 py-2 text-left">ชื่อ</th><th className="px-3 py-2 text-left">อีเมล</th></tr></thead>
          <tbody>
            {users.map(u => <tr key={u.id} className="border-t border-neutral-200"><td className="px-3 py-2">{u.name}</td><td className="px-3 py-2">{u.email}</td></tr>)}
            {!users.length && <tr><td colSpan="2" className="px-3 py-4 text-center text-neutral-500">ยังไม่มีสมาชิก</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
