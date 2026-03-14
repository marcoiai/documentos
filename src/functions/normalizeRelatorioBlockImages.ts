// @ts-nocheck
function clampRelatorioImageWidth(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 260;
  return Math.max(40, Math.min(520, Math.floor(n)));
}

function clampRelatorioImageHeight(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(20, Math.min(700, Math.floor(n)));
}

function normalizeRelatorioBlockImages(raw, order = []) {
  const normalized = {};
  for (const key of Array.isArray(order) ? order : []) {
    if (!isRelatorioBlockImageKey(key)) continue;
    const cfg = raw?.[key] || {};
    const align = ['left', 'center', 'right'].includes(String(cfg.align || '')) ? String(cfg.align) : 'center';
    normalized[key] = {
      src: String(cfg.src || ''),
      width: clampRelatorioImageWidth(cfg.width),
      height: clampRelatorioImageHeight(cfg.height),
      align,
      caption: String(cfg.caption || ''),
    };
  }
  return normalized;
}

