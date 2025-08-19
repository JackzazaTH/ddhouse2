const KEYS = {
  USERS: 'bandd789_users',
  SESSION: 'bandd789_session',
  ARTICLES: 'bandd789_articles',
  REVIEWS: 'bandd789_reviews_public',
  PORTFOLIO: 'bandd789_portfolio'
}
function read(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
function write(key, data){ localStorage.setItem(key, JSON.stringify(data)) }

export function createUser({name, email, password}){
  const users = read(KEYS.USERS, [])
  if(users.some(u => u.email === email)) throw new Error('อีเมลนี้มีอยู่แล้ว')
  const user = { id: crypto.randomUUID(), name, email, password }
  users.push(user); write(KEYS.USERS, users); return user
}
export function loginUser({email, password}){
  const users = read(KEYS.USERS, [])
  const user = users.find(u => u.email === email && u.password === password)
  if(!user) throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
  write(KEYS.SESSION, { id: user.id, email: user.email, name: user.name })
  return user
}
export function logoutUser(){ localStorage.removeItem(KEYS.SESSION) }
export function currentUser(){ return read(KEYS.SESSION, null) }
export function listUsers(){ return read(KEYS.USERS, []) }

export function slugify(text){
  const s = String(text || '').trim().replace(/\s+/g, '-')
  return s.toLowerCase().replace(/[^a-z0-9\-\u0E00-\u0E7F]/g, '')
}

export function addArticle({title, content, category, tags, coverUrl, slug, noindex}){
  const arr = read(KEYS.ARTICLES, [])
  const baseSlug = slug ? slugify(slug) : slugify(title)
  let finalSlug = baseSlug || crypto.randomUUID().slice(0,8)
  let i = 1
  while(arr.some(a => a.slug === finalSlug)){ i++; finalSlug = `${baseSlug}-${i}` }
  const item = { id: crypto.randomUUID(), title, content, category: category||'', tags:(tags||[]), slug: finalSlug, coverUrl: coverUrl||'', createdAt: new Date().toISOString(), noindex: !!noindex }
  arr.push(item); write(KEYS.ARTICLES, arr); return item
}
export function listArticles(){ return read(KEYS.ARTICLES, []) }
export function findArticleBySlug(slug){ return listArticles().find(a => a.slug === slug) }
export function updateArticle(id, patch){
  const arr = listArticles(); const idx = arr.findIndex(a => a.id === id); if(idx === -1) return
  const curr = arr[idx]; let next = { ...curr, ...patch }
  if(patch?.slug){
    const base = slugify(patch.slug); let newSlug = base || curr.slug; let i = 1
    while(arr.some(a => a.slug === newSlug && a.id !== id)){ i++; newSlug = `${base}-${i}` }
    next.slug = newSlug
  }
  arr[idx] = next; write(KEYS.ARTICLES, arr); return next
}
export function removeArticle(id){ const arr = listArticles().filter(a => a.id !== id); write(KEYS.ARTICLES, arr) }

export function addPublicReview({name, text, rating}){
  const arr = read(KEYS.REVIEWS, [])
  const item = { id: crypto.randomUUID(), name, text, rating: Number(rating), createdAt: new Date().toISOString() }
  arr.push(item); write(KEYS.REVIEWS, arr); return item
}
export function listPublicReviews(){ return read(KEYS.REVIEWS, []) }
export function removePublicReview(id){ const arr = listPublicReviews().filter(a => a.id !== id); write(KEYS.REVIEWS, arr) }
export function updatePublicReview(id, patch){
  const arr = listPublicReviews(); const idx = arr.findIndex(r => r.id === id); if(idx === -1) return
  arr[idx] = { ...arr[idx], ...patch }; write(KEYS.REVIEWS, arr); return arr[idx]
}

export function addProject({title, description, category, coverUrl, gallery=[], budget, area, location, completedAt, slug}){
  const arr = read(KEYS.PORTFOLIO, [])
  const baseSlug = slug ? slugify(slug) : slugify(title)
  let finalSlug = baseSlug || crypto.randomUUID().slice(0,8)
  let i = 1
  while(arr.some(p => p.slug === finalSlug)){ i++; finalSlug = `${baseSlug}-${i}` }
  const item = { id: crypto.randomUUID(), title, description: description||'', category: category||'', coverUrl: coverUrl||'', gallery: Array.isArray(gallery)?gallery:[], budget: budget||'', area: area||'', location: location||'', completedAt: completedAt||'', slug: finalSlug, createdAt: new Date().toISOString() }
  arr.unshift(item); write(KEYS.PORTFOLIO, arr); return item
}
export function listProjects(){ return read(KEYS.PORTFOLIO, []) }
export function findProjectBySlug(slug){ return listProjects().find(p => p.slug === slug) }
export function updateProject(id, patch){
  const arr = listProjects(); const idx = arr.findIndex(p => p.id === id); if(idx === -1) return
  const curr = arr[idx]; let next = { ...curr, ...patch }
  if(patch?.slug){
    const base = slugify(patch.slug); let newSlug = base || curr.slug; let i = 1
    while(arr.some(p => p.slug === newSlug && p.id !== id)){ i++; newSlug = `${base}-${i}` }
    next.slug = newSlug
  }
  arr[idx] = next; write(KEYS.PORTFOLIO, arr); return next
}
export function removeProject(id){ const arr = listProjects().filter(p => p.id !== id); write(KEYS.PORTFOLIO, arr) }
