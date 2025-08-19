export type House = {
  id:number; name:string; style:'โมเดิร์น'|'มินิมอล'|'คลาสสิก';
  beds:number; baths:number; parking:number;
  price:number; area:number; img:string; tags:string[]; category:string
}

export const HOUSES: House[] = [
  {id:1, name:'M-145', style:'โมเดิร์น', beds:3, baths:2, parking:2, price:2800000, area:145, img:'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1800&auto=format&fit=crop', tags:['ฮิต','งบประหยัด'], category:'บ้านสองชั้น'},
  {id:2, name:'MN-180', style:'มินิมอล', beds:4, baths:3, parking:2, price:4200000, area:180, img:'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1800&auto=format&fit=crop', tags:['มินิมอล'], category:'บ้านสองชั้น'},
  {id:3, name:'C-120', style:'คลาสสิก', beds:3, baths:2, parking:1, price:2400000, area:120, img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1800&auto=format&fit=crop', tags:['โครงสร้างคุ้มค่า'], category:'บ้านชั้นเดียว'},
  {id:4, name:'MN-95', style:'มินิมอล', beds:2, baths:2, parking:1, price:1800000, area:95, img:'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1800&auto=format&fit=crop', tags:['เล็กกระทัดรัด'], category:'บ้านชั้นเดียว'},
  {id:5, name:'M-230', style:'โมเดิร์น', beds:5, baths:4, parking:3, price:6800000, area:230, img:'https://images.unsplash.com/photo-1600585154340-1e4ce9a2d52f?q=80&w=1800&auto=format&fit=crop', tags:['หรูหรา'], category:'บ้านสองชั้น'},
  {id:6, name:'CL-150', style:'คลาสสิก', beds:4, baths:3, parking:2, price:3600000, area:150, img:'https://images.unsplash.com/photo-1600585154015-991975854aa3?q=80&w=1800&auto=format&fit=crop', tags:['ขายดี'], category:'บ้านสองชั้น'}
]

export const FEATURED_HOUSES = HOUSES.slice(0, 6)
