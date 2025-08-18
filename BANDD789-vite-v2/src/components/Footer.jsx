export default function Footer(){
  return (
    <footer className="mt-8 bg-neutral-950 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 gap-8">
        <div>
          <div className="text-2xl font-extrabold">BANDD<span className="text-primary-400">789</span></div>
          <p className="mt-2 text-sm text-neutral-400">บริษัทรับสร้างบ้านครบวงจร โทนมินิมอล ใช้งานง่าย สีแดงเป็นเอกลักษณ์</p>
        </div>
        <div className="text-sm text-neutral-400">
          <div>โทร: 02-000-0000</div>
          <div>อีเมล: hello@bandd789.co.th</div>
          <div>ที่อยู่: กรุงเทพฯ ประเทศไทย</div>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} BANDD789. All rights reserved.</div>
    </footer>
  )
}
