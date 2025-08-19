// Use Thai slugs (keep characters), but ensure URL-safe with encodeURIComponent when linking.
export function toThaiSlug(title: string){
  return title.strip?.() ? title.strip() : title.trim()
}
export function encodeSlug(slug: string){
  return encodeURIComponent(slug)
}
export function decodeSlug(slug: string){
  try{ return decodeURIComponent(slug) } catch { return slug }
}
