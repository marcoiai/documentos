// @ts-nocheck
function collectRelatorioConfig() {
  const tipoId = ui.relatorioTipo.value;
  const nome = String(ui.relatorioConfigNome.value || '').trim();
  const selectedAttrIds = getSelectedRelatorioAttributeIds();
  const filtroAttrId = ui.relatorioFiltroAtributo.value || '';
  const filtroOperador = ui.relatorioFiltroOperador.value || 'contains';
  const filtroValor = ui.relatorioFiltroValor.value || '';
  const somarNumericos = Boolean(ui.relatorioSomarNumeros.checked);
  const totalAttrIds = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
  const ordenacao = normalizeRelatorioOrdenacao(relatorioOrdenacaoWorking, tipoId);
  const ordenarAttrId = ordenacao[0]?.attrId || '';
  const ordenarDirecao = ordenacao[0]?.direcao || 'asc';

  return {
    id: '',
    nome,
    tipoId,
    selectedAttrIds,
    reportLayout: (relatorioSavedLayout || []).map((x) => ({
      attrId: x.attrId,
      colSpan: clampColSpan(x.colSpan || 6),
    })),
    reportBlockOrder: normalizeRelatorioBlockOrder(relatorioSavedBlockOrder),
    reportBlockVisibility: normalizeRelatorioBlockVisibility(relatorioSavedBlockVisibility),
    reportFooterMode: relatorioSavedFooterMode,
    reportFooterAnchor: relatorioSavedFooterAnchor,
    filtroAttrId,
    filtroOperador,
    filtroValor,
    somarNumericos,
    totalAttrIds,
    ordenacao,
    ordenarAttrId,
    ordenarDirecao,
    createdAt: new Date().toISOString(),
  };
}
