export type Plan = {
  id: string
  name: string
  style: 'Modern' | 'Classic' | 'Minimal' | 'Luxury'
  bedrooms: number
  bathrooms: number
  areaSqm: number
  priceTHB: number
  image: string
  tags: string[]
}

export const samplePlans: Plan[] = [
  { id: 'P-101', name: 'BANDD M1', style: 'Modern', bedrooms: 3, bathrooms: 3, areaSqm: 180, priceTHB: 3290000, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1730&auto=format&fit=crop', tags: ['ครอบครัว', 'ระเบียง']},
  { id: 'P-102', name: 'BANDD C1', style: 'Classic', bedrooms: 4, bathrooms: 3, areaSqm: 240, priceTHB: 4590000, image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1730&auto=format&fit=crop', tags: ['หรูหรา', 'เพดานสูง']},
  { id: 'P-103', name: 'BANDD X-Min', style: 'Minimal', bedrooms: 2, bathrooms: 2, areaSqm: 120, priceTHB: 2190000, image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1730&auto=format&fit=crop', tags: ['มินิมอล', 'ประหยัดพลังงาน']},
  { id: 'P-104', name: 'BANDD LX', style: 'Luxury', bedrooms: 5, bathrooms: 5, areaSqm: 380, priceTHB: 10900000, image: 'https://images.unsplash.com/photo-1613977257593-930b4e1639ce?q=80&w=1740&auto=format&fit=crop', tags: ['สระว่ายน้ำ', 'สเปซกว้าง']},
]
