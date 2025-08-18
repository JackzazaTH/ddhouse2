# BANDD789 (Vite + React + Tailwind)

เว็บไซต์เดโค้งานรับสร้างบ้าน โทนมินิมอล สีแดง พร้อมหลังบ้านเก็บฟอร์ม
- Framework: **Vite + React**
- UI: **TailwindCSS** + **Framer Motion** (อนิเมชัน)
- Routing: **react-router-dom**
- ข้อมูลฟอร์ม: เก็บใน **localStorage** ที่ฝั่งหลังบ้าน (เดโม) พร้อม Export CSV

## รันบนเครื่อง
```bash
npm install
npm run dev
```

## Deploy Vercel
- กด New Project เลือก Repo นี้ (หรืออัปโหลด ZIP)
- Build Command: `npm run build`
- Output Directory: `dist`

## โครงสร้างหน้า
- `/` หน้าแรก (Hero + Popup ฟอร์มแสดงอัตโนมัติ)
- `/แบบบ้าน` หน้ารวมแบบบ้าน + ค้นหา + หมวดหมู่
- `/ผลงาน` ผลงาน (เปิดรายละเอียดแบบ Popup)
- `/รีวิวลูกค้า` รีวิวลูกค้า
- `/คำถามที่พบบ่อย` FAQ (Accordion)
- `/admin` หลังบ้าน (login: `admin` / `bandd789`)

> หมายเหตุ: สำหรับโปรดักชัน ควรเชื่อมฐานข้อมูลจริง (เช่น Supabase / Firebase / PlanetScale) และแทนที่ localStorage
