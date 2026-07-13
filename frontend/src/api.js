const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
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

export async function getTableRows(tableName) {
  return request(`/db/tables/${encodeURIComponent(tableName)}/rows`);
}

export async function setupTables() {
  return request('/db/setup-tables', { method: 'POST' });
}

export async function seedSampleData() {
  return request('/db/seed-sample-data', { method: 'POST' });
}
