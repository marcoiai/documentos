// @ts-nocheck
function moveRelatorioLayoutWorkingItem(attrId, direction) {
  const idx = (relatorioLayoutWorking || []).findIndex((x) => x.attrId === attrId);
  if (idx < 0) return;
  const to = idx + Number(direction || 0);
  if (to < 0 || to >= relatorioLayoutWorking.length) return;
  const tmp = relatorioLayoutWorking[idx];
  relatorioLayoutWorking[idx] = relatorioLayoutWorking[to];
  relatorioLayoutWorking[to] = tmp;
}
