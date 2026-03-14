// @ts-nocheck
function normalizeRelatorioBlockOrder(order) {
  const normalized = [];
  for (const key of Array.isArray(order) ? order : []) {
    const text = String(key || '');
    if (!defaultRelatorioBlockOrder().includes(text) && !isRelatorioBlockSpacerKey(text) && !isRelatorioBlockImageKey(text)) {
      continue;
    }
    if (normalized.includes(key)) continue;
    normalized.push(text);
  }
  for (const key of defaultRelatorioBlockOrder()) {
    if (!normalized.includes(key)) normalized.push(key);
  }
  return normalized;
}
