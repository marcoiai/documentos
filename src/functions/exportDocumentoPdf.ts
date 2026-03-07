// @ts-nocheck
function exportDocumentoPdf(docId) {
  const lib = window.jspdf;
  if (!lib || !lib.jsPDF) {
    notify('Biblioteca de PDF nao carregada.');
    return;
  }

  const documento = state.documentos.find((d) => d.id === docId);
  if (!documento) {
    notify('Documento nao encontrado.');
    return;
  }
  const pdfVisivel = documento.pdfVisivel && typeof documento.pdfVisivel === 'object'
    ? documento.pdfVisivel
    : {};
  const tipo = state.tipos.find((t) => t.id === documento.tipoId) || null;
  const placeholderCtx = buildHeaderFooterPlaceholderContext(
    documento.tipoId,
    documento.valores,
    documento.titulo
  );
  const tipoCabecalho = resolveTemplateTextForOutput(tipo?.cabecalho || '', placeholderCtx).trim();
  const tipoRodape = resolveTemplateTextForOutput(tipo?.rodape || '', placeholderCtx).trim();

  const pdf = new lib.jsPDF({ unit: 'pt', format: 'a4' });
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  const palette = {
    tealHeader: [0, 121, 107], // approx Materialize teal darken-2
    textMain: [38, 50, 56],
    textMuted: [96, 125, 139],
    textLight: [120, 144, 156],
    cardBorder: [223, 229, 232], // #dfe5e8
    cardBg: [255, 255, 255],
    chipBg: [250, 252, 253], // #fafcfd
  };

  const ensureSpace = (required = 20) => {
    if (y + required <= pageHeight - margin) return;
    pdf.addPage();
    y = margin;
  };

  const addText = (text, options = {}) => {
    const { size = 11, bold = false, gap = 16 } = options;
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(String(text), contentWidth);
    ensureSpace(lines.length * gap + 4);
    pdf.text(lines, margin, y);
    y += lines.length * gap;
  };

  // Header stripe uses Tipo cabecalho (with placeholders) as its content.
  const headerContent = tipoCabecalho
    ? `${tipoNome(documento.tipoId)}\n${tipoCabecalho}`
    : tipoNome(documento.tipoId);
  const headerTextLines = pdf.splitTextToSize(headerContent, contentWidth - 28);
  const headerHeight = Math.max(56, 18 + headerTextLines.length * 13);
  pdf.setFillColor(...palette.tealHeader);
  pdf.roundedRect(margin, y, contentWidth, headerHeight, 6, 6, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12.5);
  pdf.setTextColor(255, 255, 255);
  pdf.text(headerTextLines, margin + 14, y + 23);
  y += headerHeight + 14;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...palette.textMain);
  addText(`Titulo: ${documento.titulo}`, { size: 12, bold: true });
  y += 8;

  const groups = buildSectionGroupsForTipo(documento.tipoId, { includeEmptySections: true }).filter(
    (group) => group.key !== '__sem_secao__' || group.items.length > 0
  );

  const signatureAttrs = groups
    .flatMap((group) => group.items)
    .map((item) => item.attr)
    .filter((attr) => attr.tipoCampo === 'assinatura' && pdfVisivel[attr.id] !== false);

  if (groups.length === 0) {
    addText('Sem secoes/atributos configurados para este tipo.', { size: 11 });
  } else {
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
        const hideFieldName = attr.tipoCampo === 'textarea' || attr.tipoCampo === 'textarea_template';
        const campo = hideFieldName ? '' : String(attr.nome);
        return { campo, valor: String(value) };
      });
      if (rows.length === 0) continue;

      const tableX = margin + (group.key === semSecaoKey ? 0 : sectionPadding);
      const tableWidth = contentWidth - (group.key === semSecaoKey ? 0 : sectionPadding * 2);
      const col1Width = tableWidth * col1Ratio;
      const col2Width = tableWidth - col1Width;

      const measuredRows = rows.map((row) => {
        const campoLines = pdf.splitTextToSize(row.campo, col1Width - 8);
        const valorLines = pdf.splitTextToSize(row.valor, col2Width - 8);
        const height = Math.max(campoLines.length, valorLines.length) * rowLineHeight + rowPaddingY * 2;
        return { ...row, campoLines, valorLines, height };
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

      const tableBodyHeight = measuredRows.reduce((sum, r) => sum + r.height, 0);
      const tableHeight = tableHeaderHeight + tableBodyHeight;
      const titleHeight = group.key === semSecaoKey ? 0 : sectionHeaderHeight;
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

      // Header da tabela
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.chipBg);
      pdf.rect(tableX, cursorY, tableWidth, tableHeaderHeight, 'FD');
      pdf.line(tableX + col1Width, cursorY, tableX + col1Width, cursorY + tableHeaderHeight);

      let rowY = cursorY + tableHeaderHeight;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor(...palette.textMuted);
      for (const row of measuredRows) {
        pdf.rect(tableX, rowY, tableWidth, row.height);
        pdf.line(tableX + col1Width, rowY, tableX + col1Width, rowY + row.height);

        let cY = rowY + rowPaddingY + 8;
        for (const line of row.campoLines) {
          pdf.text(line, tableX + 4, cY);
          cY += rowLineHeight;
        }

        let vY = rowY + rowPaddingY + 8;
        for (const line of row.valorLines) {
          pdf.text(line, tableX + col1Width + 4, vY);
          vY += rowLineHeight;
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
  }

  // Signature blocks centered and close to the document end.
  if (signatureAttrs.length > 0) {
    const signatureBoxWidth = Math.min(420, contentWidth * 0.86);
    const signatureBoxHeight = 92;
    const signatureInnerPadding = 12;
    const signatureGap = 26;
    const signatureCaptionGap = 15;
    const signatureNameFont = 10;
    const blockHeight = signatureBoxHeight + signatureCaptionGap + 8;
    const totalHeight = signatureAttrs.length * blockHeight + Math.max(0, signatureAttrs.length - 1) * signatureGap;
    const bottomOffset = 8;
    const footerGap = 14;
    const footerReserved =
      tipoRodape
        ? Math.max(1, pdf.splitTextToSize(String(tipoRodape), contentWidth).length) * footerGap + 10
        : 0;
    const lastAvailableY = pageHeight - bottomOffset - footerReserved;

    if (y + totalHeight > lastAvailableY) {
      pdf.addPage();
      y = margin;
    }

    const startY = Math.max(y + 10, lastAvailableY - totalHeight);
    const centerX = pageWidth / 2;
    pdf.setDrawColor(...palette.textMuted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(signatureNameFont);
    pdf.setTextColor(...palette.textMuted);

    for (let i = 0; i < signatureAttrs.length; i += 1) {
      const attr = signatureAttrs[i];
      const rawName = documento.valores[attr.id];
      const name = rawName ? String(rawName) : '';
      const blockTop = startY + i * (blockHeight + signatureGap);
      const boxX = centerX - signatureBoxWidth / 2;
      const lineY = blockTop + signatureBoxHeight - signatureInnerPadding;
      const x1 = boxX + signatureInnerPadding;
      const x2 = boxX + signatureBoxWidth - signatureInnerPadding;

      // Empty signature area for hand signing.
      pdf.rect(boxX, blockTop, signatureBoxWidth, signatureBoxHeight);
      pdf.line(x1, lineY, x2, lineY);

      const label = name.trim() ? `Assinatura: ${name}` : 'Assinatura';
      const labelWidth = pdf.getTextWidth(label);
      pdf.text(label, centerX - labelWidth / 2, lineY + signatureCaptionGap);
    }

    y = startY + totalHeight + 6;
  }

  if (tipoRodape) {
    const footerSize = 10.5;
    const footerGap = 14;
    const bottomOffset = 8;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(footerSize);
    pdf.setTextColor(...palette.textMuted);
    const footerLines = pdf.splitTextToSize(String(tipoRodape), contentWidth);
    let footerStartY = pageHeight - bottomOffset - (Math.max(footerLines.length, 1) - 1) * footerGap;
    if (y + 8 > footerStartY) {
      pdf.addPage();
      y = margin;
      footerStartY = pageHeight - bottomOffset - (Math.max(footerLines.length, 1) - 1) * footerGap;
    }
    pdf.text(footerLines, margin, footerStartY);
  }

  const safeTitle = String(documento.titulo || 'documento')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '');

  pdf.save(`${safeTitle || 'documento'}.pdf`);
}

