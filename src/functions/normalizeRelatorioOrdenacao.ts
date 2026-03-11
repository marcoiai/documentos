// @ts-nocheck
function normalizeRelatorioOrdenacao(raw, tipoId = '') {
  let allowed = null;
  if (tipoId && typeof getAtributosByTipo === 'function') {
    try {
      // During bootstrap, state may not be initialized yet.
      const attrs = getAtributosByTipo(tipoId);
      if (Array.isArray(attrs) && attrs.length) {
        allowed = new Set(attrs.map((a) => a.id));
      }
    } catch {
      allowed = null;
    }
  }

  const out = [];
  const seen = new Set();
  for (const item of Array.isArray(raw) ? raw : []) {
    const attrId = String(item?.attrId || '');
    if (!attrId) continue;
    if (allowed && !allowed.has(attrId)) continue;
    if (seen.has(attrId)) continue;
    seen.add(attrId);
    out.push({
      attrId,
      direcao: String(item?.direcao || 'asc') === 'desc' ? 'desc' : 'asc',
    });
  }
  return out;
}
