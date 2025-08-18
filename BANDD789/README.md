# BANDD789 (Vite + React + Vercel Edge API)

เว็บรับสร้างบ้านสไตล์ Minimal ธีมสีแดง พร้อม
- หน้า: หน้าแรก, แบบบ้าน (ค้นหา/หมวดหมู่), ผลงาน, รีวิวลูกค้า, คำถามที่พบบ่อย, หลังบ้าน
- ฟอร์ม "รับสิทธิ์/ขอใบเสนอราคา" โชว์อัตโนมัติหน้าแรก (Popup)
- หลังบ้านดู Lead + แก้ไขคอนเทนต์ (Hero, Bullets, FAQ, สีธีม)
- จัดเก็บถาวรลง **Vercel KV** และสำรองลง **Vercel Blob**
- ทำงานแบบ **Edge Functions** (เร็ว) และ fallback เป็น LocalStorage หากยังไม่ตั้งค่า ENV

## รันท้องถิ่น
```bash
npm i
npm run dev
```

## Deploy ขึ้น Vercel
1) สร้างโปรเจกต์ใหม่ใน Vercel เลือก **Framework: Vite**  
2) เพิ่มไฟล์สิ่งแวดล้อม (Environment Variables):
```
KV_REST_API_URL= (จาก Vercel KV integration)
KV_REST_API_TOKEN= (จาก Vercel KV)
KV_REST_API_READ_ONLY_TOKEN= (จาก Vercel KV)
BLOB_READ_WRITE_TOKEN= (จาก Vercel Blob)
ADMIN_TOKEN= สร้างรหัสผู้ดูแลของคุณเอง
```
> ติดตั้ง Integrations: **Vercel KV (Upstash)** และ **Vercel Blob** ให้โปรเจกต์

3) Deploy ได้เลย

## การใช้งานหลังบ้าน
- เปิด `/admin` กรอก `ADMIN_TOKEN` ที่ตั้งไว้
- แท็บ Lead: ค้นหา/ดูรายการที่ลูกค้ากรอกจากหน้าแรก
- แท็บ Content: แก้ Hero/สีธีม/FAQ แล้วกดบันทึก (เขียน KV + Blob)

## โครงสร้างสำคัญ
- Frontend: Vite + React + React Router + Framer Motion
- API (Edge): `/api/lead` (GET/POST), `/api/content` (GET/POST), `/api/health`

หาก API ยังไม่ตั้งค่า ENV:
- ระบบจะยังทำงานได้ด้วย **LocalStorage** (เก็บชั่วคราว) เพื่อให้ทดสอบ UI/UX ได้ทันที

## หมายเหตุ
- ธีมสีหลักปรับได้จากหลังบ้าน หรือผ่าน env `VITE_THEME_COLOR`
- สามารถปรับ/เพิ่มหน้าต่างๆ ได้ง่ายใน `src/pages/*`


## อัปเกรดฟีเจอร์
- หน้าใหม่: **กระบวนการ (About/Process)**, **ติดต่อเรา**
- แบบบ้าน: **เรียงลำดับ + เปลี่ยนหน้า** (พื้นที่/ราคา)
- ฟอร์ม: **Honeypot + Rate limit 30s**
- หลังบ้าน: อัปเดตสถานะ Lead, **นำเข้า/ส่งออก CSV**, อัปโหลดรูปขึ้น **Blob**, จัดการ **Portfolio/Reviews** ในคอนเทนต์
- API เพิ่ม: `PATCH /api/lead`, `GET /api/lead/export`, `POST /api/lead/import`, `POST /api/upload`


### เพิ่มเติม (v3)
- หน้า **Blog/บทความ** + ค้นหา/หมวดหมู่/แท็ก
- หน้า **Calculator** คำนวณงบเบื้องต้น
- หน้า **Appointment** จองนัดหมาย พร้อม API เก็บลง KV/Blob
- หลังบ้านจัดการ **Blog/นัดหมาย** ได้ (API พร้อม)


## อัปเกรดฟีเจอร์ (v3)
- หน้าใหม่: **บทความ (Blog)**, **นัดหมาย (Booking)**, **404**
- Sticky CTA ที่หน้าแรก
- SEO Helper (ตั้ง title/description แบบ SPA)
- ไฟล์ **robots.txt** และ **sitemap.xml**
- ฟอร์ม: ตรวจรูปแบบเบอร์โทรไทย
- Admin Dashboard: ตัวเลขสรุป + กราฟ 7 วัน (SVG), จัดการ **Booking**
- API ใหม่: `/api/booking` (POST/GET/PATCH), `/api/booking/export`, `/api/notify` (webhook)
- รองรับ **NOTIFY_WEBHOOK_URL** สำหรับแจ้งเตือน Lead/Booking ใหม่
