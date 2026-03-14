function loadState(): AppState {
  const fallback: AppState = {
    tipoCounter: 1,
    secaoCounter: 1,
    atributoCounter: 1,
    documentoCounter: 1,
    tipos: [],
    secoes: [],
    atributos: [],
    documentos: [],
    layouts: {},
    layoutSections: {},
    tipoSecoes: {},
    reportConfigs: [],
  };

  try {
    const parsedRaw = localStorage.getItem(STORAGE_KEY);
    const parsed = parsedRaw ? JSON.parse(parsedRaw) : null;
    if (!parsed) return fallback;

    const parsedTipos = Array.isArray(parsed.tipos) ? parsed.tipos : [];
    const parsedAtributos = Array.isArray(parsed.atributos) ? parsed.atributos : [];
    const parsedDocumentos = Array.isArray(parsed.documentos) ? parsed.documentos : [];
    const layoutTipoIds = parsed.layouts && typeof parsed.layouts === 'object'
      ? Object.keys(parsed.layouts)
      : [];
    const layoutSectionTipoIds = parsed.layoutSections && typeof parsed.layoutSections === 'object'
      ? Object.keys(parsed.layoutSections)
      : [];
    const tipoSecoesTipoIds = parsed.tipoSecoes && typeof parsed.tipoSecoes === 'object'
      ? Object.keys(parsed.tipoSecoes)
      : [];

    let tipos = parsedTipos.map((t) => ({
      ...t,
      id: String(t.id),
      nome: String(t.nome || '').trim() || inferTipoNome(t.id),
      cabecalho: String(t.cabecalho || ''),
      rodape: String(t.rodape || ''),
    }));
    if (tipos.length === 0) {
      const inferredIds = Array.from(
        new Set([
          ...parsedAtributos.map((a) => a.tipoId).filter(Boolean),
          ...parsedDocumentos.map((d) => d.tipoId).filter(Boolean),
          ...layoutTipoIds,
          ...layoutSectionTipoIds,
          ...tipoSecoesTipoIds,
        ])
      );
      tipos = inferredIds.map((id) => ({
        id,
        nome: inferTipoNome(id),
        cabecalho: '',
        rodape: '',
      }));
    }

    const normalizedSecoes = (Array.isArray(parsed.secoes) ? parsed.secoes : []).map((s) => ({
      ...s,
      id: String(s.id),
      nome: String(s.nome || '').trim(),
      cabecalho: String(s.cabecalho || ''),
      rodape: String(s.rodape || ''),
    }));

    const normalizedAtributos = parsedAtributos.map((a) => ({
      ...a,
      id: String(a.id),
      tipoId: a.tipoId === undefined || a.tipoId === null ? '' : String(a.tipoId),
      secaoId: a.secaoId === undefined || a.secaoId === null ? '' : String(a.secaoId),
      tipoCampo: String(a.tipoCampo || 'texto'),
    }));
    const normalizedDocumentos = parsedDocumentos.map((d) => ({
      ...d,
      id: String(d.id),
      tipoId: d.tipoId === undefined || d.tipoId === null ? '' : String(d.tipoId),
      valores: d.valores && typeof d.valores === 'object' ? d.valores : {},
      pdfVisivel: d.pdfVisivel && typeof d.pdfVisivel === 'object' ? d.pdfVisivel : {},
    }));
    const referencedTipoIds = Array.from(
      new Set([
        ...normalizedAtributos.map((a) => a.tipoId).filter(Boolean),
        ...normalizedDocumentos.map((d) => d.tipoId).filter(Boolean),
      ])
    );
    const currentTipoIds = new Set(tipos.map((t) => t.id));
    for (const tipoId of referencedTipoIds) {
      if (currentTipoIds.has(tipoId)) continue;
      tipos.push({ id: tipoId, nome: inferTipoNome(tipoId), cabecalho: '', rodape: '' });
      currentTipoIds.add(tipoId);
    }

    const counterFromTipos = Math.max(
      1,
      ...tipos
        .map((t) => {
          const match = String(t.id || '').match(/^tipo_(\d+)$/);
          return match ? Number(match[1]) + 1 : 1;
        })
    );

    const parsedLayouts = parsed.layouts && typeof parsed.layouts === 'object' ? parsed.layouts : {};
    const parsedLayoutSections =
      parsed.layoutSections && typeof parsed.layoutSections === 'object'
        ? parsed.layoutSections
        : {};
    const parsedTipoSecoes =
      parsed.tipoSecoes && typeof parsed.tipoSecoes === 'object' ? parsed.tipoSecoes : {};
    const parsedReportConfigs = Array.isArray(parsed.reportConfigs) ? parsed.reportConfigs : [];

    const layouts: Record<string, LayoutItem[]> = {};
    const layoutSections: Record<string, string[]> = {};
    const tipoSecoes: Record<string, string[]> = {};
    for (const tipo of tipos) {
      if (Array.isArray(parsedLayouts[tipo.id])) {
        layouts[tipo.id] = parsedLayouts[tipo.id].map((item) => ({
          ...item,
          attrId: String(item.attrId),
        }));
      }
      if (Array.isArray(parsedLayoutSections[tipo.id])) {
        layoutSections[tipo.id] = parsedLayoutSections[tipo.id].map((id) => String(id));
      }
      if (Array.isArray(parsedTipoSecoes[tipo.id])) {
        tipoSecoes[tipo.id] = parsedTipoSecoes[tipo.id].map((id) => String(id));
      }
    }

    return {
      ...fallback,
      ...parsed,
      tipoCounter: Math.max(parsed.tipoCounter || 1, counterFromTipos),
      tipos,
      secoes: normalizedSecoes,
      atributos: normalizedAtributos,
      documentos: normalizedDocumentos,
      layouts,
      layoutSections,
      tipoSecoes,
      reportConfigs: parsedReportConfigs
        .map((cfg) => ({
          id: String(cfg.id || ''),
          nome: String(cfg.nome || '').trim(),
          tipoId: String(cfg.tipoId || ''),
          selectedAttrIds: Array.isArray(cfg.selectedAttrIds) ? cfg.selectedAttrIds.map((x) => String(x)) : [],
          reportLayout: Array.isArray(cfg.reportLayout)
            ? cfg.reportLayout.map((x) => ({
              attrId: String(x.attrId || ''),
              colSpan: clampColSpan(x.colSpan || 6),
            })).filter((x) => x.attrId)
            : [],
          reportBlockOrder: normalizeRelatorioBlockOrder(cfg.reportBlockOrder),
          reportBlockVisibility: normalizeRelatorioBlockVisibility(cfg.reportBlockVisibility, cfg.reportBlockOrder),
          reportBlockSpacerHeights: normalizeRelatorioBlockSpacerHeights(cfg.reportBlockSpacerHeights, cfg.reportBlockOrder),
          reportFooterMode: cfg.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom',
          reportFooterAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(String(cfg.reportFooterAnchor || ''))
            ? String(cfg.reportFooterAnchor)
            : 'tabela',
          incluirCabecalho: cfg.incluirCabecalho === undefined ? true : Boolean(cfg.incluirCabecalho),
          incluirRodape: cfg.incluirRodape === undefined ? true : Boolean(cfg.incluirRodape),
          filtroAttrId: String(cfg.filtroAttrId || ''),
          filtroOperador: String(cfg.filtroOperador || 'contains'),
          filtroValor: String(cfg.filtroValor || ''),
          somarNumericos: Boolean(cfg.somarNumericos),
          totalAttrIds: normalizeRelatorioTotalAttrIds(cfg.totalAttrIds, String(cfg.tipoId || '')),
          ordenacao: normalizeRelatorioOrdenacao(
            Array.isArray(cfg.ordenacao)
              ? cfg.ordenacao
              : (cfg.ordenarAttrId
                ? [{ attrId: String(cfg.ordenarAttrId), direcao: String(cfg.ordenarDirecao || 'asc') }]
                : []),
            String(cfg.tipoId || '')
          ),
          ordenarAttrId: String(cfg.ordenarAttrId || ''),
          ordenarDirecao: String(cfg.ordenarDirecao || 'asc') === 'desc' ? 'desc' : 'asc',
          createdAt: String(cfg.createdAt || ''),
        }))
        .filter((cfg) => cfg.id && cfg.nome && cfg.tipoId),
    };
  } catch {
    return fallback;
  }
}
