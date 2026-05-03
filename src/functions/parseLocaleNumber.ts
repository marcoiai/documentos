// @ts-nocheck
function parseLocaleNumber(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const sanitized = raw.replace(/[^\d,.\-]/g, '');
  if (!sanitized) return null;

  const compact = sanitized.replace(/\s/g, '');
  const hasDot = compact.includes('.');
  const hasComma = compact.includes(',');
  let normalized = compact;

  if (hasDot && hasComma) {
    const lastDot = compact.lastIndexOf('.');
    const lastComma = compact.lastIndexOf(',');
    const decimalSep = lastDot > lastComma ? '.' : ',';
    const thousandSep = decimalSep === '.' ? ',' : '.';
    normalized = compact.split(thousandSep).join('');
    if (decimalSep === ',') normalized = normalized.replace(',', '.');
  } else if (hasComma) {
    normalized = compact.replace(/\./g, '').replace(',', '.');
  } else {
    normalized = compact.replace(/,/g, '');
  }

  const parsed = Number(normalized);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) return null;
  return parsed;
}
