// @ts-nocheck
function normalizeRelatorioBlockVisibility(raw, order = []) {
  const normalized = {};
  const keys = normalizeRelatorioBlockOrder(order);
  for (const key of keys) {
    normalized[key] = raw && Object.prototype.hasOwnProperty.call(raw, key) ? Boolean(raw[key]) : true;
  }
  return normalized;
}
