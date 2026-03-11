// @ts-nocheck
function onRelatorioLayoutTipoChange() {
  const tipoId = ui.relatorioLayoutTipo.value;
  renderRelatorioLayoutConfigOptions(tipoId);
  renderRelatorioLayoutCanvas(tipoId, ui.relatorioLayoutConfig.value || '');
  refreshMaterializeUI();
}
