const LS = {
  forms: 'bandd789_forms',
  plans: 'bandd789_plans',
  faq: 'bandd789_faq',
  reviews: 'bandd789_reviews',
}

export function load<T>(key: keyof typeof LS, fallback: T): T {
  try {
    const raw = localStorage.getItem(LS[key])
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
export function save<T>(key: keyof typeof LS, value: T) {
  try {
    localStorage.setItem(LS[key], JSON.stringify(value))
  } catch {}
}
