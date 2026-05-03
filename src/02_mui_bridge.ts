// @ts-nocheck
(function initMuiBridge() {
  const listeners = [];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function emitChange() {
    listeners.slice().forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.warn('[mui-bridge] listener failed', err);
      }
    });
  }

  function normalizeRelatorioTotalFilters(filters, tipoId) {
    if (!Array.isArray(filters)) return [];
    const validAttrIds = new Set(getAtributosByTipo(String(tipoId || '')).map((attr) => String(attr.id)));
    return filters
      .map((filter) => ({
        key: String(filter?.key || '').trim(),
        operator: String(filter?.operator || 'gte').trim(),
        value: String(filter?.value ?? '').trim(),
        enabled: Boolean(filter?.enabled),
      }))
      .filter((filter) => {
        if (!filter.key || !filter.enabled) return false;
        if (filter.key === 'sum_of_sums') return true;
        if (!filter.key.startsWith('attr_total:')) return false;
        return validAttrIds.has(filter.key.slice('attr_total:'.length));
      });
  }

  function parseRelatorioNumericFilterValue(value) {
    return parseLocaleNumber(value);
  }

  function matchesRelatorioTotalFilter(actual, operator, expectedRaw) {
    const expected = parseRelatorioNumericFilterValue(expectedRaw);
    if (actual === null || actual === undefined) {
      return operator === 'empty';
    }
    if (operator === 'not_empty') return true;
    if (operator === 'empty') return false;
    if (expected === null) return false;
    if (operator === 'equals') return actual === expected;
    if (operator === 'not_equals') return actual !== expected;
    if (operator === 'gt') return actual > expected;
    if (operator === 'gte') return actual >= expected;
    if (operator === 'lt') return actual < expected;
    if (operator === 'lte') return actual <= expected;
    return false;
  }

  function getTipos() {
    return state.tipos.map((tipo) => ({
      ...clone(tipo),
      secoes: getSecoesForTipo(tipo.id).map((secao) => clone(secao)),
      atributos: getAtributosByTipo(tipo.id).map((atributo) => clone(atributo)),
      documentos: state.documentos.filter((doc) => doc.tipoId === tipo.id).map((doc) => clone(doc)),
    }));
  }

  function getSecoes() {
    return state.secoes.map((secao) => ({
      ...clone(secao),
      linkedTipoIds: Object.keys(state.tipoSecoes || {}).filter((tipoId) => isSecaoLinkedToTipo(tipoId, secao.id)),
    }));
  }

  function getAtributos() {
    return state.atributos.map((atributo) => {
      const tipo = state.tipos.find((item) => item.id === atributo.tipoId) || null;
      const secao = state.secoes.find((item) => item.id === atributo.secaoId) || null;
      return {
        ...clone(atributo),
        tipoNome: tipo?.nome || '',
        secaoNome: secao?.nome || '',
      };
    });
  }

  function getDocumentos() {
    return state.documentos.map((documento) => {
      const tipo = state.tipos.find((item) => item.id === documento.tipoId) || null;
      return {
        ...clone(documento),
        tipoNome: tipo?.nome || '',
      };
    });
  }

  function getReportTiposData() {
    return getReportTipos().map((tipo) => clone(tipo));
  }

  function getReportConfigsData(tipoId = '') {
    const configs = tipoId ? getReportConfigsByTipo(tipoId) : (state.reportConfigs || []);
    return configs.map((config) => clone(config));
  }

  function getRelatorioAttributeGroups(tipoId) {
    return buildSectionGroupsForTipo(String(tipoId || ''), { includeEmptySections: true })
      .filter((group) => group.items.length > 0)
      .map((group) => ({
        key: group.key,
        nome: group.nome,
        items: group.items.map((item) => ({
          attr: clone(item.attr),
          colSpan: item.colSpan,
        })),
      }));
  }

  function getSnapshot() {
    return {
      tipos: getTipos(),
      secoes: getSecoes(),
      atributos: getAtributos(),
      documentos: getDocumentos(),
    };
  }

  function saveTipo(payload) {
    const nome = String(payload?.nome || '').trim();
    if (!nome) {
      notify('Informe um nome para o tipo.');
      return { ok: false };
    }

    const cabecalho = String(payload?.cabecalho || '').trim();
    const rodape = String(payload?.rodape || '').trim();
    const requestedSecaoIds = Array.isArray(payload?.secaoIds) ? payload.secaoIds.map((id) => String(id)) : [];
    const validSecaoIds = requestedSecaoIds.filter((id, index) => (
      state.secoes.some((secao) => secao.id === id) && requestedSecaoIds.indexOf(id) === index
    ));

    let tipoId = String(payload?.id || '').trim();
    if (tipoId) {
      const tipo = state.tipos.find((item) => item.id === tipoId);
      if (!tipo) {
        notify('Tipo nao encontrado.');
        return { ok: false };
      }
      tipo.nome = nome;
      tipo.cabecalho = cabecalho;
      tipo.rodape = rodape;
    } else {
      tipoId = makeId('tipo', 'tipoCounter');
      state.tipos.push({ id: tipoId, nome, cabecalho, rodape });
    }

    const currentSecaoIds = getSecoesForTipo(tipoId).map((secao) => secao.id);
    const nextSecaoIds = Array.isArray(payload?.secaoIds)
      ? validSecaoIds
      : (currentSecaoIds.length > 0 ? currentSecaoIds : state.secoes.map((secao) => secao.id));

    const removedSecaoIds = currentSecaoIds.filter((id) => !nextSecaoIds.includes(id));
    if (removedSecaoIds.length > 0) {
      state.atributos
        .filter((atributo) => atributo.tipoId === tipoId && removedSecaoIds.includes(atributo.secaoId))
        .forEach((atributo) => {
          atributo.secaoId = '';
        });
    }

    state.tipoSecoes[tipoId] = nextSecaoIds;
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    renderAll();
    return { ok: true, tipoId };
  }

  function saveSecao(payload) {
    const nome = String(payload?.nome || '').trim();
    if (!nome) {
      notify('Informe um nome para a secao.');
      return { ok: false };
    }

    const cabecalho = String(payload?.cabecalho || '').trim();
    const rodape = String(payload?.rodape || '').trim();
    const secaoId = String(payload?.id || '').trim();
    if (secaoId) {
      const secao = state.secoes.find((item) => item.id === secaoId);
      if (!secao) {
        notify('Secao nao encontrada.');
        return { ok: false };
      }
      secao.nome = nome;
      secao.cabecalho = cabecalho;
      secao.rodape = rodape;
    } else {
      state.secoes.push({ id: makeId('sec', 'secaoCounter'), nome, cabecalho, rodape });
    }

    saveState();
    renderAll();
    return { ok: true };
  }

  function saveAtributo(payload) {
    const tipoId = String(payload?.tipoId || '').trim();
    const nome = String(payload?.nome || '').trim();
    const tipoCampo = String(payload?.tipoCampo || 'texto');
    const secaoId = String(payload?.secaoId || '').trim();
    const templateTexto = String(payload?.templateTexto || '').trim();
    const validador = String(payload?.validador || '').trim();
    const pesoRaw = String(payload?.peso ?? '').trim();
    const mascara = String(payload?.mascara || '').trim();

    if (!tipoId || !nome) {
      notify('Informe tipo e nome do atributo.');
      return { ok: false };
    }
    if (!isValidatorSyntaxValid(validador)) {
      notify('Validador invalido.');
      return { ok: false };
    }
    if (pesoRaw && !Number.isFinite(Number(pesoRaw))) {
      notify('Peso invalido.');
      return { ok: false };
    }

    if (secaoId) {
      const linkedSecoes = getSecoesForTipo(tipoId).map((s) => s.id);
      if (!linkedSecoes.includes(secaoId)) {
        state.tipoSecoes[tipoId] = Array.from(new Set([...linkedSecoes, secaoId]));
      }
    }

    const safeSecaoId = secaoId && state.secoes.some((s) => s.id === secaoId) ? secaoId : '';
    const peso = pesoRaw === '' ? null : Number(pesoRaw);
    const atributoId = String(payload?.id || '').trim();
    const nextTemplateTexto = tipoCampo === 'texto_placeholder'
      ? templateTexto
      : (tipoCampo === 'currency'
        ? serializeCurrencyConfig(payload?.currencySymbol !== false)
        : '');

    if (atributoId) {
      const atributo = state.atributos.find((item) => item.id === atributoId);
      if (!atributo) {
        notify('Atributo nao encontrado.');
        return { ok: false };
      }
      const oldTipoId = atributo.tipoId;
      atributo.tipoId = tipoId;
      atributo.nome = nome;
      atributo.tipoCampo = tipoCampo;
      atributo.secaoId = safeSecaoId;
      atributo.validador = validador;
      atributo.peso = peso;
      atributo.mascara = mascara;
      atributo.templateTexto = nextTemplateTexto;
      delete atributo.textoBase;
      syncLayoutsForTipo(oldTipoId);
      syncLayoutsForTipo(tipoId);
    } else {
      state.atributos.push({
        id: makeId('att', 'atributoCounter'),
        tipoId,
        nome,
        tipoCampo,
        secaoId: safeSecaoId,
        validador,
        peso,
        mascara,
        templateTexto: nextTemplateTexto,
      });
      syncLayoutsForTipo(tipoId);
    }

    saveState();
    renderAll();
    return { ok: true };
  }

  async function saveDocumento(payload) {
    const titulo = String(payload?.titulo || '').trim();
    const tipoId = String(payload?.tipoId || '').trim();
    const valores = payload?.valores && typeof payload.valores === 'object' ? clone(payload.valores) : {};
    const pdfVisivel = payload?.pdfVisivel && typeof payload.pdfVisivel === 'object' ? clone(payload.pdfVisivel) : {};
    const documentoId = String(payload?.id || '').trim();

    if (!titulo || !tipoId) {
      notify('Informe titulo e tipo do documento.');
      return { ok: false };
    }

    const validationErrors = validateDocumento(tipoId, valores, documentoId);
    if (validationErrors.length > 0) {
      notify(validationErrors.map((error) => error.summary).join('<br>'));
      return { ok: false, errors: validationErrors };
    }

    let savedDoc = null;
    if (documentoId) {
      const documento = state.documentos.find((item) => item.id === documentoId);
      if (!documento) {
        notify('Documento nao encontrado.');
        return { ok: false };
      }
      documento.titulo = titulo;
      documento.tipoId = tipoId;
      documento.valores = valores;
      documento.pdfVisivel = pdfVisivel;
      savedDoc = documento;
    } else {
      savedDoc = {
        id: makeId('doc', 'documentoCounter'),
        titulo,
        tipoId,
        valores,
        pdfVisivel,
      };
      state.documentos.push(savedDoc);
    }

    saveState();
    renderAll();

    try {
      const estrutura = buildDocumentoEstruturaPayload(savedDoc);
      await postDocumentoPayloadToApi(estrutura);
    } catch (error) {
      console.error('[documento:api] erro ao enviar payload', error);
    }

    return { ok: true, documentoId: savedDoc.id };
  }

  function saveReportConfig(payload) {
    const tipoId = String(payload?.tipoId || '').trim();
    const nome = String(payload?.nome || '').trim();
    if (!tipoId) {
      notify('Selecione um tipo antes de salvar a configuracao.');
      return { ok: false };
    }
    if (!nome) {
      notify('Informe um nome para a configuracao.');
      return { ok: false };
    }
    if (!Array.isArray(state.reportConfigs)) state.reportConfigs = [];

    const nextConfig = {
      id: String(payload?.id || '').trim(),
      nome,
      tipoId,
      selectedAttrIds: Array.isArray(payload?.selectedAttrIds) ? payload.selectedAttrIds.map((id) => String(id)) : [],
      reportLayout: Array.isArray(payload?.reportLayout)
        ? payload.reportLayout.map((x) => ({
          attrId: String(x?.attrId || ''),
          colSpan: clampColSpan(x?.colSpan || 6),
        })).filter((x) => x.attrId)
        : [],
      reportBlockOrder: normalizeRelatorioBlockOrder(payload?.reportBlockOrder || []),
      reportBlockVisibility: normalizeRelatorioBlockVisibility(payload?.reportBlockVisibility || {}, payload?.reportBlockOrder || []),
      reportBlockSpacerHeights: normalizeRelatorioBlockSpacerHeights(payload?.reportBlockSpacerHeights || {}, payload?.reportBlockOrder || []),
      reportFooterMode: payload?.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom',
      reportFooterAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(String(payload?.reportFooterAnchor || ''))
        ? String(payload?.reportFooterAnchor)
        : 'tabela',
      filtroAttrId: String(payload?.filtroAttrId || ''),
      filtroOperador: String(payload?.filtroOperador || 'contains'),
      filtroValor: String(payload?.filtroValor || ''),
      somarNumericos: Boolean(payload?.somarNumericos),
      totalAttrIds: normalizeRelatorioTotalAttrIds(payload?.totalAttrIds || [], tipoId),
      sumOfSumsEnabled: Boolean(payload?.sumOfSumsEnabled),
      sumOfSumsAttrIds: normalizeRelatorioTotalAttrIds(payload?.sumOfSumsAttrIds || [], tipoId),
      totalFilters: normalizeRelatorioTotalFilters(payload?.totalFilters || [], tipoId),
      ordenacao: normalizeRelatorioOrdenacao(payload?.ordenacao || [], tipoId),
      ordenarAttrId: String(payload?.ordenarAttrId || ''),
      ordenarDirecao: String(payload?.ordenarDirecao || 'asc') === 'desc' ? 'desc' : 'asc',
      createdAt: String(payload?.createdAt || new Date().toISOString()),
    };

    let savedId = nextConfig.id;
    const existing = state.reportConfigs.find((item) => (
      (savedId && item.id === savedId) ||
      (item.tipoId === tipoId && item.nome.trim().toLowerCase() === nome.toLowerCase())
    ));

    if (existing) {
      Object.assign(existing, nextConfig, { id: existing.id });
      savedId = existing.id;
    } else {
      savedId = `rptcfg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      state.reportConfigs.push({ ...nextConfig, id: savedId });
    }

    saveState();
    renderAll();
    return { ok: true, configId: savedId };
  }

  function deleteReportConfig(configId) {
    state.reportConfigs = (state.reportConfigs || []).filter((config) => config.id !== configId);
    saveState();
    renderAll();
    return { ok: true };
  }

  function generateReport(payload) {
    const tipoId = String(payload?.tipoId || '').trim();
    const selectedAttrIds = Array.isArray(payload?.selectedAttrIds)
      ? payload.selectedAttrIds.map((id) => String(id)).filter(Boolean)
      : [];

    if (!tipoId) {
      notify('Selecione um tipo para gerar o relatorio.');
      return { ok: false };
    }
    if (!selectedAttrIds.length) {
      notify('Selecione pelo menos um atributo para o relatorio.');
      return { ok: false };
    }

    const matchedConfig = String(payload?.configId || '').trim()
      ? (state.reportConfigs || []).find((c) => c.id === String(payload.configId) && c.tipoId === tipoId)
      : null;

    const allAttrsById = new Map(getAtributosByTipo(tipoId).map((a) => [a.id, a]));
    const defaultAttrs = selectedAttrIds.map((id) => allAttrsById.get(id)).filter(Boolean);
    const selectedSet = new Set(selectedAttrIds);
    const layoutSource = Array.isArray(payload?.reportLayout) && payload.reportLayout.length
      ? payload.reportLayout
      : (Array.isArray(matchedConfig?.reportLayout) ? matchedConfig.reportLayout : []);
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

    const filtroAttrId = String(payload?.filtroAttrId || '');
    const filtroOperador = String(payload?.filtroOperador || 'contains');
    const filtroValor = String(payload?.filtroValor || '');
    const somarNumericos = Boolean(payload?.somarNumericos);
    const totalAttrIdsEffective = normalizeRelatorioTotalAttrIds(payload?.totalAttrIds || [], tipoId);
    const totalAttrSet = new Set(totalAttrIdsEffective);
    const sumOfSumsEnabled = Boolean(payload?.sumOfSumsEnabled);
    const sumOfSumsAttrIdsEffective = normalizeRelatorioTotalAttrIds(payload?.sumOfSumsAttrIds || [], tipoId);
    const sumOfSumsAttrSet = new Set(sumOfSumsAttrIdsEffective);
    const totalFilters = normalizeRelatorioTotalFilters(payload?.totalFilters || [], tipoId);
    const effectiveOrdenacao = normalizeRelatorioOrdenacao(payload?.ordenacao || [], tipoId);

    const columns = attrs.map((a) => a.nome);
    const colSpans = useSavedLayout ? orderedWithFallback.map((x) => clampColSpan(x.colSpan || 6)) : attrs.map(() => 6);
    const docs = state.documentos.filter((d) => d.tipoId === tipoId);
    const filteredDocs = [];
    const rows = [];
    const numeroTotals = attrs.map((attr) => {
      if (attr.tipoCampo !== 'numero' && attr.tipoCampo !== 'currency') return null;
      return totalAttrSet.has(attr.id) ? 0 : null;
    });

    const parseSortableValue = (attr, value) => {
      const raw = String(value ?? '').trim();
      if (!raw) return { empty: true, kind: 'text', value: '' };
      if (attr?.tipoCampo === 'numero' || attr?.tipoCampo === 'currency') {
        const n = parseLocaleNumber(raw);
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
      return parseLocaleNumber(value);
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
    const sumOfSumsValue = somarNumericos && sumOfSumsEnabled
      ? numeroTotals.reduce((acc, total, idx) => {
        const attr = attrs[idx];
        if (!attr || total === null) return acc;
        if (!sumOfSumsAttrSet.has(attr.id)) return acc;
        return acc + Number(total || 0);
      }, 0)
      : null;
    const totalsByKey = new Map<string, number | null>();
    attrs.forEach((attr, idx) => {
      if (attr.tipoCampo !== 'numero' && attr.tipoCampo !== 'currency') return;
      totalsByKey.set(`attr_total:${attr.id}`, numeroTotals[idx] === null ? null : Number(numeroTotals[idx]));
    });
    totalsByKey.set('sum_of_sums', sumOfSumsValue === null ? null : Number(sumOfSumsValue));
    const failedTotalFilters = totalFilters.filter((filter) => (
      !matchesRelatorioTotalFilter(totalsByKey.get(filter.key), filter.operator, filter.value)
    ));
    if (failedTotalFilters.length > 0) {
      relatorioLastResult = {
        tipoId,
        tipoNome: tipoNome(tipoId),
        columns,
        colSpans,
        blockOrder: normalizeRelatorioBlockOrder(cfgBlockOrder || relatorioSavedBlockOrder),
        blockVisibility: normalizeRelatorioBlockVisibility(cfgBlockVisibility || relatorioSavedBlockVisibility, cfgBlockOrder || relatorioSavedBlockOrder),
        blockSpacerHeights: normalizeRelatorioBlockSpacerHeights(cfgBlockSpacerHeights || relatorioSavedBlockSpacerHeights, cfgBlockOrder || relatorioSavedBlockOrder),
        footerMode: (cfgFooterMode || relatorioSavedFooterMode) === 'after_block' ? 'after_block' : 'fixed_bottom',
        footerAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(String(cfgFooterAnchor || relatorioSavedFooterAnchor || ''))
          ? (cfgFooterAnchor || relatorioSavedFooterAnchor)
          : 'tabela',
        totalValues: [],
        rows: [],
      };
      return {
        ok: true,
        result: {
          tipoId,
          tipoNome: tipoNome(tipoId),
          columns,
          colSpans,
          rows: [],
          totalValues: [],
          sumOfSumsValue: '',
          totalsFilterMessage: 'Nenhum resultado atende aos filtros de totais.',
        },
      };
    }

    relatorioLastResult = {
      tipoId,
      tipoNome: tipoNome(tipoId),
      columns,
      colSpans,
      blockOrder: normalizeRelatorioBlockOrder(cfgBlockOrder || relatorioSavedBlockOrder),
      blockVisibility: normalizeRelatorioBlockVisibility(cfgBlockVisibility || relatorioSavedBlockVisibility, cfgBlockOrder || relatorioSavedBlockOrder),
      blockSpacerHeights: normalizeRelatorioBlockSpacerHeights(cfgBlockSpacerHeights || relatorioSavedBlockSpacerHeights, cfgBlockOrder || relatorioSavedBlockOrder),
      footerMode: (cfgFooterMode || relatorioSavedFooterMode) === 'after_block' ? 'after_block' : 'fixed_bottom',
      footerAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(String(cfgFooterAnchor || relatorioSavedFooterAnchor || ''))
        ? (cfgFooterAnchor || relatorioSavedFooterAnchor)
        : 'tabela',
      totalValues,
      rows,
    };

    return {
      ok: true,
      result: {
        tipoId,
        tipoNome: tipoNome(tipoId),
        columns,
        colSpans,
        rows,
        totalValues,
        sumOfSumsValue: sumOfSumsValue === null
          ? ''
          : Number(sumOfSumsValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalsFilterMessage: '',
      },
    };
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') return () => {};
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    };
  }

  (window as any).documentosApp = {
    ...((window as any).documentosApp || {}),
    __emitChange: emitChange,
    subscribe,
    getSnapshot,
    getTipos,
    getSecoes,
    getAtributos,
    getDocumentos,
    getReportTiposData,
    getReportConfigsData,
    getRelatorioAttributeGroups,
    getSecoesForTipo: (tipoId) => getSecoesForTipo(String(tipoId || '')).map((secao) => clone(secao)),
    getAtributosByTipo: (tipoId) => getAtributosByTipo(String(tipoId || '')).map((atributo) => clone(atributo)),
    saveTipo,
    saveSecao,
    saveAtributo,
    saveDocumento,
    saveReportConfig,
    deleteReportConfig,
    generateReport,
    exportRelatorioPdf: () => exportRelatorioPdf(),
    deleteTipo: (tipoId) => deleteTipo(tipoId),
    deleteSecao: (secaoId) => deleteSecao(secaoId),
    deleteAtributo: (atributoId) => deleteAtributo(atributoId),
    deleteDocumento: (documentoId) => deleteDocumento(documentoId),
    focusSecao: (secaoId) => focusSecaoCard(secaoId),
    notify: (message) => notify(message),
  };
})();
