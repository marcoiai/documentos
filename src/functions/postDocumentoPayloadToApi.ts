// @ts-nocheck
async function postDocumentoPayloadToApi(payload) {
  if (!DOCUMENTO_API_URL) return { sent: false, reason: 'url_not_configured' };

  const response = await fetch(DOCUMENTO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let bodyText = '';
    try {
      bodyText = await response.text();
    } catch {
      bodyText = '';
    }
    throw new Error(`Falha ao enviar para API (${response.status}): ${bodyText || 'sem detalhe'}`);
  }

  return { sent: true };
}
