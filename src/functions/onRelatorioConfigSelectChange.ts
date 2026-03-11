// @ts-nocheck
function onRelatorioConfigSelectChange() {
  const tipoId = ui.relatorioTipo.value;
  const configId = String(ui.relatorioConfigSelect.value || '');
  if (!tipoId || !configId) return;
  const cfg = (state.reportConfigs || []).find((x) => x.id === configId && x.tipoId === tipoId);
  if (!cfg) return;
  applyRelatorioConfig(cfg);
  notify('Configuracao aplicada.');
}
