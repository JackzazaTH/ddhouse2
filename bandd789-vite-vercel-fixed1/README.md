
# BANDD789 — Vite + React (Vercel ready)

Minimal, fast, red-themed site inspired by landyhome, with homepage popup form (auto visible), animated UI, and a simple admin ("หลังบ้าน") to view form submissions saved in **Vercel KV** and mirrored to **Vercel Blob**.

## Features
- Vite + React + Tailwind (red theme)
- Smooth micro-animations (Framer Motion + CSS)
- Global popup / modal system for details & notifications
- Homepage **Form "รับสิทธิ์"** shown automatically (no click); validates; saves to `/api/forms/submit`
- Admin page (`/admin`) to view/export submissions (requires token)
- Pages: หน้าแรก, แบบบ้าน (ค้นหา/หมวดหมู่), ผลงาน, รีวิวลูกค้า, คำถามที่พบบ่อย
- Ready for Vercel deploy with **Serverless Functions** in `/api`
- Text contrast fixed for visibility

## Quick Start (Local)
```bash
npm i
npm run dev
```
ENV not required locally; the form will save to **localStorage** as fallback and still show in Admin.

## Deploy to Vercel
1. **Create a Vercel project** and import this repo.
2. Add the **Vercel KV** and **Vercel Blob** integrations.    
   This will inject:
   - `KV_REST_API_URL`, `KV_REST_API_TOKEN` (or KV binding envs used by `@vercel/kv`)
   - `BLOB_READ_WRITE_TOKEN` (or managed by the Blob integration)
3. Add your admin token:
   - `ADMIN_TOKEN` = a long random string (e.g. from `openssl rand -hex 32`)
4. Deploy.

> **Note:** On Vercel the form is stored in KV under keys `form:<id>` and indexed by list `forms`. A JSON copy is also written to Blob `forms/<id>.json`.

## Admin (หลังบ้าน)
- Visit `/admin`
- Paste your token (same as `ADMIN_TOKEN`) to view submissions
- Export CSV

## Customize
- Edit brand name (already set to **BANDD789**) and content in `src/pages/*`.
- House plan data is in `src/data/housePlans.json`. You can add/adjust categories and fields.
