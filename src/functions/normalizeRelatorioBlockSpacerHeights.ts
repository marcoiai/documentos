// @ts-nocheck
function normalizeRelatorioBlockSpacerHeights(raw, order = []) {
  const normalized = {};
  for (const key of Array.isArray(order) ? order : []) {
    if (!isRelatorioBlockSpacerKey(key)) continue;
    normalized[key] = clampRelatorioSpacerHeight(raw?.[key]);
  }
  return normalized;
}

