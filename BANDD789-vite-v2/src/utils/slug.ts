// Use Thai slug (keep Thai letters), normalize spaces and dashes for display,
// then encode when linking.
export function toThaiSlug(title: string){
  const t = (title ?? '').trim().replace(/\s+/g, ' ');
  return t.replace(/\s/g, '-').replace(/-+/g, '-');
}
export function encodeSlug(slug: string){
  return encodeURIComponent(slug);
}
export function decodeSlug(slug: string){
  try{ return decodeURIComponent(slug) } catch { return slug }
}
