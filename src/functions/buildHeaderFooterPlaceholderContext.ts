// @ts-nocheck
function buildHeaderFooterPlaceholderContext(tipoId, valores, titulo = '') {
  const ctx = buildPlaceholderContext(tipoId, valores, titulo);
  const today = formatCurrentDateBr();
  const put = (key, value) => {
    const normalized = normalizePlaceholderKey(key);
    if (!normalized) return;
    ctx.set(normalized, String(value ?? ''));
  };
  put('data', today);
  put('data_atual', today);
  return ctx;
}

