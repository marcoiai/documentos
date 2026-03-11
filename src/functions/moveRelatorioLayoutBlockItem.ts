// @ts-nocheck
function moveRelatorioLayoutBlockItem(key, direction) {
  const idx = (relatorioLayoutBlocksWorking || []).findIndex((x) => x === key);
  if (idx < 0) return;
  const to = idx + Number(direction || 0);
  if (to < 0 || to >= relatorioLayoutBlocksWorking.length) return;
  const tmp = relatorioLayoutBlocksWorking[idx];
  relatorioLayoutBlocksWorking[idx] = relatorioLayoutBlocksWorking[to];
  relatorioLayoutBlocksWorking[to] = tmp;
}
