// @ts-nocheck
function getRelatorioOrderedAttrs(tipoId, layout = relatorioCurrentLayout) {
  const attrsById = new Map(getAtributosByTipo(tipoId).map((a) => [a.id, a]));
  const ordered = [];
  for (const item of layout || []) {
    const attr = attrsById.get(item.attrId);
    if (!attr) continue;
    ordered.push({
      attr,
      colSpan: clampColSpan(item.colSpan || 6),
    });
  }
  return ordered;
}
