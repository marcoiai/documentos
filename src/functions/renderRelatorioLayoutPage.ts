// @ts-nocheck
function renderRelatorioLayoutPage() {
  const tipos = getReportTipos();
  if (!tipos.length) {
    ui.relatorioLayoutTipo.innerHTML = '<option value="">Sem tipos</option>';
    ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Nenhum tipo cadastrado.</p>';
    ui.relatorioLayoutConfig.innerHTML = '<option value="">Sem configuracoes</option>';
    return;
  }

  const prevTipo = ui.relatorioLayoutTipo.value;
  if (!ui.relatorioLayoutTipo.options || ui.relatorioLayoutTipo.options.length === 0) {
    ui.relatorioLayoutTipo.innerHTML = '';
    for (const tipo of tipos) {
      const opt = document.createElement('option');
      opt.value = tipo.id;
      opt.textContent = tipo.nome || inferTipoNome(tipo.id);
      ui.relatorioLayoutTipo.appendChild(opt);
    }
  }
  const tipoId = tipos.some((t) => t.id === prevTipo) ? prevTipo : tipos[0].id;
  ui.relatorioLayoutTipo.value = tipoId;

  renderRelatorioLayoutConfigOptions(tipoId);
  renderRelatorioLayoutCanvas(tipoId, ui.relatorioLayoutConfig.value || '');
}
