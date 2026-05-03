// @ts-nocheck
function getCurrencyConfig(attr) {
  const raw = String(attr?.templateTexto || '').trim();
  if (!raw) return { symbol: true };

  try {
    const parsed = JSON.parse(raw);
    return {
      symbol: parsed?.symbol !== false,
    };
  } catch {
    return { symbol: true };
  }
}
