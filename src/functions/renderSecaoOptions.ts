// @ts-nocheck
function renderSecaoOptions() {
  const current = ui.atributoSecao.value;
  ui.atributoSecao.innerHTML = '<option value="">Sem secao</option>';

  const tipoId = ui.atributoTipo.value;
  const secoes = tipoId ? getSecoesForTipo(tipoId) : [];
  for (const sec of secoes) {
    const opt = document.createElement('option');
    opt.value = sec.id;
    opt.textContent = sec.nome;
    ui.atributoSecao.appendChild(opt);
  }

  if (current === '' || secoes.some((s) => s.id === current)) {
    ui.atributoSecao.value = current;
  }
}

