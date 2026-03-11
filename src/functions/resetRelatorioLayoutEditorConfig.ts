// @ts-nocheck
function resetRelatorioLayoutEditorConfig() {
  const tipoId = ui.relatorioLayoutTipo.value;
  const configId = ui.relatorioLayoutConfig.value;
  if (!tipoId || !configId) {
    notify('Selecione tipo e configuracao para resetar layout.');
    return;
  }

  const cfg = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
  if (!cfg) {
    notify('Configuracao nao encontrada.');
    return;
  }

  cfg.reportLayout = [];
  cfg.reportBlockOrder = defaultRelatorioBlockOrder();
  cfg.reportBlockVisibility = normalizeRelatorioBlockVisibility({});
  cfg.reportFooterMode = 'fixed_bottom';
  cfg.reportFooterAnchor = 'tabela';
  cfg.totalAttrIds = [];
  relatorioTotalAttrIdsWorking = [];
  relatorioSavedBlockOrder = cfg.reportBlockOrder.map((x) => x);
  relatorioSavedBlockVisibility = { ...cfg.reportBlockVisibility };
  relatorioSavedFooterMode = cfg.reportFooterMode;
  relatorioSavedFooterAnchor = cfg.reportFooterAnchor;
  saveState();
  relatorioLayoutWorkingConfigId = '';
  renderRelatorioLayoutCanvas(tipoId, configId);
  notify('Layout customizado removido.');
}
