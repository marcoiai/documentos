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
  const palette = buildPdfPalette();
  let y = margin;

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

  const sectionResult = renderPdfSectionTables({
    pdf,
    documento,
    pdfVisivel,
    placeholderCtx,
    palette,
    margin,
    contentWidth,
    pageHeight,
    startY: y,
  });
  y = sectionResult.y;

  if (sectionResult.signatureAttrs.length > 0) {
    y = renderPdfSignatureBlocks({
      pdf,
      documento,
      signatureAttrs: sectionResult.signatureAttrs,
      tipoRodape,
      palette,
      margin,
      contentWidth,
      pageHeight,
      pageWidth,
      startY: y,
    });
  }

  y = renderPdfTipoFooter({
    pdf,
    tipoRodape,
    palette,
    margin,
    contentWidth,
    pageHeight,
    currentY: y,
  });

  const safeTitle = String(documento.titulo || 'documento')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '');

  pdf.save(`${safeTitle || 'documento'}.pdf`);
}
