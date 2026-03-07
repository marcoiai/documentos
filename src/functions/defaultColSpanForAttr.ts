// @ts-nocheck
function defaultColSpanForAttr(attr) {
  if (attr.tipoCampo === 'assinatura') return 12;
  if (attr.tipoCampo === 'boolean') return 4;
  if (attr.tipoCampo === 'data') return 4;
  if (attr.tipoCampo === 'numero') return 4;
  return 6;
}

