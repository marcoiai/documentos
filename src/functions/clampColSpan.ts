// @ts-nocheck
function clampColSpan(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 6;
  return Math.max(1, Math.min(12, Math.round(n)));
}

