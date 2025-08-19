export type House = {
  id:number; name:string; style:'โมเดิร์น'|'มินิมอล'|'คลาสสิก';
  beds:number; baths:number; parking:number;
  price:number; area:number; img:string; tags:string[]; category:string;
  images?: string[]; // gallery
  floorplan?: string; // floor plan image
  description?: string;
}

const DEFAULT_HOUSES: House[] = [
  {id:1, name:'M-145', style:'โมเดิร์น', beds:3, baths:2, parking:2, price:2800000, area:145, img:'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1800&auto=format&fit=crop', tags:['ฮิต','งบประหยัด'], category:'บ้านสองชั้น', images: [
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-1e4ce9a2d52f?q=80&w=1200&auto=format&fit=crop'
  ], floorplan:'https://picsum.photos/seed/plan1/1200/800', description:'บ้านสไตล์โมเดิร์น ฟังก์ชันครบ เหมาะครอบครัวขนาดกลาง'},
  {id:2, name:'MN-180', style:'มินิมอล', beds:4, baths:3, parking:2, price:4200000, area:180, img:'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1800&auto=format&fit=crop', tags:['มินิมอล'], category:'บ้านสองชั้น', images:[
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1200&auto=format&fit=crop'
  ], floorplan:'https://picsum.photos/seed/plan2/1200/800', description:'ดีไซน์มินิมอล เรียบง่าย โปร่งโล่ง ใช้วัสดุโทนอุ่น'},
  {id:3, name:'C-120', style:'คลาสสิก', beds:3, baths:2, parking:1, price:2400000, area:120, img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1800&auto=format&fit=crop', tags:['โครงสร้างคุ้มค่า'], category:'บ้านชั้นเดียว', images:[
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop'
  ], floorplan:'https://picsum.photos/seed/plan3/1200/800', description:'โทนอบอุ่น คลาสสิก ใช้งบคุ้มค่า'},
  {id:4, name:'MN-95', style:'มินิมอล', beds:2, baths:2, parking:1, price:1800000, area:95, img:'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1800&auto=format&fit=crop', tags:['เล็กกระทัดรัด'], category:'บ้านชั้นเดียว', images:[
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1200&auto=format&fit=crop'
  ], floorplan:'https://picsum.photos/seed/plan4/1200/800', description:'ขนาดกะทัดรัด เหมาะคู่แต่งงานใหม่'},
  {id:5, name:'M-230', style:'โมเดิร์น', beds:5, baths:4, parking:3, price:6800000, area:230, img:'https://images.unsplash.com/photo-1600585154340-1e4ce9a2d52f?q=80&w=1800&auto=format&fit=crop', tags:['หรูหรา'], category:'บ้านสองชั้น', images:[
    'https://images.unsplash.com/photo-1600585154340-1e4ce9a2d52f?q=80&w=1200&auto=format&fit=crop'
  ], floorplan:'https://picsum.photos/seed/plan5/1200/800', description:'หรูหรา โปร่งสบาย พื้นที่กว้างขวาง'},
  {id:6, name:'CL-150', style:'คลาสสิก', beds:4, baths:3, parking:2, price:3600000, area:150, img:'https://images.unsplash.com/photo-1600585154015-991975854aa3?q=80&w=1800&auto=format&fit=crop', tags:['ขายดี'], category:'บ้านสองชั้น', images:[
    'https://images.unsplash.com/photo-1600585154015-991975854aa3?q=80&w=1200&auto=format&fit=crop'
  ], floorplan:'https://picsum.photos/seed/plan6/1200/800', description:'สไตล์คลาสสิกร่วมสมัย'},
]

export function getHouses(): House[]{
  try{
    const raw = localStorage.getItem('houses')
    if(!raw) return DEFAULT_HOUSES
    const arr = JSON.parse(raw) as House[]
    // Ensure ID exists
    return arr.map((h,i)=> ({ id: h.id ?? (i+1), ...h }))
  }catch{
    return DEFAULT_HOUSES
  }
}
export function saveHouses(list: House[]){
  localStorage.setItem('houses', JSON.stringify(list))
}

export const HOUSES = getHouses()
export const FEATURED_HOUSES = HOUSES.slice(0, 6)
