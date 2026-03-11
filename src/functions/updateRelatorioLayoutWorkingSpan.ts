// @ts-nocheck
function updateRelatorioLayoutWorkingSpan(attrId, value) {
  const item = (relatorioLayoutWorking || []).find((x) => x.attrId === attrId);
  if (!item) return;
  item.colSpan = clampColSpan(value);
}
