// @ts-nocheck
function groupAtributosByTipo(tipoId) {
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  if (attrs.length === 0) return [];

  const semSecaoKey = '__sem_secao__';
  const grouped = new Map();

  for (const attr of attrs) {
    const secao = state.secoes.find((s) => s.id === attr.secaoId);
    const key = attr.secaoId || semSecaoKey;
    const nome = secao?.nome || 'Sem secao';

    if (!grouped.has(key)) grouped.set(key, { nome, attrs: [] });
    grouped.get(key).attrs.push(attr);
  }

  return Array.from(grouped.entries())
    .sort((a, b) => {
      if (a[0] === semSecaoKey) return -1;
      if (b[0] === semSecaoKey) return 1;
      return a[1].nome.localeCompare(b[1].nome);
    })
    .map(([, value]) => value);
}

