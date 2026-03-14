const STORAGE_KEY = 'documentos_app_v2';
const DOCUMENTO_API_URL = String(window.DOCUMENTO_API_URL || '').trim();
const state = loadState();
const ui = {
    // tipos
    tipoForm: document.getElementById('tipoForm'),
    tipoId: document.getElementById('tipoId'),
    tipoNome: document.getElementById('tipoNome'),
    tipoCabecalho: document.getElementById('tipoCabecalho'),
    tipoRodape: document.getElementById('tipoRodape'),
    tipoCancelBtn: document.getElementById('tipoCancelBtn'),
    tipoOpenModalBtn: document.getElementById('tipoOpenModalBtn'),
    tipoModal: document.getElementById('tipoModal'),
    tipoSecoesWrap: document.getElementById('tipoSecoesWrap'),
    tipoSecoesList: document.getElementById('tipoSecoesList'),
    tiposList: document.getElementById('tiposList'),
    // secoes
    secaoForm: document.getElementById('secaoForm'),
    secaoId: document.getElementById('secaoId'),
    secaoNome: document.getElementById('secaoNome'),
    secaoCabecalho: document.getElementById('secaoCabecalho'),
    secaoRodape: document.getElementById('secaoRodape'),
    secaoCancelBtn: document.getElementById('secaoCancelBtn'),
    secaoOpenModalBtn: document.getElementById('secaoOpenModalBtn'),
    secaoModal: document.getElementById('secaoModal'),
    secoesList: document.getElementById('secoesList'),
    // atributos
    atributoForm: document.getElementById('atributoForm'),
    atributoId: document.getElementById('atributoId'),
    atributoTipo: document.getElementById('atributoTipo'),
    atributoNome: document.getElementById('atributoNome'),
    atributoTipoCampo: document.getElementById('atributoTipoCampo'),
    atributoTemplateWrap: document.getElementById('atributoTemplateWrap'),
    atributoTemplateTexto: document.getElementById('atributoTemplateTexto'),
    atributoSecao: document.getElementById('atributoSecao'),
    atributoValidador: document.getElementById('atributoValidador'),
    atributoPeso: document.getElementById('atributoPeso'),
    atributoMascara: document.getElementById('atributoMascara'),
    atributoCancelBtn: document.getElementById('atributoCancelBtn'),
    atributoOpenModalBtn: document.getElementById('atributoOpenModalBtn'),
    atributoModal: document.getElementById('atributoModal'),
    atributosList: document.getElementById('atributosList'),
    // layout
    layoutTipo: document.getElementById('layoutTipo'),
    layoutSaveBtn: document.getElementById('layoutSaveBtn'),
    layoutResetBtn: document.getElementById('layoutResetBtn'),
    layoutGridEditor: document.getElementById('layoutGridEditor'),
    // documentos
    documentoForm: document.getElementById('documentoForm'),
    documentoId: document.getElementById('documentoId'),
    documentoTitulo: document.getElementById('documentoTitulo'),
    documentoTipo: document.getElementById('documentoTipo'),
    documentoCampos: document.getElementById('documentoCampos'),
    documentoCancelBtn: document.getElementById('documentoCancelBtn'),
    documentoOpenModalBtn: document.getElementById('documentoOpenModalBtn'),
    documentoModal: document.getElementById('documentoModal'),
    documentosList: document.getElementById('documentosList'),
    // relatorios
    relatorioTipo: document.getElementById('relatorioTipo'),
    relatorioConfigNome: document.getElementById('relatorioConfigNome'),
    relatorioConfigSelect: document.getElementById('relatorioConfigSelect'),
    relatorioSalvarConfigBtn: document.getElementById('relatorioSalvarConfigBtn'),
    relatorioSelecionarConfigBtn: document.getElementById('relatorioSelecionarConfigBtn'),
    relatorioExportConfigBtn: document.getElementById('relatorioExportConfigBtn'),
    relatorioConfigDialog: document.getElementById('relatorioConfigDialog'),
    relatorioConfigList: document.getElementById('relatorioConfigList'),
    relatorioDialogCloseBtn: document.getElementById('relatorioDialogCloseBtn'),
    relatorioAtributosWrap: document.getElementById('relatorioAtributosWrap'),
    relatorioFiltroAtributo: document.getElementById('relatorioFiltroAtributo'),
    relatorioFiltroOperador: document.getElementById('relatorioFiltroOperador'),
    relatorioFiltroValor: document.getElementById('relatorioFiltroValor'),
    relatorioOrdenarAtributo: document.getElementById('relatorioOrdenarAtributo'),
    relatorioOrdenarDirecao: document.getElementById('relatorioOrdenarDirecao'),
    relatorioOrdenarAdicionarBtn: document.getElementById('relatorioOrdenarAdicionarBtn'),
    relatorioOrdenacaoLista: document.getElementById('relatorioOrdenacaoLista'),
    relatorioLayoutEditor: document.getElementById('relatorioLayoutEditor'),
    relatorioSalvarLayoutBtn: document.getElementById('relatorioSalvarLayoutBtn'),
    relatorioGerarBtn: document.getElementById('relatorioGerarBtn'),
    relatorioCsvBtn: document.getElementById('relatorioCsvBtn'),
    relatorioPdfBtn: document.getElementById('relatorioPdfBtn'),
    relatorioSomarNumeros: document.getElementById('relatorioSomarNumeros'),
    relatorioResumo: document.getElementById('relatorioResumo'),
    relatorioTabela: document.getElementById('relatorioTabela'),
    relatorioTabelaHead: document.getElementById('relatorioTabelaHead'),
    relatorioTabelaBody: document.getElementById('relatorioTabelaBody'),
    // layout de relatorio (pagina separada)
    relatorioLayoutTipo: document.getElementById('relatorioLayoutTipo'),
    relatorioLayoutConfig: document.getElementById('relatorioLayoutConfig'),
    relatorioLayoutSaveBtn: document.getElementById('relatorioLayoutSaveBtn'),
    relatorioLayoutResetBtn: document.getElementById('relatorioLayoutResetBtn'),
    relatorioLayoutCanvas: document.getElementById('relatorioLayoutCanvas'),
    relatorioLayoutBlockCanvas: document.getElementById('relatorioLayoutBlockCanvas'),
    relatorioLayoutFooterMode: document.getElementById('relatorioLayoutFooterMode'),
    relatorioLayoutFooterAnchor: document.getElementById('relatorioLayoutFooterAnchor'),
};
Object.keys(ui).forEach((key) => {
    if (!ui[key])
        ui[key] = createUiStub();
});
let tempDocumentoValores = {};
let tempDocumentoPdfFlags = {};
let currentLayoutDrag = null;
let focusedSecaoId = null;
let relatorioCurrentLayout = [];
let relatorioSavedLayout = [];
let relatorioLayoutWorking = [];
let relatorioLayoutWorkingConfigId = '';
let relatorioLayoutDragAttrId = '';
let relatorioSavedBlockOrder = [];
let relatorioLayoutBlocksWorking = [];
let relatorioSavedBlockVisibility = {};
let relatorioLayoutBlockVisibilityWorking = {};
let relatorioSavedFooterMode = 'fixed_bottom';
let relatorioSavedFooterAnchor = 'tabela';
let relatorioLayoutFooterModeWorking = 'fixed_bottom';
let relatorioLayoutFooterAnchorWorking = 'tabela';
let relatorioOrdenacaoWorking = [];
let relatorioTotalAttrIdsWorking = [];
let relatorioActiveConfigId = '';
let relatorioLastResult = {
    tipoId: '',
    tipoNome: '',
    columns: [],
    colSpans: [],
    blockOrder: [],
    blockVisibility: {},
    footerMode: 'fixed_bottom',
    footerAnchor: 'tabela',
    incluirCabecalho: false,
    incluirRodape: false,
    totalValues: [],
    rows: [],
};
bindEvents();
renderAll();
initRouting();
openPendingEditFromUrl();
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
            }
            catch (err) {
                console.warn('[mui-bridge] listener failed', err);
            }
        });
    }
    function getTipos() {
        return state.tipos.map((tipo) => ({
            ...clone(tipo),
            secoes: getSecoesForTipo(tipo.id).map((secao) => clone(secao)),
        }));
    }
    function getSecoes() {
        return state.secoes.map((secao) => clone(secao));
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
        const validSecaoIds = requestedSecaoIds.filter((id, index) => (state.secoes.some((secao) => secao.id === id) && requestedSecaoIds.indexOf(id) === index));
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
        }
        else {
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
    function subscribe(listener) {
        if (typeof listener !== 'function')
            return () => { };
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index >= 0)
                listeners.splice(index, 1);
        };
    }
    window.documentosApp = {
        ...(window.documentosApp || {}),
        __emitChange: emitChange,
        subscribe,
        getTipos,
        getSecoes,
        saveTipo,
        deleteTipo: (tipoId) => deleteTipo(tipoId),
        focusSecao: (secaoId) => focusSecaoCard(secaoId),
        notify: (message) => notify(message),
    };
})();
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
// @ts-nocheck
function applyDocumentoFieldErrors(errors) {
    for (const error of errors) {
        const field = document.getElementById(`campo_${error.attrId}`);
        if (!field)
            continue;
        markFieldError(field, error.message);
    }
}
// @ts-nocheck
function applyMask(value, mask) {
    const payload = extractMaskPayload(String(value), mask);
    let out = '';
    let index = 0;
    for (const ch of mask) {
        if (ch === '9') {
            if (index >= payload.length)
                break;
            out += payload[index++];
            continue;
        }
        if (payload.length > 0)
            out += ch;
    }
    return out;
}
// @ts-nocheck
function applyPlaceholderTemplate(text, ctx) {
    return String(text ?? '').replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_full, token) => {
        const key = normalizePlaceholderKey(token);
        if (ctx.has(key))
            return ctx.get(key) ?? '';
        if (key === 'data' || key === 'data_atual')
            return formatCurrentDateBr();
        return '';
    });
}
// @ts-nocheck
function applyRelatorioConfig(config) {
    if (!config)
        return;
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
    relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(Array.isArray(config.ordenacao) && config.ordenacao.length
        ? config.ordenacao
        : (config.ordenarAttrId ? [{ attrId: config.ordenarAttrId, direcao: config.ordenarDirecao || 'asc' }] : []), config.tipoId);
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
// @ts-nocheck
function bindEvents() {
    ui.tipoForm.addEventListener('submit', onTipoSubmit);
    ui.tipoCancelBtn.addEventListener('click', resetTipoForm);
    ui.tipoOpenModalBtn.addEventListener('click', () => openAppModal(ui.tipoModal));
    ui.secaoForm.addEventListener('submit', onSecaoSubmit);
    ui.secaoCancelBtn.addEventListener('click', resetSecaoForm);
    ui.secaoOpenModalBtn.addEventListener('click', () => openAppModal(ui.secaoModal));
    ui.atributoForm.addEventListener('submit', onAtributoSubmit);
    ui.atributoTipo.addEventListener('change', () => {
        renderSecaoOptions();
        renderAtributos();
        refreshMaterializeUI();
    });
    ui.atributoTipoCampo.addEventListener('change', toggleAtributoTemplateConfig);
    ui.atributoCancelBtn.addEventListener('click', resetAtributoForm);
    ui.atributoOpenModalBtn.addEventListener('click', () => openAppModal(ui.atributoModal));
    ui.layoutTipo.addEventListener('change', renderLayoutEditor);
    ui.layoutSaveBtn.addEventListener('click', saveLayoutForSelectedTipo);
    ui.layoutResetBtn.addEventListener('click', resetLayoutForSelectedTipo);
    ui.documentoForm.addEventListener('submit', onDocumentoSubmit);
    ui.documentoTipo.addEventListener('change', onDocumentoTipoChange);
    ui.documentoCancelBtn.addEventListener('click', resetDocumentoForm);
    ui.documentoOpenModalBtn.addEventListener('click', () => openAppModal(ui.documentoModal));
    ui.documentoTitulo.addEventListener('input', () => clearFieldError(ui.documentoTitulo));
    ui.documentoTipo.addEventListener('change', () => clearFieldError(ui.documentoTipo));
    ui.documentoForm.addEventListener('input', () => refreshTemplatePreviews());
    ui.documentoForm.addEventListener('change', () => refreshTemplatePreviews());
    ui.relatorioTipo.addEventListener('change', onRelatorioTipoChange);
    ui.relatorioConfigSelect.addEventListener('change', onRelatorioConfigSelectChange);
    ui.relatorioSalvarConfigBtn.addEventListener('click', saveRelatorioConfig);
    ui.relatorioSelecionarConfigBtn.addEventListener('click', openRelatorioConfigDialog);
    ui.relatorioExportConfigBtn.addEventListener('click', exportRelatorioConfigJson);
    ui.relatorioDialogCloseBtn.addEventListener('click', closeRelatorioConfigDialog);
    ui.relatorioSalvarLayoutBtn.addEventListener('click', saveRelatorioLayout);
    ui.relatorioGerarBtn.addEventListener('click', generateRelatorio);
    ui.relatorioCsvBtn.addEventListener('click', exportRelatorioCsv);
    ui.relatorioPdfBtn.addEventListener('click', exportRelatorioPdf);
    ui.relatorioOrdenarAdicionarBtn.addEventListener('click', onRelatorioAdicionarOrdenacao);
    ui.relatorioLayoutTipo.addEventListener('change', onRelatorioLayoutTipoChange);
    ui.relatorioLayoutConfig.addEventListener('change', onRelatorioLayoutConfigChange);
    ui.relatorioLayoutSaveBtn.addEventListener('click', saveRelatorioLayoutEditorConfig);
    ui.relatorioLayoutResetBtn.addEventListener('click', resetRelatorioLayoutEditorConfig);
    window.addEventListener('hashchange', syncTabFromRoute);
    document.querySelectorAll('.tabs .tab a').forEach((link) => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#'))
                history.replaceState(null, '', href);
        });
    });
}
// @ts-nocheck
function buildDocumentoEstruturaPayload(savedDoc) {
    const placeholderCtx = buildHeaderFooterPlaceholderContext(savedDoc.tipoId, savedDoc.valores, savedDoc.titulo);
    const secoesEstruturadas = buildSectionGroupsForTipo(savedDoc.tipoId, { includeEmptySections: true }).map((group) => ({
        key: group.key,
        nome: group.nome,
        atributos: group.items.map((item) => {
            const attr = item.attr;
            const raw = savedDoc.valores[attr.id];
            return {
                id: attr.id,
                nome: attr.nome,
                tipoCampo: attr.tipoCampo,
                secaoId: attr.secaoId || '',
                colSpan: item.colSpan,
                pdfVisivel: savedDoc.pdfVisivel[attr.id] !== false,
                valorBruto: raw ?? '',
                valorRenderizado: resolveAttrValueForOutput(attr, raw, placeholderCtx),
            };
        }),
    }));
    return {
        documento: savedDoc,
        tipo: state.tipos.find((t) => t.id === savedDoc.tipoId) || null,
        secoes: getSecoesForTipo(savedDoc.tipoId),
        atributos: getAtributosByTipo(savedDoc.tipoId),
        layout: state.layouts[savedDoc.tipoId] || [],
        layoutSections: state.layoutSections[savedDoc.tipoId] || [],
        estruturaPorSecao: secoesEstruturadas,
    };
}
// @ts-nocheck
function buildHeaderFooterPlaceholderContext(tipoId, valores, titulo = '') {
    const ctx = buildPlaceholderContext(tipoId, valores, titulo);
    const today = formatCurrentDateBr();
    const put = (key, value) => {
        const normalized = normalizePlaceholderKey(key);
        if (!normalized)
            return;
        ctx.set(normalized, String(value ?? ''));
    };
    put('data', today);
    put('data_atual', today);
    return ctx;
}
// @ts-nocheck
function buildInput(attr, id, value) {
    let input = document.createElement('input');
    input.id = id;
    if (attr.tipoCampo === 'boolean') {
        input.type = 'checkbox';
        input.checked = Boolean(value);
        input.addEventListener('change', () => clearFieldError(input));
        return input;
    }
    if (attr.tipoCampo === 'textarea') {
        input = document.createElement('textarea');
        input.id = id;
        input.className = 'materialize-textarea';
        input.value = String(value || '');
        input.addEventListener('input', () => clearFieldError(input));
        input.addEventListener('change', () => clearFieldError(input));
        return input;
    }
    if (attr.tipoCampo === 'textarea_template') {
        input = document.createElement('textarea');
        input.id = id;
        input.className = 'materialize-textarea';
        input.value = String(value || '');
        input.dataset.templatePreview = '1';
        input.dataset.templateKind = 'textarea';
        input.addEventListener('input', () => clearFieldError(input));
        input.addEventListener('change', () => clearFieldError(input));
        return input;
    }
    if (attr.tipoCampo === 'texto_placeholder') {
        input = document.createElement('textarea');
        input.id = id;
        input.className = 'materialize-textarea';
        input.value = String(value || attr.templateTexto || '');
        input.dataset.templatePreview = '1';
        input.dataset.templateKind = 'textarea';
        input.dataset.templateDefault = String(attr.templateTexto || '');
        input.addEventListener('input', () => clearFieldError(input));
        input.addEventListener('change', () => clearFieldError(input));
        return input;
    }
    if (attr.tipoCampo === 'assinatura') {
        input.type = 'text';
        input.value = String(value || '');
        input.addEventListener('input', () => clearFieldError(input));
        input.addEventListener('change', () => clearFieldError(input));
        return input;
    }
    if (attr.mascara) {
        input.type = 'text';
        input.value = applyMask(String(value), attr.mascara);
        input.addEventListener('input', () => {
            input.value = applyMask(input.value, attr.mascara);
            clearFieldError(input);
        });
        input.addEventListener('change', () => clearFieldError(input));
        return input;
    }
    if (attr.tipoCampo === 'numero')
        input.type = 'number';
    else if (attr.tipoCampo === 'data')
        input.type = 'date';
    else
        input.type = 'text';
    input.value = String(value);
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
    return input;
}
// @ts-nocheck
function buildPdfPalette() {
    return {
        tealHeader: [0, 121, 107],
        textMain: [38, 50, 56],
        textMuted: [96, 125, 139],
        textLight: [120, 144, 156],
        cardBorder: [223, 229, 232],
        cardBg: [255, 255, 255],
        chipBg: [250, 252, 253],
    };
}
// @ts-nocheck
function buildPlaceholderContext(tipoId, valores, titulo = '') {
    const ctx = new Map();
    const attrs = getAtributosByTipo(tipoId);
    const put = (key, value) => {
        const normalized = normalizePlaceholderKey(key);
        if (!normalized)
            return;
        ctx.set(normalized, String(value ?? ''));
    };
    put('titulo', titulo);
    put('documento_titulo', titulo);
    for (const attr of attrs) {
        const raw = valores[attr.id];
        const value = attr.tipoCampo === 'boolean' ? (raw ? 'Sim' : 'Nao') : raw ?? '';
        put(attr.id, value);
        put(attr.nome, value);
    }
    // Resolve template-based attributes in multiple passes so references across
    // template fields stabilize before PDF/header/footer rendering.
    const templateAttrs = attrs.filter((attr) => attr.tipoCampo === 'texto_placeholder' || attr.tipoCampo === 'textarea_template');
    for (let pass = 0; pass < 3; pass += 1) {
        for (const attr of templateAttrs) {
            const raw = valores[attr.id];
            const base = raw === undefined || raw === null || raw === ''
                ? (attr.tipoCampo === 'texto_placeholder' ? attr.templateTexto || '' : '')
                : raw;
            const resolved = resolveTemplateTextForOutput(base, ctx);
            put(attr.id, resolved);
            put(attr.nome, resolved);
        }
    }
    return ctx;
}
// @ts-nocheck
function buildPreview(doc) {
    const attrs = state.atributos.filter((a) => a.tipoId === doc.tipoId).slice(0, 3);
    if (attrs.length === 0)
        return 'Sem atributos';
    const ctx = buildPlaceholderContext(doc.tipoId, doc.valores, doc.titulo);
    const maxFieldText = 42;
    const maxPreviewText = 170;
    const truncate = (value, max) => {
        const text = String(value ?? '');
        if (text.length <= max)
            return text;
        return `${text.slice(0, Math.max(0, max - 3))}...`;
    };
    const preview = attrs
        .map((a) => {
        const raw = doc.valores[a.id];
        const val = truncate(resolveAttrValueForOutput(a, raw, ctx), maxFieldText);
        return `${truncate(a.nome, 26)}: ${val}`;
    })
        .join(' | ');
    return truncate(preview, maxPreviewText);
}
// @ts-nocheck
function buildRelatorioLayoutWorkingFromConfig(tipoId, configId) {
    const config = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
    if (!config)
        return [];
    const attrs = getAtributosByTipo(tipoId);
    const attrById = new Map(attrs.map((a) => [a.id, a]));
    const selected = Array.isArray(config.selectedAttrIds) ? config.selectedAttrIds.filter((id) => attrById.has(id)) : [];
    const base = Array.isArray(config.reportLayout)
        ? config.reportLayout.filter((x) => selected.includes(x.attrId)).map((x) => ({
            attrId: x.attrId,
            colSpan: clampColSpan(x.colSpan || 6),
        }))
        : [];
    const inBase = new Set(base.map((x) => x.attrId));
    for (const id of selected) {
        if (inBase.has(id))
            continue;
        base.push({ attrId: id, colSpan: 6 });
    }
    return base;
}
function buildSectionGroupsForTipo(tipoId, options = {}) {
    const { includeEmptySections = false } = options;
    const attrs = getAtributosByTipo(tipoId);
    const layoutItems = syncLayoutsForTipo(tipoId);
    const sectionOrder = syncLayoutSectionsForTipo(tipoId);
    const attrById = new Map(attrs.map((a) => [a.id, a]));
    const groups = new Map();
    for (const key of sectionOrder) {
        groups.set(key, { key, nome: sectionNameFromKey(key), items: [] });
    }
    for (const item of layoutItems) {
        const attr = attrById.get(item.attrId);
        if (!attr)
            continue;
        const key = sectionKeyFromAttr(attr);
        if (!groups.has(key))
            groups.set(key, { key, nome: sectionNameFromKey(key), items: [] });
        groups.get(key).items.push({
            attr,
            colSpan: clampColSpan(item.colSpan),
        });
    }
    const ordered = sectionOrder
        .map((key) => groups.get(key))
        .filter((g) => g && (includeEmptySections || g.items.length > 0));
    const extra = Array.from(groups.values()).filter((g) => !sectionOrder.includes(g.key) && (includeEmptySections || g.items.length > 0));
    extra.sort((a, b) => a.nome.localeCompare(b.nome));
    return [...ordered, ...extra];
}
// @ts-nocheck
function clampColSpan(value) {
    const n = Number(value);
    if (!Number.isFinite(n))
        return 6;
    return Math.max(1, Math.min(12, Math.round(n)));
}
// @ts-nocheck
function clampRelatorioSpacerHeight(value) {
    const n = Number(value);
    if (!Number.isFinite(n))
        return 24;
    return Math.max(4, Math.min(240, Math.floor(n)));
}
// @ts-nocheck
function clearDocumentoFieldErrors() {
    clearFieldError(ui.documentoTitulo);
    clearFieldError(ui.documentoTipo);
    ui.documentoForm
        .querySelectorAll('#documentoCampos input, #documentoCampos select')
        .forEach((field) => clearFieldError(field));
}
// @ts-nocheck
function clearFieldError(field) {
    if (!field)
        return;
    const target = getDisplayTarget(field);
    target.classList.remove('app-invalid');
    const container = field.closest('.input-field') || field.closest('.doc-field-label');
    if (!container)
        return;
    container.classList.remove('app-field-has-error');
    const messageEl = container.querySelector('.field-error-text');
    if (messageEl)
        messageEl.remove();
}
// @ts-nocheck
function closeAppModal(modalEl) {
    if (!modalEl)
        return;
    try {
        if (window.M && M.Modal) {
            const instance = M.Modal.getInstance(modalEl);
            if (instance && instance.close) {
                instance.close();
                return;
            }
        }
    }
    catch { }
    modalEl.classList.remove('open');
    modalEl.style.display = 'none';
    modalEl.setAttribute('aria-hidden', 'true');
}
// @ts-nocheck
function closeRelatorioConfigDialog() {
    const dialog = ui.relatorioConfigDialog;
    if (!dialog || typeof dialog.close !== 'function')
        return;
    if (dialog.open)
        dialog.close();
}
function collectDocumentoCampos() {
    const tipoId = ui.documentoTipo.value;
    if (!tipoId)
        return {};
    const atributos = state.atributos.filter((a) => a.tipoId === tipoId);
    const valores = {};
    for (const attr of atributos) {
        const el = document.getElementById(`campo_${attr.id}`);
        if (!el)
            continue;
        valores[attr.id] = attr.tipoCampo === 'boolean' ? el.checked : el.value;
    }
    return valores;
}
function collectDocumentoPdfFlags() {
    const tipoId = ui.documentoTipo.value;
    if (!tipoId)
        return {};
    const atributos = getAtributosByTipo(tipoId);
    const flags = {};
    for (const attr of atributos) {
        const el = document.getElementById(`campo_pdf_${attr.id}`);
        flags[attr.id] = el ? Boolean(el.checked) : true;
    }
    return flags;
}
// Render
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
// @ts-nocheck
function createUiStub() {
    const stub = {
        value: '',
        checked: false,
        innerHTML: '',
        textContent: '',
        style: {},
        dataset: {},
        className: '',
        classList: {
            add() { },
            remove() { },
            contains() { return false; },
        },
        addEventListener() { },
        removeEventListener() { },
        appendChild() { },
        remove() { },
        setAttribute() { },
        getAttribute() { return ''; },
        querySelector() { return createUiStub(); },
        querySelectorAll() { return []; },
        closest() { return null; },
        focus() { },
        scrollIntoView() { },
    };
    return stub;
}
// @ts-nocheck
function defaultColSpanForAttr(attr) {
    if (attr.tipoCampo === 'assinatura')
        return 12;
    if (attr.tipoCampo === 'boolean')
        return 4;
    if (attr.tipoCampo === 'data')
        return 4;
    if (attr.tipoCampo === 'numero')
        return 4;
    return 6;
}
// @ts-nocheck
function defaultRelatorioBlockOrder() {
    return ['cabecalho', 'info_geracao', 'tabela', 'rodape'];
}
// @ts-nocheck
function deleteAtributo(attrId) {
    state.atributos = state.atributos.filter((a) => a.id !== attrId);
    Object.keys(state.layouts || {}).forEach((tipoId) => syncLayoutsForTipo(tipoId));
    for (const doc of state.documentos) {
        delete doc.valores[attrId];
    }
    saveState();
    renderAll();
}
// @ts-nocheck
function deleteDocumento(docId) {
    state.documentos = state.documentos.filter((d) => d.id !== docId);
    saveState();
    renderAll();
}
// @ts-nocheck
function deleteSecao(secaoId) {
    const usedByAttr = state.atributos.some((a) => a.secaoId === secaoId);
    if (usedByAttr) {
        notify('Nao pode remover secao em uso por atributos.');
        return;
    }
    state.secoes = state.secoes.filter((s) => s.id !== secaoId);
    Object.keys(state.tipoSecoes || {}).forEach((tipoId) => {
        state.tipoSecoes[tipoId] = (state.tipoSecoes[tipoId] || []).filter((id) => id !== secaoId);
    });
    saveState();
    renderAll();
}
// @ts-nocheck
function deleteTipo(tipoId) {
    const hasAttrs = state.atributos.some((a) => a.tipoId === tipoId);
    const hasDocs = state.documentos.some((d) => d.tipoId === tipoId);
    if (hasAttrs || hasDocs) {
        notify('Nao pode excluir tipo em uso por atributos/documentos.');
        return;
    }
    state.tipos = state.tipos.filter((t) => t.id !== tipoId);
    delete state.layouts[tipoId];
    delete state.layoutSections[tipoId];
    delete state.tipoSecoes[tipoId];
    if (ui.atributoTipo.value === tipoId)
        ui.atributoTipo.value = '';
    if (ui.documentoTipo.value === tipoId)
        ui.documentoTipo.value = '';
    if (ui.layoutTipo.value === tipoId)
        ui.layoutTipo.value = '';
    saveState();
    renderAll();
}
// @ts-nocheck
function editAtributo(attrId) {
    const attr = state.atributos.find((a) => a.id === attrId);
    if (!attr)
        return;
    ui.atributoId.value = attr.id;
    ui.atributoTipo.value = attr.tipoId;
    renderSecaoOptions();
    ui.atributoNome.value = attr.nome;
    ui.atributoTipoCampo.value = attr.tipoCampo;
    ui.atributoSecao.value = attr.secaoId || '';
    ui.atributoValidador.value = attr.validador || '';
    ui.atributoPeso.value = attr.peso ?? '';
    ui.atributoMascara.value = attr.mascara || '';
    ui.atributoTemplateTexto.value = attr.templateTexto || '';
    toggleAtributoTemplateConfig();
    refreshMaterializeUI();
    renderAtributos();
    openAppModal(ui.atributoModal);
}
// @ts-nocheck
function editDocumento(docId) {
    const doc = state.documentos.find((d) => d.id === docId);
    if (!doc)
        return;
    ui.documentoId.value = doc.id;
    ui.documentoTitulo.value = doc.titulo;
    ui.documentoTipo.value = doc.tipoId;
    tempDocumentoValores = { ...doc.valores };
    tempDocumentoPdfFlags = { ...(doc.pdfVisivel || {}) };
    refreshMaterializeUI();
    renderDocumentoCampos();
    refreshMaterializeUI();
    openAppModal(ui.documentoModal);
}
// @ts-nocheck
function editSecao(secaoId) {
    const sec = state.secoes.find((s) => s.id === secaoId);
    if (!sec)
        return;
    ui.secaoId.value = sec.id;
    ui.secaoNome.value = sec.nome;
    ui.secaoCabecalho.value = sec.cabecalho || '';
    ui.secaoRodape.value = sec.rodape || '';
    refreshMaterializeUI();
    openAppModal(ui.secaoModal);
}
// @ts-nocheck
function editTipo(tipoId) {
    const tipo = state.tipos.find((t) => t.id === tipoId);
    if (!tipo)
        return;
    ui.tipoId.value = tipo.id;
    ui.tipoNome.value = tipo.nome;
    ui.tipoCabecalho.value = tipo.cabecalho || '';
    ui.tipoRodape.value = tipo.rodape || '';
    renderTipoSecoes();
    refreshMaterializeUI();
    openAppModal(ui.tipoModal);
}
// @ts-nocheck
function escapeCsvValue(value) {
    const text = String(value ?? '');
    if (!/[";,\n]/.test(text))
        return text;
    return `"${text.replace(/"/g, '""')}"`;
}
// @ts-nocheck
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
// @ts-nocheck
function exportDocumentoPdf(docId) {
    const lib = window.jspdf;
    if (!lib || !lib.jsPDF) {
        notify('Biblioteca de PDF nao carregada.');
        return;
    }
    const documento = state.documentos.find((d) => d.id === docId);
    if (!documento) {
        notify('Documento nao encontrado.');
        return;
    }
    const pdfVisivel = documento.pdfVisivel && typeof documento.pdfVisivel === 'object'
        ? documento.pdfVisivel
        : {};
    const tipo = state.tipos.find((t) => t.id === documento.tipoId) || null;
    const placeholderCtx = buildHeaderFooterPlaceholderContext(documento.tipoId, documento.valores, documento.titulo);
    const tipoCabecalho = resolveTemplateTextForOutput(tipo?.cabecalho || '', placeholderCtx).trim();
    const tipoRodape = resolveTemplateTextForOutput(tipo?.rodape || '', placeholderCtx).trim();
    const pdf = new lib.jsPDF({ unit: 'pt', format: 'a4' });
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 40;
    const contentWidth = pageWidth - margin * 2;
    const palette = buildPdfPalette();
    let y = margin;
    const ensureSpace = (required = 20) => {
        if (y + required <= pageHeight - margin)
            return;
        pdf.addPage();
        y = margin;
    };
    const addText = (text, options = {}) => {
        const { size = 11, bold = false, gap = 16 } = options;
        pdf.setFont('helvetica', bold ? 'bold' : 'normal');
        pdf.setFontSize(size);
        const lines = pdf.splitTextToSize(String(text), contentWidth);
        ensureSpace(lines.length * gap + 4);
        pdf.text(lines, margin, y);
        y += lines.length * gap;
    };
    const headerContent = tipoCabecalho
        ? `${tipoNome(documento.tipoId)}\n${tipoCabecalho}`
        : tipoNome(documento.tipoId);
    const headerTextLines = pdf.splitTextToSize(headerContent, contentWidth - 28);
    const headerHeight = Math.max(56, 18 + headerTextLines.length * 13);
    pdf.setFillColor(...palette.tealHeader);
    pdf.roundedRect(margin, y, contentWidth, headerHeight, 6, 6, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12.5);
    pdf.setTextColor(255, 255, 255);
    pdf.text(headerTextLines, margin + 14, y + 23);
    y += headerHeight + 14;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...palette.textMain);
    addText(`Titulo: ${documento.titulo}`, { size: 12, bold: true });
    y += 8;
    const sectionResult = renderPdfSectionTables({
        pdf,
        documento,
        pdfVisivel,
        placeholderCtx,
        palette,
        margin,
        contentWidth,
        pageHeight,
        startY: y,
    });
    y = sectionResult.y;
    if (sectionResult.signatureAttrs.length > 0) {
        y = renderPdfSignatureBlocks({
            pdf,
            documento,
            signatureAttrs: sectionResult.signatureAttrs,
            tipoRodape,
            palette,
            margin,
            contentWidth,
            pageHeight,
            pageWidth,
            startY: y,
        });
    }
    y = renderPdfTipoFooter({
        pdf,
        tipoRodape,
        palette,
        margin,
        contentWidth,
        pageHeight,
        currentY: y,
    });
    const safeTitle = String(documento.titulo || 'documento')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_]+/g, '_')
        .replace(/^_+|_+$/g, '');
    pdf.save(`${safeTitle || 'documento'}.pdf`);
}
// @ts-nocheck
function exportRelatorioConfigJson() {
    const cfg = collectRelatorioConfig();
    if (!cfg.tipoId) {
        notify('Selecione um tipo para exportar a configuracao.');
        return;
    }
    if (!cfg.nome)
        cfg.nome = `config_${tipoNome(cfg.tipoId)}`;
    const payload = {
        exportedAt: new Date().toISOString(),
        config: cfg,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${String(cfg.nome).replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
// @ts-nocheck
function exportRelatorioCsv() {
    const { columns, rows, tipoNome, totalValues } = relatorioLastResult;
    if (!columns.length) {
        notify('Gere o relatorio antes de exportar CSV.');
        return;
    }
    const hasTotal = Array.isArray(totalValues) && totalValues.some((v) => String(v || '').trim() !== '');
    const totalRow = hasTotal
        ? columns.map((_, idx) => {
            const value = String(totalValues[idx] || '');
            const labelIndex = columns.findIndex((__, i) => String(totalValues[i] || '').trim() === '');
            return labelIndex === idx ? 'Total' : value;
        })
        : null;
    const lines = [
        columns.map((col) => escapeCsvValue(col)).join(';'),
        ...rows.map((row) => row.map((value) => escapeCsvValue(value)).join(';')),
        ...(totalRow ? [totalRow.map((value) => escapeCsvValue(value)).join(';')] : []),
    ];
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${String(tipoNome || 'documentos').replace(/\s+/g, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
// @ts-nocheck
function exportRelatorioPdf() {
    const { tipoId, columns, rows, tipoNome, colSpans, blockOrder, blockVisibility, footerMode, footerAnchor, totalValues } = relatorioLastResult;
    if (!columns.length) {
        notify('Gere o relatorio antes de exportar PDF.');
        return;
    }
    const lib = window.jspdf;
    if (!lib || !lib.jsPDF) {
        notify('Biblioteca de PDF nao carregada.');
        return;
    }
    const pdf = new lib.jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 36;
    const tableWidth = pageWidth - margin * 2;
    const resolvedTipoId = ui.relatorioTipo.value || tipoId;
    const tipo = state.tipos.find((t) => t.id === resolvedTipoId) || null;
    const headerFooterCtx = buildHeaderFooterPlaceholderContext(resolvedTipoId, {}, tipoNome || '');
    const tipoCabecalho = resolveTemplateTextForOutput(String(tipo?.cabecalho || ''), headerFooterCtx).trim();
    const tipoRodape = resolveTemplateTextForOutput(String(tipo?.rodape || ''), headerFooterCtx).trim();
    const resolvedBlockOrder = normalizeRelatorioBlockOrder(blockOrder);
    const resolvedBlockVisibility = normalizeRelatorioBlockVisibility(blockVisibility);
    const resolvedFooterMode = footerMode === 'after_block' ? 'after_block' : 'fixed_bottom';
    const resolvedFooterAnchor = ['cabecalho', 'info_geracao', 'tabela'].includes(String(footerAnchor || ''))
        ? String(footerAnchor)
        : 'tabela';
    let y = margin;
    const pageBottomLimit = pageHeight - margin;
    const addPageIfNeeded = (requiredHeight) => {
        if (y + requiredHeight <= pageBottomLimit)
            return;
        pdf.addPage();
        y = margin;
    };
    const footerSize = 9.5;
    const footerGap = 11;
    const bottomOffset = 8;
    const renderFooterFlow = () => {
        if (!tipoRodape || resolvedBlockVisibility.rodape === false)
            return false;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(footerSize);
        pdf.setTextColor(120, 144, 156);
        const footerLines = pdf.splitTextToSize(tipoRodape, tableWidth);
        addPageIfNeeded(Math.max(14, footerLines.length * footerGap) + 6);
        pdf.text(footerLines, margin, y);
        y += Math.max(14, footerLines.length * footerGap) + 4;
        return true;
    };
    const renderFooterBottom = () => {
        if (!tipoRodape || resolvedBlockVisibility.rodape === false)
            return;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(footerSize);
        pdf.setTextColor(90, 110, 120);
        const footerLines = pdf.splitTextToSize(tipoRodape, tableWidth);
        const safeBottomBaseline = pageHeight - Math.max(bottomOffset, 14);
        let footerStartY = safeBottomBaseline - (Math.max(footerLines.length, 1) - 1) * footerGap;
        if (y + 10 > footerStartY) {
            pdf.addPage();
            y = margin;
            footerStartY = safeBottomBaseline - (Math.max(footerLines.length, 1) - 1) * footerGap;
        }
        pdf.text(footerLines, margin, footerStartY);
    };
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(38, 50, 56);
    pdf.text(`Relatorio - ${tipoNome || 'Documentos'}`, margin, y);
    y += 18;
    const colCount = Math.max(1, columns.length);
    const spans = Array.isArray(colSpans) && colSpans.length === colCount
        ? colSpans.map((x) => Math.max(1, Number(x || 1)))
        : columns.map(() => 1);
    const totalSpan = spans.reduce((sum, x) => sum + x, 0);
    const colWidths = spans.map((s) => (s / totalSpan) * tableWidth);
    const colStarts = [];
    let accX = margin;
    for (let i = 0; i < colWidths.length; i += 1) {
        colStarts.push(accX);
        accX += colWidths[i];
    }
    const headerHeight = 20;
    const lineHeight = 10;
    const rowPadY = 5;
    const renderTableHeader = () => {
        addPageIfNeeded(headerHeight + 8);
        pdf.setDrawColor(223, 229, 232);
        pdf.setFillColor(250, 252, 253);
        pdf.rect(margin, y, tableWidth, headerHeight, 'FD');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(38, 50, 56);
        for (let i = 0; i < colCount; i += 1) {
            const x = colStarts[i];
            const width = colWidths[i];
            if (i > 0)
                pdf.line(x, y, x, y + headerHeight);
            const text = String(columns[i] || '');
            const lines = pdf.splitTextToSize(text, Math.max(20, width - 8));
            pdf.text(lines[0] || '', x + 4, y + 13);
        }
        y += headerHeight;
    };
    let footerFlowRendered = false;
    for (const blockKey of resolvedBlockOrder) {
        if (blockKey === 'rodape')
            continue;
        if (blockKey === 'cabecalho') {
            if (resolvedBlockVisibility[blockKey] === false)
                continue;
            if (!tipoCabecalho)
                continue;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10.5);
            pdf.setTextColor(69, 90, 100);
            const headerLines = pdf.splitTextToSize(tipoCabecalho, tableWidth);
            addPageIfNeeded(Math.max(14, headerLines.length * 12) + 8);
            pdf.text(headerLines, margin, y);
            y += Math.max(14, headerLines.length * 12) + 6;
            if (!footerFlowRendered && resolvedFooterMode === 'after_block' && resolvedFooterAnchor === blockKey) {
                footerFlowRendered = renderFooterFlow();
            }
            continue;
        }
        if (blockKey === 'info_geracao') {
            if (resolvedBlockVisibility[blockKey] === false)
                continue;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(96, 125, 139);
            const info = `Gerado em: ${formatCurrentDateBr()}  |  Registros: ${rows.length}`;
            addPageIfNeeded(18);
            pdf.text(info, margin, y);
            y += 16;
            if (!footerFlowRendered && resolvedFooterMode === 'after_block' && resolvedFooterAnchor === blockKey) {
                footerFlowRendered = renderFooterFlow();
            }
            continue;
        }
        if (blockKey === 'tabela') {
            if (resolvedBlockVisibility[blockKey] === false)
                continue;
            renderTableHeader();
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.8);
            pdf.setTextColor(69, 90, 100);
            for (const row of rows) {
                const cellLines = [];
                let maxLines = 1;
                for (let i = 0; i < colCount; i += 1) {
                    const text = String(row[i] ?? '');
                    const lines = pdf.splitTextToSize(text, Math.max(20, colWidths[i] - 8));
                    cellLines.push(lines);
                    if (lines.length > maxLines)
                        maxLines = lines.length;
                }
                const rowHeight = maxLines * lineHeight + rowPadY * 2;
                addPageIfNeeded(rowHeight + 2);
                if (y === margin)
                    renderTableHeader();
                pdf.setDrawColor(223, 229, 232);
                pdf.rect(margin, y, tableWidth, rowHeight);
                for (let i = 0; i < colCount; i += 1) {
                    const x = colStarts[i];
                    if (i > 0)
                        pdf.line(x, y, x, y + rowHeight);
                    const lines = cellLines[i];
                    let ty = y + rowPadY + 8;
                    for (const line of lines) {
                        pdf.text(line, x + 4, ty);
                        ty += lineHeight;
                    }
                }
                y += rowHeight;
            }
            const hasTotal = Array.isArray(totalValues) && totalValues.some((v) => String(v || '').trim() !== '');
            if (hasTotal) {
                const labelIndex = columns.findIndex((_, idx) => String(totalValues[idx] || '').trim() === '');
                const totalRow = columns.map((_, idx) => (labelIndex === idx ? 'Total' : String(totalValues[idx] || '')));
                const totalCellLines = [];
                let totalMaxLines = 1;
                for (let i = 0; i < colCount; i += 1) {
                    const text = String(totalRow[i] ?? '');
                    const lines = pdf.splitTextToSize(text, Math.max(20, colWidths[i] - 8));
                    totalCellLines.push(lines);
                    if (lines.length > totalMaxLines)
                        totalMaxLines = lines.length;
                }
                const totalRowHeight = totalMaxLines * lineHeight + rowPadY * 2;
                addPageIfNeeded(totalRowHeight + 2);
                if (y === margin)
                    renderTableHeader();
                pdf.setDrawColor(223, 229, 232);
                pdf.setFillColor(244, 248, 250);
                pdf.rect(margin, y, tableWidth, totalRowHeight, 'FD');
                pdf.setFont('helvetica', 'bold');
                for (let i = 0; i < colCount; i += 1) {
                    const x = colStarts[i];
                    if (i > 0)
                        pdf.line(x, y, x, y + totalRowHeight);
                    const lines = totalCellLines[i];
                    let ty = y + rowPadY + 8;
                    for (const line of lines) {
                        pdf.text(line, x + 4, ty);
                        ty += lineHeight;
                    }
                }
                pdf.setFont('helvetica', 'normal');
                y += totalRowHeight;
            }
            y += 6;
            if (!footerFlowRendered && resolvedFooterMode === 'after_block' && resolvedFooterAnchor === blockKey) {
                footerFlowRendered = renderFooterFlow();
            }
            continue;
        }
    }
    if (resolvedFooterMode === 'after_block' && !footerFlowRendered) {
        renderFooterFlow();
    }
    if (resolvedFooterMode === 'fixed_bottom') {
        renderFooterBottom();
    }
    const safeName = String(tipoNome || 'documentos')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toLowerCase();
    pdf.save(`relatorio_${safeName || 'documentos'}.pdf`);
}
// @ts-nocheck
function extractMaskPayload(value, mask) {
    const literals = new Set(mask.split('').filter((ch) => ch !== '9'));
    return value
        .split('')
        .filter((ch) => !literals.has(ch))
        .join('');
}
// @ts-nocheck
function focusSecaoCard(secaoId) {
    if (!(ui.secaoModal instanceof Element)) {
        window.location.href = `secoes.html?editSecao=${encodeURIComponent(secaoId)}`;
        return;
    }
    focusedSecaoId = secaoId;
    editSecao(secaoId);
}
// @ts-nocheck
function formatCurrentDateBr() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = String(now.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
}
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
            ? (state.reportConfigs || []).find((c) => c.tipoId === tipoId && String(c.nome || '').trim().toLowerCase() === cfgNome)
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
    const totalAttrIdsEffective = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking.length ? relatorioTotalAttrIdsWorking : totalAttrIdsFromConfig, tipoId);
    const totalAttrSet = new Set(totalAttrIdsEffective);
    const sumAllNumericFallback = totalAttrSet.size === 0;
    const effectiveOrdenacao = normalizeRelatorioOrdenacao(relatorioOrdenacaoWorking.length
        ? relatorioOrdenacaoWorking
        : (Array.isArray(matchedConfig?.ordenacao) && matchedConfig.ordenacao.length
            ? matchedConfig.ordenacao
            : (matchedConfig?.ordenarAttrId
                ? [{ attrId: matchedConfig.ordenarAttrId, direcao: matchedConfig.ordenarDirecao || 'asc' }]
                : [])), tipoId);
    const columns = attrs.map((a) => a.nome);
    const colSpans = useSavedLayout
        ? orderedWithFallback.map((x) => clampColSpan(x.colSpan || 6))
        : attrs.map(() => 6);
    const docs = state.documentos.filter((d) => d.tipoId === tipoId);
    const filteredDocs = [];
    const rows = [];
    const numeroTotals = attrs.map((attr) => {
        if (attr.tipoCampo !== 'numero')
            return null;
        if (sumAllNumericFallback)
            return 0;
        return totalAttrSet.has(attr.id) ? 0 : null;
    });
    const parseSortableValue = (attr, value) => {
        const raw = String(value ?? '').trim();
        if (!raw)
            return { empty: true, kind: 'text', value: '' };
        if (attr?.tipoCampo === 'numero') {
            const normalized = raw.replace(/\./g, '').replace(',', '.');
            const n = Number(normalized);
            if (!Number.isNaN(n) && Number.isFinite(n))
                return { empty: false, kind: 'number', value: n };
        }
        if (attr?.tipoCampo === 'data') {
            const br = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (br) {
                const iso = `${br[3]}-${br[2]}-${br[1]}T00:00:00`;
                const ms = Date.parse(iso);
                if (!Number.isNaN(ms))
                    return { empty: false, kind: 'date', value: ms };
            }
            const ms = Date.parse(raw);
            if (!Number.isNaN(ms))
                return { empty: false, kind: 'date', value: ms };
        }
        return { empty: false, kind: 'text', value: raw.toLocaleLowerCase() };
    };
    const parseNumericValue = (value) => {
        const raw = String(value ?? '').trim();
        if (!raw)
            return null;
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
            if (decimalSep === ',')
                normalized = normalized.replace(',', '.');
        }
        else if (hasComma) {
            normalized = compact.replace(/\./g, '').replace(',', '.');
        }
        else {
            normalized = compact.replace(/,/g, '');
        }
        const n = Number(normalized);
        if (Number.isNaN(n) || !Number.isFinite(n))
            return null;
        return n;
    };
    for (const doc of docs) {
        const ctx = buildPlaceholderContext(tipoId, doc.valores, doc.titulo);
        if (filtroAttrId) {
            const filtroAttr = attrById.get(filtroAttrId) || state.atributos.find((a) => a.id === filtroAttrId);
            if (filtroAttr) {
                const filtroRaw = doc.valores[filtroAttr.id];
                const filtroResolved = resolveAttrValueForOutput(filtroAttr, filtroRaw, ctx);
                if (!matchesRelatorioFilter(filtroResolved, filtroOperador, filtroValor))
                    continue;
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
                if (pa.empty && pb.empty)
                    continue;
                if (pa.empty)
                    return 1;
                if (pb.empty)
                    return -1;
                let result = 0;
                if ((pa.kind === 'number' || pa.kind === 'date') && pa.kind === pb.kind) {
                    result = Number(pa.value) - Number(pb.value);
                }
                else {
                    result = String(pa.value).localeCompare(String(pb.value), 'pt-BR', { sensitivity: 'base', numeric: true });
                }
                if (result !== 0)
                    return ord.direcao === 'desc' ? -result : result;
            }
            return 0;
        });
    }
    for (const { doc, ctx } of filteredDocs) {
        const row = attrs.map((attr, idx) => {
            const value = String(resolveAttrValueForOutput(attr, doc.valores[attr.id], ctx));
            if (somarNumericos && numeroTotals[idx] !== null) {
                const parsed = parseNumericValue(value);
                if (parsed !== null)
                    numeroTotals[idx] += parsed;
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
    const cfgFooterMode = matchedConfig?.reportFooterMode;
    const cfgFooterAnchor = matchedConfig?.reportFooterAnchor;
    relatorioLastResult = {
        tipoId,
        tipoNome: tipoNome(tipoId),
        columns,
        colSpans,
        blockOrder: normalizeRelatorioBlockOrder(cfgBlockOrder || relatorioSavedBlockOrder),
        blockVisibility: normalizeRelatorioBlockVisibility(cfgBlockVisibility || relatorioSavedBlockVisibility),
        footerMode: (cfgFooterMode || relatorioSavedFooterMode) === 'after_block' ? 'after_block' : 'fixed_bottom',
        footerAnchor: ['cabecalho', 'info_geracao', 'tabela'].includes(String(cfgFooterAnchor || relatorioSavedFooterAnchor || ''))
            ? (cfgFooterAnchor || relatorioSavedFooterAnchor)
            : 'tabela',
        totalValues,
        rows,
    };
    renderRelatorioTable();
}
function getAtributosByTipo(tipoId) {
    const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
    if (attrs.length <= 1)
        return attrs;
    const layout = Array.isArray(state.layouts?.[tipoId]) ? state.layouts[tipoId] : [];
    if (layout.length === 0)
        return attrs;
    const order = new Map(layout.map((item, idx) => [String(item.attrId), idx]));
    return attrs
        .map((attr, idx) => ({ attr, idx }))
        .sort((a, b) => {
        const oa = order.has(a.attr.id) ? order.get(a.attr.id) : Number.MAX_SAFE_INTEGER;
        const ob = order.has(b.attr.id) ? order.get(b.attr.id) : Number.MAX_SAFE_INTEGER;
        if (oa !== ob)
            return oa - ob;
        return a.idx - b.idx;
    })
        .map((x) => x.attr);
}
// @ts-nocheck
function getDisplayTarget(field) {
    if (field.tagName === 'SELECT') {
        const dropdown = field
            .closest('.input-field')
            ?.querySelector('input.select-dropdown');
        if (dropdown)
            return dropdown;
    }
    return field;
}
// @ts-nocheck
function getRelatorioOrderedAttrs(tipoId, layout = relatorioCurrentLayout) {
    const attrsById = new Map(getAtributosByTipo(tipoId).map((a) => [a.id, a]));
    const ordered = [];
    for (const item of layout || []) {
        const attr = attrsById.get(item.attrId);
        if (!attr)
            continue;
        ordered.push({
            attr,
            colSpan: clampColSpan(item.colSpan || 6),
        });
    }
    return ordered;
}
// @ts-nocheck
function getReportConfigsByTipo(tipoId) {
    return (state.reportConfigs || []).filter((cfg) => String(cfg.tipoId) === String(tipoId));
}
// @ts-nocheck
function getReportTipos() {
    if (Array.isArray(state.tipos) && state.tipos.length > 0) {
        return state.tipos.map((tipo) => ({
            ...tipo,
            id: String(tipo.id || ''),
            nome: String(tipo.nome || '').trim() || inferTipoNome(tipo.id),
            cabecalho: String(tipo.cabecalho || ''),
            rodape: String(tipo.rodape || ''),
        }));
    }
    const inferredIds = Array.from(new Set([
        ...state.atributos.map((a) => a.tipoId).filter(Boolean),
        ...state.documentos.map((d) => d.tipoId).filter(Boolean),
        ...Object.keys(state.layouts || {}),
        ...Object.keys(state.layoutSections || {}),
        ...Object.keys(state.tipoSecoes || {}),
    ]));
    return inferredIds.map((id) => ({
        id,
        nome: inferTipoNome(id),
        cabecalho: '',
        rodape: '',
    }));
}
// @ts-nocheck
function getSecoesForTipo(tipoId) {
    if (!tipoId)
        return [];
    if (!state.tipoSecoes || typeof state.tipoSecoes !== 'object')
        state.tipoSecoes = {};
    let linked = Array.isArray(state.tipoSecoes[tipoId]) ? state.tipoSecoes[tipoId] : null;
    if (!linked) {
        // Backward compatibility: existing types start linked to all sections.
        linked = state.secoes.map((s) => s.id);
        state.tipoSecoes[tipoId] = linked;
        saveState();
    }
    // Ensure linked sections also include sections already used by this type attributes.
    const attrSectionIds = Array.from(new Set(state.atributos
        .filter((a) => a.tipoId === tipoId && a.secaoId)
        .map((a) => a.secaoId)));
    if (attrSectionIds.length > 0) {
        const merged = Array.from(new Set([...linked, ...attrSectionIds]));
        if (merged.length !== linked.length) {
            linked = merged;
            state.tipoSecoes[tipoId] = linked;
            saveState();
        }
    }
    const validIds = new Set(state.secoes.map((s) => s.id));
    const normalized = linked.filter((id, idx) => validIds.has(id) && linked.indexOf(id) === idx);
    if (normalized.length !== linked.length) {
        state.tipoSecoes[tipoId] = normalized;
        saveState();
    }
    return normalized
        .map((id) => state.secoes.find((s) => s.id === id))
        .filter(Boolean);
}
// @ts-nocheck
function getSelectedRelatorioAttributeIds() {
    return Array.from(ui.relatorioAtributosWrap.querySelectorAll('input[data-relatorio-attr]:checked'))
        .map((el) => el.dataset.relatorioAttr)
        .filter(Boolean);
}
// @ts-nocheck
function groupAtributosByTipo(tipoId) {
    const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
    if (attrs.length === 0)
        return [];
    const semSecaoKey = '__sem_secao__';
    const grouped = new Map();
    for (const attr of attrs) {
        const secao = state.secoes.find((s) => s.id === attr.secaoId);
        const key = attr.secaoId || semSecaoKey;
        const nome = secao?.nome || 'Sem secao';
        if (!grouped.has(key))
            grouped.set(key, { nome, attrs: [] });
        grouped.get(key).attrs.push(attr);
    }
    return Array.from(grouped.entries())
        .sort((a, b) => {
        if (a[0] === semSecaoKey)
            return -1;
        if (b[0] === semSecaoKey)
            return 1;
        return a[1].nome.localeCompare(b[1].nome);
    })
        .map(([, value]) => value);
}
// @ts-nocheck
function inferTipoNome(tipoId) {
    const text = String(tipoId || '').trim();
    const match = text.match(/^tipo_(\d+)$/);
    if (match)
        return `Tipo ${match[1]}`;
    if (!text)
        return 'Tipo';
    return text;
}
// @ts-nocheck
function initRouting() {
    syncTabFromRoute();
}
// @ts-nocheck
function isAttributeValueFilled(attr, value) {
    if (attr.tipoCampo === 'boolean')
        return value === true;
    if (value === null || value === undefined)
        return false;
    return String(value).trim() !== '';
}
// @ts-nocheck
function isRelatorioBlockImageKey(key) {
    return String(key || '').startsWith('__block_image__');
}
// @ts-nocheck
function isRelatorioBlockSpacerKey(key) {
    return String(key || '').startsWith('__block_spacer__');
}
// @ts-nocheck
function isRelatorioSpacerId(attrId) {
    return String(attrId || '').startsWith('__spacer__');
}
// @ts-nocheck
function isSecaoLinkedToTipo(tipoId, secaoId) {
    return getSecoesForTipo(tipoId).some((s) => s.id === secaoId);
}
// @ts-nocheck
function isValidDateValue(value) {
    if (value === null || value === undefined)
        return false;
    const text = String(value).trim();
    if (!text)
        return false;
    // Accepts ISO-like date inputs from <input type="date"> and parseable date strings.
    const parsed = new Date(text);
    return !Number.isNaN(parsed.getTime());
}
function isValidatorSyntaxValid(raw) {
    if (!raw)
        return true;
    const parsed = parseValidatorRules(raw);
    return parsed.invalid.length === 0;
}
// @ts-nocheck
function labelRelatorioBlock(key) {
    if (key === 'cabecalho')
        return 'Cabecalho';
    if (key === 'info_geracao')
        return 'Info de geracao';
    if (key === 'tabela')
        return 'Tabela';
    if (key === 'rodape')
        return 'Rodape';
    return key;
}
function loadState() {
    const fallback = {
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
        if (!parsed)
            return fallback;
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
            const inferredIds = Array.from(new Set([
                ...parsedAtributos.map((a) => a.tipoId).filter(Boolean),
                ...parsedDocumentos.map((d) => d.tipoId).filter(Boolean),
                ...layoutTipoIds,
                ...layoutSectionTipoIds,
                ...tipoSecoesTipoIds,
            ]));
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
        const referencedTipoIds = Array.from(new Set([
            ...normalizedAtributos.map((a) => a.tipoId).filter(Boolean),
            ...normalizedDocumentos.map((d) => d.tipoId).filter(Boolean),
        ]));
        const currentTipoIds = new Set(tipos.map((t) => t.id));
        for (const tipoId of referencedTipoIds) {
            if (currentTipoIds.has(tipoId))
                continue;
            tipos.push({ id: tipoId, nome: inferTipoNome(tipoId), cabecalho: '', rodape: '' });
            currentTipoIds.add(tipoId);
        }
        const counterFromTipos = Math.max(1, ...tipos
            .map((t) => {
            const match = String(t.id || '').match(/^tipo_(\d+)$/);
            return match ? Number(match[1]) + 1 : 1;
        }));
        const parsedLayouts = parsed.layouts && typeof parsed.layouts === 'object' ? parsed.layouts : {};
        const parsedLayoutSections = parsed.layoutSections && typeof parsed.layoutSections === 'object'
            ? parsed.layoutSections
            : {};
        const parsedTipoSecoes = parsed.tipoSecoes && typeof parsed.tipoSecoes === 'object' ? parsed.tipoSecoes : {};
        const parsedReportConfigs = Array.isArray(parsed.reportConfigs) ? parsed.reportConfigs : [];
        const layouts = {};
        const layoutSections = {};
        const tipoSecoes = {};
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
                reportBlockVisibility: normalizeRelatorioBlockVisibility(cfg.reportBlockVisibility),
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
                ordenacao: normalizeRelatorioOrdenacao(Array.isArray(cfg.ordenacao)
                    ? cfg.ordenacao
                    : (cfg.ordenarAttrId
                        ? [{ attrId: String(cfg.ordenarAttrId), direcao: String(cfg.ordenarDirecao || 'asc') }]
                        : []), String(cfg.tipoId || '')),
                ordenarAttrId: String(cfg.ordenarAttrId || ''),
                ordenarDirecao: String(cfg.ordenarDirecao || 'asc') === 'desc' ? 'desc' : 'asc',
                createdAt: String(cfg.createdAt || ''),
            }))
                .filter((cfg) => cfg.id && cfg.nome && cfg.tipoId),
        };
    }
    catch {
        return fallback;
    }
}
// @ts-nocheck
function makeId(prefix, key) {
    return `${prefix}_${state[key]++}`;
}
// @ts-nocheck
function markFieldError(field, message) {
    if (!field)
        return;
    const target = getDisplayTarget(field);
    target.classList.add('app-invalid');
    const container = field.closest('.input-field') || field.closest('.doc-field-label');
    if (!container)
        return;
    container.classList.add('app-field-has-error');
    let messageEl = container.querySelector('.field-error-text');
    if (!messageEl) {
        messageEl = document.createElement('small');
        messageEl.className = 'field-error-text';
        container.appendChild(messageEl);
    }
    messageEl.textContent = message;
}
// @ts-nocheck
function matchesMask(value, mask) {
    if (value.length !== mask.length)
        return false;
    for (let i = 0; i < mask.length; i += 1) {
        if (mask[i] === '9')
            continue;
        if (value[i] !== mask[i])
            return false;
    }
    const requiredWildcards = mask.split('').filter((ch) => ch === '9').length;
    const payload = extractMaskPayload(value, mask);
    return payload.length === requiredWildcards;
}
// @ts-nocheck
function matchesRelatorioFilter(valueText, operador, filtroValor) {
    const actual = String(valueText || '').trim().toLowerCase();
    const expected = String(filtroValor || '').trim().toLowerCase();
    if (operador === 'empty')
        return actual === '' || actual === '-';
    if (operador === 'not_empty')
        return actual !== '' && actual !== '-';
    if (operador === 'equals')
        return actual === expected;
    if (operador === 'not_equals')
        return actual !== expected;
    return actual.includes(expected);
}
// @ts-nocheck
function moveAttributeToSection(tipoId, attrId, targetSectionKey) {
    if (!attrId)
        return;
    const attr = state.atributos.find((a) => a.id === attrId && a.tipoId === tipoId);
    if (!attr)
        return;
    const nextSecaoId = targetSectionKey === '__sem_secao__' ? '' : targetSectionKey;
    if ((attr.secaoId || '') === nextSecaoId)
        return;
    attr.secaoId = nextSecaoId;
    syncLayoutsForTipo(tipoId);
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
    notify('Atributo movido de secao.');
}
// @ts-nocheck
function moveLayoutItem(tipoId, attrId, direction) {
    const layout = syncLayoutsForTipo(tipoId);
    const idx = layout.findIndex((l) => l.attrId === attrId);
    if (idx === -1)
        return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= layout.length)
        return;
    const [item] = layout.splice(idx, 1);
    layout.splice(newIdx, 0, item);
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
}
// @ts-nocheck
function moveLayoutItemBefore(tipoId, draggedAttrId, targetAttrId) {
    if (!draggedAttrId || !targetAttrId || draggedAttrId === targetAttrId)
        return;
    const layout = syncLayoutsForTipo(tipoId);
    const fromIdx = layout.findIndex((l) => l.attrId === draggedAttrId);
    const targetIdx = layout.findIndex((l) => l.attrId === targetAttrId);
    if (fromIdx < 0 || targetIdx < 0)
        return;
    const [dragged] = layout.splice(fromIdx, 1);
    const insertAt = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
    layout.splice(insertAt, 0, dragged);
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
}
// @ts-nocheck
function moveLayoutSectionBefore(tipoId, draggedKey, targetKey) {
    if (!draggedKey || !targetKey || draggedKey === targetKey)
        return;
    if (draggedKey === '__sem_secao__' || targetKey === '__sem_secao__')
        return;
    const order = syncLayoutSectionsForTipo(tipoId);
    const fromIdx = order.findIndex((k) => k === draggedKey);
    const targetIdx = order.findIndex((k) => k === targetKey);
    if (fromIdx < 0 || targetIdx < 0)
        return;
    const [dragged] = order.splice(fromIdx, 1);
    const insertAt = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
    order.splice(insertAt, 0, dragged);
    state.layoutSections[tipoId] = order;
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
}
// @ts-nocheck
function moveRelatorioLayoutBlockBefore(draggedKey, targetKey) {
    if (!draggedKey || !targetKey || draggedKey === targetKey)
        return;
    const items = Array.isArray(relatorioLayoutBlocksWorking) ? [...relatorioLayoutBlocksWorking] : [];
    const from = items.findIndex((x) => x === draggedKey);
    const to = items.findIndex((x) => x === targetKey);
    if (from < 0 || to < 0)
        return;
    const [dragged] = items.splice(from, 1);
    const targetIndex = items.findIndex((x) => x === targetKey);
    items.splice(targetIndex < 0 ? items.length : targetIndex, 0, dragged);
    relatorioLayoutBlocksWorking = items;
}
// @ts-nocheck
function moveRelatorioLayoutBlockItem(key, direction) {
    const idx = (relatorioLayoutBlocksWorking || []).findIndex((x) => x === key);
    if (idx < 0)
        return;
    const to = idx + Number(direction || 0);
    if (to < 0 || to >= relatorioLayoutBlocksWorking.length)
        return;
    const tmp = relatorioLayoutBlocksWorking[idx];
    relatorioLayoutBlocksWorking[idx] = relatorioLayoutBlocksWorking[to];
    relatorioLayoutBlocksWorking[to] = tmp;
}
// @ts-nocheck
function moveRelatorioLayoutItem(attrId, direction) {
    const idx = (relatorioCurrentLayout || []).findIndex((x) => x.attrId === attrId);
    if (idx < 0)
        return;
    const target = idx + Number(direction || 0);
    if (target < 0 || target >= relatorioCurrentLayout.length)
        return;
    const tmp = relatorioCurrentLayout[idx];
    relatorioCurrentLayout[idx] = relatorioCurrentLayout[target];
    relatorioCurrentLayout[target] = tmp;
    renderRelatorioLayoutEditor(ui.relatorioTipo.value);
}
// @ts-nocheck
function moveRelatorioLayoutWorkingBefore(draggedAttrId, targetAttrId) {
    if (!draggedAttrId || !targetAttrId || draggedAttrId === targetAttrId)
        return;
    const items = Array.isArray(relatorioLayoutWorking) ? [...relatorioLayoutWorking] : [];
    const from = items.findIndex((x) => x.attrId === draggedAttrId);
    const to = items.findIndex((x) => x.attrId === targetAttrId);
    if (from < 0 || to < 0)
        return;
    const [dragged] = items.splice(from, 1);
    const targetIndex = items.findIndex((x) => x.attrId === targetAttrId);
    items.splice(targetIndex < 0 ? items.length : targetIndex, 0, dragged);
    relatorioLayoutWorking = items;
}
// @ts-nocheck
function moveRelatorioLayoutWorkingItem(attrId, direction) {
    const idx = (relatorioLayoutWorking || []).findIndex((x) => x.attrId === attrId);
    if (idx < 0)
        return;
    const to = idx + Number(direction || 0);
    if (to < 0 || to >= relatorioLayoutWorking.length)
        return;
    const tmp = relatorioLayoutWorking[idx];
    relatorioLayoutWorking[idx] = relatorioLayoutWorking[to];
    relatorioLayoutWorking[to] = tmp;
}
// @ts-nocheck
function moveSectionAttributesToSection(tipoId, sourceSectionKey, targetSectionKey) {
    if (!sourceSectionKey || !targetSectionKey)
        return;
    if (sourceSectionKey === targetSectionKey)
        return;
    const sourceSecaoId = sourceSectionKey === '__sem_secao__' ? '' : sourceSectionKey;
    const targetSecaoId = targetSectionKey === '__sem_secao__' ? '' : targetSectionKey;
    const toMove = state.atributos.filter((a) => a.tipoId === tipoId && (a.secaoId || '') === sourceSecaoId);
    if (toMove.length === 0)
        return;
    for (const attr of toMove)
        attr.secaoId = targetSecaoId;
    syncLayoutsForTipo(tipoId);
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
    notify('Secao movida para outra secao.');
}
// @ts-nocheck
function newRelatorioBlockImageKey() {
    return `__block_image__${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
// @ts-nocheck
function newRelatorioBlockSpacerKey() {
    return `__block_spacer__${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
// @ts-nocheck
function normalizePlaceholderKey(text) {
    return String(text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}
// @ts-nocheck
function clampRelatorioImageWidth(value) {
    const n = Number(value);
    if (!Number.isFinite(n))
        return 260;
    return Math.max(40, Math.min(520, Math.floor(n)));
}
function clampRelatorioImageHeight(value) {
    if (value === null || value === undefined || value === '')
        return null;
    const n = Number(value);
    if (!Number.isFinite(n))
        return null;
    return Math.max(20, Math.min(700, Math.floor(n)));
}
function normalizeRelatorioBlockImages(raw, order = []) {
    const normalized = {};
    for (const key of Array.isArray(order) ? order : []) {
        if (!isRelatorioBlockImageKey(key))
            continue;
        const cfg = raw?.[key] || {};
        const align = ['left', 'center', 'right'].includes(String(cfg.align || '')) ? String(cfg.align) : 'center';
        normalized[key] = {
            src: String(cfg.src || ''),
            width: clampRelatorioImageWidth(cfg.width),
            height: clampRelatorioImageHeight(cfg.height),
            align,
            caption: String(cfg.caption || ''),
        };
    }
    return normalized;
}
// @ts-nocheck
function normalizeRelatorioBlockOrder(order) {
    const allowed = new Set(defaultRelatorioBlockOrder());
    const normalized = [];
    for (const key of Array.isArray(order) ? order : []) {
        if (!allowed.has(key))
            continue;
        if (normalized.includes(key))
            continue;
        normalized.push(key);
    }
    for (const key of defaultRelatorioBlockOrder()) {
        if (!normalized.includes(key))
            normalized.push(key);
    }
    return normalized;
}
// @ts-nocheck
function normalizeRelatorioBlockSpacerHeights(raw, order = []) {
    const normalized = {};
    for (const key of Array.isArray(order) ? order : []) {
        if (!isRelatorioBlockSpacerKey(key))
            continue;
        normalized[key] = clampRelatorioSpacerHeight(raw?.[key]);
    }
    return normalized;
}
// @ts-nocheck
function normalizeRelatorioBlockVisibility(raw) {
    const normalized = {};
    for (const key of defaultRelatorioBlockOrder()) {
        normalized[key] = raw && Object.prototype.hasOwnProperty.call(raw, key) ? Boolean(raw[key]) : true;
    }
    return normalized;
}
// @ts-nocheck
function normalizeRelatorioOrdenacao(raw, tipoId = '') {
    let allowed = null;
    if (tipoId && typeof getAtributosByTipo === 'function') {
        try {
            // During bootstrap, state may not be initialized yet.
            const attrs = getAtributosByTipo(tipoId);
            if (Array.isArray(attrs) && attrs.length) {
                allowed = new Set(attrs.map((a) => a.id));
            }
        }
        catch {
            allowed = null;
        }
    }
    const out = [];
    const seen = new Set();
    for (const item of Array.isArray(raw) ? raw : []) {
        const attrId = String(item?.attrId || '');
        if (!attrId)
            continue;
        if (allowed && !allowed.has(attrId))
            continue;
        if (seen.has(attrId))
            continue;
        seen.add(attrId);
        out.push({
            attrId,
            direcao: String(item?.direcao || 'asc') === 'desc' ? 'desc' : 'asc',
        });
    }
    return out;
}
// @ts-nocheck
function normalizeRelatorioTotalAttrIds(raw, tipoId = '') {
    let allowed = new Set();
    if (tipoId && typeof getAtributosByTipo === 'function') {
        try {
            allowed = new Set(getAtributosByTipo(tipoId)
                .filter((a) => a.tipoCampo === 'numero')
                .map((a) => a.id));
        }
        catch {
            allowed = new Set();
        }
    }
    const out = [];
    const seen = new Set();
    for (const id of Array.isArray(raw) ? raw : []) {
        const attrId = String(id || '');
        if (!attrId || seen.has(attrId))
            continue;
        if (allowed.size && !allowed.has(attrId))
            continue;
        seen.add(attrId);
        out.push(attrId);
    }
    return out;
}
// @ts-nocheck
function notify(message) {
    if (window.M && M.toast) {
        M.toast({ html: message });
        return;
    }
    alert(message);
}
function onAtributoSubmit(e) {
    e.preventDefault();
    const tipoId = ui.atributoTipo.value;
    const nome = ui.atributoNome.value.trim();
    const tipoCampo = ui.atributoTipoCampo.value;
    const secaoId = ui.atributoSecao.value;
    const templateTexto = (ui.atributoTemplateTexto.value || '').trim();
    const validador = ui.atributoValidador.value.trim();
    const pesoRaw = ui.atributoPeso.value.trim();
    const mascara = ui.atributoMascara.value.trim();
    if (!tipoId || !nome)
        return;
    if (!isValidatorSyntaxValid(validador)) {
        notify('Validador invalido. Use: number, unique, max:n, required, nullable, date, required_if:@Nome do Campo');
        return;
    }
    if (pesoRaw && !Number.isFinite(Number(pesoRaw))) {
        notify('Peso invalido. Informe um numero decimal.');
        return;
    }
    const peso = pesoRaw === '' ? null : Number(pesoRaw);
    const editId = ui.atributoId.value;
    if (secaoId) {
        const linkedSecoes = getSecoesForTipo(tipoId).map((s) => s.id);
        if (!linkedSecoes.includes(secaoId)) {
            state.tipoSecoes[tipoId] = Array.from(new Set([...linkedSecoes, secaoId]));
        }
    }
    const safeSecaoId = secaoId && state.secoes.some((s) => s.id === secaoId) ? secaoId : '';
    if (editId) {
        const attr = state.atributos.find((a) => a.id === editId);
        if (!attr)
            return;
        const oldTipoId = attr.tipoId;
        attr.tipoId = tipoId;
        attr.nome = nome;
        attr.tipoCampo = tipoCampo;
        attr.secaoId = safeSecaoId;
        attr.validador = validador;
        attr.peso = peso;
        attr.mascara = mascara;
        attr.templateTexto = tipoCampo === 'texto_placeholder' ? templateTexto : '';
        delete attr.textoBase;
        syncLayoutsForTipo(oldTipoId);
        syncLayoutsForTipo(tipoId);
    }
    else {
        state.atributos.push({
            id: makeId('att', 'atributoCounter'),
            tipoId,
            nome,
            tipoCampo,
            secaoId: safeSecaoId,
            validador,
            peso,
            mascara,
            templateTexto: tipoCampo === 'texto_placeholder' ? templateTexto : '',
        });
        syncLayoutsForTipo(tipoId);
    }
    saveState();
    resetAtributoForm();
    renderAll();
}
async function onDocumentoSubmit(e) {
    e.preventDefault();
    clearDocumentoFieldErrors();
    const titulo = ui.documentoTitulo.value.trim();
    const tipoId = ui.documentoTipo.value;
    let hasFormError = false;
    if (!titulo) {
        markFieldError(ui.documentoTitulo, 'Titulo obrigatorio');
        hasFormError = true;
    }
    if (!tipoId) {
        markFieldError(ui.documentoTipo, 'Selecione um tipo');
        hasFormError = true;
    }
    if (hasFormError)
        return;
    const valores = collectDocumentoCampos();
    const pdfVisivel = collectDocumentoPdfFlags();
    const editId = ui.documentoId.value;
    const validationErrors = validateDocumento(tipoId, valores, editId);
    if (validationErrors.length > 0) {
        applyDocumentoFieldErrors(validationErrors);
        notify(validationErrors.map((e) => e.summary).join('<br>'));
        return;
    }
    let savedDoc = null;
    if (editId) {
        const doc = state.documentos.find((d) => d.id === editId);
        if (!doc)
            return;
        doc.titulo = titulo;
        doc.tipoId = tipoId;
        doc.valores = valores;
        doc.pdfVisivel = pdfVisivel;
        savedDoc = doc;
    }
    else {
        const newDoc = {
            id: makeId('doc', 'documentoCounter'),
            titulo,
            tipoId,
            valores,
            pdfVisivel,
        };
        state.documentos.push(newDoc);
        savedDoc = newDoc;
    }
    saveState();
    if (savedDoc) {
        const estrutura = buildDocumentoEstruturaPayload(savedDoc);
        console.log('[documento:save]', JSON.stringify(estrutura, null, 2));
        try {
            const apiResult = await postDocumentoPayloadToApi(estrutura);
            if (apiResult.sent) {
                console.log('[documento:api] payload enviado com sucesso');
            }
        }
        catch (error) {
            console.error('[documento:api] erro ao enviar payload', error);
            notify('Documento salvo localmente, mas falhou envio para API.');
        }
    }
    resetDocumentoForm();
    renderAll();
}
// @ts-nocheck
function onDocumentoTipoChange() {
    tempDocumentoValores = collectDocumentoCampos();
    tempDocumentoPdfFlags = collectDocumentoPdfFlags();
    clearDocumentoFieldErrors();
    renderDocumentoCampos();
    refreshTemplatePreviews();
}
// @ts-nocheck
function onRelatorioAdicionarOrdenacao() {
    const tipoId = ui.relatorioTipo.value;
    if (!tipoId)
        return;
    const attrId = String(ui.relatorioOrdenarAtributo.value || '');
    if (!attrId) {
        notify('Selecione um atributo para ordenar.');
        return;
    }
    const direcao = ui.relatorioOrdenarDirecao.value === 'desc' ? 'desc' : 'asc';
    relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao([...relatorioOrdenacaoWorking.filter((x) => x.attrId !== attrId), { attrId, direcao }], tipoId);
    renderRelatorioOrdenacaoLista(tipoId);
}
// @ts-nocheck
function onRelatorioConfigSelectChange() {
    const tipoId = ui.relatorioTipo.value;
    const configId = String(ui.relatorioConfigSelect.value || '');
    if (!tipoId || !configId)
        return;
    const cfg = (state.reportConfigs || []).find((x) => x.id === configId && x.tipoId === tipoId);
    if (!cfg)
        return;
    applyRelatorioConfig(cfg);
    notify('Configuracao aplicada.');
}
// @ts-nocheck
function onRelatorioLayoutConfigChange() {
    renderRelatorioLayoutCanvas(ui.relatorioLayoutTipo.value, ui.relatorioLayoutConfig.value || '');
}
// @ts-nocheck
function onRelatorioLayoutTipoChange() {
    const tipoId = ui.relatorioLayoutTipo.value;
    renderRelatorioLayoutConfigOptions(tipoId);
    renderRelatorioLayoutCanvas(tipoId, ui.relatorioLayoutConfig.value || '');
    refreshMaterializeUI();
}
// @ts-nocheck
function onRelatorioTipoChange() {
    const tipoId = ui.relatorioTipo.value;
    if (!tipoId)
        return;
    relatorioSavedLayout = [];
    relatorioSavedBlockOrder = [];
    relatorioSavedBlockVisibility = {};
    relatorioSavedFooterMode = 'fixed_bottom';
    relatorioSavedFooterAnchor = 'tabela';
    relatorioOrdenacaoWorking = [];
    relatorioTotalAttrIdsWorking = [];
    renderRelatorioConfigSelectOptions(tipoId, '');
    renderRelatorioAtributosByTipo(tipoId, true);
    ui.relatorioConfigNome.value = '';
    ui.relatorioSomarNumeros.checked = false;
    ui.relatorioOrdenarAtributo.value = '';
    ui.relatorioOrdenarDirecao.value = 'asc';
    closeRelatorioConfigDialog();
    refreshMaterializeUI();
}
// @ts-nocheck
function onSecaoSubmit(e) {
    e.preventDefault();
    const nome = ui.secaoNome.value.trim();
    const cabecalho = (ui.secaoCabecalho.value || '').trim();
    const rodape = (ui.secaoRodape.value || '').trim();
    if (!nome)
        return;
    const editId = ui.secaoId.value;
    if (editId) {
        const sec = state.secoes.find((s) => s.id === editId);
        if (!sec)
            return;
        sec.nome = nome;
        sec.cabecalho = cabecalho;
        sec.rodape = rodape;
    }
    else {
        state.secoes.push({
            id: makeId('sec', 'secaoCounter'),
            nome,
            cabecalho,
            rodape,
        });
    }
    saveState();
    resetSecaoForm();
    renderAll();
}
// @ts-nocheck
function onTipoSubmit(e) {
    e.preventDefault();
    const nome = ui.tipoNome.value.trim();
    const cabecalho = (ui.tipoCabecalho.value || '').trim();
    const rodape = (ui.tipoRodape.value || '').trim();
    if (!nome)
        return;
    const editId = ui.tipoId.value;
    if (editId) {
        const tipo = state.tipos.find((t) => t.id === editId);
        if (!tipo)
            return;
        tipo.nome = nome;
        tipo.cabecalho = cabecalho;
        tipo.rodape = rodape;
    }
    else {
        const id = makeId('tipo', 'tipoCounter');
        state.tipos.push({ id, nome, cabecalho, rodape });
        state.tipoSecoes[id] = state.secoes.map((s) => s.id);
    }
    saveState();
    resetTipoForm();
    renderAll();
}
// @ts-nocheck
function openAppModal(modalEl) {
    if (!modalEl)
        return;
    try {
        if (window.M && M.Modal) {
            const instance = M.Modal.getInstance(modalEl) || M.Modal.init(modalEl);
            if (instance && instance.open) {
                instance.open();
                return;
            }
        }
    }
    catch { }
    // Fallback if Materialize modal instance is unavailable.
    modalEl.style.display = 'block';
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
}
// @ts-nocheck
function openPendingEditFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const editTipoId = params.get('editTipo');
    if (editTipoId && ui.tipoModal instanceof Element) {
        editTipo(editTipoId);
        params.delete('editTipo');
    }
    const editSecaoId = params.get('editSecao');
    if (editSecaoId && ui.secaoModal instanceof Element) {
        editSecao(editSecaoId);
        params.delete('editSecao');
    }
    const editAtributoId = params.get('editAtributo');
    if (editAtributoId && ui.atributoModal instanceof Element) {
        editAtributo(editAtributoId);
        params.delete('editAtributo');
    }
    const editDocumentoId = params.get('editDocumento');
    if (editDocumentoId && ui.documentoModal instanceof Element) {
        editDocumento(editDocumentoId);
        params.delete('editDocumento');
    }
    const nextSearch = params.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash || ''}`;
    history.replaceState(null, '', nextUrl);
}
// @ts-nocheck
function openRelatorioConfigDialog() {
    const dialog = ui.relatorioConfigDialog;
    if (!dialog || typeof dialog.showModal !== 'function') {
        notify('Dialogo nao suportado neste navegador.');
        return;
    }
    renderRelatorioConfigDialogList();
    dialog.showModal();
}
// @ts-nocheck
function openTab(tabId) {
    if (!window.M)
        return;
    const tabsEl = document.querySelector('.tabs');
    if (!tabsEl)
        return;
    const instance = M.Tabs.getInstance(tabsEl);
    if (instance)
        instance.select(tabId);
}
function parseValidatorRules(raw) {
    const result = {
        hasNumber: false,
        hasDate: false,
        hasUnique: false,
        hasRequired: false,
        hasNullable: false,
        requiredIfFieldNames: [],
        max: null,
        invalid: [],
    };
    if (!raw)
        return result;
    const tokens = raw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    for (const token of tokens) {
        const lowered = token.toLowerCase();
        if (lowered === 'number') {
            result.hasNumber = true;
            continue;
        }
        if (lowered === 'date') {
            result.hasDate = true;
            continue;
        }
        if (lowered === 'unique') {
            result.hasUnique = true;
            continue;
        }
        if (lowered === 'required') {
            result.hasRequired = true;
            continue;
        }
        if (lowered === 'nullable') {
            result.hasNullable = true;
            continue;
        }
        if (lowered.startsWith('max:')) {
            const value = Number(token.slice(4));
            if (Number.isFinite(value) && value >= 0) {
                result.max = value;
            }
            else {
                result.invalid.push(token);
            }
            continue;
        }
        if (lowered.startsWith('required_if:@')) {
            const fieldName = token.slice('required_if:@'.length).trim();
            if (fieldName) {
                result.requiredIfFieldNames.push(fieldName);
            }
            else {
                result.invalid.push(token);
            }
            continue;
        }
        result.invalid.push(token);
    }
    return result;
}
// @ts-nocheck
async function postDocumentoPayloadToApi(payload) {
    if (!DOCUMENTO_API_URL)
        return { sent: false, reason: 'url_not_configured' };
    const response = await fetch(DOCUMENTO_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        let bodyText = '';
        try {
            bodyText = await response.text();
        }
        catch {
            bodyText = '';
        }
        throw new Error(`Falha ao enviar para API (${response.status}): ${bodyText || 'sem detalhe'}`);
    }
    return { sent: true };
}
// @ts-nocheck
async function pullStateSnapshotFromApi() {
    if (!APP_STATE_API_URL)
        return { loaded: false, reason: 'url_not_configured' };
    const url = APP_STATE_API_URL.includes('?')
        ? `${APP_STATE_API_URL}&scope=default`
        : `${APP_STATE_API_URL}?scope=default`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Erro ao carregar estado da API (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (!data || typeof data !== 'object' || !data.payload || typeof data.payload !== 'object') {
        return { loaded: false, reason: 'empty_payload' };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.payload));
    const normalized = loadState();
    Object.assign(state, normalized);
    return { loaded: true };
}
// @ts-nocheck
async function pushStateSnapshotToApi() {
    if (!APP_STATE_API_URL)
        return { sent: false, reason: 'url_not_configured' };
    const response = await fetch(APP_STATE_API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            scope: 'default',
            payload: JSON.parse(JSON.stringify(state)),
        }),
    });
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Erro ao salvar estado na API (${response.status}): ${text}`);
    }
    return { sent: true };
}
// @ts-nocheck
function refreshMaterializeUI() {
    if (!window.M)
        return;
    document.querySelectorAll('.modal').forEach((el) => {
        const modalInstance = M.Modal.getInstance(el);
        if (modalInstance)
            modalInstance.destroy();
    });
    M.Modal.init(document.querySelectorAll('.modal'));
    document.querySelectorAll('select').forEach((el) => {
        const selectInstance = M.FormSelect.getInstance(el);
        if (selectInstance)
            selectInstance.destroy();
    });
    M.FormSelect.init(document.querySelectorAll('select'));
    document.querySelectorAll('.tabs').forEach((el) => {
        const tabsInstance = M.Tabs.getInstance(el);
        if (tabsInstance)
            tabsInstance.destroy();
    });
    M.Tabs.init(document.querySelectorAll('.tabs'));
    M.updateTextFields();
    document.querySelectorAll('textarea.materialize-textarea').forEach((el) => {
        if (M.textareaAutoResize)
            M.textareaAutoResize(el);
    });
}
// @ts-nocheck
function refreshTemplatePreviews() {
    const tipoId = ui.documentoTipo.value;
    if (!tipoId)
        return;
    const valores = collectDocumentoCampos();
    const ctx = buildPlaceholderContext(tipoId, valores, ui.documentoTitulo.value.trim());
    ui.documentoCampos
        .querySelectorAll('[data-template-preview="1"]')
        .forEach((field) => {
        const label = field.closest('label');
        if (!label)
            return;
        let preview = label.querySelector('.doc-template-preview');
        if (field.dataset.templateKind !== 'text' && field.dataset.templateKind !== 'textarea') {
            if (preview)
                preview.remove();
            return;
        }
        const source = String(field.value || field.dataset.templateDefault || '');
        if (!source.includes('{{')) {
            if (preview)
                preview.remove();
            return;
        }
        if (!preview) {
            preview = document.createElement('small');
            preview.className = 'doc-template-preview';
            label.appendChild(preview);
        }
        const resolved = applyPlaceholderTemplate(source, ctx).trim();
        preview.textContent = resolved || '-';
    });
}
// @ts-nocheck
function renderAll() {
    renderTipos();
    renderTipoOptions();
    renderSecoes();
    renderSecaoOptions();
    renderAtributos();
    toggleAtributoTemplateConfig();
    renderLayoutEditor();
    renderDocumentoCampos();
    renderDocumentos();
    renderRelatorioBuilder();
    renderRelatorioLayoutPage();
    refreshMaterializeUI();
}
// @ts-nocheck
function renderAtributos() {
    const tipoId = ui.atributoTipo.value;
    const attrs = getAtributosByTipo(tipoId);
    ui.atributosList.innerHTML = '';
    if (attrs.length === 0) {
        ui.atributosList.innerHTML = '<li class="empty">Nenhum atributo para este tipo.</li>';
        return;
    }
    for (const attr of attrs) {
        const secao = state.secoes.find((s) => s.id === attr.secaoId);
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(attr.nome)}</strong>
        <small>${escapeHtml(attr.tipoCampo)} | secao: ${escapeHtml(secao?.nome || '-')}</small>
        <small>validador: ${escapeHtml(attr.validador || '-')}</small>
        <small>peso: ${escapeHtml(attr.peso ?? '-')}</small>
        <small>mascara: ${escapeHtml(attr.mascara || '-')}</small>
        <small>template: ${escapeHtml(attr.templateTexto || '-')}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-edit="${attr.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${attr.id}">Excluir</button>
      </div>
    `;
        li.querySelector('[data-edit]').addEventListener('click', () => editAtributo(attr.id));
        li.querySelector('[data-delete]').addEventListener('click', () => deleteAtributo(attr.id));
        ui.atributosList.appendChild(li);
    }
}
// @ts-nocheck
function renderDocumentoCampos() {
    const tipoId = ui.documentoTipo.value;
    ui.documentoCampos.innerHTML = '';
    if (!tipoId) {
        ui.documentoCampos.innerHTML = '<p class="empty">Selecione o tipo para montar os campos.</p>';
        return;
    }
    const groups = buildSectionGroupsForTipo(tipoId, { includeEmptySections: true })
        .filter((group) => group.items.length > 0);
    if (groups.length === 0) {
        ui.documentoCampos.innerHTML = '<p class="empty">Sem atributos para este tipo.</p>';
        return;
    }
    const tipo = state.tipos.find((t) => t.id === tipoId) || null;
    const placeholderCtx = buildHeaderFooterPlaceholderContext(tipoId, tempDocumentoValores, ui.documentoTitulo.value || '');
    const tipoCabecalho = resolveTemplateTextForOutput(tipo?.cabecalho || '', placeholderCtx).trim();
    const tipoRodape = resolveTemplateTextForOutput(tipo?.rodape || '', placeholderCtx).trim();
    if (tipoCabecalho) {
        const topBlock = document.createElement('div');
        topBlock.className = 'doc-section-template';
        topBlock.textContent = tipoCabecalho;
        ui.documentoCampos.appendChild(topBlock);
    }
    for (const group of groups) {
        const isSemSecao = group.key === '__sem_secao__';
        const fieldset = document.createElement(isSemSecao ? 'div' : 'fieldset');
        fieldset.className = isSemSecao ? 'section-box section-box-no-title' : 'section-box';
        if (!isSemSecao) {
            const legend = document.createElement('legend');
            legend.textContent = group.nome;
            fieldset.appendChild(legend);
        }
        const grid = document.createElement('div');
        grid.className = 'doc-grid section-grid';
        for (const item of group.items) {
            const attr = item.attr;
            const wrap = document.createElement('div');
            wrap.className = 'doc-grid-item';
            wrap.style.gridColumn = `span ${item.colSpan || 6}`;
            const fieldTop = document.createElement('div');
            fieldTop.className = 'doc-field-top';
            const fieldName = document.createElement('strong');
            fieldName.className = 'doc-field-name';
            fieldName.textContent = attr.nome;
            const pdfWrap = document.createElement('label');
            pdfWrap.className = 'doc-pdf-toggle';
            const pdfInput = document.createElement('input');
            pdfInput.type = 'checkbox';
            pdfInput.id = `campo_pdf_${attr.id}`;
            pdfInput.checked = tempDocumentoPdfFlags[attr.id] !== false;
            const pdfText = document.createElement('span');
            pdfText.textContent = 'PDF';
            pdfWrap.appendChild(pdfInput);
            pdfWrap.appendChild(pdfText);
            fieldTop.appendChild(fieldName);
            fieldTop.appendChild(pdfWrap);
            wrap.appendChild(fieldTop);
            const label = document.createElement('label');
            label.className = 'doc-field-label';
            const input = buildInput(attr, `campo_${attr.id}`, tempDocumentoValores[attr.id] ?? '');
            label.appendChild(input);
            wrap.appendChild(label);
            grid.appendChild(wrap);
        }
        fieldset.appendChild(grid);
        ui.documentoCampos.appendChild(fieldset);
    }
    if (tipoRodape) {
        const footerBlock = document.createElement('div');
        footerBlock.className = 'doc-section-template doc-section-footer-template';
        footerBlock.textContent = `Rodape: ${tipoRodape}`;
        ui.documentoCampos.appendChild(footerBlock);
    }
    refreshTemplatePreviews();
}
// @ts-nocheck
function renderDocumentos() {
    ui.documentosList.innerHTML = '';
    if (state.documentos.length === 0) {
        ui.documentosList.innerHTML = '<li class="empty">Nenhum documento cadastrado.</li>';
        return;
    }
    for (const doc of state.documentos) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(doc.titulo)}</strong>
        <small>${escapeHtml(tipoNome(doc.tipoId))}</small>
        <small>${escapeHtml(buildPreview(doc))}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-small blue darken-1 white-text" data-pdf="${doc.id}">PDF</button>
        <button type="button" class="btn-flat btn-small" data-edit="${doc.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${doc.id}">Excluir</button>
      </div>
    `;
        li.querySelector('[data-pdf]').addEventListener('click', () => exportDocumentoPdf(doc.id));
        li.querySelector('[data-edit]').addEventListener('click', () => editDocumento(doc.id));
        li.querySelector('[data-delete]').addEventListener('click', () => deleteDocumento(doc.id));
        ui.documentosList.appendChild(li);
    }
}
// @ts-nocheck
function renderLayoutEditor() {
    const tipoId = ui.layoutTipo.value || state.tipos[0]?.id;
    ui.layoutGridEditor.innerHTML = '';
    if (!tipoId) {
        ui.layoutGridEditor.innerHTML = '<p class="empty">Nenhum tipo cadastrado.</p>';
        return;
    }
    const groups = buildSectionGroupsForTipo(tipoId, { includeEmptySections: true });
    if (groups.length === 0) {
        ui.layoutGridEditor.innerHTML = '<p class="empty">Nenhuma secao cadastrada.</p>';
        return;
    }
    const sectionsWrap = document.createElement('div');
    sectionsWrap.className = 'layout-sections';
    for (const group of groups) {
        const section = document.createElement('div');
        section.className = `layout-section ${group.key === '__sem_secao__' ? 'layout-section-fixed-top' : ''}`;
        section.dataset.layoutSectionKey = group.key;
        if (group.key !== '__sem_secao__') {
            section.setAttribute('draggable', 'true');
            section.addEventListener('dragstart', (e) => {
                section.classList.add('is-dragging');
                currentLayoutDrag = { kind: 'section', key: group.key };
                if (e.dataTransfer) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/layout-section', group.key);
                    e.dataTransfer.setData('text/plain', `section:${group.key}`);
                }
            });
            section.addEventListener('dragend', () => {
                section.classList.remove('is-dragging');
                currentLayoutDrag = null;
                sectionsWrap.querySelectorAll('.layout-section').forEach((el) => el.classList.remove('drag-over'));
            });
        }
        section.addEventListener('dragover', (e) => {
            const draggedSectionKey = currentLayoutDrag?.kind === 'section'
                ? currentLayoutDrag.key
                : e.dataTransfer?.getData('text/layout-section') ||
                    e.dataTransfer?.getData('text/plain')?.replace('section:', '');
            const draggedAttrId = currentLayoutDrag?.kind === 'attr'
                ? currentLayoutDrag.attrId
                : e.dataTransfer?.getData('text/layout-attr') ||
                    e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
            const draggedAttr = draggedAttrId && currentLayoutDrag?.kind === 'attr'
                ? state.atributos.find((a) => a.id === draggedAttrId && a.tipoId === tipoId)
                : null;
            const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
            const hasValidDrag = (draggedSectionKey && draggedSectionKey !== group.key) ||
                Boolean(draggedAttrId && fromSectionKey !== group.key);
            if (!hasValidDrag)
                return;
            e.preventDefault();
            section.classList.add('drag-over');
        });
        section.addEventListener('dragleave', () => section.classList.remove('drag-over'));
        section.addEventListener('drop', (e) => {
            e.preventDefault();
            section.classList.remove('drag-over');
            const draggedKey = currentLayoutDrag?.kind === 'section'
                ? currentLayoutDrag.key
                : e.dataTransfer?.getData('text/layout-section') ||
                    e.dataTransfer?.getData('text/plain')?.replace('section:', '');
            const draggedAttrId = currentLayoutDrag?.kind === 'attr'
                ? currentLayoutDrag.attrId
                : e.dataTransfer?.getData('text/layout-attr') ||
                    e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
            if (draggedAttrId) {
                const draggedAttr = state.atributos.find((a) => a.id === draggedAttrId && a.tipoId === tipoId);
                const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
                if (fromSectionKey && fromSectionKey !== group.key) {
                    moveAttributeToSection(tipoId, draggedAttrId, group.key);
                }
                return;
            }
            if (draggedKey) {
                moveLayoutSectionBefore(tipoId, draggedKey, group.key);
            }
        });
        section.innerHTML = `
      <div class="layout-section-header">
        <strong>${escapeHtml(group.nome)}</strong>
        ${group.key === '__sem_secao__' ? '<small class="layout-section-fixed">fixa no topo</small>' : '<small>arraste para reordenar</small>'}
      </div>
    `;
        const grid = document.createElement('div');
        grid.className = 'layout-grid';
        const secao = group.key === '__sem_secao__' ? null : state.secoes.find((s) => s.id === group.key);
        if (secao?.cabecalho) {
            const headerBlock = document.createElement('div');
            headerBlock.className = 'layout-section-fullwidth layout-section-fullwidth-header';
            headerBlock.textContent = secao.cabecalho;
            section.appendChild(headerBlock);
        }
        for (let i = 0; i < group.items.length; i += 1) {
            const item = group.items[i];
            const attr = item.attr;
            const card = document.createElement('div');
            card.className = 'layout-item';
            card.style.gridColumn = `span ${item.colSpan}`;
            card.setAttribute('draggable', 'true');
            card.dataset.layoutAttrId = attr.id;
            card.innerHTML = `
        <strong>${escapeHtml(attr.nome)}</strong>
        <small>${escapeHtml(attr.tipoCampo)}</small>
        <div class="layout-item-controls">
          <label>
            Largura
            <select class="browser-default" data-layout-span="${attr.id}">
              ${[3, 4, 6, 8, 12]
                .map((v) => `<option value="${v}" ${v === item.colSpan ? 'selected' : ''}>${v}/12</option>`)
                .join('')}
            </select>
          </label>
          <div class="layout-item-actions">
            <button type="button" class="btn-flat btn-small" data-layout-up="${attr.id}" ${i === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" class="btn-flat btn-small" data-layout-down="${attr.id}" ${i === group.items.length - 1 ? 'disabled' : ''}>↓</button>
          </div>
        </div>
      `;
            const prevItem = group.items[i - 1];
            const nextItem = group.items[i + 1];
            const spanSelect = card.querySelector(`[data-layout-span="${attr.id}"]`);
            spanSelect.addEventListener('change', (e) => updateLayoutSpan(tipoId, attr.id, e.target.value));
            card
                .querySelector(`[data-layout-up="${attr.id}"]`)
                .addEventListener('click', () => prevItem && swapLayoutItems(tipoId, attr.id, prevItem.attr.id));
            card
                .querySelector(`[data-layout-down="${attr.id}"]`)
                .addEventListener('click', () => nextItem && swapLayoutItems(tipoId, attr.id, nextItem.attr.id));
            card.addEventListener('dragstart', (e) => {
                card.classList.add('is-dragging');
                currentLayoutDrag = { kind: 'attr', attrId: attr.id };
                if (e.dataTransfer) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/layout-attr', attr.id);
                    e.dataTransfer.setData('text/plain', `attr:${attr.id}`);
                }
            });
            card.addEventListener('dragend', () => {
                card.classList.remove('is-dragging');
                currentLayoutDrag = null;
                grid.querySelectorAll('.layout-item').forEach((el) => el.classList.remove('drag-over'));
            });
            card.addEventListener('dragover', (e) => {
                const draggedId = currentLayoutDrag?.kind === 'attr'
                    ? currentLayoutDrag.attrId
                    : e.dataTransfer?.getData('text/layout-attr') ||
                        e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
                if (!draggedId || draggedId === attr.id)
                    return;
                const draggedAttr = state.atributos.find((a) => a.id === draggedId && a.tipoId === tipoId);
                const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
                e.preventDefault();
                if (fromSectionKey === group.key) {
                    e.stopPropagation();
                    card.classList.add('drag-over');
                }
            });
            card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
            card.addEventListener('drop', (e) => {
                e.preventDefault();
                card.classList.remove('drag-over');
                const draggedId = currentLayoutDrag?.kind === 'attr'
                    ? currentLayoutDrag.attrId
                    : e.dataTransfer?.getData('text/layout-attr') ||
                        e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
                if (!draggedId)
                    return;
                const draggedAttr = state.atributos.find((a) => a.id === draggedId && a.tipoId === tipoId);
                const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
                if (fromSectionKey === group.key) {
                    e.stopPropagation();
                    moveLayoutItemBefore(tipoId, draggedId, attr.id);
                }
                else {
                    moveAttributeToSection(tipoId, draggedId, group.key);
                }
            });
            grid.appendChild(card);
        }
        section.appendChild(grid);
        if (secao?.rodape) {
            const footerBlock = document.createElement('div');
            footerBlock.className = 'layout-section-fullwidth layout-section-fullwidth-footer';
            footerBlock.textContent = `Rodape: ${secao.rodape}`;
            section.appendChild(footerBlock);
        }
        sectionsWrap.appendChild(section);
    }
    ui.layoutGridEditor.appendChild(sectionsWrap);
}
// @ts-nocheck
function renderPdfSectionTables({ pdf, documento, pdfVisivel, placeholderCtx, palette, margin, contentWidth, pageHeight, startY, }) {
    let y = startY;
    const groups = buildSectionGroupsForTipo(documento.tipoId, { includeEmptySections: true }).filter((group) => group.key !== '__sem_secao__' || group.items.length > 0);
    const signatureAttrs = groups
        .flatMap((group) => group.items)
        .map((item) => item.attr)
        .filter((attr) => attr.tipoCampo === 'assinatura' && pdfVisivel[attr.id] !== false);
    if (groups.length === 0) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(...palette.textMain);
        pdf.text('Sem secoes/atributos configurados para este tipo.', margin, y);
        y += 20;
        return { y, signatureAttrs };
    }
    const ensureSpace = (required = 20) => {
        if (y + required <= pageHeight - margin)
            return;
        pdf.addPage();
        y = margin;
    };
    const semSecaoKey = '__sem_secao__';
    const sectionHeaderHeight = 22;
    const sectionPadding = 10;
    const tableHeaderHeight = 18;
    const rowLineHeight = 11;
    const rowPaddingY = 5;
    const col1Ratio = 0.36;
    const sectionInfoGap = 6;
    const sectionInfoLineHeight = 10.5;
    const sectionInfoPadY = 5;
    for (const group of groups) {
        const secao = group.key === semSecaoKey ? null : state.secoes.find((s) => s.id === group.key);
        const secaoCabecalho = resolveTemplateTextForOutput(secao?.cabecalho || '', placeholderCtx).trim();
        const secaoRodape = resolveTemplateTextForOutput(secao?.rodape || '', placeholderCtx).trim();
        const rows = group.items
            .filter((item) => pdfVisivel[item.attr.id] !== false && item.attr.tipoCampo !== 'assinatura')
            .map((item) => {
            const attr = item.attr;
            const raw = documento.valores[attr.id];
            const value = resolveAttrValueForOutput(attr, raw, placeholderCtx);
            const isPlaceholderTemplate = attr.tipoCampo === 'texto_placeholder' || attr.tipoCampo === 'textarea_template';
            const hideFieldName = isPlaceholderTemplate || attr.tipoCampo === 'textarea' || attr.tipoCampo === 'textarea_template';
            const campo = hideFieldName ? '' : String(attr.nome);
            return { campo, valor: String(value), fullwidth: isPlaceholderTemplate };
        });
        if (rows.length === 0)
            continue;
        const tableX = margin + (group.key === semSecaoKey ? 0 : sectionPadding);
        const tableWidth = contentWidth - (group.key === semSecaoKey ? 0 : sectionPadding * 2);
        const col1Width = tableWidth * col1Ratio;
        const col2Width = tableWidth - col1Width;
        const measuredRows = rows.map((row) => {
            if (row.fullwidth) {
                const lineHeight = rowLineHeight + 2;
                const valorLines = pdf.splitTextToSize(row.valor, tableWidth - 10);
                const height = Math.max(1, valorLines.length) * lineHeight + rowPaddingY * 2;
                return {
                    ...row,
                    campoLines: [],
                    valorLines,
                    height,
                    lineHeight,
                    fontSize: 12,
                };
            }
            const campoLines = pdf.splitTextToSize(row.campo, col1Width - 8);
            const valorLines = pdf.splitTextToSize(row.valor, col2Width - 8);
            const height = Math.max(campoLines.length, valorLines.length) * rowLineHeight + rowPaddingY * 2;
            return {
                ...row,
                campoLines,
                valorLines,
                height,
                lineHeight: rowLineHeight,
                fontSize: 9.5,
            };
        });
        const hasOnlyFullwidthRows = measuredRows.every((row) => row.fullwidth);
        const effectiveTableHeaderHeight = hasOnlyFullwidthRows ? 0 : tableHeaderHeight;
        const sectionInfoWidth = tableWidth - 8;
        const headerLines = group.key !== semSecaoKey && secaoCabecalho
            ? pdf.splitTextToSize(secaoCabecalho, sectionInfoWidth)
            : [];
        const footerLines = group.key !== semSecaoKey && secaoRodape
            ? pdf.splitTextToSize(`Rodape: ${secaoRodape}`, sectionInfoWidth)
            : [];
        const headerInfoHeight = headerLines.length > 0 ? headerLines.length * sectionInfoLineHeight + sectionInfoPadY * 2 : 0;
        const footerInfoHeight = footerLines.length > 0 ? footerLines.length * sectionInfoLineHeight + sectionInfoPadY * 2 : 0;
        const headerInfoTotal = headerInfoHeight > 0 ? headerInfoHeight + sectionInfoGap : 0;
        const footerInfoTotal = footerInfoHeight > 0 ? sectionInfoGap + footerInfoHeight : 0;
        const tableBodyHeight = measuredRows.reduce((sum, r) => sum + r.height, 0);
        const tableHeight = effectiveTableHeaderHeight + tableBodyHeight;
        const wrapperHeight = group.key === semSecaoKey
            ? tableHeight
            : sectionHeaderHeight + sectionPadding + headerInfoTotal + tableHeight + footerInfoTotal + sectionPadding;
        ensureSpace(wrapperHeight + 10);
        let cursorY = y;
        if (group.key !== semSecaoKey) {
            pdf.setDrawColor(...palette.cardBorder);
            pdf.setFillColor(...palette.cardBg);
            pdf.roundedRect(margin, y, contentWidth, wrapperHeight, 4, 4, 'FD');
            pdf.setFillColor(...palette.chipBg);
            pdf.roundedRect(margin, y, contentWidth, sectionHeaderHeight, 4, 4, 'F');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(11);
            pdf.setTextColor(...palette.textMain);
            pdf.text(group.nome, margin + sectionPadding, y + 15);
            cursorY = y + sectionHeaderHeight + sectionPadding;
            if (headerInfoHeight > 0) {
                pdf.setDrawColor(...palette.cardBorder);
                pdf.setFillColor(...palette.chipBg);
                pdf.rect(tableX, cursorY, tableWidth, headerInfoHeight, 'FD');
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9.2);
                pdf.setTextColor(...palette.textMuted);
                let headerY = cursorY + sectionInfoPadY + 7;
                for (const line of headerLines) {
                    pdf.text(line, tableX + 4, headerY);
                    headerY += sectionInfoLineHeight;
                }
                cursorY += headerInfoHeight + sectionInfoGap;
            }
        }
        else {
            cursorY = y;
        }
        if (effectiveTableHeaderHeight > 0) {
            pdf.setDrawColor(...palette.cardBorder);
            pdf.setFillColor(...palette.chipBg);
            pdf.rect(tableX, cursorY, tableWidth, effectiveTableHeaderHeight, 'FD');
            pdf.line(tableX + col1Width, cursorY, tableX + col1Width, cursorY + effectiveTableHeaderHeight);
        }
        let rowY = cursorY + effectiveTableHeaderHeight;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.5);
        pdf.setTextColor(...palette.textMuted);
        for (const row of measuredRows) {
            pdf.rect(tableX, rowY, tableWidth, row.height);
            if (!row.fullwidth) {
                pdf.line(tableX + col1Width, rowY, tableX + col1Width, rowY + row.height);
            }
            if (row.fullwidth) {
                pdf.setFontSize(row.fontSize);
                pdf.setTextColor(...palette.textMain);
                let vY = rowY + rowPaddingY + 9;
                for (const line of row.valorLines) {
                    pdf.text(line, tableX + 6, vY);
                    vY += row.lineHeight;
                }
            }
            else {
                pdf.setFontSize(row.fontSize);
                pdf.setTextColor(...palette.textMuted);
                let cY = rowY + rowPaddingY + 8;
                for (const line of row.campoLines) {
                    pdf.text(line, tableX + 4, cY);
                    cY += row.lineHeight;
                }
                let vY = rowY + rowPaddingY + 8;
                for (const line of row.valorLines) {
                    pdf.text(line, tableX + col1Width + 4, vY);
                    vY += row.lineHeight;
                }
            }
            rowY += row.height;
        }
        if (footerInfoHeight > 0) {
            const footerY = rowY + sectionInfoGap;
            pdf.setDrawColor(...palette.cardBorder);
            pdf.setFillColor(...palette.chipBg);
            pdf.rect(tableX, footerY, tableWidth, footerInfoHeight, 'FD');
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9.2);
            pdf.setTextColor(...palette.textMuted);
            let footerLineY = footerY + sectionInfoPadY + 7;
            for (const line of footerLines) {
                pdf.text(line, tableX + 4, footerLineY);
                footerLineY += sectionInfoLineHeight;
            }
        }
        y += wrapperHeight + 10;
    }
    return { y, signatureAttrs };
}
// @ts-nocheck
function renderPdfSignatureBlocks({ pdf, documento, signatureAttrs, tipoRodape, palette, margin, contentWidth, pageHeight, pageWidth, startY, }) {
    let y = startY;
    const signatureBoxWidth = Math.min(420, contentWidth * 0.86);
    const signatureBoxHeight = 92;
    const signatureInnerPadding = 12;
    const signatureGap = 26;
    const signatureCaptionGap = 15;
    const signatureNameFont = 10;
    const blockHeight = signatureBoxHeight + signatureCaptionGap + 8;
    const totalHeight = signatureAttrs.length * blockHeight + Math.max(0, signatureAttrs.length - 1) * signatureGap;
    const bottomOffset = 8;
    const footerGap = 14;
    const footerReserved = tipoRodape
        ? Math.max(1, pdf.splitTextToSize(String(tipoRodape), contentWidth).length) * footerGap + 10
        : 0;
    const lastAvailableY = pageHeight - bottomOffset - footerReserved;
    if (y + totalHeight > lastAvailableY) {
        pdf.addPage();
        y = margin;
    }
    const startYPos = Math.max(y + 10, lastAvailableY - totalHeight);
    const centerX = pageWidth / 2;
    pdf.setDrawColor(...palette.textMuted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(signatureNameFont);
    pdf.setTextColor(...palette.textMuted);
    for (let i = 0; i < signatureAttrs.length; i += 1) {
        const attr = signatureAttrs[i];
        const rawName = documento.valores[attr.id];
        const name = rawName ? String(rawName) : '';
        const blockTop = startYPos + i * (blockHeight + signatureGap);
        const boxX = centerX - signatureBoxWidth / 2;
        const lineY = blockTop + signatureBoxHeight - signatureInnerPadding;
        const x1 = boxX + signatureInnerPadding;
        const x2 = boxX + signatureBoxWidth - signatureInnerPadding;
        pdf.rect(boxX, blockTop, signatureBoxWidth, signatureBoxHeight);
        pdf.line(x1, lineY, x2, lineY);
        const label = name.trim() ? `Assinatura: ${name}` : 'Assinatura';
        const labelWidth = pdf.getTextWidth(label);
        pdf.text(label, centerX - labelWidth / 2, lineY + signatureCaptionGap);
    }
    return startYPos + totalHeight + 6;
}
// @ts-nocheck
function renderPdfTipoFooter({ pdf, tipoRodape, palette, margin, contentWidth, pageHeight, currentY, }) {
    let y = currentY;
    if (!tipoRodape)
        return y;
    const footerSize = 10.5;
    const footerGap = 14;
    const bottomOffset = 8;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(footerSize);
    pdf.setTextColor(...palette.textMuted);
    const footerLines = pdf.splitTextToSize(String(tipoRodape), contentWidth);
    let footerStartY = pageHeight - bottomOffset - (Math.max(footerLines.length, 1) - 1) * footerGap;
    if (y + 8 > footerStartY) {
        pdf.addPage();
        y = margin;
        footerStartY = pageHeight - bottomOffset - (Math.max(footerLines.length, 1) - 1) * footerGap;
    }
    pdf.text(footerLines, margin, footerStartY);
    return y;
}
// @ts-nocheck
function renderRelatorioAtributosByTipo(tipoId, selectAll = false) {
    const attrs = getAtributosByTipo(tipoId);
    ui.relatorioAtributosWrap.innerHTML = '';
    ui.relatorioFiltroAtributo.innerHTML = '<option value="">Sem filtro</option>';
    ui.relatorioOrdenarAtributo.innerHTML = '<option value="">Sem ordenacao</option>';
    if (attrs.length === 0) {
        ui.relatorioAtributosWrap.innerHTML = '<p class="empty">Sem atributos para este tipo.</p>';
        relatorioOrdenacaoWorking = [];
        relatorioTotalAttrIdsWorking = [];
        renderRelatorioOrdenacaoLista(tipoId);
        relatorioLastResult = { tipoNome: tipoNome(tipoId), columns: [], colSpans: [], totalValues: [], rows: [] };
        ui.relatorioResumo.textContent = '';
        ui.relatorioTabelaHead.innerHTML = '';
        ui.relatorioTabelaBody.innerHTML = '';
        return;
    }
    const selectedIds = new Set(selectAll ? [] : getSelectedRelatorioAttributeIds());
    relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
    const totalSelected = new Set(relatorioTotalAttrIdsWorking);
    const list = document.createElement('div');
    list.className = 'relatorio-attrs-list';
    for (const attr of attrs) {
        const opt = document.createElement('option');
        opt.value = attr.id;
        opt.textContent = attr.nome;
        ui.relatorioFiltroAtributo.appendChild(opt);
        const sortOpt = document.createElement('option');
        sortOpt.value = attr.id;
        sortOpt.textContent = attr.nome;
        ui.relatorioOrdenarAtributo.appendChild(sortOpt);
        const label = document.createElement('label');
        label.className = 'relatorio-attr-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.dataset.relatorioAttr = attr.id;
        input.checked = selectAll || selectedIds.size === 0 || selectedIds.has(attr.id);
        const span = document.createElement('span');
        span.textContent = attr.nome;
        label.appendChild(input);
        label.appendChild(span);
        if (attr.tipoCampo === 'numero') {
            const totalWrap = document.createElement('span');
            totalWrap.style.marginLeft = '8px';
            totalWrap.style.display = 'inline-flex';
            totalWrap.style.alignItems = 'center';
            totalWrap.style.gap = '4px';
            totalWrap.innerHTML = `
        <input type="checkbox" data-relatorio-total-attr="${attr.id}" ${totalSelected.has(attr.id) ? 'checked' : ''} />
        <small class="grey-text">Σ</small>
      `;
            const totalInput = totalWrap.querySelector(`input[data-relatorio-total-attr="${attr.id}"]`);
            totalInput.addEventListener('change', (e) => {
                if (e.target.checked) {
                    if (!relatorioTotalAttrIdsWorking.includes(attr.id))
                        relatorioTotalAttrIdsWorking.push(attr.id);
                }
                else {
                    relatorioTotalAttrIdsWorking = relatorioTotalAttrIdsWorking.filter((id) => id !== attr.id);
                }
            });
            totalInput.addEventListener('mousedown', (e) => e.stopPropagation());
            totalInput.addEventListener('click', (e) => e.stopPropagation());
            label.appendChild(totalWrap);
        }
        list.appendChild(label);
    }
    ui.relatorioAtributosWrap.appendChild(list);
    ui.relatorioAtributosWrap.querySelectorAll('input[data-relatorio-attr]').forEach((el) => {
        el.addEventListener('change', () => {
            const id = el.dataset.relatorioAttr;
            if (!el.checked && id) {
                relatorioTotalAttrIdsWorking = relatorioTotalAttrIdsWorking.filter((x) => x !== id);
                const totalEl = ui.relatorioAtributosWrap.querySelector(`input[data-relatorio-total-attr="${id}"]`);
                if (totalEl)
                    totalEl.checked = false;
            }
        });
    });
    relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(relatorioOrdenacaoWorking, tipoId);
    renderRelatorioOrdenacaoLista(tipoId);
    if (!attrs.some((a) => a.id === ui.relatorioOrdenarAtributo.value)) {
        ui.relatorioOrdenarAtributo.value = '';
    }
    refreshMaterializeUI();
}
// @ts-nocheck
function renderRelatorioBuilder() {
    const tipos = getReportTipos();
    ui.relatorioTipo.innerHTML = '';
    if (!tipos.length) {
        ui.relatorioTipo.innerHTML = '<option value="">Sem tipos</option>';
        ui.relatorioAtributosWrap.innerHTML = '<p class="empty">Nenhum tipo cadastrado.</p>';
        ui.relatorioFiltroAtributo.innerHTML = '<option value="">Sem atributos</option>';
        ui.relatorioOrdenarAtributo.innerHTML = '<option value="">Sem ordenacao</option>';
        ui.relatorioOrdenarDirecao.value = 'asc';
        relatorioOrdenacaoWorking = [];
        if (ui.relatorioOrdenacaoLista) {
            ui.relatorioOrdenacaoLista.innerHTML = '<li class="collection-item">Sem ordenacao composta.</li>';
        }
        ui.relatorioResumo.textContent = '';
        ui.relatorioTabelaHead.innerHTML = '';
        ui.relatorioTabelaBody.innerHTML = '';
        return;
    }
    const selectedTipoId = ui.relatorioTipo.value && tipos.some((t) => t.id === ui.relatorioTipo.value)
        ? ui.relatorioTipo.value
        : tipos[0].id;
    for (const tipo of tipos) {
        const option = document.createElement('option');
        option.value = tipo.id;
        option.textContent = String(tipo.nome || '').trim() || inferTipoNome(tipo.id) || tipo.id;
        if (tipo.id === selectedTipoId)
            option.selected = true;
        ui.relatorioTipo.appendChild(option);
    }
    ui.relatorioTipo.value = selectedTipoId;
    renderRelatorioConfigSelectOptions(selectedTipoId, '');
    ui.relatorioSomarNumeros.checked = Boolean(ui.relatorioSomarNumeros.checked);
    ui.relatorioFiltroOperador.value = ui.relatorioFiltroOperador.value || 'contains';
    ui.relatorioOrdenarDirecao.value = ui.relatorioOrdenarDirecao.value === 'desc' ? 'desc' : 'asc';
    renderRelatorioAtributosByTipo(selectedTipoId, true);
}
// @ts-nocheck
function renderRelatorioConfigDialogList() {
    const tipoId = ui.relatorioTipo.value;
    const list = getReportConfigsByTipo(tipoId);
    ui.relatorioConfigList.innerHTML = '';
    if (!list.length) {
        ui.relatorioConfigList.innerHTML = '<li class="collection-item">Nenhuma configuracao salva para este tipo.</li>';
        return;
    }
    for (const cfg of list) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
        <div>
          <strong>${escapeHtml(cfg.nome)}</strong>
          <small class="grey-text" style="display:block;">${escapeHtml(new Date(cfg.createdAt).toLocaleString())}</small>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-flat btn-small" data-load="${cfg.id}">Usar</button>
          <button type="button" class="btn-flat btn-small red-text" data-del="${cfg.id}">Excluir</button>
        </div>
      </div>
    `;
        li.querySelector('[data-load]').addEventListener('click', () => {
            const chosen = (state.reportConfigs || []).find((x) => x.id === cfg.id);
            if (!chosen)
                return;
            applyRelatorioConfig(chosen);
            closeRelatorioConfigDialog();
            notify('Configuracao aplicada.');
        });
        li.querySelector('[data-del]').addEventListener('click', () => {
            state.reportConfigs = (state.reportConfigs || []).filter((x) => x.id !== cfg.id);
            saveState();
            renderRelatorioConfigSelectOptions(tipoId, '');
            refreshMaterializeUI();
            renderRelatorioConfigDialogList();
            notify('Configuracao removida.');
        });
        ui.relatorioConfigList.appendChild(li);
    }
}
// @ts-nocheck
function renderRelatorioConfigSelectOptions(tipoId, preferredId = '') {
    if (!ui.relatorioConfigSelect)
        return;
    const configs = getReportConfigsByTipo(tipoId);
    const prev = String(preferredId || ui.relatorioConfigSelect.value || '');
    ui.relatorioConfigSelect.innerHTML = '';
    if (!configs.length) {
        ui.relatorioConfigSelect.innerHTML = '<option value="">Sem configuracoes salvas</option>';
        ui.relatorioConfigSelect.value = '';
        return;
    }
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Selecione uma configuracao';
    ui.relatorioConfigSelect.appendChild(placeholder);
    for (const cfg of configs) {
        const opt = document.createElement('option');
        opt.value = cfg.id;
        opt.textContent = cfg.nome;
        if (cfg.id === prev)
            opt.selected = true;
        ui.relatorioConfigSelect.appendChild(opt);
    }
    if (!configs.some((c) => c.id === ui.relatorioConfigSelect.value)) {
        ui.relatorioConfigSelect.value = '';
    }
}
// @ts-nocheck
function renderRelatorioFiltroDataCamposOptions(tipoId) {
    const dateAttrs = getAtributosByTipo(tipoId).filter((a) => a.tipoCampo === 'data');
    const prevDe = String(ui.relatorioFiltroDataCampoDe?.value || '');
    const prevAte = String(ui.relatorioFiltroDataCampoAte?.value || '');
    ui.relatorioFiltroDataCampoDe.innerHTML = '<option value="">Sem campo</option>';
    ui.relatorioFiltroDataCampoAte.innerHTML = '<option value="">Sem campo</option>';
    for (const attr of dateAttrs) {
        const optDe = document.createElement('option');
        optDe.value = attr.id;
        optDe.textContent = attr.nome;
        if (attr.id === prevDe)
            optDe.selected = true;
        ui.relatorioFiltroDataCampoDe.appendChild(optDe);
        const optAte = document.createElement('option');
        optAte.value = attr.id;
        optAte.textContent = attr.nome;
        if (attr.id === prevAte)
            optAte.selected = true;
        ui.relatorioFiltroDataCampoAte.appendChild(optAte);
    }
    if (!dateAttrs.some((a) => a.id === ui.relatorioFiltroDataCampoDe.value)) {
        ui.relatorioFiltroDataCampoDe.value = '';
    }
    if (!dateAttrs.some((a) => a.id === ui.relatorioFiltroDataCampoAte.value)) {
        ui.relatorioFiltroDataCampoAte.value = '';
    }
}
// @ts-nocheck
function renderRelatorioLayoutBlockCanvas(tipoId, configId) {
    ui.relatorioLayoutBlockCanvas.innerHTML = '';
    if (!configId)
        return;
    const grid = document.createElement('div');
    grid.className = 'layout-grid';
    for (let i = 0; i < relatorioLayoutBlocksWorking.length; i += 1) {
        const key = relatorioLayoutBlocksWorking[i];
        const card = document.createElement('div');
        card.className = 'layout-item';
        card.style.gridColumn = 'span 12';
        card.setAttribute('draggable', 'true');
        card.innerHTML = `
      <small class="layout-drag-handle">Arraste para ordenar</small>
      <strong>${escapeHtml(labelRelatorioBlock(key))}</strong>
      <small>Bloco do relatorio</small>
      <label class="layout-block-visibility">
        <input type="checkbox" data-report-block-visible="${key}" ${relatorioLayoutBlockVisibilityWorking[key] !== false ? 'checked' : ''} />
        <span>Exibir no PDF</span>
      </label>
      <div class="layout-item-actions">
        <button type="button" class="btn-flat btn-small" data-report-block-up="${key}" ${i === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" class="btn-flat btn-small" data-report-block-down="${key}" ${i === relatorioLayoutBlocksWorking.length - 1 ? 'disabled' : ''}>↓</button>
      </div>
    `;
        const visibleInput = card.querySelector(`[data-report-block-visible="${key}"]`);
        visibleInput.addEventListener('change', (e) => {
            relatorioLayoutBlockVisibilityWorking[key] = Boolean(e.target.checked);
        });
        visibleInput.addEventListener('mousedown', (e) => e.stopPropagation());
        visibleInput.addEventListener('click', (e) => e.stopPropagation());
        card.querySelector(`[data-report-block-up="${key}"]`).addEventListener('click', () => {
            moveRelatorioLayoutBlockItem(key, -1);
            renderRelatorioLayoutBlockCanvas(tipoId, configId);
        });
        card.querySelector(`[data-report-block-down="${key}"]`).addEventListener('click', () => {
            moveRelatorioLayoutBlockItem(key, 1);
            renderRelatorioLayoutBlockCanvas(tipoId, configId);
        });
        card.addEventListener('dragstart', (e) => {
            card.classList.add('is-dragging');
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/report-layout-block', key);
            }
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('is-dragging');
            grid.querySelectorAll('.layout-item').forEach((el) => el.classList.remove('drag-over'));
        });
        card.addEventListener('dragover', (e) => {
            const dragged = e.dataTransfer?.getData('text/report-layout-block');
            if (!dragged || dragged === key)
                return;
            e.preventDefault();
            card.classList.add('drag-over');
        });
        card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
        card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.classList.remove('drag-over');
            const dragged = e.dataTransfer?.getData('text/report-layout-block');
            if (!dragged || dragged === key)
                return;
            moveRelatorioLayoutBlockBefore(dragged, key);
            renderRelatorioLayoutBlockCanvas(tipoId, configId);
        });
        grid.appendChild(card);
    }
    ui.relatorioLayoutBlockCanvas.appendChild(grid);
}
// @ts-nocheck
function renderRelatorioLayoutCanvas(tipoId, configId) {
    ui.relatorioLayoutCanvas.innerHTML = '';
    if (!tipoId) {
        ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Selecione um tipo.</p>';
        return;
    }
    if (!configId) {
        ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Selecione uma configuracao de relatorio.</p>';
        return;
    }
    const config = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
    if (!config) {
        ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Configuracao nao encontrada.</p>';
        return;
    }
    if (relatorioLayoutWorkingConfigId !== configId) {
        relatorioLayoutWorkingConfigId = configId;
        relatorioLayoutWorking = buildRelatorioLayoutWorkingFromConfig(tipoId, configId);
        relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(config.totalAttrIds, tipoId);
        relatorioLayoutBlocksWorking = normalizeRelatorioBlockOrder(config.reportBlockOrder);
        relatorioLayoutBlockVisibilityWorking = normalizeRelatorioBlockVisibility(config.reportBlockVisibility);
        relatorioLayoutFooterModeWorking = config.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom';
        relatorioLayoutFooterAnchorWorking = ['cabecalho', 'info_geracao', 'tabela'].includes(String(config.reportFooterAnchor || ''))
            ? String(config.reportFooterAnchor)
            : 'tabela';
    }
    else {
        relatorioLayoutWorking = relatorioLayoutWorking.filter((x) => x && x.attrId);
        relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
        relatorioLayoutBlocksWorking = normalizeRelatorioBlockOrder(relatorioLayoutBlocksWorking);
        relatorioLayoutBlockVisibilityWorking = normalizeRelatorioBlockVisibility(relatorioLayoutBlockVisibilityWorking);
        relatorioLayoutFooterModeWorking = relatorioLayoutFooterModeWorking === 'after_block' ? 'after_block' : 'fixed_bottom';
        relatorioLayoutFooterAnchorWorking = ['cabecalho', 'info_geracao', 'tabela'].includes(String(relatorioLayoutFooterAnchorWorking || ''))
            ? relatorioLayoutFooterAnchorWorking
            : 'tabela';
    }
    renderRelatorioLayoutBlockCanvas(tipoId, configId);
    ui.relatorioLayoutFooterMode.value = relatorioLayoutFooterModeWorking;
    ui.relatorioLayoutFooterAnchor.value = relatorioLayoutFooterAnchorWorking;
    ui.relatorioLayoutFooterAnchor.disabled = relatorioLayoutFooterModeWorking !== 'after_block';
    ui.relatorioLayoutFooterMode.onchange = (e) => {
        relatorioLayoutFooterModeWorking = e.target.value === 'after_block' ? 'after_block' : 'fixed_bottom';
        ui.relatorioLayoutFooterAnchor.disabled = relatorioLayoutFooterModeWorking !== 'after_block';
    };
    ui.relatorioLayoutFooterAnchor.onchange = (e) => {
        const value = String(e.target.value || 'tabela');
        relatorioLayoutFooterAnchorWorking = ['cabecalho', 'info_geracao', 'tabela'].includes(value) ? value : 'tabela';
    };
    if (!relatorioLayoutWorking.length) {
        ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Essa configuracao nao possui atributos selecionados.</p>';
        return;
    }
    const attrs = getAtributosByTipo(tipoId);
    const attrById = new Map(attrs.map((a) => [a.id, a]));
    const grid = document.createElement('div');
    grid.className = 'layout-grid';
    for (let i = 0; i < relatorioLayoutWorking.length; i += 1) {
        const item = relatorioLayoutWorking[i];
        const attr = attrById.get(item.attrId);
        if (!attr)
            continue;
        const card = document.createElement('div');
        card.className = 'layout-item';
        card.style.gridColumn = `span ${item.colSpan}`;
        card.setAttribute('draggable', 'true');
        card.dataset.reportLayoutAttrId = item.attrId;
        card.innerHTML = `
      <strong>${escapeHtml(attr.nome)}</strong>
      <small>${escapeHtml(attr.tipoCampo)}</small>
      <div class="layout-item-controls">
        <label>
          Largura
          <select class="browser-default" data-report-layout-span="${item.attrId}">
            ${[3, 4, 6, 8, 12].map((v) => `<option value="${v}" ${v === item.colSpan ? 'selected' : ''}>${v}/12</option>`).join('')}
          </select>
        </label>
        <div class="layout-item-actions">
          <button type="button" class="btn-flat btn-small" data-report-layout-up="${item.attrId}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" class="btn-flat btn-small" data-report-layout-down="${item.attrId}" ${i === relatorioLayoutWorking.length - 1 ? 'disabled' : ''}>↓</button>
        </div>
      </div>
    `;
        if (attr.tipoCampo === 'numero') {
            const sumLabel = document.createElement('label');
            sumLabel.className = 'layout-block-visibility';
            sumLabel.style.marginTop = '6px';
            sumLabel.innerHTML = `
        <input type="checkbox" data-report-layout-total="${item.attrId}" ${relatorioTotalAttrIdsWorking.includes(item.attrId) ? 'checked' : ''} />
        <span>Somar no total</span>
      `;
            const sumInput = sumLabel.querySelector(`[data-report-layout-total="${item.attrId}"]`);
            sumInput.addEventListener('change', (e) => {
                if (e.target.checked) {
                    if (!relatorioTotalAttrIdsWorking.includes(item.attrId))
                        relatorioTotalAttrIdsWorking.push(item.attrId);
                }
                else {
                    relatorioTotalAttrIdsWorking = relatorioTotalAttrIdsWorking.filter((id) => id !== item.attrId);
                }
            });
            sumInput.addEventListener('mousedown', (e) => e.stopPropagation());
            sumInput.addEventListener('click', (e) => e.stopPropagation());
            card.appendChild(sumLabel);
        }
        card.querySelector(`[data-report-layout-span="${item.attrId}"]`).addEventListener('change', (e) => {
            updateRelatorioLayoutWorkingSpan(item.attrId, e.target.value);
            renderRelatorioLayoutCanvas(tipoId, configId);
        });
        card.querySelector(`[data-report-layout-up="${item.attrId}"]`).addEventListener('click', () => {
            moveRelatorioLayoutWorkingItem(item.attrId, -1);
            renderRelatorioLayoutCanvas(tipoId, configId);
        });
        card.querySelector(`[data-report-layout-down="${item.attrId}"]`).addEventListener('click', () => {
            moveRelatorioLayoutWorkingItem(item.attrId, 1);
            renderRelatorioLayoutCanvas(tipoId, configId);
        });
        card.addEventListener('dragstart', (e) => {
            relatorioLayoutDragAttrId = item.attrId;
            card.classList.add('is-dragging');
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/report-layout-attr', item.attrId);
            }
        });
        card.addEventListener('dragend', () => {
            relatorioLayoutDragAttrId = '';
            card.classList.remove('is-dragging');
            grid.querySelectorAll('.layout-item').forEach((el) => el.classList.remove('drag-over'));
        });
        card.addEventListener('dragover', (e) => {
            const dragged = relatorioLayoutDragAttrId || e.dataTransfer?.getData('text/report-layout-attr');
            if (!dragged || dragged === item.attrId)
                return;
            e.preventDefault();
            card.classList.add('drag-over');
        });
        card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
        card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.classList.remove('drag-over');
            const dragged = relatorioLayoutDragAttrId || e.dataTransfer?.getData('text/report-layout-attr');
            if (!dragged || dragged === item.attrId)
                return;
            moveRelatorioLayoutWorkingBefore(dragged, item.attrId);
            renderRelatorioLayoutCanvas(tipoId, configId);
        });
        grid.appendChild(card);
    }
    ui.relatorioLayoutCanvas.appendChild(grid);
}
// @ts-nocheck
function renderRelatorioLayoutConfigOptions(tipoId) {
    const configs = getReportConfigsByTipo(tipoId);
    const prev = ui.relatorioLayoutConfig.value;
    ui.relatorioLayoutConfig.innerHTML = '';
    if (!configs.length) {
        ui.relatorioLayoutConfig.innerHTML = '<option value="">Sem configuracoes</option>';
        ui.relatorioLayoutConfig.value = '';
        return;
    }
    for (const cfg of configs) {
        const opt = document.createElement('option');
        opt.value = cfg.id;
        opt.textContent = cfg.nome;
        if (cfg.id === prev)
            opt.selected = true;
        ui.relatorioLayoutConfig.appendChild(opt);
    }
    if (!configs.some((c) => c.id === ui.relatorioLayoutConfig.value)) {
        ui.relatorioLayoutConfig.value = configs[0].id;
    }
}
// @ts-nocheck
function renderRelatorioLayoutEditor(tipoId) {
    ui.relatorioLayoutEditor.innerHTML = '';
    if (!tipoId)
        return;
    if (!relatorioCurrentLayout.length) {
        ui.relatorioLayoutEditor.innerHTML = '<p class="empty">Selecione atributos para montar o layout do relatorio.</p>';
        return;
    }
    const attrs = getAtributosByTipo(tipoId);
    const attrById = new Map(attrs.map((a) => [a.id, a]));
    for (let i = 0; i < relatorioCurrentLayout.length; i += 1) {
        const item = relatorioCurrentLayout[i];
        const attr = attrById.get(item.attrId);
        if (!attr)
            continue;
        const row = document.createElement('div');
        row.className = 'relatorio-layout-row';
        const name = document.createElement('strong');
        name.textContent = attr.nome;
        const controls = document.createElement('div');
        controls.className = 'relatorio-layout-controls';
        const spanSelect = document.createElement('select');
        spanSelect.className = 'browser-default';
        [3, 4, 6, 8, 12].forEach((n) => {
            const opt = document.createElement('option');
            opt.value = String(n);
            opt.textContent = `Largura ${n}`;
            if (Number(item.colSpan) === n)
                opt.selected = true;
            spanSelect.appendChild(opt);
        });
        spanSelect.addEventListener('change', () => {
            updateRelatorioLayoutSpan(item.attrId, spanSelect.value);
        });
        const upBtn = document.createElement('button');
        upBtn.type = 'button';
        upBtn.className = 'btn-flat btn-small';
        upBtn.textContent = '↑';
        upBtn.disabled = i === 0;
        upBtn.addEventListener('click', () => moveRelatorioLayoutItem(item.attrId, -1));
        const downBtn = document.createElement('button');
        downBtn.type = 'button';
        downBtn.className = 'btn-flat btn-small';
        downBtn.textContent = '↓';
        downBtn.disabled = i === relatorioCurrentLayout.length - 1;
        downBtn.addEventListener('click', () => moveRelatorioLayoutItem(item.attrId, 1));
        controls.appendChild(spanSelect);
        controls.appendChild(upBtn);
        controls.appendChild(downBtn);
        row.appendChild(name);
        row.appendChild(controls);
        ui.relatorioLayoutEditor.appendChild(row);
    }
}
// @ts-nocheck
function renderRelatorioLayoutPage() {
    const tipos = getReportTipos();
    if (!tipos.length) {
        ui.relatorioLayoutTipo.innerHTML = '<option value="">Sem tipos</option>';
        ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Nenhum tipo cadastrado.</p>';
        ui.relatorioLayoutConfig.innerHTML = '<option value="">Sem configuracoes</option>';
        return;
    }
    const prevTipo = ui.relatorioLayoutTipo.value;
    if (!ui.relatorioLayoutTipo.options || ui.relatorioLayoutTipo.options.length === 0) {
        ui.relatorioLayoutTipo.innerHTML = '';
        for (const tipo of tipos) {
            const opt = document.createElement('option');
            opt.value = tipo.id;
            opt.textContent = tipo.nome || inferTipoNome(tipo.id);
            ui.relatorioLayoutTipo.appendChild(opt);
        }
    }
    const tipoId = tipos.some((t) => t.id === prevTipo) ? prevTipo : tipos[0].id;
    ui.relatorioLayoutTipo.value = tipoId;
    renderRelatorioLayoutConfigOptions(tipoId);
    renderRelatorioLayoutCanvas(tipoId, ui.relatorioLayoutConfig.value || '');
}
// @ts-nocheck
function renderRelatorioOrdenacaoLista(tipoId) {
    if (!ui.relatorioOrdenacaoLista)
        return;
    ui.relatorioOrdenacaoLista.innerHTML = '';
    const attrs = getAtributosByTipo(tipoId);
    const attrById = new Map(attrs.map((a) => [a.id, a]));
    relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(relatorioOrdenacaoWorking, tipoId);
    if (!relatorioOrdenacaoWorking.length) {
        ui.relatorioOrdenacaoLista.innerHTML = '<li class="collection-item">Sem ordenacao composta.</li>';
        return;
    }
    for (let i = 0; i < relatorioOrdenacaoWorking.length; i += 1) {
        const item = relatorioOrdenacaoWorking[i];
        const attr = attrById.get(item.attrId);
        if (!attr)
            continue;
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <div>
          <strong>${escapeHtml(attr.nome)}</strong>
          <small class="grey-text" style="display:block;">${item.direcao === 'desc' ? 'DESC' : 'ASC'}</small>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-flat btn-small" data-sort-toggle="${i}">ASC/DESC</button>
          <button type="button" class="btn-flat btn-small" data-sort-up="${i}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" class="btn-flat btn-small" data-sort-down="${i}" ${i === relatorioOrdenacaoWorking.length - 1 ? 'disabled' : ''}>↓</button>
          <button type="button" class="btn-flat btn-small red-text" data-sort-del="${i}">Remover</button>
        </div>
      </div>
    `;
        li.querySelector(`[data-sort-toggle="${i}"]`).addEventListener('click', () => {
            relatorioOrdenacaoWorking[i].direcao = relatorioOrdenacaoWorking[i].direcao === 'desc' ? 'asc' : 'desc';
            renderRelatorioOrdenacaoLista(tipoId);
        });
        li.querySelector(`[data-sort-up="${i}"]`).addEventListener('click', () => {
            if (i === 0)
                return;
            const tmp = relatorioOrdenacaoWorking[i - 1];
            relatorioOrdenacaoWorking[i - 1] = relatorioOrdenacaoWorking[i];
            relatorioOrdenacaoWorking[i] = tmp;
            renderRelatorioOrdenacaoLista(tipoId);
        });
        li.querySelector(`[data-sort-down="${i}"]`).addEventListener('click', () => {
            if (i >= relatorioOrdenacaoWorking.length - 1)
                return;
            const tmp = relatorioOrdenacaoWorking[i + 1];
            relatorioOrdenacaoWorking[i + 1] = relatorioOrdenacaoWorking[i];
            relatorioOrdenacaoWorking[i] = tmp;
            renderRelatorioOrdenacaoLista(tipoId);
        });
        li.querySelector(`[data-sort-del="${i}"]`).addEventListener('click', () => {
            relatorioOrdenacaoWorking.splice(i, 1);
            renderRelatorioOrdenacaoLista(tipoId);
        });
        ui.relatorioOrdenacaoLista.appendChild(li);
    }
}
// @ts-nocheck
function renderRelatorioTable() {
    ui.relatorioTabelaHead.innerHTML = '';
    ui.relatorioTabelaBody.innerHTML = '';
    const oldColGroup = ui.relatorioTabela.querySelector('colgroup');
    if (oldColGroup)
        oldColGroup.remove();
    const { columns, rows, tipoNome, colSpans, totalValues } = relatorioLastResult;
    if (!columns.length) {
        ui.relatorioResumo.textContent = '';
        return;
    }
    const totalSpan = (Array.isArray(colSpans) && colSpans.length === columns.length
        ? colSpans
        : columns.map(() => 6)).reduce((sum, x) => sum + Number(x || 0), 0);
    const spans = Array.isArray(colSpans) && colSpans.length === columns.length
        ? colSpans
        : columns.map(() => 6);
    if (totalSpan > 0) {
        const colgroup = document.createElement('colgroup');
        for (let i = 0; i < columns.length; i += 1) {
            const col = document.createElement('col');
            col.style.width = `${(Number(spans[i] || 0) / totalSpan) * 100}%`;
            colgroup.appendChild(col);
        }
        ui.relatorioTabela.insertBefore(colgroup, ui.relatorioTabela.firstChild);
        ui.relatorioTabela.style.tableLayout = 'fixed';
        ui.relatorioTabela.style.width = '100%';
    }
    const trHead = document.createElement('tr');
    for (let i = 0; i < columns.length; i += 1) {
        const col = columns[i];
        const th = document.createElement('th');
        th.textContent = col;
        const span = Number(spans[i] || 0);
        if (totalSpan > 0 && span > 0)
            th.style.width = `${(span / totalSpan) * 100}%`;
        trHead.appendChild(th);
    }
    ui.relatorioTabelaHead.appendChild(trHead);
    for (const row of rows) {
        const tr = document.createElement('tr');
        for (const value of row) {
            const td = document.createElement('td');
            td.textContent = String(value ?? '');
            tr.appendChild(td);
        }
        ui.relatorioTabelaBody.appendChild(tr);
    }
    if (Array.isArray(totalValues) && totalValues.some((v) => String(v || '').trim() !== '')) {
        const trTotal = document.createElement('tr');
        const labelIndex = columns.findIndex((_, idx) => String(totalValues[idx] || '').trim() === '');
        for (let i = 0; i < columns.length; i += 1) {
            const td = document.createElement('td');
            const value = String(totalValues[i] ?? '');
            td.textContent = labelIndex === i ? 'Total' : value;
            td.style.fontWeight = '700';
            trTotal.appendChild(td);
        }
        ui.relatorioTabelaBody.appendChild(trTotal);
    }
    ui.relatorioResumo.textContent = `${tipoNome}: ${rows.length} registro(s)`;
}
// @ts-nocheck
function renderSecaoOptions() {
    const current = ui.atributoSecao.value;
    ui.atributoSecao.innerHTML = '<option value="">Sem secao</option>';
    const tipoId = ui.atributoTipo.value;
    const linkedIds = new Set(tipoId ? getSecoesForTipo(tipoId).map((sec) => sec.id) : []);
    const secoes = [...state.secoes].sort((a, b) => {
        const aLinked = linkedIds.has(a.id) ? 0 : 1;
        const bLinked = linkedIds.has(b.id) ? 0 : 1;
        if (aLinked !== bLinked)
            return aLinked - bLinked;
        return String(a.nome || '').localeCompare(String(b.nome || ''));
    });
    for (const sec of secoes) {
        const opt = document.createElement('option');
        opt.value = sec.id;
        opt.textContent = linkedIds.has(sec.id) ? sec.nome : `${sec.nome} (fora do tipo)`;
        ui.atributoSecao.appendChild(opt);
    }
    if (current === '' || state.secoes.some((s) => s.id === current)) {
        ui.atributoSecao.value = current;
    }
}
// @ts-nocheck
function renderSecoes() {
    ui.secoesList.innerHTML = '';
    if (state.secoes.length === 0) {
        ui.secoesList.innerHTML = '<li class="empty">Nenhuma secao cadastrada.</li>';
        return;
    }
    for (const sec of state.secoes) {
        const linkedTipos = state.tipos
            .filter((tipo) => isSecaoLinkedToTipo(tipo.id, sec.id))
            .map((tipo) => tipo.nome);
        const li = document.createElement('li');
        li.className = `collection-item ${focusedSecaoId === sec.id ? 'section-focused' : ''}`;
        li.dataset.secaoId = sec.id;
        li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(sec.nome)}</strong>
        <small>Tipos vinculados: ${escapeHtml(linkedTipos.join(', ') || '-')}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-edit="${sec.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${sec.id}">Excluir</button>
      </div>
    `;
        li.querySelector('[data-edit]').addEventListener('click', () => editSecao(sec.id));
        li.querySelector('[data-delete]').addEventListener('click', () => deleteSecao(sec.id));
        ui.secoesList.appendChild(li);
    }
    if (focusedSecaoId) {
        const target = ui.secoesList.querySelector(`[data-secao-id="${focusedSecaoId}"]`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                focusedSecaoId = null;
                target.classList.remove('section-focused');
            }, 1800);
        }
        else {
            focusedSecaoId = null;
        }
    }
}
// @ts-nocheck
function renderTipoOptions() {
    const prevAtributo = ui.atributoTipo.value;
    const prevDocumento = ui.documentoTipo.value;
    const prevLayout = ui.layoutTipo.value;
    const prevRelatorio = ui.relatorioTipo.value;
    const prevRelatorioLayout = ui.relatorioLayoutTipo.value;
    ui.atributoTipo.innerHTML = '';
    ui.documentoTipo.innerHTML = '<option value="">Selecione...</option>';
    ui.layoutTipo.innerHTML = '';
    ui.relatorioTipo.innerHTML = '';
    ui.relatorioLayoutTipo.innerHTML = '';
    for (const tipo of state.tipos) {
        const optA = document.createElement('option');
        optA.value = tipo.id;
        optA.textContent = tipo.nome;
        ui.atributoTipo.appendChild(optA);
        const optD = document.createElement('option');
        optD.value = tipo.id;
        optD.textContent = tipo.nome;
        ui.documentoTipo.appendChild(optD);
        const optL = document.createElement('option');
        optL.value = tipo.id;
        optL.textContent = tipo.nome;
        ui.layoutTipo.appendChild(optL);
        const optR = document.createElement('option');
        optR.value = tipo.id;
        optR.textContent = String(tipo.nome || '').trim() || inferTipoNome(tipo.id) || tipo.id;
        ui.relatorioTipo.appendChild(optR);
        const optRL = document.createElement('option');
        optRL.value = tipo.id;
        optRL.textContent = String(tipo.nome || '').trim() || inferTipoNome(tipo.id) || tipo.id;
        ui.relatorioLayoutTipo.appendChild(optRL);
    }
    if (state.tipos.some((t) => t.id === prevAtributo))
        ui.atributoTipo.value = prevAtributo;
    else if (state.tipos[0])
        ui.atributoTipo.value = state.tipos[0].id;
    if (state.tipos.some((t) => t.id === prevDocumento))
        ui.documentoTipo.value = prevDocumento;
    else
        ui.documentoTipo.value = '';
    if (state.tipos.some((t) => t.id === prevLayout))
        ui.layoutTipo.value = prevLayout;
    else if (state.tipos[0])
        ui.layoutTipo.value = state.tipos[0].id;
    if (state.tipos.some((t) => t.id === prevRelatorio))
        ui.relatorioTipo.value = prevRelatorio;
    else if (state.tipos[0])
        ui.relatorioTipo.value = state.tipos[0].id;
    if (state.tipos.some((t) => t.id === prevRelatorioLayout))
        ui.relatorioLayoutTipo.value = prevRelatorioLayout;
    else if (state.tipos[0])
        ui.relatorioLayoutTipo.value = state.tipos[0].id;
}
// @ts-nocheck
function renderTipoSecoes() {
    ui.tipoSecoesList.innerHTML = '';
    const editingTipoId = ui.tipoId.value;
    if (!editingTipoId) {
        ui.tipoSecoesWrap.querySelector('small').textContent =
            'Ao editar um tipo, as seções aparecem aqui.';
        return;
    }
    ui.tipoSecoesWrap.querySelector('small').textContent =
        'Secoes do tipo (vincule/desvincule e edite):';
    if (state.secoes.length === 0) {
        ui.tipoSecoesList.innerHTML = '<li class="empty">Nenhuma secao cadastrada.</li>';
        return;
    }
    for (const secao of state.secoes) {
        const linked = isSecaoLinkedToTipo(editingTipoId, secao.id);
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(secao.nome)}</strong>
        <small>${linked ? 'Vinculada ao tipo' : 'Nao vinculada'}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-link-secao="${secao.id}">
          ${linked ? 'Desvincular' : 'Vincular'}
        </button>
        <button type="button" class="btn-flat btn-small" data-edit-secao="${secao.id}">Editar</button>
      </div>
    `;
        li.querySelector('[data-link-secao]').addEventListener('click', () => {
            toggleTipoSecao(editingTipoId, secao.id);
        });
        li.querySelector('[data-edit-secao]').addEventListener('click', () => {
            focusSecaoCard(secao.id);
        });
        ui.tipoSecoesList.appendChild(li);
    }
}
// @ts-nocheck
function renderTipos() {
    ui.tiposList.innerHTML = '';
    if (state.tipos.length === 0) {
        ui.tiposList.innerHTML = '<li class="empty">Nenhum tipo cadastrado.</li>';
        return;
    }
    for (const tipo of state.tipos) {
        const cabecalho = String(tipo.cabecalho || '').trim();
        const rodape = String(tipo.rodape || '').trim();
        const preview = (text, max = 90) => {
            if (!text)
                return '-';
            return text.length <= max ? text : `${text.slice(0, max - 3)}...`;
        };
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(tipo.nome)}</strong>
        <small><strong>Cabecalho:</strong> ${escapeHtml(preview(cabecalho))}</small>
        <small><strong>Rodape:</strong> ${escapeHtml(preview(rodape))}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-edit="${tipo.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${tipo.id}">Excluir</button>
      </div>
    `;
        li.querySelector('[data-edit]').addEventListener('click', () => editTipo(tipo.id));
        li.querySelector('[data-delete]').addEventListener('click', () => deleteTipo(tipo.id));
        ui.tiposList.appendChild(li);
    }
    renderTipoSecoes();
}
// @ts-nocheck
function resetAtributoForm() {
    ui.atributoId.value = '';
    ui.atributoNome.value = '';
    ui.atributoTipoCampo.value = 'texto';
    ui.atributoSecao.value = '';
    ui.atributoValidador.value = '';
    ui.atributoPeso.value = '';
    ui.atributoMascara.value = '';
    ui.atributoTemplateTexto.value = '';
    toggleAtributoTemplateConfig();
    closeAppModal(ui.atributoModal);
}
// Documentos CRUD
// @ts-nocheck
function resetDocumentoForm() {
    ui.documentoId.value = '';
    ui.documentoTitulo.value = '';
    ui.documentoTipo.value = '';
    tempDocumentoValores = {};
    tempDocumentoPdfFlags = {};
    clearDocumentoFieldErrors();
    renderDocumentoCampos();
    refreshTemplatePreviews();
    closeAppModal(ui.documentoModal);
}
// @ts-nocheck
function resetLayoutForSelectedTipo() {
    const tipoId = ui.layoutTipo.value;
    if (!tipoId)
        return;
    delete state.layouts[tipoId];
    delete state.layoutSections[tipoId];
    syncLayoutsForTipo(tipoId);
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
}
// @ts-nocheck
function resetRelatorioLayoutEditorConfig() {
    const tipoId = ui.relatorioLayoutTipo.value;
    const configId = ui.relatorioLayoutConfig.value;
    if (!tipoId || !configId) {
        notify('Selecione tipo e configuracao para resetar layout.');
        return;
    }
    const cfg = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
    if (!cfg) {
        notify('Configuracao nao encontrada.');
        return;
    }
    cfg.reportLayout = [];
    cfg.reportBlockOrder = defaultRelatorioBlockOrder();
    cfg.reportBlockVisibility = normalizeRelatorioBlockVisibility({});
    cfg.reportFooterMode = 'fixed_bottom';
    cfg.reportFooterAnchor = 'tabela';
    cfg.totalAttrIds = [];
    relatorioTotalAttrIdsWorking = [];
    relatorioSavedBlockOrder = cfg.reportBlockOrder.map((x) => x);
    relatorioSavedBlockVisibility = { ...cfg.reportBlockVisibility };
    relatorioSavedFooterMode = cfg.reportFooterMode;
    relatorioSavedFooterAnchor = cfg.reportFooterAnchor;
    saveState();
    relatorioLayoutWorkingConfigId = '';
    renderRelatorioLayoutCanvas(tipoId, configId);
    notify('Layout customizado removido.');
}
// @ts-nocheck
function resetSecaoForm() {
    ui.secaoId.value = '';
    ui.secaoNome.value = '';
    ui.secaoCabecalho.value = '';
    ui.secaoRodape.value = '';
    closeAppModal(ui.secaoModal);
}
// Atributos CRUD
// @ts-nocheck
function resetTipoForm() {
    ui.tipoId.value = '';
    ui.tipoNome.value = '';
    ui.tipoCabecalho.value = '';
    ui.tipoRodape.value = '';
    renderTipoSecoes();
    closeAppModal(ui.tipoModal);
}
// Secoes CRUD
// @ts-nocheck
function resolveAttrValueForOutput(attr, raw, ctx) {
    if (attr.tipoCampo === 'boolean')
        return raw ? 'Sim' : 'Nao';
    let base = raw;
    if ((base === undefined || base === null || base === '') &&
        attr.tipoCampo === 'texto_placeholder') {
        base = attr.templateTexto || '';
    }
    if (base === undefined || base === null || base === '')
        return '-';
    const text = String(base);
    if (attr.tipoCampo === 'textarea_template' || attr.tipoCampo === 'texto_placeholder') {
        const resolved = resolveTemplateTextForOutput(text, ctx).trim();
        if (!resolved)
            return '-';
        return attr.tipoCampo === 'texto_placeholder' ? resolved.toUpperCase() : resolved;
    }
    return text;
}
// @ts-nocheck
function resolveTemplateTextForOutput(text, ctx) {
    const source = String(text ?? '');
    if (!source)
        return '';
    if (!source.includes('{{'))
        return source;
    return applyPlaceholderTemplate(source, ctx);
}
// @ts-nocheck
function saveLayoutForSelectedTipo() {
    const tipoId = ui.layoutTipo.value;
    if (!tipoId)
        return;
    syncLayoutsForTipo(tipoId);
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    notify('Layout salvo.');
}
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
    if (!Array.isArray(state.reportConfigs))
        state.reportConfigs = [];
    const existing = state.reportConfigs.find((x) => x.tipoId === cfg.tipoId && x.nome.trim().toLowerCase() === cfg.nome.trim().toLowerCase());
    let savedId = '';
    if (existing) {
        existing.selectedAttrIds = cfg.selectedAttrIds;
        existing.reportLayout = cfg.reportLayout || [];
        existing.reportBlockOrder = normalizeRelatorioBlockOrder(cfg.reportBlockOrder);
        existing.reportBlockVisibility = normalizeRelatorioBlockVisibility(cfg.reportBlockVisibility);
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
    }
    else {
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
    cfg.reportBlockVisibility = normalizeRelatorioBlockVisibility(relatorioLayoutBlockVisibilityWorking);
    cfg.reportFooterMode = relatorioLayoutFooterModeWorking === 'after_block' ? 'after_block' : 'fixed_bottom';
    cfg.reportFooterAnchor = ['cabecalho', 'info_geracao', 'tabela'].includes(String(relatorioLayoutFooterAnchorWorking || ''))
        ? relatorioLayoutFooterAnchorWorking
        : 'tabela';
    cfg.totalAttrIds = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
    cfg.selectedAttrIds = cfg.reportLayout.map((x) => x.attrId);
    relatorioSavedBlockOrder = cfg.reportBlockOrder.map((x) => x);
    relatorioSavedBlockVisibility = { ...cfg.reportBlockVisibility };
    relatorioSavedFooterMode = cfg.reportFooterMode;
    relatorioSavedFooterAnchor = cfg.reportFooterAnchor;
    saveState();
    notify('Layout da configuracao de relatorio salvo.');
}
// @ts-nocheck
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
// @ts-nocheck
function sectionKeyFromAttr(attr) {
    return attr.secaoId || '__sem_secao__';
}
// @ts-nocheck
function sectionNameFromKey(key) {
    if (key === '__sem_secao__')
        return 'Sem secao';
    return state.secoes.find((s) => s.id === key)?.nome || 'Sem secao';
}
// @ts-nocheck
function swapLayoutItems(tipoId, attrA, attrB) {
    const layout = syncLayoutsForTipo(tipoId);
    const idxA = layout.findIndex((l) => l.attrId === attrA);
    const idxB = layout.findIndex((l) => l.attrId === attrB);
    if (idxA < 0 || idxB < 0)
        return;
    [layout[idxA], layout[idxB]] = [layout[idxB], layout[idxA]];
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
}
// @ts-nocheck
function syncLayoutSectionsForTipo(tipoId) {
    if (!tipoId)
        return [];
    if (!state.layoutSections || typeof state.layoutSections !== 'object')
        state.layoutSections = {};
    const sectionKeys = ['__sem_secao__', ...getSecoesForTipo(tipoId).map((s) => s.id)];
    const existing = Array.isArray(state.layoutSections[tipoId]) ? state.layoutSections[tipoId] : [];
    const normalized = [];
    let changed = existing.length === 0;
    for (const key of existing) {
        if (!sectionKeys.includes(key))
            continue;
        if (normalized.includes(key))
            continue;
        normalized.push(key);
    }
    for (const key of sectionKeys) {
        if (normalized.includes(key))
            continue;
        normalized.push(key);
        changed = true;
    }
    // Keep "Sem secao" pinned at top.
    const semIdx = normalized.indexOf('__sem_secao__');
    if (semIdx > 0) {
        normalized.splice(semIdx, 1);
        normalized.unshift('__sem_secao__');
        changed = true;
    }
    if (normalized.length !== existing.length)
        changed = true;
    state.layoutSections[tipoId] = normalized;
    if (changed)
        saveState();
    return normalized;
}
// @ts-nocheck
function syncLayoutsForTipo(tipoId) {
    if (!tipoId)
        return [];
    if (!state.layouts || typeof state.layouts !== 'object')
        state.layouts = {};
    const attrs = getAtributosByTipo(tipoId);
    const attrIds = new Set(attrs.map((a) => a.id));
    const existing = Array.isArray(state.layouts[tipoId]) ? state.layouts[tipoId] : [];
    const normalized = [];
    let changed = existing.length === 0 && attrs.length > 0;
    for (const item of existing) {
        if (!item || !attrIds.has(item.attrId))
            continue;
        if (normalized.some((n) => n.attrId === item.attrId))
            continue;
        const span = clampColSpan(item.colSpan);
        if (span !== item.colSpan)
            changed = true;
        normalized.push({
            attrId: item.attrId,
            colSpan: span,
        });
    }
    for (const attr of attrs) {
        if (normalized.some((n) => n.attrId === attr.id))
            continue;
        normalized.push({
            attrId: attr.id,
            colSpan: defaultColSpanForAttr(attr),
        });
        changed = true;
    }
    if (normalized.length !== existing.length)
        changed = true;
    state.layouts[tipoId] = normalized;
    if (changed)
        saveState();
    return normalized;
}
// @ts-nocheck
function syncRelatorioLayoutFromSelection(selectedAttrIds, tipoId) {
    const attrs = getAtributosByTipo(tipoId);
    const attrMap = new Map(attrs.map((a) => [a.id, a]));
    const selectedSet = new Set(selectedAttrIds.filter((id) => attrMap.has(id)));
    const existing = Array.isArray(relatorioCurrentLayout) ? relatorioCurrentLayout : [];
    // Keep current custom order for items that are still selected.
    const normalized = existing
        .filter((item) => selectedSet.has(item.attrId) && attrMap.has(item.attrId))
        .map((item) => ({
        attrId: item.attrId,
        colSpan: clampColSpan(item.colSpan || 6),
    }));
    // Append newly selected items at the end without disturbing existing order.
    for (const id of selectedAttrIds) {
        if (!selectedSet.has(id))
            continue;
        if (normalized.some((x) => x.attrId === id))
            continue;
        normalized.push({
            attrId: id,
            colSpan: 6,
        });
    }
    relatorioCurrentLayout = normalized;
}
// @ts-nocheck
function syncTabFromRoute() {
    const hash = String(window.location.hash || '').replace(/^#/, '');
    if (!hash)
        return;
    const panel = document.getElementById(hash);
    if (!panel)
        return;
    openTab(hash);
}
// @ts-nocheck
function tipoNome(tipoId) {
    return state.tipos.find((t) => t.id === tipoId)?.nome || tipoId;
}
// @ts-nocheck
function toggleAtributoTemplateConfig() {
    const show = ui.atributoTipoCampo.value === 'texto_placeholder';
    if (ui.atributoTemplateWrap) {
        ui.atributoTemplateWrap.style.display = show ? '' : 'none';
    }
}
// @ts-nocheck
function toggleTipoSecao(tipoId, secaoId) {
    if (!tipoId || !secaoId)
        return;
    const current = getSecoesForTipo(tipoId).map((s) => s.id);
    if (current.includes(secaoId)) {
        state.tipoSecoes[tipoId] = current.filter((id) => id !== secaoId);
        // Also detach attributes that were using the removed section.
        state.atributos
            .filter((a) => a.tipoId === tipoId && a.secaoId === secaoId)
            .forEach((a) => {
            a.secaoId = '';
        });
    }
    else {
        state.tipoSecoes[tipoId] = [...current, secaoId];
    }
    syncLayoutSectionsForTipo(tipoId);
    saveState();
    renderAll();
}
// Tipos CRUD
// @ts-nocheck
function updateLayoutSpan(tipoId, attrId, span) {
    const layout = syncLayoutsForTipo(tipoId);
    const item = layout.find((l) => l.attrId === attrId);
    if (!item)
        return;
    item.colSpan = clampColSpan(span);
    saveState();
    renderLayoutEditor();
    if (ui.documentoTipo.value === tipoId)
        renderDocumentoCampos();
    refreshMaterializeUI();
}
// @ts-nocheck
function isRelatorioDateOperator(operador) {
    return ['date_on', 'date_from', 'date_to', 'date_between'].includes(String(operador || ''));
}
function updateRelatorioFiltroUiByAttr() {
    const tipoId = String(ui.relatorioTipo?.value || '');
    const filtroAttrId = String(ui.relatorioFiltroAtributo?.value || '');
    const attr = getAtributosByTipo(tipoId).find((a) => a.id === filtroAttrId);
    const isDateAttr = attr?.tipoCampo === 'data';
    const operador = String(ui.relatorioFiltroOperador?.value || 'contains');
    const dataModo = String(ui.relatorioFiltroDataModo?.value || 'valor');
    const valueWrap = ui.relatorioFiltroValor?.closest?.('.input-field');
    if (isDateAttr) {
        renderRelatorioFiltroDataCamposOptions(tipoId);
        const showDataCampos = operador === 'date_between';
        const useCampos = showDataCampos && dataModo === 'campos';
        if (valueWrap)
            valueWrap.style.display = 'none';
        if (ui.relatorioFiltroDataWrap)
            ui.relatorioFiltroDataWrap.style.display = useCampos ? 'none' : 'flex';
        if (ui.relatorioFiltroDataCamposWrap)
            ui.relatorioFiltroDataCamposWrap.style.display = showDataCampos ? '' : 'none';
        if (!isRelatorioDateOperator(operador) && operador !== 'empty' && operador !== 'not_empty') {
            ui.relatorioFiltroOperador.value = 'date_between';
        }
        return;
    }
    if (valueWrap)
        valueWrap.style.display = '';
    if (ui.relatorioFiltroDataWrap)
        ui.relatorioFiltroDataWrap.style.display = 'none';
    if (ui.relatorioFiltroDataCamposWrap)
        ui.relatorioFiltroDataCamposWrap.style.display = 'none';
    if (isRelatorioDateOperator(operador)) {
        ui.relatorioFiltroOperador.value = 'contains';
    }
}
// @ts-nocheck
function updateRelatorioLayoutSpacerHeight(attrId, value) {
    const item = (relatorioLayoutWorking || []).find((x) => x.attrId === attrId);
    if (!item || !isRelatorioSpacerId(attrId))
        return;
    item.spacerHeight = clampRelatorioSpacerHeight(value);
}
// @ts-nocheck
function updateRelatorioLayoutSpan(attrId, spanValue) {
    const item = (relatorioCurrentLayout || []).find((x) => x.attrId === attrId);
    if (!item)
        return;
    item.colSpan = clampColSpan(spanValue);
}
// @ts-nocheck
function updateRelatorioLayoutWorkingSpan(attrId, value) {
    const item = (relatorioLayoutWorking || []).find((x) => x.attrId === attrId);
    if (!item)
        return;
    item.colSpan = clampColSpan(value);
}
function validateDocumento(tipoId, valores, editingDocId) {
    const errors = [];
    const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
    const attrsByName = new Map(attrs.map((a) => [String(a.nome || '').trim().toLowerCase(), a]));
    for (const attr of attrs) {
        const rules = parseValidatorRules(attr.validador || '');
        const raw = valores[attr.id];
        const empty = !isAttributeValueFilled(attr, raw);
        if (rules.hasRequired && empty) {
            errors.push({
                attrId: attr.id,
                summary: `${attr.nome}: campo obrigatorio`,
                message: 'Campo obrigatorio',
            });
            continue;
        }
        if (rules.requiredIfFieldNames.length > 0 && empty) {
            const shouldBeRequired = rules.requiredIfFieldNames.some((refName) => {
                const refAttr = attrsByName.get(refName.trim().toLowerCase());
                if (!refAttr)
                    return false;
                return isAttributeValueFilled(refAttr, valores[refAttr.id]);
            });
            if (shouldBeRequired) {
                errors.push({
                    attrId: attr.id,
                    summary: `${attr.nome}: campo obrigatorio pois outro campo referenciado foi preenchido`,
                    message: 'Obrigatorio por dependencia',
                });
                continue;
            }
        }
        if (empty && rules.hasNullable)
            continue;
        if (empty)
            continue;
        if (attr.mascara && !matchesMask(String(raw), attr.mascara)) {
            errors.push({
                attrId: attr.id,
                summary: `${attr.nome}: valor nao corresponde a mascara ${attr.mascara}`,
                message: `Nao corresponde a mascara ${attr.mascara}`,
            });
            continue;
        }
        if (rules.hasNumber) {
            const num = Number(raw);
            if (!Number.isFinite(num)) {
                errors.push({
                    attrId: attr.id,
                    summary: `${attr.nome}: deve ser numero`,
                    message: 'Deve ser numero',
                });
                continue;
            }
        }
        if (rules.hasDate) {
            if (!isValidDateValue(raw)) {
                errors.push({
                    attrId: attr.id,
                    summary: `${attr.nome}: deve ser uma data valida`,
                    message: 'Data invalida',
                });
                continue;
            }
        }
        if (rules.max !== null) {
            if (attr.tipoCampo === 'numero' || rules.hasNumber) {
                const num = Number(raw);
                if (!Number.isFinite(num) || num > rules.max) {
                    errors.push({
                        attrId: attr.id,
                        summary: `${attr.nome}: valor maximo ${rules.max}`,
                        message: `Valor maximo ${rules.max}`,
                    });
                    continue;
                }
            }
            else if (String(raw).length > rules.max) {
                errors.push({
                    attrId: attr.id,
                    summary: `${attr.nome}: tamanho maximo ${rules.max}`,
                    message: `Tamanho maximo ${rules.max}`,
                });
                continue;
            }
        }
        if (rules.hasUnique) {
            const collision = state.documentos.some((doc) => {
                if (doc.id === editingDocId)
                    return false;
                if (doc.tipoId !== tipoId)
                    return false;
                return String(doc.valores[attr.id] ?? '') === String(raw ?? '');
            });
            if (collision) {
                errors.push({
                    attrId: attr.id,
                    summary: `${attr.nome}: valor deve ser unico`,
                    message: 'Valor deve ser unico',
                });
            }
        }
    }
    return errors;
}
