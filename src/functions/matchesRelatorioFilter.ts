// @ts-nocheck
function matchesRelatorioFilter(valueText, operador, filtroValor) {
  const actual = String(valueText || '').trim().toLowerCase();
  const expected = String(filtroValor || '').trim().toLowerCase();

  if (operador === 'empty') return actual === '' || actual === '-';
  if (operador === 'not_empty') return actual !== '' && actual !== '-';
  if (operador === 'equals') return actual === expected;
  if (operador === 'not_equals') return actual !== expected;
  return actual.includes(expected);
}
