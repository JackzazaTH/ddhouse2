import React from 'react'
export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
          <div>© {new Date().getFullYear()} BANDD789</div>
          <div>โทร 02-xxx-xxxx • Line: @bandd789</div>
        </div>
      </div>
    </footer>
  )
}
