// @ts-nocheck
async function pullStateSnapshotFromApi() {
  if (!APP_STATE_API_URL) return { loaded: false, reason: 'url_not_configured' };

  const url = APP_STATE_API_URL.includes('?')
    ? `${APP_STATE_API_URL}&scope=default`
    : `${APP_STATE_API_URL}?scope=default`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Erro ao carregar estado da API (${response.status}): ${text}`);
  }

  const data = await response.json();
  if (!data || typeof data !== 'object' || !data.payload || typeof data.payload !== 'object') {
    return { loaded: false, reason: 'empty_payload' };
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.payload));
  const normalized = loadState();
  Object.assign(state, normalized);
  return { loaded: true };
}
