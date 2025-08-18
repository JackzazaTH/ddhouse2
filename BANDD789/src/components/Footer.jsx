import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div>© {new Date().getFullYear()} BANDD789</div>
        <div>โทร 02-XXX-XXXX • <a href="mailto:hello@bandd789.com">hello@bandd789.com</a></div>
      </div>
    </footer>
  )
}
