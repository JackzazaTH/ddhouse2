export function toCSV(rows){
  if(!rows || !rows.length) return ''
  const headers = Object.keys(rows[0])
  const esc = (v)=>`"${String(v??'').replace(/"/g,'""')}"`
  const lines = [headers.map(esc).join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))]
  return lines.join('\n')
}
