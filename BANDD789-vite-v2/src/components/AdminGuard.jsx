const KEY = 'bandd789_admin'
export function isAuthed(){ return localStorage.getItem(KEY) === '1' }
export function loginAdmin(u,p){ if(u==='admin' && p==='bandd789'){ localStorage.setItem(KEY,'1'); return true } return false }
export function logoutAdmin(){ localStorage.removeItem(KEY) }
