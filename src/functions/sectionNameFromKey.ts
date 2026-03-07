// @ts-nocheck
function sectionNameFromKey(key) {
  if (key === '__sem_secao__') return 'Sem secao';
  return state.secoes.find((s) => s.id === key)?.nome || 'Sem secao';
}

