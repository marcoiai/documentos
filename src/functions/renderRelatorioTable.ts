// @ts-nocheck
function renderRelatorioTable() {
  ui.relatorioTabelaHead.innerHTML = '';
  ui.relatorioTabelaBody.innerHTML = '';
  const oldColGroup = ui.relatorioTabela.querySelector('colgroup');
  if (oldColGroup) oldColGroup.remove();

  const { columns, rows, tipoNome, colSpans, totalValues } = relatorioLastResult;
  if (!columns.length) {
    ui.relatorioResumo.textContent = '';
    return;
  }

  const totalSpan = (Array.isArray(colSpans) && colSpans.length === columns.length
    ? colSpans
    : columns.map(() => 6)
  ).reduce((sum, x) => sum + Number(x || 0), 0);
  const spans = Array.isArray(colSpans) && colSpans.length === columns.length
    ? colSpans
    : columns.map(() => 6);

  if (totalSpan > 0) {
    const colgroup = document.createElement('colgroup');
    for (let i = 0; i < columns.length; i += 1) {
      const col = document.createElement('col');
      col.style.width = `${(Number(spans[i] || 0) / totalSpan) * 100}%`;
      colgroup.appendChild(col);
    }
    ui.relatorioTabela.insertBefore(colgroup, ui.relatorioTabela.firstChild);
    ui.relatorioTabela.style.tableLayout = 'fixed';
    ui.relatorioTabela.style.width = '100%';
  }

  const trHead = document.createElement('tr');
  for (let i = 0; i < columns.length; i += 1) {
    const col = columns[i];
    const th = document.createElement('th');
    th.textContent = col;
    const span = Number(spans[i] || 0);
    if (totalSpan > 0 && span > 0) th.style.width = `${(span / totalSpan) * 100}%`;
    trHead.appendChild(th);
  }
  ui.relatorioTabelaHead.appendChild(trHead);

  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const value of row) {
      const td = document.createElement('td');
      td.textContent = String(value ?? '');
      tr.appendChild(td);
    }
    ui.relatorioTabelaBody.appendChild(tr);
  }

  if (Array.isArray(totalValues) && totalValues.some((v) => String(v || '').trim() !== '')) {
    const trTotal = document.createElement('tr');
    const labelIndex = columns.findIndex((_, idx) => String(totalValues[idx] || '').trim() === '');
    for (let i = 0; i < columns.length; i += 1) {
      const td = document.createElement('td');
      const value = String(totalValues[i] ?? '');
      td.textContent = labelIndex === i ? 'Total' : value;
      td.style.fontWeight = '700';
      trTotal.appendChild(td);
    }
    ui.relatorioTabelaBody.appendChild(trTotal);
  }

  ui.relatorioResumo.textContent = `${tipoNome}: ${rows.length} registro(s)`;
}
