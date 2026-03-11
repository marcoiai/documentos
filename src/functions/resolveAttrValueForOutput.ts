// @ts-nocheck
function resolveAttrValueForOutput(attr, raw, ctx) {
  if (attr.tipoCampo === 'boolean') return raw ? 'Sim' : 'Nao';

  let base = raw;
  if (
    (base === undefined || base === null || base === '') &&
    attr.tipoCampo === 'texto_placeholder'
  ) {
    base = attr.templateTexto || '';
  }
  if (base === undefined || base === null || base === '') return '-';

  const text = String(base);
  if (attr.tipoCampo === 'textarea_template' || attr.tipoCampo === 'texto_placeholder') {
    const resolved = resolveTemplateTextForOutput(text, ctx).trim();
    if (!resolved) return '-';
    return attr.tipoCampo === 'texto_placeholder' ? resolved.toUpperCase() : resolved;
  }

  return text;
}
