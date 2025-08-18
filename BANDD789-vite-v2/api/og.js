export default function handler(req, res){
  const { title = 'BANDD789', subtitle = '', brand = 'BANDD789' } = req.query || {}
  const safe = String(title).slice(0, 80)
  const sub = String(subtitle).slice(0, 120)
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e11d48"/><stop offset="1" stop-color="#9f1239"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80,100)">
    <rect width="1040" height="430" rx="24" fill="rgba(255,255,255,0.14)"/>
    <text x="40" y="120" font-size="64" fill="#fff" font-weight="800" font-family="Inter, Arial, sans-serif">${safe}</text>
    <text x="40" y="190" font-size="28" fill="rgba(255,255,255,0.9)" font-family="Inter, Arial, sans-serif">${sub}</text>
  </g>
  <text x="80" y="560" font-size="28" fill="#fff" font-weight="700" font-family="Inter, Arial, sans-serif">${brand}</text>
</svg>`)
}
