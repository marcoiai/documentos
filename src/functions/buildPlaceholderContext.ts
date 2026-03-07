// @ts-nocheck
function buildPlaceholderContext(tipoId, valores, titulo = '') {
  const ctx = new Map();
  const attrs = getAtributosByTipo(tipoId);

  const put = (key, value) => {
    const normalized = normalizePlaceholderKey(key);
    if (!normalized) return;
    ctx.set(normalized, String(value ?? ''));
  };

  put('titulo', titulo);
  put('documento_titulo', titulo);

  for (const attr of attrs) {
    const raw = valores[attr.id];
    const value = attr.tipoCampo === 'boolean' ? (raw ? 'Sim' : 'Nao') : raw ?? '';
    put(attr.id, value);
    put(attr.nome, value);
  }

  // Resolve template-based attributes in multiple passes so references across
  // template fields stabilize before PDF/header/footer rendering.
  const templateAttrs = attrs.filter(
    (attr) => attr.tipoCampo === 'texto_placeholder' || attr.tipoCampo === 'textarea_template'
  );
  for (let pass = 0; pass < 3; pass += 1) {
    for (const attr of templateAttrs) {
      const raw = valores[attr.id];
      const base =
        raw === undefined || raw === null || raw === ''
          ? (attr.tipoCampo === 'texto_placeholder' ? attr.templateTexto || '' : '')
          : raw;
      const resolved = resolveTemplateTextForOutput(base, ctx);
      put(attr.id, resolved);
      put(attr.nome, resolved);
    }
  }

  return ctx;
}

