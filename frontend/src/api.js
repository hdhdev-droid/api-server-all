const API_BASE = '/api';

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `HTTP ${res.status}`);
  }
  return data;
}

export async function checkDb() {
  return request('/db/check');
}

export async function getTables() {
  return request('/db/tables');
}
