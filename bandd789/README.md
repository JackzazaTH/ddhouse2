# BANDD789 — Vite + React + Tailwind + Vercel KV/Blob

โค้ดนี้เป็นเว็บแนว **Landy Home** แบบมินิมอล โทนสี **แดง** พร้อม **Popup/Animate** และ **หลังบ้าน (Admin)**
- โครงสร้าง: Vite + React + TypeScript + Tailwind + Framer Motion
- ฟอร์มโปรโมชั่นโชว์ **ทันทีบนหน้าแรก** (ไม่ต้องกด) → กดส่งแล้วเก็บใน **หลังบ้าน** และเขียนลง **Vercel KV/Blob** (ถ้าตั้งค่าไว้)
- หน้าต่างๆ: หน้าแรก • รวมแบบบ้าน (ค้นหา/หมวดหมู่) • ผลงาน • รีวิวลูกค้า • คำถามที่พบบ่อย • หลังบ้าน
- หลังบ้าน: ดูฟอร์ม, จัดการแบบบ้าน (เพิ่ม/แก้ไข/ลบ), จัดการ FAQ, รีวิว
- ธีมเข้ม (พื้นดำ/แดง) ข้อความเห็นชัดเจน แก้บั๊กข้อความมองไม่เห็นแล้ว

## รันใช้งาน (Local)
```bash
npm install
npm run dev
```

## Deploy ขึ้น Vercel
1. สร้างโปรเจกต์ใหม่บน Vercel แล้วอัปโฟลเดอร์นี้
2. ตั้งค่า Environment Variables
   - `VITE_ADMIN_PIN` = รหัสหลังบ้าน (เริ่มต้น 7890)
   - `KV_REST_API_URL` และ `KV_REST_API_TOKEN` (จาก Vercel KV)
   - `BLOB_READ_WRITE_TOKEN` (จาก Vercel Blob)
3. กด Deploy ได้เลย

> หากยังไม่ตั้งค่า KV/Blob ระบบจะยังทำงานได้โดย **เก็บข้อมูลฝั่งเบราว์เซอร์ (localStorage)** เพื่อให้ลองใช้ก่อน เมื่อเชื่อม KV/Blob แล้วข้อมูลจะ **ถาวร** ในหลังบ้าน

## โฟลเดอร์สำคัญ
- `src/` โค้ดหน้าเว็บ
- `api/` Serverless Functions (อ่าน/เขียน KV/Blob)
- `vercel.json` กำหนด runtime และ routes
- `.env.example` ตัวอย่าง Environment

## หมายเหตุ
- รูปในตัวอย่างใช้ภาพสาธารณะจาก Unsplash (เพื่อเดโมเท่านั้น)
- คุณสามารถปรับฟิลด์ฟอร์ม/สิทธิพิเศษ/เงื่อนไขได้ที่ `PromoForm.tsx`
- ปรับสีธีมได้ใน `tailwind.config.js`
