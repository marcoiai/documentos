// @ts-nocheck
function saveRelatorioLayoutEditorConfig() {
  const tipoId = ui.relatorioLayoutTipo.value;
  const configId = ui.relatorioLayoutConfig.value;
  if (!tipoId || !configId) {
    notify('Selecione tipo e configuracao para salvar layout.');
    return;
  }

  const cfg = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
  if (!cfg) {
    notify('Configuracao nao encontrada.');
    return;
  }

  cfg.reportLayout = (relatorioLayoutWorking || []).map((x) => ({
    attrId: x.attrId,
    colSpan: clampColSpan(x.colSpan || 6),
  }));
  cfg.reportBlockOrder = normalizeRelatorioBlockOrder(relatorioLayoutBlocksWorking);
  cfg.reportBlockVisibility = normalizeRelatorioBlockVisibility(
    relatorioLayoutBlockVisibilityWorking,
    cfg.reportBlockOrder
  );
  cfg.reportBlockSpacerHeights = normalizeRelatorioBlockSpacerHeights(
    relatorioLayoutBlockSpacerHeightsWorking,
    cfg.reportBlockOrder
  );
  cfg.reportFooterMode = relatorioLayoutFooterModeWorking === 'after_block' ? 'after_block' : 'fixed_bottom';
  cfg.reportFooterAnchor = ['cabecalho', 'info_geracao', 'tabela'].includes(String(relatorioLayoutFooterAnchorWorking || ''))
    ? relatorioLayoutFooterAnchorWorking
    : 'tabela';
  cfg.totalAttrIds = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
  cfg.selectedAttrIds = cfg.reportLayout.map((x) => x.attrId);
  relatorioSavedBlockOrder = cfg.reportBlockOrder.map((x) => x);
  relatorioSavedBlockVisibility = { ...cfg.reportBlockVisibility };
  relatorioSavedBlockSpacerHeights = { ...(cfg.reportBlockSpacerHeights || {}) };
  relatorioSavedFooterMode = cfg.reportFooterMode;
  relatorioSavedFooterAnchor = cfg.reportFooterAnchor;

  saveState();
  notify('Layout da configuracao de relatorio salvo.');
}
