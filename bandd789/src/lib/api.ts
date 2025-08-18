export type ApiResult<T> = { ok: boolean; data?: T; error?: string; persisted?: boolean }

async function request<T>(url: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...init })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, ...data }
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Network error' }
  }
}

export const Api = {
  submitForm: (payload: any) =>
    request('/api/forms', { method: 'POST', body: JSON.stringify(payload) }),

  listForms: () => request('/api/forms', { method: 'GET' }),

  listPlans: () => request('/api/plans', { method: 'GET' }),
  createPlan: (plan: any) => request('/api/plans', { method: 'POST', body: JSON.stringify(plan) }),
  updatePlan: (plan: any) => request('/api/plan', { method: 'PUT', body: JSON.stringify(plan) }),
  deletePlan: (id: string) => request('/api/plan', { method: 'DELETE', body: JSON.stringify({ id }) }),

  listFaq: () => request('/api/faq', { method: 'GET' }),
  upsertFaq: (items: any[]) => request('/api/faq', { method: 'POST', body: JSON.stringify({ items }) }),

  listReviews: () => request('/api/reviews', { method: 'GET' }),
  upsertReviews: (items: any[]) => request('/api/reviews', { method: 'POST', body: JSON.stringify({ items }) }),
}
