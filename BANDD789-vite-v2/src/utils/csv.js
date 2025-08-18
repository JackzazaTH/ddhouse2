export function toCSV(rows){
  if(!rows.length) return ''
  const headers = Object.keys(rows[0] || {name:'',phone:'',email:'',budget:'',styles:'',privilege:'',promo_code:'',note:'',createdAt:''})
  const escape = v => '"'+String(v ?? '').replaceAll('"','""')+'"'
  const lines = [headers.map(escape).join(',')]
  for(const r of rows){
    lines.push(headers.map(h => escape(r[h])).join(','))
  }
  return lines.join('\n')
}
