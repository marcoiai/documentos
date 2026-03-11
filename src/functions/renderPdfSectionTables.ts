// @ts-nocheck
function renderPdfSectionTables({
  pdf,
  documento,
  pdfVisivel,
  placeholderCtx,
  palette,
  margin,
  contentWidth,
  pageHeight,
  startY,
}) {
  let y = startY;
  const groups = buildSectionGroupsForTipo(documento.tipoId, { includeEmptySections: true }).filter(
    (group) => group.key !== '__sem_secao__' || group.items.length > 0
  );

  const signatureAttrs = groups
    .flatMap((group) => group.items)
    .map((item) => item.attr)
    .filter((attr) => attr.tipoCampo === 'assinatura' && pdfVisivel[attr.id] !== false);

  if (groups.length === 0) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(...palette.textMain);
    pdf.text('Sem secoes/atributos configurados para este tipo.', margin, y);
    y += 20;
    return { y, signatureAttrs };
  }

  const ensureSpace = (required = 20) => {
    if (y + required <= pageHeight - margin) return;
    pdf.addPage();
    y = margin;
  };

  const semSecaoKey = '__sem_secao__';
  const sectionHeaderHeight = 22;
  const sectionPadding = 10;
  const tableHeaderHeight = 18;
  const rowLineHeight = 11;
  const rowPaddingY = 5;
  const col1Ratio = 0.36;
  const sectionInfoGap = 6;
  const sectionInfoLineHeight = 10.5;
  const sectionInfoPadY = 5;

  for (const group of groups) {
    const secao = group.key === semSecaoKey ? null : state.secoes.find((s) => s.id === group.key);
    const secaoCabecalho = resolveTemplateTextForOutput(secao?.cabecalho || '', placeholderCtx).trim();
    const secaoRodape = resolveTemplateTextForOutput(secao?.rodape || '', placeholderCtx).trim();
    const rows = group.items
      .filter((item) => pdfVisivel[item.attr.id] !== false && item.attr.tipoCampo !== 'assinatura')
      .map((item) => {
        const attr = item.attr;
        const raw = documento.valores[attr.id];
        const value = resolveAttrValueForOutput(attr, raw, placeholderCtx);
        const isPlaceholderTemplate =
          attr.tipoCampo === 'texto_placeholder' || attr.tipoCampo === 'textarea_template';
        const hideFieldName =
          isPlaceholderTemplate || attr.tipoCampo === 'textarea' || attr.tipoCampo === 'textarea_template';
        const campo = hideFieldName ? '' : String(attr.nome);
        return { campo, valor: String(value), fullwidth: isPlaceholderTemplate };
      });
    if (rows.length === 0) continue;

    const tableX = margin + (group.key === semSecaoKey ? 0 : sectionPadding);
    const tableWidth = contentWidth - (group.key === semSecaoKey ? 0 : sectionPadding * 2);
    const col1Width = tableWidth * col1Ratio;
    const col2Width = tableWidth - col1Width;

    const measuredRows = rows.map((row) => {
      if (row.fullwidth) {
        const lineHeight = rowLineHeight + 2;
        const valorLines = pdf.splitTextToSize(row.valor, tableWidth - 10);
        const height = Math.max(1, valorLines.length) * lineHeight + rowPaddingY * 2;
        return {
          ...row,
          campoLines: [],
          valorLines,
          height,
          lineHeight,
          fontSize: 12,
        };
      }

      const campoLines = pdf.splitTextToSize(row.campo, col1Width - 8);
      const valorLines = pdf.splitTextToSize(row.valor, col2Width - 8);
      const height = Math.max(campoLines.length, valorLines.length) * rowLineHeight + rowPaddingY * 2;
      return {
        ...row,
        campoLines,
        valorLines,
        height,
        lineHeight: rowLineHeight,
        fontSize: 9.5,
      };
    });
    const hasOnlyFullwidthRows = measuredRows.every((row) => row.fullwidth);
    const effectiveTableHeaderHeight = hasOnlyFullwidthRows ? 0 : tableHeaderHeight;
    const sectionInfoWidth = tableWidth - 8;
    const headerLines =
      group.key !== semSecaoKey && secaoCabecalho
        ? pdf.splitTextToSize(secaoCabecalho, sectionInfoWidth)
        : [];
    const footerLines =
      group.key !== semSecaoKey && secaoRodape
        ? pdf.splitTextToSize(`Rodape: ${secaoRodape}`, sectionInfoWidth)
        : [];
    const headerInfoHeight =
      headerLines.length > 0 ? headerLines.length * sectionInfoLineHeight + sectionInfoPadY * 2 : 0;
    const footerInfoHeight =
      footerLines.length > 0 ? footerLines.length * sectionInfoLineHeight + sectionInfoPadY * 2 : 0;
    const headerInfoTotal = headerInfoHeight > 0 ? headerInfoHeight + sectionInfoGap : 0;
    const footerInfoTotal = footerInfoHeight > 0 ? sectionInfoGap + footerInfoHeight : 0;

    const tableBodyHeight = measuredRows.reduce((sum, r) => sum + r.height, 0);
    const tableHeight = effectiveTableHeaderHeight + tableBodyHeight;
    const wrapperHeight =
      group.key === semSecaoKey
        ? tableHeight
        : sectionHeaderHeight + sectionPadding + headerInfoTotal + tableHeight + footerInfoTotal + sectionPadding;

    ensureSpace(wrapperHeight + 10);

    let cursorY = y;
    if (group.key !== semSecaoKey) {
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.cardBg);
      pdf.roundedRect(margin, y, contentWidth, wrapperHeight, 4, 4, 'FD');

      pdf.setFillColor(...palette.chipBg);
      pdf.roundedRect(margin, y, contentWidth, sectionHeaderHeight, 4, 4, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...palette.textMain);
      pdf.text(group.nome, margin + sectionPadding, y + 15);
      cursorY = y + sectionHeaderHeight + sectionPadding;
      if (headerInfoHeight > 0) {
        pdf.setDrawColor(...palette.cardBorder);
        pdf.setFillColor(...palette.chipBg);
        pdf.rect(tableX, cursorY, tableWidth, headerInfoHeight, 'FD');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.2);
        pdf.setTextColor(...palette.textMuted);
        let headerY = cursorY + sectionInfoPadY + 7;
        for (const line of headerLines) {
          pdf.text(line, tableX + 4, headerY);
          headerY += sectionInfoLineHeight;
        }
        cursorY += headerInfoHeight + sectionInfoGap;
      }
    } else {
      cursorY = y;
    }

    if (effectiveTableHeaderHeight > 0) {
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.chipBg);
      pdf.rect(tableX, cursorY, tableWidth, effectiveTableHeaderHeight, 'FD');
      pdf.line(tableX + col1Width, cursorY, tableX + col1Width, cursorY + effectiveTableHeaderHeight);
    }

    let rowY = cursorY + effectiveTableHeaderHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...palette.textMuted);
    for (const row of measuredRows) {
      pdf.rect(tableX, rowY, tableWidth, row.height);
      if (!row.fullwidth) {
        pdf.line(tableX + col1Width, rowY, tableX + col1Width, rowY + row.height);
      }

      if (row.fullwidth) {
        pdf.setFontSize(row.fontSize);
        pdf.setTextColor(...palette.textMain);
        let vY = rowY + rowPaddingY + 9;
        for (const line of row.valorLines) {
          pdf.text(line, tableX + 6, vY);
          vY += row.lineHeight;
        }
      } else {
        pdf.setFontSize(row.fontSize);
        pdf.setTextColor(...palette.textMuted);
        let cY = rowY + rowPaddingY + 8;
        for (const line of row.campoLines) {
          pdf.text(line, tableX + 4, cY);
          cY += row.lineHeight;
        }

        let vY = rowY + rowPaddingY + 8;
        for (const line of row.valorLines) {
          pdf.text(line, tableX + col1Width + 4, vY);
          vY += row.lineHeight;
        }
      }

      rowY += row.height;
    }

    if (footerInfoHeight > 0) {
      const footerY = rowY + sectionInfoGap;
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.chipBg);
      pdf.rect(tableX, footerY, tableWidth, footerInfoHeight, 'FD');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.2);
      pdf.setTextColor(...palette.textMuted);
      let footerLineY = footerY + sectionInfoPadY + 7;
      for (const line of footerLines) {
        pdf.text(line, tableX + 4, footerLineY);
        footerLineY += sectionInfoLineHeight;
      }
    }

    y += wrapperHeight + 10;
  }

  return { y, signatureAttrs };
}
