// @ts-nocheck
function addRelatorioLayoutImageBlock() {
  const tipoId = ui.relatorioLayoutTipo.value;
  const configId = ui.relatorioLayoutConfig.value;
  if (!tipoId || !configId) {
    notify('Selecione tipo e configuracao para adicionar imagem.');
    return;
  }
  const key = newRelatorioBlockImageKey();
  relatorioLayoutBlocksWorking = normalizeRelatorioBlockOrder([...(relatorioLayoutBlocksWorking || []), key]);
  relatorioLayoutBlockVisibilityWorking[key] = true;
  relatorioLayoutBlockImagesWorking[key] = {
    src: '',
    width: 260,
    height: null,
    align: 'center',
    caption: '',
  };
  renderRelatorioLayoutBlockCanvas(tipoId, configId);
}

