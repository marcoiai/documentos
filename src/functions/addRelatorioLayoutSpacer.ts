// @ts-nocheck
function addRelatorioLayoutSpacer() {
  const tipoId = ui.relatorioLayoutTipo.value;
  const configId = ui.relatorioLayoutConfig.value;
  if (!tipoId || !configId) {
    notify('Selecione tipo e configuracao para adicionar espacador.');
    return;
  }
  const key = newRelatorioBlockSpacerKey();
  relatorioLayoutBlocksWorking = normalizeRelatorioBlockOrder([...(relatorioLayoutBlocksWorking || []), key]);
  relatorioLayoutBlockVisibilityWorking[key] = true;
  relatorioLayoutBlockSpacerHeightsWorking[key] = 24;
  renderRelatorioLayoutBlockCanvas(tipoId, configId);
}
