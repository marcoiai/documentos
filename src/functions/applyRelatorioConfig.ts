// @ts-nocheck
function applyRelatorioConfig(config) {
  if (!config) return;
  ui.relatorioTipo.value = config.tipoId;
  renderRelatorioConfigSelectOptions(config.tipoId, config.id);
  ui.relatorioConfigSelect.value = config.id || '';
  relatorioSavedLayout = Array.isArray(config.reportLayout)
    ? config.reportLayout.map((x) => ({ attrId: x.attrId, colSpan: clampColSpan(x.colSpan || 6) }))
    : [];
  relatorioSavedBlockOrder = normalizeRelatorioBlockOrder(config.reportBlockOrder);
  relatorioSavedBlockVisibility = normalizeRelatorioBlockVisibility(config.reportBlockVisibility);
  relatorioSavedFooterMode = config.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom';
  relatorioSavedFooterAnchor = ['cabecalho', 'info_geracao', 'tabela'].includes(String(config.reportFooterAnchor || ''))
    ? String(config.reportFooterAnchor)
    : 'tabela';
  relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(
    Array.isArray(config.ordenacao) && config.ordenacao.length
      ? config.ordenacao
      : (config.ordenarAttrId ? [{ attrId: config.ordenarAttrId, direcao: config.ordenarDirecao || 'asc' }] : []),
    config.tipoId
  );
  relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(config.totalAttrIds, config.tipoId);
  relatorioCurrentLayout = relatorioSavedLayout.map((x) => ({ ...x }));
  renderRelatorioAtributosByTipo(config.tipoId, false);

  const selected = new Set(Array.isArray(config.selectedAttrIds) ? config.selectedAttrIds : []);
  ui.relatorioAtributosWrap
    .querySelectorAll('input[data-relatorio-attr]')
    .forEach((el) => {
      el.checked = selected.has(el.dataset.relatorioAttr);
    });

  ui.relatorioFiltroAtributo.value = config.filtroAttrId || '';
  ui.relatorioFiltroOperador.value = config.filtroOperador || 'contains';
  ui.relatorioFiltroValor.value = config.filtroValor || '';
  ui.relatorioSomarNumeros.checked = Boolean(config.somarNumericos);
  ui.relatorioOrdenarAtributo.value = '';
  ui.relatorioOrdenarDirecao.value = 'asc';
  ui.relatorioConfigNome.value = config.nome || '';

  refreshMaterializeUI();
}
