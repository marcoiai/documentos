// @ts-nocheck
function onRelatorioTipoChange() {
  const tipoId = ui.relatorioTipo.value;
  if (!tipoId) return;
  relatorioSavedLayout = [];
  relatorioSavedBlockOrder = [];
  relatorioSavedBlockVisibility = {};
  relatorioSavedFooterMode = 'fixed_bottom';
  relatorioSavedFooterAnchor = 'tabela';
  relatorioOrdenacaoWorking = [];
  relatorioTotalAttrIdsWorking = [];
  renderRelatorioConfigSelectOptions(tipoId, '');
  renderRelatorioAtributosByTipo(tipoId, true);
  ui.relatorioConfigNome.value = '';
  ui.relatorioSomarNumeros.checked = false;
  ui.relatorioOrdenarAtributo.value = '';
  ui.relatorioOrdenarDirecao.value = 'asc';
  closeRelatorioConfigDialog();
  refreshMaterializeUI();
}
