// @ts-nocheck
function syncLayoutsForTipo(tipoId) {
  if (!tipoId) return [];
  if (!state.layouts || typeof state.layouts !== 'object') state.layouts = {};

  const attrs = getAtributosByTipo(tipoId);
  const attrIds = new Set(attrs.map((a) => a.id));
  const existing = Array.isArray(state.layouts[tipoId]) ? state.layouts[tipoId] : [];
  const normalized = [];
  let changed = existing.length === 0 && attrs.length > 0;

  for (const item of existing) {
    if (!item || !attrIds.has(item.attrId)) continue;
    if (normalized.some((n) => n.attrId === item.attrId)) continue;
    const span = clampColSpan(item.colSpan);
    if (span !== item.colSpan) changed = true;
    normalized.push({
      attrId: item.attrId,
      colSpan: span,
    });
  }

  for (const attr of attrs) {
    if (normalized.some((n) => n.attrId === attr.id)) continue;
    normalized.push({
      attrId: attr.id,
      colSpan: defaultColSpanForAttr(attr),
    });
    changed = true;
  }

  if (normalized.length !== existing.length) changed = true;
  state.layouts[tipoId] = normalized;
  if (changed) saveState();
  return normalized;
}

