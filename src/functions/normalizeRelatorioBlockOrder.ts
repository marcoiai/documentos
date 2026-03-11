// @ts-nocheck
function normalizeRelatorioBlockOrder(order) {
  const allowed = new Set(defaultRelatorioBlockOrder());
  const normalized = [];
  for (const key of Array.isArray(order) ? order : []) {
    if (!allowed.has(key)) continue;
    if (normalized.includes(key)) continue;
    normalized.push(key);
  }
  for (const key of defaultRelatorioBlockOrder()) {
    if (!normalized.includes(key)) normalized.push(key);
  }
  return normalized;
}
