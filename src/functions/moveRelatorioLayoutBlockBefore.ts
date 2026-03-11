// @ts-nocheck
function moveRelatorioLayoutBlockBefore(draggedKey, targetKey) {
  if (!draggedKey || !targetKey || draggedKey === targetKey) return;
  const items = Array.isArray(relatorioLayoutBlocksWorking) ? [...relatorioLayoutBlocksWorking] : [];
  const from = items.findIndex((x) => x === draggedKey);
  const to = items.findIndex((x) => x === targetKey);
  if (from < 0 || to < 0) return;

  const [dragged] = items.splice(from, 1);
  const targetIndex = items.findIndex((x) => x === targetKey);
  items.splice(targetIndex < 0 ? items.length : targetIndex, 0, dragged);
  relatorioLayoutBlocksWorking = items;
}
