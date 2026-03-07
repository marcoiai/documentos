// @ts-nocheck
function inferTipoNome(tipoId) {
  const text = String(tipoId || '').trim();
  const match = text.match(/^tipo_(\d+)$/);
  if (match) return `Tipo ${match[1]}`;
  if (!text) return 'Tipo';
  return text;
}

