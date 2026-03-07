function getAtributosByTipo(tipoId: string): Atributo[] {
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  if (attrs.length <= 1) return attrs;

  const layout = Array.isArray(state.layouts?.[tipoId]) ? state.layouts[tipoId] : [];
  if (layout.length === 0) return attrs;

  const order = new Map(layout.map((item, idx) => [String(item.attrId), idx]));
  return attrs
    .map((attr, idx) => ({ attr, idx }))
    .sort((a, b) => {
      const oa = order.has(a.attr.id) ? order.get(a.attr.id) : Number.MAX_SAFE_INTEGER;
      const ob = order.has(b.attr.id) ? order.get(b.attr.id) : Number.MAX_SAFE_INTEGER;
      if (oa !== ob) return oa - ob;
      return a.idx - b.idx;
    })
    .map((x) => x.attr);
}
