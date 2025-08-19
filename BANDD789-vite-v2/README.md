# BANDD789 — Vite + React (TS)
โครงเว็บไซต์มินิมอลสำหรับบริษัทรับสร้างบ้าน พร้อมฟีเจอร์ตามที่ขอ:
- โทนสีแดง, UI ลื่น, Micro-interactions
- Form รับสิทธิ์อยู่หน้าแรก (ไม่ต้องกด popup) — บันทึกลงหลังบ้าน (localStorage)
- แก้ปัญหา Popup: ไม่มี overlay ค้างจอ, ใช้ toast แจ้งผลแทน
- หน้าแบบบ้าน + ตัวกรองครบ: หมวดหมู่/สไตล์/ที่จอด/สไลเดอร์แบบ dual-handle สำหรับงบและพื้นที่
- หน้า ผลงาน / รีวิวลูกค้า / คำถามที่พบบ่อย (FAQ)
- หน้า บทความ + รายละเอียดบทความ (URL slug ภาษาไทย) และเมตาแท็ก SEO/OpenGraph
- หลังบ้าน (fake-auth): admin / bandd789, จัดการ leads, บทความ, รีวิว, FAQ, export CSV
- Lazy-load รูป, Code-splitting (React.lazy), Carousel สไลด์หน้าแรก
- รองรับ Vercel (มี vercel.json สำหรับ SPA)

## รันโครงการ (Local)
```bash
npm i
npm run dev
```

## Deploy ขึ้น Vercel
- สร้างโปรเจกต์ใหม่ เลือก framework "Other" หรือ Static + Build Command: `npm run build`, Output: `dist`
- ตรวจสอบว่าไฟล์ `vercel.json` อยู่ที่ root (ใช้ rewrite ไปยัง index.html)
- กด Deploy

## Notes
- ข้อมูลหลังบ้านเก็บด้วย `localStorage` (เหมาะเดโม/ทดสอบ). หากต้องการเก็บจริงข้ามอุปกรณ์ ให้ต่อฐานข้อมูลภายหลัง (เช่น Vercel KV/Firebase/Supabase) โดยยิง API และแทนที่ storage helper
- วิดีโอ Hero ใช้รูป placeholder — เปลี่ยนเป็นวิดีโอที่โฮสต์เองได้ใน `Home.tsx`
