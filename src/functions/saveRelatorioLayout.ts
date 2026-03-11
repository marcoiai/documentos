// @ts-nocheck
function saveRelatorioLayout() {
  const tipoId = ui.relatorioTipo.value;
  if (!tipoId) {
    notify('Selecione um tipo antes de salvar layout.');
    return;
  }

  const selectedIds = getSelectedRelatorioAttributeIds();
  if (!selectedIds.length) {
    notify('Selecione atributos antes de salvar layout.');
    return;
  }

  const selectedSet = new Set(selectedIds);
  relatorioSavedLayout = (relatorioCurrentLayout || [])
    .filter((x) => selectedSet.has(x.attrId))
    .map((x) => ({
    attrId: x.attrId,
    colSpan: clampColSpan(x.colSpan || 6),
    }));

  notify('Layout do relatorio salvo. Agora a geracao usa esse layout.');
}
