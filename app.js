const STORAGE_KEY = 'documentos_app_v2';

const state = loadState();
const ui = {
  // tipos
  tipoForm: document.getElementById('tipoForm'),
  tipoId: document.getElementById('tipoId'),
  tipoNome: document.getElementById('tipoNome'),
  tipoCabecalho: document.getElementById('tipoCabecalho'),
  tipoRodape: document.getElementById('tipoRodape'),
  tipoCancelBtn: document.getElementById('tipoCancelBtn'),
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
    documentosList: document.getElementById('documentosList'),
};

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
      add() {},
      remove() {},
      contains() { return false; },
    },
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    remove() {},
    setAttribute() {},
    getAttribute() { return ''; },
    querySelector() { return createUiStub(); },
    querySelectorAll() { return []; },
    closest() { return null; },
    focus() {},
    scrollIntoView() {},
  };
  return stub;
}

Object.keys(ui).forEach((key) => {
  if (!ui[key]) ui[key] = createUiStub();
});

let tempDocumentoValores = {};
let tempDocumentoPdfFlags = {};
let currentLayoutDrag = null;
let focusedSecaoId = null;

bindEvents();
renderAll();
initRouting();

function bindEvents() {
  ui.tipoForm.addEventListener('submit', onTipoSubmit);
  ui.tipoCancelBtn.addEventListener('click', resetTipoForm);

  ui.secaoForm.addEventListener('submit', onSecaoSubmit);
  ui.secaoCancelBtn.addEventListener('click', resetSecaoForm);

  ui.atributoForm.addEventListener('submit', onAtributoSubmit);
  ui.atributoTipo.addEventListener('change', () => {
    renderSecaoOptions();
    renderAtributos();
  });
  ui.atributoTipoCampo.addEventListener('change', toggleAtributoTemplateConfig);
  ui.atributoCancelBtn.addEventListener('click', resetAtributoForm);

  ui.layoutTipo.addEventListener('change', renderLayoutEditor);
  ui.layoutSaveBtn.addEventListener('click', saveLayoutForSelectedTipo);
  ui.layoutResetBtn.addEventListener('click', resetLayoutForSelectedTipo);

  ui.documentoForm.addEventListener('submit', onDocumentoSubmit);
  ui.documentoTipo.addEventListener('change', onDocumentoTipoChange);
  ui.documentoCancelBtn.addEventListener('click', resetDocumentoForm);
  ui.documentoTitulo.addEventListener('input', () => clearFieldError(ui.documentoTitulo));
  ui.documentoTipo.addEventListener('change', () => clearFieldError(ui.documentoTipo));
  ui.documentoForm.addEventListener('input', () => refreshTemplatePreviews());
  ui.documentoForm.addEventListener('change', () => refreshTemplatePreviews());

  window.addEventListener('hashchange', syncTabFromRoute);
  document.querySelectorAll('.tabs .tab a').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) history.replaceState(null, '', href);
    });
  });
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
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
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
    };
  } catch {
    return fallback;
  }
}

function inferTipoNome(tipoId) {
  const text = String(tipoId || '').trim();
  const match = text.match(/^tipo_(\d+)$/);
  if (match) return `Tipo ${match[1]}`;
  if (!text) return 'Tipo';
  return text;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function makeId(prefix, key) {
  return `${prefix}_${state[key]++}`;
}

function tipoNome(tipoId) {
  return state.tipos.find((t) => t.id === tipoId)?.nome || tipoId;
}

function getSecoesForTipo(tipoId) {
  if (!tipoId) return [];
  if (!state.tipoSecoes || typeof state.tipoSecoes !== 'object') state.tipoSecoes = {};

  let linked = Array.isArray(state.tipoSecoes[tipoId]) ? state.tipoSecoes[tipoId] : null;
  if (!linked) {
    // Backward compatibility: existing types start linked to all sections.
    linked = state.secoes.map((s) => s.id);
    state.tipoSecoes[tipoId] = linked;
    saveState();
  }

  // Ensure linked sections also include sections already used by this type attributes.
  const attrSectionIds = Array.from(
    new Set(
      state.atributos
        .filter((a) => a.tipoId === tipoId && a.secaoId)
        .map((a) => a.secaoId)
    )
  );
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

function isSecaoLinkedToTipo(tipoId, secaoId) {
  return getSecoesForTipo(tipoId).some((s) => s.id === secaoId);
}

function toggleTipoSecao(tipoId, secaoId) {
  if (!tipoId || !secaoId) return;
  const current = getSecoesForTipo(tipoId).map((s) => s.id);
  if (current.includes(secaoId)) {
    state.tipoSecoes[tipoId] = current.filter((id) => id !== secaoId);
    // Also detach attributes that were using the removed section.
    state.atributos
      .filter((a) => a.tipoId === tipoId && a.secaoId === secaoId)
      .forEach((a) => {
        a.secaoId = '';
      });
  } else {
    state.tipoSecoes[tipoId] = [...current, secaoId];
  }

  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderAll();
}

// Tipos CRUD
function onTipoSubmit(e) {
  e.preventDefault();
  const nome = ui.tipoNome.value.trim();
  const cabecalho = (ui.tipoCabecalho.value || '').trim();
  const rodape = (ui.tipoRodape.value || '').trim();
  if (!nome) return;

  const editId = ui.tipoId.value;
  if (editId) {
    const tipo = state.tipos.find((t) => t.id === editId);
    if (!tipo) return;
    tipo.nome = nome;
    tipo.cabecalho = cabecalho;
    tipo.rodape = rodape;
  } else {
    const id = makeId('tipo', 'tipoCounter');
    state.tipos.push({ id, nome, cabecalho, rodape });
    state.tipoSecoes[id] = state.secoes.map((s) => s.id);
  }

  saveState();
  resetTipoForm();
  renderAll();
}

function editTipo(tipoId) {
  const tipo = state.tipos.find((t) => t.id === tipoId);
  if (!tipo) return;
  ui.tipoId.value = tipo.id;
  ui.tipoNome.value = tipo.nome;
  ui.tipoCabecalho.value = tipo.cabecalho || '';
  ui.tipoRodape.value = tipo.rodape || '';
  renderTipoSecoes();
  refreshMaterializeUI();
}

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

  if (ui.atributoTipo.value === tipoId) ui.atributoTipo.value = '';
  if (ui.documentoTipo.value === tipoId) ui.documentoTipo.value = '';
  if (ui.layoutTipo.value === tipoId) ui.layoutTipo.value = '';

  saveState();
  renderAll();
}

function resetTipoForm() {
  ui.tipoId.value = '';
  ui.tipoNome.value = '';
  ui.tipoCabecalho.value = '';
  ui.tipoRodape.value = '';
  renderTipoSecoes();
}

// Secoes CRUD
function onSecaoSubmit(e) {
  e.preventDefault();
  const nome = ui.secaoNome.value.trim();
  const cabecalho = (ui.secaoCabecalho.value || '').trim();
  const rodape = (ui.secaoRodape.value || '').trim();
  if (!nome) return;

  const editId = ui.secaoId.value;
  if (editId) {
    const sec = state.secoes.find((s) => s.id === editId);
    if (!sec) return;
    sec.nome = nome;
    sec.cabecalho = cabecalho;
    sec.rodape = rodape;
  } else {
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

function editSecao(secaoId) {
  const sec = state.secoes.find((s) => s.id === secaoId);
  if (!sec) return;
  ui.secaoId.value = sec.id;
  ui.secaoNome.value = sec.nome;
  ui.secaoCabecalho.value = sec.cabecalho || '';
  ui.secaoRodape.value = sec.rodape || '';
  refreshMaterializeUI();
}

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

function resetSecaoForm() {
  ui.secaoId.value = '';
  ui.secaoNome.value = '';
  ui.secaoCabecalho.value = '';
  ui.secaoRodape.value = '';
}

// Atributos CRUD
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
  if (!tipoId || !nome) return;
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
  const linkedSecoes = getSecoesForTipo(tipoId).map((s) => s.id);
  const safeSecaoId = secaoId && linkedSecoes.includes(secaoId) ? secaoId : '';
  if (editId) {
    const attr = state.atributos.find((a) => a.id === editId);
    if (!attr) return;
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
      templateTexto: tipoCampo === 'texto_placeholder' ? templateTexto : '',
    });
    syncLayoutsForTipo(tipoId);
  }

  saveState();
  resetAtributoForm();
  renderAll();
}

function editAtributo(attrId) {
  const attr = state.atributos.find((a) => a.id === attrId);
  if (!attr) return;
  ui.atributoId.value = attr.id;
  ui.atributoTipo.value = attr.tipoId;
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
}

function deleteAtributo(attrId) {
  state.atributos = state.atributos.filter((a) => a.id !== attrId);
  Object.keys(state.layouts || {}).forEach((tipoId) => syncLayoutsForTipo(tipoId));
  for (const doc of state.documentos) {
    delete doc.valores[attrId];
  }
  saveState();
  renderAll();
}

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
}

// Documentos CRUD
function onDocumentoTipoChange() {
  tempDocumentoValores = collectDocumentoCampos();
  tempDocumentoPdfFlags = collectDocumentoPdfFlags();
  clearDocumentoFieldErrors();
  renderDocumentoCampos();
  refreshTemplatePreviews();
}

function onDocumentoSubmit(e) {
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
  if (hasFormError) return;

  const valores = collectDocumentoCampos();
  const pdfVisivel = collectDocumentoPdfFlags();
  const editId = ui.documentoId.value;
  const validationErrors = validateDocumento(tipoId, valores, editId);
  if (validationErrors.length > 0) {
    applyDocumentoFieldErrors(validationErrors);
    notify(validationErrors.map((e) => e.summary).join('<br>'));
    return;
  }

  if (editId) {
    const doc = state.documentos.find((d) => d.id === editId);
    if (!doc) return;
    doc.titulo = titulo;
    doc.tipoId = tipoId;
    doc.valores = valores;
    doc.pdfVisivel = pdfVisivel;
  } else {
    state.documentos.push({
      id: makeId('doc', 'documentoCounter'),
      titulo,
      tipoId,
      valores,
      pdfVisivel,
    });
  }

  saveState();
  resetDocumentoForm();
  renderAll();
}

function editDocumento(docId) {
  const doc = state.documentos.find((d) => d.id === docId);
  if (!doc) return;

  ui.documentoId.value = doc.id;
  ui.documentoTitulo.value = doc.titulo;
  ui.documentoTipo.value = doc.tipoId;
  tempDocumentoValores = { ...doc.valores };
  tempDocumentoPdfFlags = { ...(doc.pdfVisivel || {}) };
  refreshMaterializeUI();
  renderDocumentoCampos();
}

function deleteDocumento(docId) {
  state.documentos = state.documentos.filter((d) => d.id !== docId);
  saveState();
  renderAll();
}

function resetDocumentoForm() {
  ui.documentoId.value = '';
  ui.documentoTitulo.value = '';
  ui.documentoTipo.value = '';
  tempDocumentoValores = {};
  tempDocumentoPdfFlags = {};
  clearDocumentoFieldErrors();
  renderDocumentoCampos();
  refreshTemplatePreviews();
}

function collectDocumentoCampos() {
  const tipoId = ui.documentoTipo.value;
  if (!tipoId) return {};

  const atributos = state.atributos.filter((a) => a.tipoId === tipoId);
  const valores = {};

  for (const attr of atributos) {
    const el = document.getElementById(`campo_${attr.id}`);
    if (!el) continue;
    valores[attr.id] = attr.tipoCampo === 'boolean' ? el.checked : el.value;
  }

  return valores;
}

function collectDocumentoPdfFlags() {
  const tipoId = ui.documentoTipo.value;
  if (!tipoId) return {};

  const atributos = getAtributosByTipo(tipoId);
  const flags = {};
  for (const attr of atributos) {
    const el = document.getElementById(`campo_pdf_${attr.id}`);
    flags[attr.id] = el ? Boolean(el.checked) : true;
  }
  return flags;
}

// Render
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
  refreshMaterializeUI();
}

function renderTipos() {
  ui.tiposList.innerHTML = '';
  if (state.tipos.length === 0) {
    ui.tiposList.innerHTML = '<li class="empty">Nenhum tipo cadastrado.</li>';
    return;
  }

  for (const tipo of state.tipos) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(tipo.nome)}</strong>
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

function renderTipoOptions() {
  const prevAtributo = ui.atributoTipo.value;
  const prevDocumento = ui.documentoTipo.value;
  const prevLayout = ui.layoutTipo.value;

  ui.atributoTipo.innerHTML = '';
  ui.documentoTipo.innerHTML = '<option value="">Selecione...</option>';
  ui.layoutTipo.innerHTML = '';

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
  }

  if (state.tipos.some((t) => t.id === prevAtributo)) ui.atributoTipo.value = prevAtributo;
  else if (state.tipos[0]) ui.atributoTipo.value = state.tipos[0].id;

  if (state.tipos.some((t) => t.id === prevDocumento)) ui.documentoTipo.value = prevDocumento;
  else ui.documentoTipo.value = '';

  if (state.tipos.some((t) => t.id === prevLayout)) ui.layoutTipo.value = prevLayout;
  else if (state.tipos[0]) ui.layoutTipo.value = state.tipos[0].id;
}

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
    } else {
      focusedSecaoId = null;
    }
  }
}

function renderSecaoOptions() {
  const current = ui.atributoSecao.value;
  ui.atributoSecao.innerHTML = '<option value="">Sem secao</option>';

  const tipoId = ui.atributoTipo.value;
  const secoes = tipoId ? getSecoesForTipo(tipoId) : [];
  for (const sec of secoes) {
    const opt = document.createElement('option');
    opt.value = sec.id;
    opt.textContent = sec.nome;
    ui.atributoSecao.appendChild(opt);
  }

  if (current === '' || secoes.some((s) => s.id === current)) {
    ui.atributoSecao.value = current;
  }
}

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

function getAtributosByTipo(tipoId) {
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  if (attrs.length <= 1) return attrs;

  const layout = Array.isArray(state.layouts?.[tipoId]) ? state.layouts[tipoId] : [];
  if (layout.length === 0) return attrs;

  const order = new Map(layout.map((item, idx) => [String(item.attrId), idx]));
  return attrs
    .map((attr, idx) => ({ attr, idx }))
    .sort((a, b) => {
      const oa = order.has(a.attr.id) ? order.get(a.attr.id) : Number.MAX_SAFE_INTEGER;
      const ob = order.has(b.attr.id) ? order.get(b.attr.id) : Number.MAX_SAFE_INTEGER;
      if (oa !== ob) return oa - ob;
      return a.idx - b.idx;
    })
    .map((x) => x.attr);
}

function defaultColSpanForAttr(attr) {
  if (attr.tipoCampo === 'assinatura') return 12;
  if (attr.tipoCampo === 'boolean') return 4;
  if (attr.tipoCampo === 'data') return 4;
  if (attr.tipoCampo === 'numero') return 4;
  return 6;
}

function sectionKeyFromAttr(attr) {
  return attr.secaoId || '__sem_secao__';
}

function sectionNameFromKey(key) {
  if (key === '__sem_secao__') return 'Sem secao';
  return state.secoes.find((s) => s.id === key)?.nome || 'Sem secao';
}

function syncLayoutsForTipo(tipoId) {
  if (!tipoId) return [];
  if (!state.layouts || typeof state.layouts !== 'object') state.layouts = {};

  const attrs = getAtributosByTipo(tipoId);
  const attrIds = new Set(attrs.map((a) => a.id));
  const existing = Array.isArray(state.layouts[tipoId]) ? state.layouts[tipoId] : [];
  const normalized = [];
  let changed = existing.length === 0 && attrs.length > 0;

  for (const item of existing) {
    if (!item || !attrIds.has(item.attrId)) continue;
    if (normalized.some((n) => n.attrId === item.attrId)) continue;
    const span = clampColSpan(item.colSpan);
    if (span !== item.colSpan) changed = true;
    normalized.push({
      attrId: item.attrId,
      colSpan: span,
    });
  }

  for (const attr of attrs) {
    if (normalized.some((n) => n.attrId === attr.id)) continue;
    normalized.push({
      attrId: attr.id,
      colSpan: defaultColSpanForAttr(attr),
    });
    changed = true;
  }

  if (normalized.length !== existing.length) changed = true;
  state.layouts[tipoId] = normalized;
  if (changed) saveState();
  return normalized;
}

function syncLayoutSectionsForTipo(tipoId) {
  if (!tipoId) return [];
  if (!state.layoutSections || typeof state.layoutSections !== 'object') state.layoutSections = {};

  const sectionKeys = ['__sem_secao__', ...getSecoesForTipo(tipoId).map((s) => s.id)];
  const existing = Array.isArray(state.layoutSections[tipoId]) ? state.layoutSections[tipoId] : [];
  const normalized = [];
  let changed = existing.length === 0;

  for (const key of existing) {
    if (!sectionKeys.includes(key)) continue;
    if (normalized.includes(key)) continue;
    normalized.push(key);
  }

  for (const key of sectionKeys) {
    if (normalized.includes(key)) continue;
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

  if (normalized.length !== existing.length) changed = true;
  state.layoutSections[tipoId] = normalized;
  if (changed) saveState();
  return normalized;
}

function clampColSpan(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 6;
  return Math.max(1, Math.min(12, Math.round(n)));
}

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
      const draggedSectionKey =
        currentLayoutDrag?.kind === 'section'
          ? currentLayoutDrag.key
          : e.dataTransfer?.getData('text/layout-section') ||
            e.dataTransfer?.getData('text/plain')?.replace('section:', '');
      const draggedAttrId =
        currentLayoutDrag?.kind === 'attr'
          ? currentLayoutDrag.attrId
          : e.dataTransfer?.getData('text/layout-attr') ||
            e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
      const draggedAttr =
        draggedAttrId && currentLayoutDrag?.kind === 'attr'
          ? state.atributos.find((a) => a.id === draggedAttrId && a.tipoId === tipoId)
          : null;
      const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
      const hasValidDrag =
        (draggedSectionKey && draggedSectionKey !== group.key) ||
        Boolean(draggedAttrId && fromSectionKey !== group.key);
      if (!hasValidDrag) return;
      e.preventDefault();
      section.classList.add('drag-over');
    });
    section.addEventListener('dragleave', () => section.classList.remove('drag-over'));
    section.addEventListener('drop', (e) => {
      e.preventDefault();
      section.classList.remove('drag-over');
      const draggedKey =
        currentLayoutDrag?.kind === 'section'
          ? currentLayoutDrag.key
          : e.dataTransfer?.getData('text/layout-section') ||
            e.dataTransfer?.getData('text/plain')?.replace('section:', '');
      const draggedAttrId =
        currentLayoutDrag?.kind === 'attr'
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
        const draggedId =
          currentLayoutDrag?.kind === 'attr'
            ? currentLayoutDrag.attrId
            : e.dataTransfer?.getData('text/layout-attr') ||
              e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
        if (!draggedId || draggedId === attr.id) return;
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
        const draggedId =
          currentLayoutDrag?.kind === 'attr'
            ? currentLayoutDrag.attrId
            : e.dataTransfer?.getData('text/layout-attr') ||
              e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
        if (!draggedId) return;
        const draggedAttr = state.atributos.find((a) => a.id === draggedId && a.tipoId === tipoId);
        const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
        if (fromSectionKey === group.key) {
          e.stopPropagation();
          moveLayoutItemBefore(tipoId, draggedId, attr.id);
        } else {
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

function updateLayoutSpan(tipoId, attrId, span) {
  const layout = syncLayoutsForTipo(tipoId);
  const item = layout.find((l) => l.attrId === attrId);
  if (!item) return;
  item.colSpan = clampColSpan(span);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

function moveLayoutItem(tipoId, attrId, direction) {
  const layout = syncLayoutsForTipo(tipoId);
  const idx = layout.findIndex((l) => l.attrId === attrId);
  if (idx === -1) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= layout.length) return;

  const [item] = layout.splice(idx, 1);
  layout.splice(newIdx, 0, item);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

function swapLayoutItems(tipoId, attrA, attrB) {
  const layout = syncLayoutsForTipo(tipoId);
  const idxA = layout.findIndex((l) => l.attrId === attrA);
  const idxB = layout.findIndex((l) => l.attrId === attrB);
  if (idxA < 0 || idxB < 0) return;
  [layout[idxA], layout[idxB]] = [layout[idxB], layout[idxA]];

  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

function moveLayoutItemBefore(tipoId, draggedAttrId, targetAttrId) {
  if (!draggedAttrId || !targetAttrId || draggedAttrId === targetAttrId) return;

  const layout = syncLayoutsForTipo(tipoId);
  const fromIdx = layout.findIndex((l) => l.attrId === draggedAttrId);
  const targetIdx = layout.findIndex((l) => l.attrId === targetAttrId);
  if (fromIdx < 0 || targetIdx < 0) return;

  const [dragged] = layout.splice(fromIdx, 1);
  const insertAt = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
  layout.splice(insertAt, 0, dragged);

  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

function moveLayoutSectionBefore(tipoId, draggedKey, targetKey) {
  if (!draggedKey || !targetKey || draggedKey === targetKey) return;
  if (draggedKey === '__sem_secao__' || targetKey === '__sem_secao__') return;

  const order = syncLayoutSectionsForTipo(tipoId);
  const fromIdx = order.findIndex((k) => k === draggedKey);
  const targetIdx = order.findIndex((k) => k === targetKey);
  if (fromIdx < 0 || targetIdx < 0) return;

  const [dragged] = order.splice(fromIdx, 1);
  const insertAt = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
  order.splice(insertAt, 0, dragged);
  state.layoutSections[tipoId] = order;

  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

function moveAttributeToSection(tipoId, attrId, targetSectionKey) {
  if (!attrId) return;
  const attr = state.atributos.find((a) => a.id === attrId && a.tipoId === tipoId);
  if (!attr) return;

  const nextSecaoId = targetSectionKey === '__sem_secao__' ? '' : targetSectionKey;
  if ((attr.secaoId || '') === nextSecaoId) return;

  attr.secaoId = nextSecaoId;
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
  notify('Atributo movido de secao.');
}

function moveSectionAttributesToSection(tipoId, sourceSectionKey, targetSectionKey) {
  if (!sourceSectionKey || !targetSectionKey) return;
  if (sourceSectionKey === targetSectionKey) return;

  const sourceSecaoId = sourceSectionKey === '__sem_secao__' ? '' : sourceSectionKey;
  const targetSecaoId = targetSectionKey === '__sem_secao__' ? '' : targetSectionKey;
  const toMove = state.atributos.filter(
    (a) => a.tipoId === tipoId && (a.secaoId || '') === sourceSecaoId
  );
  if (toMove.length === 0) return;

  for (const attr of toMove) attr.secaoId = targetSecaoId;
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
  notify('Secao movida para outra secao.');
}

function resetLayoutForSelectedTipo() {
  const tipoId = ui.layoutTipo.value;
  if (!tipoId) return;
  delete state.layouts[tipoId];
  delete state.layoutSections[tipoId];
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

function saveLayoutForSelectedTipo() {
  const tipoId = ui.layoutTipo.value;
  if (!tipoId) return;
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  notify('Layout salvo.');
}

function renderDocumentoCampos() {
  const tipoId = ui.documentoTipo.value;
  ui.documentoCampos.innerHTML = '';

  if (!tipoId) {
    ui.documentoCampos.innerHTML = '<p class="empty">Selecione o tipo para montar os campos.</p>';
    return;
  }

  const isEditingDocumento = Boolean(ui.documentoId.value);
  const groups = buildSectionGroupsForTipo(tipoId, { includeEmptySections: true })
    .filter((group) => group.items.length > 0)
    .filter((group) => {
      if (!isEditingDocumento) return true;
      return group.items.some((item) => {
        const attr = item.attr;
        const value = tempDocumentoValores[attr.id];
        return isAttributeValueFilled(attr, value);
      });
    });
  if (groups.length === 0) {
    ui.documentoCampos.innerHTML = '<p class="empty">Sem atributos para este tipo.</p>';
    return;
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

  refreshTemplatePreviews();
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
    if (!attr) continue;

    const key = sectionKeyFromAttr(attr);
    if (!groups.has(key)) groups.set(key, { key, nome: sectionNameFromKey(key), items: [] });
    groups.get(key).items.push({
      attr,
      colSpan: clampColSpan(item.colSpan),
    });
  }

  const ordered = sectionOrder
    .map((key) => groups.get(key))
    .filter((g) => g && (includeEmptySections || g.items.length > 0));

  const extra = Array.from(groups.values()).filter(
    (g) => !sectionOrder.includes(g.key) && (includeEmptySections || g.items.length > 0)
  );
  extra.sort((a, b) => a.nome.localeCompare(b.nome));

  return [...ordered, ...extra];
}

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

  if (attr.tipoCampo === 'numero') input.type = 'number';
  else if (attr.tipoCampo === 'data') input.type = 'date';
  else input.type = 'text';

  input.value = String(value);
  input.addEventListener('input', () => clearFieldError(input));
  input.addEventListener('change', () => clearFieldError(input));
  return input;
}

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

function buildPreview(doc) {
  const attrs = state.atributos.filter((a) => a.tipoId === doc.tipoId).slice(0, 3);
  if (attrs.length === 0) return 'Sem atributos';
  const ctx = buildPlaceholderContext(doc.tipoId, doc.valores, doc.titulo);
  const maxFieldText = 42;
  const maxPreviewText = 170;
  const truncate = (value, max) => {
    const text = String(value ?? '');
    if (text.length <= max) return text;
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

function isValidatorSyntaxValid(raw) {
  if (!raw) return true;
  const parsed = parseValidatorRules(raw);
  return parsed.invalid.length === 0;
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

  if (!raw) return result;

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
      } else {
        result.invalid.push(token);
      }
      continue;
    }
    if (lowered.startsWith('required_if:@')) {
      const fieldName = token.slice('required_if:@'.length).trim();
      if (fieldName) {
        result.requiredIfFieldNames.push(fieldName);
      } else {
        result.invalid.push(token);
      }
      continue;
    }
    result.invalid.push(token);
  }

  return result;
}

function validateDocumento(tipoId, valores, editingDocId) {
  const errors = [];
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  const attrsByName = new Map(
    attrs.map((a) => [String(a.nome || '').trim().toLowerCase(), a])
  );

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
        if (!refAttr) return false;
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

    if (empty && rules.hasNullable) continue;
    if (empty) continue;

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
      } else if (String(raw).length > rules.max) {
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
        if (doc.id === editingDocId) return false;
        if (doc.tipoId !== tipoId) return false;
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

function applyDocumentoFieldErrors(errors) {
  for (const error of errors) {
    const field = document.getElementById(`campo_${error.attrId}`);
    if (!field) continue;
    markFieldError(field, error.message);
  }
}

function clearDocumentoFieldErrors() {
  clearFieldError(ui.documentoTitulo);
  clearFieldError(ui.documentoTipo);
  ui.documentoForm
    .querySelectorAll('#documentoCampos input, #documentoCampos select')
    .forEach((field) => clearFieldError(field));
}

function markFieldError(field, message) {
  if (!field) return;
  const target = getDisplayTarget(field);
  target.classList.add('app-invalid');

  const container = field.closest('.input-field') || field.closest('.doc-field-label');
  if (!container) return;
  container.classList.add('app-field-has-error');

  let messageEl = container.querySelector('.field-error-text');
  if (!messageEl) {
    messageEl = document.createElement('small');
    messageEl.className = 'field-error-text';
    container.appendChild(messageEl);
  }
  messageEl.textContent = message;
}

function clearFieldError(field) {
  if (!field) return;
  const target = getDisplayTarget(field);
  target.classList.remove('app-invalid');

  const container = field.closest('.input-field') || field.closest('.doc-field-label');
  if (!container) return;
  container.classList.remove('app-field-has-error');
  const messageEl = container.querySelector('.field-error-text');
  if (messageEl) messageEl.remove();
}

function getDisplayTarget(field) {
  if (field.tagName === 'SELECT') {
    const dropdown = field
      .closest('.input-field')
      ?.querySelector('input.select-dropdown');
    if (dropdown) return dropdown;
  }
  return field;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidDateValue(value) {
  if (value === null || value === undefined) return false;
  const text = String(value).trim();
  if (!text) return false;

  // Accepts ISO-like date inputs from <input type="date"> and parseable date strings.
  const parsed = new Date(text);
  return !Number.isNaN(parsed.getTime());
}

function isAttributeValueFilled(attr, value) {
  if (attr.tipoCampo === 'boolean') return value === true;
  if (value === null || value === undefined) return false;
  return String(value).trim() !== '';
}

function normalizePlaceholderKey(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function buildPlaceholderContext(tipoId, valores, titulo = '') {
  const ctx = new Map();
  const attrs = getAtributosByTipo(tipoId);

  const put = (key, value) => {
    const normalized = normalizePlaceholderKey(key);
    if (!normalized) return;
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
  const templateAttrs = attrs.filter(
    (attr) => attr.tipoCampo === 'texto_placeholder' || attr.tipoCampo === 'textarea_template'
  );
  for (let pass = 0; pass < 3; pass += 1) {
    for (const attr of templateAttrs) {
      const raw = valores[attr.id];
      const base =
        raw === undefined || raw === null || raw === ''
          ? (attr.tipoCampo === 'texto_placeholder' ? attr.templateTexto || '' : '')
          : raw;
      const resolved = resolveTemplateTextForOutput(base, ctx);
      put(attr.id, resolved);
      put(attr.nome, resolved);
    }
  }

  return ctx;
}

function formatCurrentDateBr() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = String(now.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function buildHeaderFooterPlaceholderContext(tipoId, valores, titulo = '') {
  const ctx = buildPlaceholderContext(tipoId, valores, titulo);
  const today = formatCurrentDateBr();
  const put = (key, value) => {
    const normalized = normalizePlaceholderKey(key);
    if (!normalized) return;
    ctx.set(normalized, String(value ?? ''));
  };
  put('data', today);
  put('data_atual', today);
  return ctx;
}

function applyPlaceholderTemplate(text, ctx) {
  return String(text ?? '').replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_full, token) => {
    const key = normalizePlaceholderKey(token);
    if (ctx.has(key)) return ctx.get(key) ?? '';
    if (key === 'data' || key === 'data_atual') return formatCurrentDateBr();
    return '';
  });
}

function resolveTemplateTextForOutput(text, ctx) {
  const source = String(text ?? '');
  if (!source) return '';
  if (!source.includes('{{')) return source;
  return applyPlaceholderTemplate(source, ctx);
}

function resolveAttrValueForOutput(attr, raw, ctx) {
  if (attr.tipoCampo === 'boolean') return raw ? 'Sim' : 'Nao';

  let base = raw;
  if (
    (base === undefined || base === null || base === '') &&
    attr.tipoCampo === 'texto_placeholder'
  ) {
    base = attr.templateTexto || '';
  }
  if (base === undefined || base === null || base === '') return '-';

  const text = String(base);
  if (attr.tipoCampo === 'textarea_template' || attr.tipoCampo === 'texto_placeholder') {
    const resolved = resolveTemplateTextForOutput(text, ctx).trim();
    return resolved || '-';
  }

  return text;
}

function refreshTemplatePreviews() {
  const tipoId = ui.documentoTipo.value;
  if (!tipoId) return;

  const valores = collectDocumentoCampos();
  const ctx = buildPlaceholderContext(tipoId, valores, ui.documentoTitulo.value.trim());

  ui.documentoCampos
    .querySelectorAll('[data-template-preview="1"]')
    .forEach((field) => {
      const label = field.closest('label');
      if (!label) return;
      let preview = label.querySelector('.doc-template-preview');
      if (field.dataset.templateKind !== 'text' && field.dataset.templateKind !== 'textarea') {
        if (preview) preview.remove();
        return;
      }

      const source = String(field.value || field.dataset.templateDefault || '');
      if (!source.includes('{{')) {
        if (preview) preview.remove();
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

function toggleAtributoTemplateConfig() {
  const show = ui.atributoTipoCampo.value === 'texto_placeholder';
  if (ui.atributoTemplateWrap) {
    ui.atributoTemplateWrap.style.display = show ? '' : 'none';
  }
}

function applyMask(value, mask) {
  const payload = extractMaskPayload(String(value), mask);
  let out = '';
  let index = 0;

  for (const ch of mask) {
    if (ch === '9') {
      if (index >= payload.length) break;
      out += payload[index++];
      continue;
    }

    if (payload.length > 0) out += ch;
  }

  return out;
}

function extractMaskPayload(value, mask) {
  const literals = new Set(mask.split('').filter((ch) => ch !== '9'));
  return value
    .split('')
    .filter((ch) => !literals.has(ch))
    .join('');
}

function matchesMask(value, mask) {
  if (value.length !== mask.length) return false;

  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === '9') continue;
    if (value[i] !== mask[i]) return false;
  }

  const requiredWildcards = mask.split('').filter((ch) => ch === '9').length;
  const payload = extractMaskPayload(value, mask);
  return payload.length === requiredWildcards;
}

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
  const placeholderCtx = buildHeaderFooterPlaceholderContext(
    documento.tipoId,
    documento.valores,
    documento.titulo
  );
  const tipoCabecalho = resolveTemplateTextForOutput(tipo?.cabecalho || '', placeholderCtx).trim();
  const tipoRodape = resolveTemplateTextForOutput(tipo?.rodape || '', placeholderCtx).trim();

  const pdf = new lib.jsPDF({ unit: 'pt', format: 'a4' });
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  const palette = {
    tealHeader: [0, 121, 107], // approx Materialize teal darken-2
    textMain: [38, 50, 56],
    textMuted: [96, 125, 139],
    textLight: [120, 144, 156],
    cardBorder: [223, 229, 232], // #dfe5e8
    cardBg: [255, 255, 255],
    chipBg: [250, 252, 253], // #fafcfd
  };

  const ensureSpace = (required = 20) => {
    if (y + required <= pageHeight - margin) return;
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

  // Header stripe uses Tipo cabecalho (with placeholders) as its content.
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

  const groups = buildSectionGroupsForTipo(documento.tipoId, { includeEmptySections: true }).filter(
    (group) => group.key !== '__sem_secao__' || group.items.length > 0
  );

  const signatureAttrs = groups
    .flatMap((group) => group.items)
    .map((item) => item.attr)
    .filter((attr) => attr.tipoCampo === 'assinatura' && pdfVisivel[attr.id] !== false);

  if (groups.length === 0) {
    addText('Sem secoes/atributos configurados para este tipo.', { size: 11 });
  } else {
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
        const hideFieldName = attr.tipoCampo === 'textarea' || attr.tipoCampo === 'textarea_template';
        const campo = hideFieldName ? '' : String(attr.nome);
        return { campo, valor: String(value) };
      });
      if (rows.length === 0) continue;

      const tableX = margin + (group.key === semSecaoKey ? 0 : sectionPadding);
      const tableWidth = contentWidth - (group.key === semSecaoKey ? 0 : sectionPadding * 2);
      const col1Width = tableWidth * col1Ratio;
      const col2Width = tableWidth - col1Width;

      const measuredRows = rows.map((row) => {
        const campoLines = pdf.splitTextToSize(row.campo, col1Width - 8);
        const valorLines = pdf.splitTextToSize(row.valor, col2Width - 8);
        const height = Math.max(campoLines.length, valorLines.length) * rowLineHeight + rowPaddingY * 2;
        return { ...row, campoLines, valorLines, height };
      });
      const sectionInfoWidth = tableWidth - 8;
      const headerLines =
        group.key !== semSecaoKey && secaoCabecalho
          ? pdf.splitTextToSize(secaoCabecalho, sectionInfoWidth)
          : [];
      const footerLines =
        group.key !== semSecaoKey && secaoRodape
          ? pdf.splitTextToSize(`Rodape: ${secaoRodape}`, sectionInfoWidth)
          : [];
      const headerInfoHeight =
        headerLines.length > 0 ? headerLines.length * sectionInfoLineHeight + sectionInfoPadY * 2 : 0;
      const footerInfoHeight =
        footerLines.length > 0 ? footerLines.length * sectionInfoLineHeight + sectionInfoPadY * 2 : 0;
      const headerInfoTotal = headerInfoHeight > 0 ? headerInfoHeight + sectionInfoGap : 0;
      const footerInfoTotal = footerInfoHeight > 0 ? sectionInfoGap + footerInfoHeight : 0;

      const tableBodyHeight = measuredRows.reduce((sum, r) => sum + r.height, 0);
      const tableHeight = tableHeaderHeight + tableBodyHeight;
      const titleHeight = group.key === semSecaoKey ? 0 : sectionHeaderHeight;
      const wrapperHeight =
        group.key === semSecaoKey
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
      } else {
        cursorY = y;
      }

      // Header da tabela
      pdf.setDrawColor(...palette.cardBorder);
      pdf.setFillColor(...palette.chipBg);
      pdf.rect(tableX, cursorY, tableWidth, tableHeaderHeight, 'FD');
      pdf.line(tableX + col1Width, cursorY, tableX + col1Width, cursorY + tableHeaderHeight);

      let rowY = cursorY + tableHeaderHeight;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor(...palette.textMuted);
      for (const row of measuredRows) {
        pdf.rect(tableX, rowY, tableWidth, row.height);
        pdf.line(tableX + col1Width, rowY, tableX + col1Width, rowY + row.height);

        let cY = rowY + rowPaddingY + 8;
        for (const line of row.campoLines) {
          pdf.text(line, tableX + 4, cY);
          cY += rowLineHeight;
        }

        let vY = rowY + rowPaddingY + 8;
        for (const line of row.valorLines) {
          pdf.text(line, tableX + col1Width + 4, vY);
          vY += rowLineHeight;
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
  }

  // Signature blocks centered and close to the document end.
  if (signatureAttrs.length > 0) {
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
    const footerReserved =
      tipoRodape
        ? Math.max(1, pdf.splitTextToSize(String(tipoRodape), contentWidth).length) * footerGap + 10
        : 0;
    const lastAvailableY = pageHeight - bottomOffset - footerReserved;

    if (y + totalHeight > lastAvailableY) {
      pdf.addPage();
      y = margin;
    }

    const startY = Math.max(y + 10, lastAvailableY - totalHeight);
    const centerX = pageWidth / 2;
    pdf.setDrawColor(...palette.textMuted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(signatureNameFont);
    pdf.setTextColor(...palette.textMuted);

    for (let i = 0; i < signatureAttrs.length; i += 1) {
      const attr = signatureAttrs[i];
      const rawName = documento.valores[attr.id];
      const name = rawName ? String(rawName) : '';
      const blockTop = startY + i * (blockHeight + signatureGap);
      const boxX = centerX - signatureBoxWidth / 2;
      const lineY = blockTop + signatureBoxHeight - signatureInnerPadding;
      const x1 = boxX + signatureInnerPadding;
      const x2 = boxX + signatureBoxWidth - signatureInnerPadding;

      // Empty signature area for hand signing.
      pdf.rect(boxX, blockTop, signatureBoxWidth, signatureBoxHeight);
      pdf.line(x1, lineY, x2, lineY);

      const label = name.trim() ? `Assinatura: ${name}` : 'Assinatura';
      const labelWidth = pdf.getTextWidth(label);
      pdf.text(label, centerX - labelWidth / 2, lineY + signatureCaptionGap);
    }

    y = startY + totalHeight + 6;
  }

  if (tipoRodape) {
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
  }

  const safeTitle = String(documento.titulo || 'documento')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '');

  pdf.save(`${safeTitle || 'documento'}.pdf`);
}

function groupAtributosByTipo(tipoId) {
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  if (attrs.length === 0) return [];

  const semSecaoKey = '__sem_secao__';
  const grouped = new Map();

  for (const attr of attrs) {
    const secao = state.secoes.find((s) => s.id === attr.secaoId);
    const key = attr.secaoId || semSecaoKey;
    const nome = secao?.nome || 'Sem secao';

    if (!grouped.has(key)) grouped.set(key, { nome, attrs: [] });
    grouped.get(key).attrs.push(attr);
  }

  return Array.from(grouped.entries())
    .sort((a, b) => {
      if (a[0] === semSecaoKey) return -1;
      if (b[0] === semSecaoKey) return 1;
      return a[1].nome.localeCompare(b[1].nome);
    })
    .map(([, value]) => value);
}

function refreshMaterializeUI() {
  if (!window.M) return;

  document.querySelectorAll('select').forEach((el) => {
    const selectInstance = M.FormSelect.getInstance(el);
    if (selectInstance) selectInstance.destroy();
  });
  M.FormSelect.init(document.querySelectorAll('select'));

  document.querySelectorAll('.tabs').forEach((el) => {
    const tabsInstance = M.Tabs.getInstance(el);
    if (tabsInstance) tabsInstance.destroy();
  });
  M.Tabs.init(document.querySelectorAll('.tabs'));

  M.updateTextFields();
  document.querySelectorAll('textarea.materialize-textarea').forEach((el) => {
    if (M.textareaAutoResize) M.textareaAutoResize(el);
  });
}

function notify(message) {
  if (window.M && M.toast) {
    M.toast({ html: message });
    return;
  }
  alert(message);
}

function initRouting() {
  syncTabFromRoute();
}

function syncTabFromRoute() {
  const hash = String(window.location.hash || '').replace(/^#/, '');
  if (!hash) return;
  const panel = document.getElementById(hash);
  if (!panel) return;
  openTab(hash);
}

function openTab(tabId) {
  if (!window.M) return;
  const tabsEl = document.querySelector('.tabs');
  if (!tabsEl) return;
  const instance = M.Tabs.getInstance(tabsEl);
  if (instance) instance.select(tabId);
}

function focusSecaoCard(secaoId) {
  focusedSecaoId = secaoId;
  openTab('tab-secoes');
  renderSecoes();
}
