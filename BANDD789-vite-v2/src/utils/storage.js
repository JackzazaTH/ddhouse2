const KEY = 'bandd789_forms'
export function listSubmissions(){ try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] } }
export function saveFormSubmission(data){ const arr = listSubmissions(); arr.unshift(data); localStorage.setItem(KEY, JSON.stringify(arr)) }
export function removeSubmission(i){ const arr = listSubmissions(); arr.splice(i,1); localStorage.setItem(KEY, JSON.stringify(arr)) }
export function clearAll(){ localStorage.removeItem(KEY) }
