// @ts-nocheck
function normalizeRelatorioBlockVisibility(raw) {
  const normalized = {};
  for (const key of defaultRelatorioBlockOrder()) {
    normalized[key] = raw && Object.prototype.hasOwnProperty.call(raw, key) ? Boolean(raw[key]) : true;
  }
  return normalized;
}
