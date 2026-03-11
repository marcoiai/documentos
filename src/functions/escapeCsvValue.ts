// @ts-nocheck
function escapeCsvValue(value) {
  const text = String(value ?? '');
  if (!/[";,\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}
