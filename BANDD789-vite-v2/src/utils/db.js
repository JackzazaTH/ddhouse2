const KEYS = {
  USERS: 'bandd789_users',
  SESSION: 'bandd789_session',
  ARTICLES: 'bandd789_articles',
  REVIEWS: 'bandd789_reviews_public'
}

function read(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function write(key, data){
  localStorage.setItem(key, JSON.stringify(data))
}

export function createUser({name, email, password}){
  const users = read(KEYS.USERS, [])
  if(users.some(u => u.email === email)) throw new Error('อีเมลนี้มีอยู่แล้ว')
  const user = { id: crypto.randomUUID(), name, email, password }
  users.push(user); write(KEYS.USERS, users)
  return user
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
  while(arr.some(a => a.slug === finalSlug)){
    i++; finalSlug = `${baseSlug}-${i}`
  }
  const item = {
    id: crypto.randomUUID(),
    title, content,
    category: category || '',
    tags: (tags||[]),
    slug: finalSlug,
    coverUrl: coverUrl || '',
    createdAt: new Date().toISOString(),
    noindex: !!noindex
  }
  arr.push(item); write(KEYS.ARTICLES, arr); return item
}
export function listArticles(){ return read(KEYS.ARTICLES, []) }
export function findArticleBySlug(slug){ return listArticles().find(a => a.slug === slug) }

export function addPublicReview({name, text, rating}){
  const arr = read(KEYS.REVIEWS, [])
  const item = { id: crypto.randomUUID(), name, text, rating: Number(rating), createdAt: new Date().toISOString() }
  arr.push(item); write(KEYS.REVIEWS, arr); return item
}
export function listPublicReviews(){ return read(KEYS.REVIEWS, []) }
export function removePublicReview(id){
  const arr = listPublicReviews().filter(a => a.id !== id); write(KEYS.REVIEWS, arr)
}
