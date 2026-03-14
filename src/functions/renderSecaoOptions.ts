// @ts-nocheck
function renderSecaoOptions() {
  const current = ui.atributoSecao.value;
  ui.atributoSecao.innerHTML = '<option value="">Sem secao</option>';

  const tipoId = ui.atributoTipo.value;
  const linkedIds = new Set(tipoId ? getSecoesForTipo(tipoId).map((sec) => sec.id) : []);
  const secoes = [...state.secoes].sort((a, b) => {
    const aLinked = linkedIds.has(a.id) ? 0 : 1;
    const bLinked = linkedIds.has(b.id) ? 0 : 1;
    if (aLinked !== bLinked) return aLinked - bLinked;
    return String(a.nome || '').localeCompare(String(b.nome || ''));
  });

  for (const sec of secoes) {
    const opt = document.createElement('option');
    opt.value = sec.id;
    opt.textContent = linkedIds.has(sec.id) ? sec.nome : `${sec.nome} (fora do tipo)`;
    ui.atributoSecao.appendChild(opt);
  }

  if (current === '' || state.secoes.some((s) => s.id === current)) {
    ui.atributoSecao.value = current;
  }
}
