export default function Footer(){
  return (
    <footer className="mt-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="text-white font-semibold text-lg">BANDD789</div>
          <p className="text-muted mt-2">บ้านสวย เรียบง่าย ใช้งานได้จริง — โทนสีแดง มินิมอล</p>
        </div>
        <div>
          <div className="font-semibold text-white">เมนู</div>
          <ul className="mt-2 space-y-1 text-foreground/80">
            <li>แบบบ้าน</li>
            <li>ผลงาน</li>
            <li>รีวิวลูกค้า</li>
            <li>คำถามที่พบบ่อย</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">ติดต่อ</div>
          <p className="mt-2 text-foreground/80">โทร 02-000-0000 • LINE @bandd789</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">© {new Date().getFullYear()} BANDD789. All rights reserved.</div>
    </footer>
  )
}
