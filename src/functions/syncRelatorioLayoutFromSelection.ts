// @ts-nocheck
function syncRelatorioLayoutFromSelection(selectedAttrIds, tipoId) {
  const attrs = getAtributosByTipo(tipoId);
  const attrMap = new Map(attrs.map((a) => [a.id, a]));
  const selectedSet = new Set(selectedAttrIds.filter((id) => attrMap.has(id)));
  const existing = Array.isArray(relatorioCurrentLayout) ? relatorioCurrentLayout : [];

  // Keep current custom order for items that are still selected.
  const normalized = existing
    .filter((item) => selectedSet.has(item.attrId) && attrMap.has(item.attrId))
    .map((item) => ({
      attrId: item.attrId,
      colSpan: clampColSpan(item.colSpan || 6),
    }));

  // Append newly selected items at the end without disturbing existing order.
  for (const id of selectedAttrIds) {
    if (!selectedSet.has(id)) continue;
    if (normalized.some((x) => x.attrId === id)) continue;
    normalized.push({
      attrId: id,
      colSpan: 6,
    });
  }

  relatorioCurrentLayout = normalized;
}
