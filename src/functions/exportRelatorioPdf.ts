// @ts-nocheck
function exportRelatorioPdf() {
  const { tipoId, columns, rows, tipoNome, colSpans, blockOrder, blockVisibility, blockSpacerHeights, footerMode, footerAnchor, totalValues } = relatorioLastResult;
  if (!columns.length) {
    notify('Gere o relatorio antes de exportar PDF.');
    return;
  }

  const lib = window.jspdf;
  if (!lib || !lib.jsPDF) {
    notify('Biblioteca de PDF nao carregada.');
    return;
  }

  const pdf = new lib.jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 36;
  const tableWidth = pageWidth - margin * 2;
  const resolvedTipoId = ui.relatorioTipo.value || tipoId;
  const tipo = state.tipos.find((t) => t.id === resolvedTipoId) || null;
  const headerFooterCtx = buildHeaderFooterPlaceholderContext(resolvedTipoId, {}, tipoNome || '');
  const tipoCabecalho = resolveTemplateTextForOutput(String(tipo?.cabecalho || ''), headerFooterCtx).trim();
  const tipoRodape = resolveTemplateTextForOutput(String(tipo?.rodape || ''), headerFooterCtx).trim();
  const resolvedBlockOrder = normalizeRelatorioBlockOrder(blockOrder);
  const resolvedBlockVisibility = normalizeRelatorioBlockVisibility(blockVisibility, resolvedBlockOrder);
  const resolvedBlockSpacerHeights = normalizeRelatorioBlockSpacerHeights(blockSpacerHeights, resolvedBlockOrder);
  const resolvedFooterMode = footerMode === 'after_block' ? 'after_block' : 'fixed_bottom';
  const resolvedFooterAnchor = ['cabecalho', 'info_geracao', 'tabela'].includes(String(footerAnchor || ''))
    ? String(footerAnchor)
    : 'tabela';

  let y = margin;
  const pageBottomLimit = pageHeight - margin;

  const addPageIfNeeded = (requiredHeight) => {
    if (y + requiredHeight <= pageBottomLimit) return;
    pdf.addPage();
    y = margin;
  };
  const footerSize = 9.5;
  const footerGap = 11;
  const bottomOffset = 8;
  const renderFooterFlow = () => {
    if (!tipoRodape || resolvedBlockVisibility.rodape === false) return false;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(footerSize);
    pdf.setTextColor(120, 144, 156);
    const footerLines = pdf.splitTextToSize(tipoRodape, tableWidth);
    addPageIfNeeded(Math.max(14, footerLines.length * footerGap) + 6);
    pdf.text(footerLines, margin, y);
    y += Math.max(14, footerLines.length * footerGap) + 4;
    return true;
  };
  const renderFooterBottom = () => {
    if (!tipoRodape || resolvedBlockVisibility.rodape === false) return;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(footerSize);
    pdf.setTextColor(90, 110, 120);
    const footerLines = pdf.splitTextToSize(tipoRodape, tableWidth);
    const safeBottomBaseline = pageHeight - Math.max(bottomOffset, 14);
    let footerStartY = safeBottomBaseline - (Math.max(footerLines.length, 1) - 1) * footerGap;
    if (y + 10 > footerStartY) {
      pdf.addPage();
      y = margin;
      footerStartY = safeBottomBaseline - (Math.max(footerLines.length, 1) - 1) * footerGap;
    }
    pdf.text(footerLines, margin, footerStartY);
  };

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(38, 50, 56);
  pdf.text(`Relatorio - ${tipoNome || 'Documentos'}`, margin, y);
  y += 18;

  const colCount = Math.max(1, columns.length);
  const spans = Array.isArray(colSpans) && colSpans.length === colCount
    ? colSpans.map((x) => Math.max(1, Number(x || 1)))
    : columns.map(() => 1);
  const totalSpan = spans.reduce((sum, x) => sum + x, 0);
  const colWidths = spans.map((s) => (s / totalSpan) * tableWidth);
  const colStarts = [];
  let accX = margin;
  for (let i = 0; i < colWidths.length; i += 1) {
    colStarts.push(accX);
    accX += colWidths[i];
  }
  const headerHeight = 20;
  const lineHeight = 10;
  const rowPadY = 5;

  const renderTableHeader = () => {
    addPageIfNeeded(headerHeight + 8);
    pdf.setDrawColor(223, 229, 232);
    pdf.setFillColor(250, 252, 253);
    pdf.rect(margin, y, tableWidth, headerHeight, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(38, 50, 56);

    for (let i = 0; i < colCount; i += 1) {
      const x = colStarts[i];
      const width = colWidths[i];
      if (i > 0) pdf.line(x, y, x, y + headerHeight);
      const text = String(columns[i] || '');
      const lines = pdf.splitTextToSize(text, Math.max(20, width - 8));
      pdf.text(lines[0] || '', x + 4, y + 13);
    }

    y += headerHeight;
  };

  let footerFlowRendered = false;
  for (const blockKey of resolvedBlockOrder) {
    if (blockKey === 'rodape') continue;
    if (isRelatorioBlockSpacerKey(blockKey)) {
      if (resolvedBlockVisibility[blockKey] === false) continue;
      const spacerHeight = clampRelatorioSpacerHeight(resolvedBlockSpacerHeights[blockKey]);
      addPageIfNeeded(spacerHeight);
      y += spacerHeight;
      continue;
    }
    if (blockKey === 'cabecalho') {
      if (resolvedBlockVisibility[blockKey] === false) continue;
      if (!tipoCabecalho) continue;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10.5);
      pdf.setTextColor(69, 90, 100);
      const headerLines = pdf.splitTextToSize(tipoCabecalho, tableWidth);
      addPageIfNeeded(Math.max(14, headerLines.length * 12) + 8);
      pdf.text(headerLines, margin, y);
      y += Math.max(14, headerLines.length * 12) + 6;
      if (!footerFlowRendered && resolvedFooterMode === 'after_block' && resolvedFooterAnchor === blockKey) {
        footerFlowRendered = renderFooterFlow();
      }
      continue;
    }

    if (blockKey === 'info_geracao') {
      if (resolvedBlockVisibility[blockKey] === false) continue;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(96, 125, 139);
      const info = `Gerado em: ${formatCurrentDateBr()}  |  Registros: ${rows.length}`;
      addPageIfNeeded(18);
      pdf.text(info, margin, y);
      y += 16;
      if (!footerFlowRendered && resolvedFooterMode === 'after_block' && resolvedFooterAnchor === blockKey) {
        footerFlowRendered = renderFooterFlow();
      }
      continue;
    }

    if (blockKey === 'tabela') {
      if (resolvedBlockVisibility[blockKey] === false) continue;
      renderTableHeader();
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.8);
      pdf.setTextColor(69, 90, 100);

      for (const row of rows) {
        const cellLines = [];
        let maxLines = 1;

        for (let i = 0; i < colCount; i += 1) {
          const text = String(row[i] ?? '');
          const lines = pdf.splitTextToSize(text, Math.max(20, colWidths[i] - 8));
          cellLines.push(lines);
          if (lines.length > maxLines) maxLines = lines.length;
        }

        const rowHeight = maxLines * lineHeight + rowPadY * 2;
        addPageIfNeeded(rowHeight + 2);
        if (y === margin) renderTableHeader();

        pdf.setDrawColor(223, 229, 232);
        pdf.rect(margin, y, tableWidth, rowHeight);

        for (let i = 0; i < colCount; i += 1) {
          const x = colStarts[i];
          if (i > 0) pdf.line(x, y, x, y + rowHeight);
          const lines = cellLines[i];
          let ty = y + rowPadY + 8;
          for (const line of lines) {
            pdf.text(line, x + 4, ty);
            ty += lineHeight;
          }
        }

        y += rowHeight;
      }
      const hasTotal = Array.isArray(totalValues) && totalValues.some((v) => String(v || '').trim() !== '');
      if (hasTotal) {
        const labelIndex = columns.findIndex((_, idx) => String(totalValues[idx] || '').trim() === '');
        const totalRow = columns.map((_, idx) => (labelIndex === idx ? 'Total' : String(totalValues[idx] || '')));
        const totalCellLines = [];
        let totalMaxLines = 1;

        for (let i = 0; i < colCount; i += 1) {
          const text = String(totalRow[i] ?? '');
          const lines = pdf.splitTextToSize(text, Math.max(20, colWidths[i] - 8));
          totalCellLines.push(lines);
          if (lines.length > totalMaxLines) totalMaxLines = lines.length;
        }

        const totalRowHeight = totalMaxLines * lineHeight + rowPadY * 2;
        addPageIfNeeded(totalRowHeight + 2);
        if (y === margin) renderTableHeader();

        pdf.setDrawColor(223, 229, 232);
        pdf.setFillColor(244, 248, 250);
        pdf.rect(margin, y, tableWidth, totalRowHeight, 'FD');
        pdf.setFont('helvetica', 'bold');

        for (let i = 0; i < colCount; i += 1) {
          const x = colStarts[i];
          if (i > 0) pdf.line(x, y, x, y + totalRowHeight);
          const lines = totalCellLines[i];
          let ty = y + rowPadY + 8;
          for (const line of lines) {
            pdf.text(line, x + 4, ty);
            ty += lineHeight;
          }
        }
        pdf.setFont('helvetica', 'normal');
        y += totalRowHeight;
      }
      y += 6;
      if (!footerFlowRendered && resolvedFooterMode === 'after_block' && resolvedFooterAnchor === blockKey) {
        footerFlowRendered = renderFooterFlow();
      }
      continue;
    }
  }
  if (resolvedFooterMode === 'after_block' && !footerFlowRendered) {
    renderFooterFlow();
  }
  if (resolvedFooterMode === 'fixed_bottom') {
    renderFooterBottom();
  }

  const safeName = String(tipoNome || 'documentos')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();

  pdf.save(`relatorio_${safeName || 'documentos'}.pdf`);
}
