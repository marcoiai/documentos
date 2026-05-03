// @ts-nocheck
function formatCurrencyNumber(value, options = {}) {
  const parsed = typeof value === 'number' ? value : parseLocaleNumber(value);
  if (parsed === null) return '';

  const symbol = options?.symbol !== false;
  if (symbol) {
    return parsed.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return parsed.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
