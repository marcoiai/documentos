// @ts-nocheck
function renderPdfSignatureBlocks({
  pdf,
  documento,
  signatureAttrs,
  tipoRodape,
  palette,
  margin,
  contentWidth,
  pageHeight,
  pageWidth,
  startY,
}) {
  let y = startY;
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

  const startYPos = Math.max(y + 10, lastAvailableY - totalHeight);
  const centerX = pageWidth / 2;
  pdf.setDrawColor(...palette.textMuted);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(signatureNameFont);
  pdf.setTextColor(...palette.textMuted);

  for (let i = 0; i < signatureAttrs.length; i += 1) {
    const attr = signatureAttrs[i];
    const rawName = documento.valores[attr.id];
    const name = rawName ? String(rawName) : '';
    const blockTop = startYPos + i * (blockHeight + signatureGap);
    const boxX = centerX - signatureBoxWidth / 2;
    const lineY = blockTop + signatureBoxHeight - signatureInnerPadding;
    const x1 = boxX + signatureInnerPadding;
    const x2 = boxX + signatureBoxWidth - signatureInnerPadding;

    pdf.rect(boxX, blockTop, signatureBoxWidth, signatureBoxHeight);
    pdf.line(x1, lineY, x2, lineY);

    const label = name.trim() ? `Assinatura: ${name}` : 'Assinatura';
    const labelWidth = pdf.getTextWidth(label);
    pdf.text(label, centerX - labelWidth / 2, lineY + signatureCaptionGap);
  }

  return startYPos + totalHeight + 6;
}
