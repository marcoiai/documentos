// @ts-nocheck
function buildPreview(doc) {
  const attrs = state.atributos.filter((a) => a.tipoId === doc.tipoId).slice(0, 3);
  if (attrs.length === 0) return 'Sem atributos';
  const ctx = buildPlaceholderContext(doc.tipoId, doc.valores, doc.titulo);
  const maxFieldText = 42;
  const maxPreviewText = 170;
  const truncate = (value, max) => {
    const text = String(value ?? '');
    if (text.length <= max) return text;
    return `${text.slice(0, Math.max(0, max - 3))}...`;
  };

  const preview = attrs
    .map((a) => {
      const raw = doc.valores[a.id];
      const val = truncate(resolveAttrValueForOutput(a, raw, ctx), maxFieldText);
      return `${truncate(a.nome, 26)}: ${val}`;
    })
    .join(' | ');
  return truncate(preview, maxPreviewText);
}

