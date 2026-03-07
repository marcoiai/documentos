// @ts-nocheck
function applyPlaceholderTemplate(text, ctx) {
  return String(text ?? '').replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_full, token) => {
    const key = normalizePlaceholderKey(token);
    if (ctx.has(key)) return ctx.get(key) ?? '';
    if (key === 'data' || key === 'data_atual') return formatCurrentDateBr();
    return '';
  });
}

