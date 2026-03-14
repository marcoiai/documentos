// @ts-nocheck
function clampRelatorioSpacerHeight(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 24;
  return Math.max(4, Math.min(240, Math.floor(n)));
}

