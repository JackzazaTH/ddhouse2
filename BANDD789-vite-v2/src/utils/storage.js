const KEY = 'bandd789_forms'

export function saveFormSubmission(data){
  const all = JSON.parse(localStorage.getItem(KEY) || '[]')
  all.push(data)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function listSubmissions(){
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function removeSubmission(index){
  const all = listSubmissions()
  all.splice(index,1)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function clearAll(){
  localStorage.removeItem(KEY)
}
