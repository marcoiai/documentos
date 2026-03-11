// @ts-nocheck
function moveRelatorioLayoutWorkingBefore(draggedAttrId, targetAttrId) {
  if (!draggedAttrId || !targetAttrId || draggedAttrId === targetAttrId) return;
  const items = Array.isArray(relatorioLayoutWorking) ? [...relatorioLayoutWorking] : [];
  const from = items.findIndex((x) => x.attrId === draggedAttrId);
  const to = items.findIndex((x) => x.attrId === targetAttrId);
  if (from < 0 || to < 0) return;

  const [dragged] = items.splice(from, 1);
  const targetIndex = items.findIndex((x) => x.attrId === targetAttrId);
  items.splice(targetIndex < 0 ? items.length : targetIndex, 0, dragged);
  relatorioLayoutWorking = items;
}
