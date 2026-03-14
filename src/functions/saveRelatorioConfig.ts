// @ts-nocheck
function saveRelatorioConfig() {
  const cfg = collectRelatorioConfig();
  if (!cfg.tipoId) {
    notify('Selecione um tipo antes de salvar a configuracao.');
    return;
  }
  if (!cfg.nome) {
    notify('Informe um nome para a configuracao.');
    return;
  }
  if (!Array.isArray(state.reportConfigs)) state.reportConfigs = [];

  const existing = state.reportConfigs.find(
    (x) => x.tipoId === cfg.tipoId && x.nome.trim().toLowerCase() === cfg.nome.trim().toLowerCase()
  );

  let savedId = '';
  if (existing) {
    existing.selectedAttrIds = cfg.selectedAttrIds;
    existing.reportLayout = cfg.reportLayout || [];
    existing.reportBlockOrder = normalizeRelatorioBlockOrder(cfg.reportBlockOrder);
    existing.reportBlockVisibility = normalizeRelatorioBlockVisibility(
      cfg.reportBlockVisibility,
      existing.reportBlockOrder
    );
    existing.reportBlockSpacerHeights = normalizeRelatorioBlockSpacerHeights(
      cfg.reportBlockSpacerHeights || existing.reportBlockSpacerHeights,
      existing.reportBlockOrder
    );
    existing.reportFooterMode = cfg.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom';
    existing.reportFooterAnchor = ['cabecalho', 'info_geracao', 'tabela'].includes(String(cfg.reportFooterAnchor || ''))
      ? String(cfg.reportFooterAnchor)
      : 'tabela';
    existing.filtroAttrId = cfg.filtroAttrId;
    existing.filtroOperador = cfg.filtroOperador;
    existing.filtroValor = cfg.filtroValor;
    existing.somarNumericos = Boolean(cfg.somarNumericos);
    existing.totalAttrIds = normalizeRelatorioTotalAttrIds(cfg.totalAttrIds, cfg.tipoId);
    existing.ordenacao = normalizeRelatorioOrdenacao(cfg.ordenacao, cfg.tipoId);
    existing.ordenarAttrId = cfg.ordenarAttrId || '';
    existing.ordenarDirecao = cfg.ordenarDirecao === 'desc' ? 'desc' : 'asc';
    existing.createdAt = cfg.createdAt;
    savedId = existing.id;
  } else {
    cfg.id = `rptcfg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    state.reportConfigs.push(cfg);
    savedId = cfg.id;
  }

  saveState();
  renderRelatorioConfigSelectOptions(cfg.tipoId, savedId);
  ui.relatorioConfigSelect.value = savedId;
  refreshMaterializeUI();
  notify('Configuracao de relatorio salva.');
}
