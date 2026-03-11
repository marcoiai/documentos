// @ts-nocheck
function updateRelatorioLayoutSpan(attrId, spanValue) {
  const item = (relatorioCurrentLayout || []).find((x) => x.attrId === attrId);
  if (!item) return;
  item.colSpan = clampColSpan(spanValue);
}
