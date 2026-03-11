// @ts-nocheck
function exportRelatorioCsv() {
  const { columns, rows, tipoNome, totalValues } = relatorioLastResult;
  if (!columns.length) {
    notify('Gere o relatorio antes de exportar CSV.');
    return;
  }

  const hasTotal = Array.isArray(totalValues) && totalValues.some((v) => String(v || '').trim() !== '');
  const totalRow = hasTotal
    ? columns.map((_, idx) => {
      const value = String(totalValues[idx] || '');
      const labelIndex = columns.findIndex((__, i) => String(totalValues[i] || '').trim() === '');
      return labelIndex === idx ? 'Total' : value;
    })
    : null;

  const lines = [
    columns.map((col) => escapeCsvValue(col)).join(';'),
    ...rows.map((row) => row.map((value) => escapeCsvValue(value)).join(';')),
    ...(totalRow ? [totalRow.map((value) => escapeCsvValue(value)).join(';')] : []),
  ];
  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relatorio_${String(tipoNome || 'documentos').replace(/\s+/g, '_').toLowerCase()}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
