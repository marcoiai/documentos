// @ts-nocheck
function renderRelatorioBuilder() {
  const tipos = getReportTipos();
  ui.relatorioTipo.innerHTML = '';
  if (!tipos.length) {
    ui.relatorioTipo.innerHTML = '<option value="">Sem tipos</option>';
    ui.relatorioAtributosWrap.innerHTML = '<p class="empty">Nenhum tipo cadastrado.</p>';
    ui.relatorioFiltroAtributo.innerHTML = '<option value="">Sem atributos</option>';
    ui.relatorioOrdenarAtributo.innerHTML = '<option value="">Sem ordenacao</option>';
    ui.relatorioOrdenarDirecao.value = 'asc';
    relatorioOrdenacaoWorking = [];
    if (ui.relatorioOrdenacaoLista) {
      ui.relatorioOrdenacaoLista.innerHTML = '<li class="collection-item">Sem ordenacao composta.</li>';
    }
    ui.relatorioResumo.textContent = '';
    ui.relatorioTabelaHead.innerHTML = '';
    ui.relatorioTabelaBody.innerHTML = '';
    return;
  }

  const selectedTipoId = ui.relatorioTipo.value && tipos.some((t) => t.id === ui.relatorioTipo.value)
    ? ui.relatorioTipo.value
    : tipos[0].id;

  for (const tipo of tipos) {
    const option = document.createElement('option');
    option.value = tipo.id;
    option.textContent = String(tipo.nome || '').trim() || inferTipoNome(tipo.id) || tipo.id;
    if (tipo.id === selectedTipoId) option.selected = true;
    ui.relatorioTipo.appendChild(option);
  }
  ui.relatorioTipo.value = selectedTipoId;
  renderRelatorioConfigSelectOptions(selectedTipoId, '');
  ui.relatorioSomarNumeros.checked = Boolean(ui.relatorioSomarNumeros.checked);

  ui.relatorioFiltroOperador.value = ui.relatorioFiltroOperador.value || 'contains';
  ui.relatorioOrdenarDirecao.value = ui.relatorioOrdenarDirecao.value === 'desc' ? 'desc' : 'asc';
  renderRelatorioAtributosByTipo(selectedTipoId, true);
}
