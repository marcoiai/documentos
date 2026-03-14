// @ts-nocheck
function generateRelatorio() {
  const tipoId = ui.relatorioTipo.value;
  if (!tipoId) {
    notify('Selecione um tipo para gerar o relatorio.');
    return;
  }

  const selectedAttrIds = getSelectedRelatorioAttributeIds();
  if (selectedAttrIds.length === 0) {
    notify('Selecione pelo menos um atributo para o relatorio.');
    return;
  }

  const cfgId = String(ui.relatorioConfigSelect?.value || '').trim();
  const cfgNome = String(ui.relatorioConfigNome.value || '').trim().toLowerCase();
  const matchedConfig = cfgId
    ? (state.reportConfigs || []).find((c) => c.id === cfgId && c.tipoId === tipoId)
    : (cfgNome
      ? (state.reportConfigs || []).find(
        (c) => c.tipoId === tipoId && String(c.nome || '').trim().toLowerCase() === cfgNome
      )
      : null);

  const allAttrsById = new Map(getAtributosByTipo(tipoId).map((a) => [a.id, a]));
  const defaultAttrs = selectedAttrIds
    .map((id) => allAttrsById.get(id))
    .filter(Boolean);
  const selectedSet = new Set(selectedAttrIds);
  const layoutSource = (Array.isArray(matchedConfig?.reportLayout) && matchedConfig.reportLayout.length)
    ? matchedConfig.reportLayout
    : [];
  const savedLayoutFiltered = (layoutSource || []).filter((x) => selectedSet.has(x.attrId));
  const useSavedLayout = savedLayoutFiltered.length > 0;
  const ordered = useSavedLayout ? getRelatorioOrderedAttrs(tipoId, savedLayoutFiltered) : [];
  let attrs = defaultAttrs;
  let orderedWithFallback = ordered;
  if (useSavedLayout) {
    const inLayout = new Set(ordered.map((x) => x.attr.id));
    const remainder = defaultAttrs
      .filter((a) => !inLayout.has(a.id))
      .map((attr) => ({ attr, colSpan: 6 }));
    orderedWithFallback = [...ordered, ...remainder];
    attrs = orderedWithFallback.map((x) => x.attr);
  }
  const attrById = new Map(attrs.map((a) => [a.id, a]));

  const filtroAttrId = ui.relatorioFiltroAtributo.value;
  const filtroOperador = ui.relatorioFiltroOperador.value || 'contains';
  const filtroValor = ui.relatorioFiltroValor.value || '';
  const somarNumericos = Boolean(ui.relatorioSomarNumeros.checked || matchedConfig?.somarNumericos);
  const totalAttrIdsFromConfig = normalizeRelatorioTotalAttrIds(matchedConfig?.totalAttrIds, tipoId);
  const totalAttrIdsEffective = normalizeRelatorioTotalAttrIds(
    relatorioTotalAttrIdsWorking.length ? relatorioTotalAttrIdsWorking : totalAttrIdsFromConfig,
    tipoId
  );
  const totalAttrSet = new Set(totalAttrIdsEffective);
  const sumAllNumericFallback = totalAttrSet.size === 0;
  const effectiveOrdenacao = normalizeRelatorioOrdenacao(
    relatorioOrdenacaoWorking.length
      ? relatorioOrdenacaoWorking
      : (Array.isArray(matchedConfig?.ordenacao) && matchedConfig.ordenacao.length
        ? matchedConfig.ordenacao
        : (matchedConfig?.ordenarAttrId
          ? [{ attrId: matchedConfig.ordenarAttrId, direcao: matchedConfig.ordenarDirecao || 'asc' }]
          : [])),
    tipoId
  );

  const columns = attrs.map((a) => a.nome);
  const colSpans = useSavedLayout
    ? orderedWithFallback.map((x) => clampColSpan(x.colSpan || 6))
    : attrs.map(() => 6);
  const docs = state.documentos.filter((d) => d.tipoId === tipoId);
  const filteredDocs = [];
  const rows = [];
  const numeroTotals = attrs.map((attr) => {
    if (attr.tipoCampo !== 'numero') return null;
    if (sumAllNumericFallback) return 0;
    return totalAttrSet.has(attr.id) ? 0 : null;
  });

  const parseSortableValue = (attr, value) => {
    const raw = String(value ?? '').trim();
    if (!raw) return { empty: true, kind: 'text', value: '' };

    if (attr?.tipoCampo === 'numero') {
      const normalized = raw.replace(/\./g, '').replace(',', '.');
      const n = Number(normalized);
      if (!Number.isNaN(n) && Number.isFinite(n)) return { empty: false, kind: 'number', value: n };
    }

    if (attr?.tipoCampo === 'data') {
      const br = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (br) {
        const iso = `${br[3]}-${br[2]}-${br[1]}T00:00:00`;
        const ms = Date.parse(iso);
        if (!Number.isNaN(ms)) return { empty: false, kind: 'date', value: ms };
      }
      const ms = Date.parse(raw);
      if (!Number.isNaN(ms)) return { empty: false, kind: 'date', value: ms };
    }

    return { empty: false, kind: 'text', value: raw.toLocaleLowerCase() };
  };
  const parseNumericValue = (value) => {
    const raw = String(value ?? '').trim();
    if (!raw) return null;
    const compact = raw.replace(/\s/g, '');
    const hasDot = compact.includes('.');
    const hasComma = compact.includes(',');
    let normalized = compact;
    if (hasDot && hasComma) {
      const lastDot = compact.lastIndexOf('.');
      const lastComma = compact.lastIndexOf(',');
      const decimalSep = lastDot > lastComma ? '.' : ',';
      const thousandSep = decimalSep === '.' ? ',' : '.';
      normalized = compact.split(thousandSep).join('');
      if (decimalSep === ',') normalized = normalized.replace(',', '.');
    } else if (hasComma) {
      normalized = compact.replace(/\./g, '').replace(',', '.');
    } else {
      normalized = compact.replace(/,/g, '');
    }
    const n = Number(normalized);
    if (Number.isNaN(n) || !Number.isFinite(n)) return null;
    return n;
  };

  for (const doc of docs) {
    const ctx = buildPlaceholderContext(tipoId, doc.valores, doc.titulo);

    if (filtroAttrId) {
      const filtroAttr = attrById.get(filtroAttrId) || state.atributos.find((a) => a.id === filtroAttrId);
      if (filtroAttr) {
        const filtroRaw = doc.valores[filtroAttr.id];
        const filtroResolved = resolveAttrValueForOutput(filtroAttr, filtroRaw, ctx);
        if (!matchesRelatorioFilter(filtroResolved, filtroOperador, filtroValor)) continue;
      }
    }

    filteredDocs.push({ doc, ctx });
  }

  if (effectiveOrdenacao.length) {
    filteredDocs.sort((a, b) => {
      for (const ord of effectiveOrdenacao) {
        const sortAttr = allAttrsById.get(ord.attrId) || state.atributos.find((x) => x.id === ord.attrId);
        const av = resolveAttrValueForOutput(sortAttr, a.doc.valores[ord.attrId], a.ctx);
        const bv = resolveAttrValueForOutput(sortAttr, b.doc.valores[ord.attrId], b.ctx);
        const pa = parseSortableValue(sortAttr, av);
        const pb = parseSortableValue(sortAttr, bv);

        if (pa.empty && pb.empty) continue;
        if (pa.empty) return 1;
        if (pb.empty) return -1;

        let result = 0;
        if ((pa.kind === 'number' || pa.kind === 'date') && pa.kind === pb.kind) {
          result = Number(pa.value) - Number(pb.value);
        } else {
          result = String(pa.value).localeCompare(String(pb.value), 'pt-BR', { sensitivity: 'base', numeric: true });
        }
        if (result !== 0) return ord.direcao === 'desc' ? -result : result;
      }
      return 0;
    });
  }

  for (const { doc, ctx } of filteredDocs) {
    const row = attrs.map((attr, idx) => {
      const value = String(resolveAttrValueForOutput(attr, doc.valores[attr.id], ctx));
      if (somarNumericos && numeroTotals[idx] !== null) {
        const parsed = parseNumericValue(value);
        if (parsed !== null) numeroTotals[idx] += parsed;
      }
      return value;
    });
    rows.push(row);
  }
  const totalValues = somarNumericos
    ? numeroTotals.map((x) => (x === null ? '' : Number(x).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    : [];

  const cfgBlockOrder = matchedConfig?.reportBlockOrder;
  const cfgBlockVisibility = matchedConfig?.reportBlockVisibility;
  const cfgBlockSpacerHeights = matchedConfig?.reportBlockSpacerHeights;
  const cfgFooterMode = matchedConfig?.reportFooterMode;
  const cfgFooterAnchor = matchedConfig?.reportFooterAnchor;

  relatorioLastResult = {
    tipoId,
    tipoNome: tipoNome(tipoId),
    columns,
    colSpans,
    blockOrder: normalizeRelatorioBlockOrder(cfgBlockOrder || relatorioSavedBlockOrder),
    blockVisibility: normalizeRelatorioBlockVisibility(
      cfgBlockVisibility || relatorioSavedBlockVisibility,
      cfgBlockOrder || relatorioSavedBlockOrder
    ),
    blockSpacerHeights: normalizeRelatorioBlockSpacerHeights(
      cfgBlockSpacerHeights || relatorioSavedBlockSpacerHeights,
      cfgBlockOrder || relatorioSavedBlockOrder
    ),
    footerMode: (cfgFooterMode || relatorioSavedFooterMode) === 'after_block' ? 'after_block' : 'fixed_bottom',
    footerAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(String(cfgFooterAnchor || relatorioSavedFooterAnchor || ''))
      ? (cfgFooterAnchor || relatorioSavedFooterAnchor)
      : 'tabela',
    totalValues,
    rows,
  };

  renderRelatorioTable();
}
