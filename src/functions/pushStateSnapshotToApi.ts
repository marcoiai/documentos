// @ts-nocheck
async function pushStateSnapshotToApi() {
  if (!APP_STATE_API_URL) return { sent: false, reason: 'url_not_configured' };

  const response = await fetch(APP_STATE_API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      scope: 'default',
      payload: JSON.parse(JSON.stringify(state)),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Erro ao salvar estado na API (${response.status}): ${text}`);
  }

  return { sent: true };
}
