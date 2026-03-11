// @ts-nocheck
function normalizeRelatorioTotalAttrIds(raw, tipoId = '') {
  let allowed = new Set();
  if (tipoId && typeof getAtributosByTipo === 'function') {
    try {
      allowed = new Set(
        getAtributosByTipo(tipoId)
          .filter((a) => a.tipoCampo === 'numero')
          .map((a) => a.id)
      );
    } catch {
      allowed = new Set();
    }
  }
  const out = [];
  const seen = new Set();
  for (const id of Array.isArray(raw) ? raw : []) {
    const attrId = String(id || '');
    if (!attrId || seen.has(attrId)) continue;
    if (allowed.size && !allowed.has(attrId)) continue;
    seen.add(attrId);
    out.push(attrId);
  }
  return out;
}
