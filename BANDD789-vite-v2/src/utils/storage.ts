export const storage = {
  get(key: string, fallback: any = null){
    try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback }catch{ return fallback }
  },
  set(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  }
}
