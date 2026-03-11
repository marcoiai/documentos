// @ts-nocheck
function renderPdfTipoFooter({
  pdf,
  tipoRodape,
  palette,
  margin,
  contentWidth,
  pageHeight,
  currentY,
}) {
  let y = currentY;
  if (!tipoRodape) return y;

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
  return y;
}
