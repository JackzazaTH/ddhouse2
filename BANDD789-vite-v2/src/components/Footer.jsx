export default function Footer(){
  return (
    <footer className="mt-12 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} BANDD789</div>
        <div className="flex gap-4">
          <a className="link" href="/บทความ">บทความ</a>
          <a className="link" href="/คำถามที่พบบ่อย">FAQ</a>
        </div>
        <div className="w-full text-center text-xs text-neutral-400 mt-2">
          <a href="/admin" className="hover:underline">หลังบ้าน</a>
        </div>
      </div>
    </footer>
  )
}
