// @ts-nocheck
function buildRelatorioLayoutWorkingFromConfig(tipoId, configId) {
  const config = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
  if (!config) return [];

  const attrs = getAtributosByTipo(tipoId);
  const attrById = new Map(attrs.map((a) => [a.id, a]));
  const selected = Array.isArray(config.selectedAttrIds) ? config.selectedAttrIds.filter((id) => attrById.has(id)) : [];

  const base = Array.isArray(config.reportLayout)
    ? config.reportLayout.filter((x) => selected.includes(x.attrId)).map((x) => ({
      attrId: x.attrId,
      colSpan: clampColSpan(x.colSpan || 6),
    }))
    : [];

  const inBase = new Set(base.map((x) => x.attrId));
  for (const id of selected) {
    if (inBase.has(id)) continue;
    base.push({ attrId: id, colSpan: 6 });
  }

  return base;
}
