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
  const sectionGap = 10;
  const gridGap = 8;
  const sectionInfoGap = 6;
  const sectionInfoLineHeight = 10.5;
  const sectionInfoPadY = 5;
  const valueLineHeight = 11;
  const labelLineHeight = 10;
  const itemPaddingX = 8;
  const itemPaddingY = 8;
  const gridColumns = 12;

  const getItemWidth = (tableWidth, colSpan) => {
    const span = Math.max(1, Math.min(gridColumns, Number(colSpan || 6)));
    const single = (tableWidth - gridGap * (gridColumns - 1)) / gridColumns;
    return single * span + gridGap * (span - 1);
  };

  const packRows = (items) => {
    const rows = [];
    let current = [];
    let used = 0;

    for (const item of items) {
      const span = Math.max(1, Math.min(gridColumns, Number(item.colSpan || 6)));
      if (current.length && used + span > gridColumns) {
        rows.push(current);
        current = [];
        used = 0;
      }
      current.push({ ...item, colSpan: span });
      used += span;
    }

    if (current.length) rows.push(current);
    return rows;
  };

  for (const group of groups) {
    const secao = group.key === semSecaoKey ? null : state.secoes.find((s) => s.id === group.key);
    const secaoCabecalho = resolveTemplateTextForOutput(secao?.cabecalho || '', placeholderCtx).trim();
    const secaoRodape = resolveTemplateTextForOutput(secao?.rodape || '', placeholderCtx).trim();
    const items = group.items
      .filter((item) => pdfVisivel[item.attr.id] !== false && item.attr.tipoCampo !== 'assinatura')
      .map((item) => {
        const attr = item.attr;
        const raw = documento.valores[attr.id];
        const value = resolveAttrValueForOutput(attr, raw, placeholderCtx);
        const isPlaceholderTemplate =
          attr.tipoCampo === 'texto_placeholder' || attr.tipoCampo === 'textarea_template';
        const hideFieldName =
          isPlaceholderTemplate || attr.tipoCampo === 'textarea' || attr.tipoCampo === 'textarea_template';
        return {
          attr,
          colSpan: isPlaceholderTemplate ? 12 : item.colSpan,
          campo: hideFieldName ? '' : String(attr.nome),
          valor: String(value),
          fullwidth: isPlaceholderTemplate,
        };
      });
    if (items.length === 0) continue;

    const tableX = margin + (group.key === semSecaoKey ? 0 : sectionPadding);
    const tableWidth = contentWidth - (group.key === semSecaoKey ? 0 : sectionPadding * 2);
    const packedRows = packRows(items).map((rowItems) => {
      const measuredItems = rowItems.map((item) => {
        const cardWidth = getItemWidth(tableWidth, item.colSpan);
        const labelLines = item.campo
          ? pdf.splitTextToSize(item.campo, Math.max(24, cardWidth - itemPaddingX * 2))
          : [];
        const valueLines = pdf.splitTextToSize(item.valor, Math.max(24, cardWidth - itemPaddingX * 2));
        const height =
          itemPaddingY * 2
          + (labelLines.length ? labelLines.length * labelLineHeight + 4 : 0)
          + Math.max(1, valueLines.length) * valueLineHeight;

        return {
          ...item,
          width: cardWidth,
          labelLines,
          valueLines,
          height,
        };
      });

      return {
        items: measuredItems,
        height: Math.max(...measuredItems.map((item) => item.height)),
      };
    });
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

    const renderSectionHeader = () => {
      if (group.key === semSecaoKey) return;

      ensureSpace(sectionHeaderHeight + sectionPadding);
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.chipBg);
      pdf.roundedRect(margin, y, contentWidth, sectionHeaderHeight, 4, 4, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...palette.textMain);
      pdf.text(group.nome, margin + sectionPadding, y + 15);
      y += sectionHeaderHeight + sectionPadding;

      if (headerInfoHeight > 0) {
        ensureSpace(headerInfoHeight + sectionInfoGap);
        pdf.setDrawColor(...palette.cardBorder);
        pdf.setFillColor(...palette.cardBg);
        pdf.roundedRect(tableX, y, tableWidth, headerInfoHeight, 4, 4, 'FD');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.2);
        pdf.setTextColor(...palette.textMuted);
        let headerY = y + sectionInfoPadY + 7;
        for (const line of headerLines) {
          pdf.text(line, tableX + 4, headerY);
          headerY += sectionInfoLineHeight;
        }
        y += headerInfoHeight + sectionInfoGap;
      }
    };

    renderSectionHeader();

    for (const row of packedRows) {
      ensureSpace(row.height + gridGap);

      let x = tableX;
      for (const item of row.items) {
        pdf.setDrawColor(...palette.cardBorder);
        pdf.setFillColor(...palette.cardBg);
        pdf.roundedRect(x, y, item.width, row.height, 4, 4, 'FD');

        let textY = y + itemPaddingY + 8;
        if (item.labelLines.length) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9);
          pdf.setTextColor(...palette.textMuted);
          for (const line of item.labelLines) {
            pdf.text(line, x + itemPaddingX, textY);
            textY += labelLineHeight;
          }
          textY += 4;
        }

        pdf.setFont('helvetica', item.fullwidth ? 'normal' : 'bold');
        pdf.setFontSize(item.fullwidth ? 11.5 : 10.2);
        pdf.setTextColor(...palette.textMain);
        for (const line of item.valueLines) {
          pdf.text(line, x + itemPaddingX, textY);
          textY += valueLineHeight;
        }

        x += item.width + gridGap;
      }

      y += row.height + gridGap;
    }

    if (footerInfoHeight > 0) {
      ensureSpace(footerInfoHeight + sectionGap);
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.cardBg);
      pdf.roundedRect(tableX, y, tableWidth, footerInfoHeight, 4, 4, 'FD');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.2);
      pdf.setTextColor(...palette.textMuted);
      let footerLineY = y + sectionInfoPadY + 7;
      for (const line of footerLines) {
        pdf.text(line, tableX + 4, footerLineY);
        footerLineY += sectionInfoLineHeight;
      }
      y += footerInfoHeight;
    }

    y += sectionGap;
  }

  return { y, signatureAttrs };
}
