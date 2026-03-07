const STORAGE_KEY = 'documentos_app_v2';

const HARD_TIPOS = [
  { id: 'tipo_1', nome: 'Tipo 1' },
  { id: 'tipo_2', nome: 'Tipo 2' },
];

const state = loadState();
const ui = {
  // secoes
  secaoForm: document.getElementById('secaoForm'),
  secaoId: document.getElementById('secaoId'),
  secaoNome: document.getElementById('secaoNome'),
  secaoCancelBtn: document.getElementById('secaoCancelBtn'),
  secoesList: document.getElementById('secoesList'),

  // atributos
  atributoForm: document.getElementById('atributoForm'),
  atributoId: document.getElementById('atributoId'),
  atributoTipo: document.getElementById('atributoTipo'),
  atributoNome: document.getElementById('atributoNome'),
  atributoTipoCampo: document.getElementById('atributoTipoCampo'),
  atributoSecao: document.getElementById('atributoSecao'),
  atributoValidador: document.getElementById('atributoValidador'),
  atributoPeso: document.getElementById('atributoPeso'),
  atributoMascara: document.getElementById('atributoMascara'),
  atributoCancelBtn: document.getElementById('atributoCancelBtn'),
  atributosList: document.getElementById('atributosList'),

  // documentos
  documentoForm: document.getElementById('documentoForm'),
  documentoId: document.getElementById('documentoId'),
  documentoTitulo: document.getElementById('documentoTitulo'),
  documentoTipo: document.getElementById('documentoTipo'),
  documentoCampos: document.getElementById('documentoCampos'),
  documentoCancelBtn: document.getElementById('documentoCancelBtn'),
  documentosList: document.getElementById('documentosList'),
};

let tempDocumentoValores = {};

bindEvents();
renderAll();

function bindEvents() {
  ui.secaoForm.addEventListener('submit', onSecaoSubmit);
  ui.secaoCancelBtn.addEventListener('click', resetSecaoForm);

  ui.atributoForm.addEventListener('submit', onAtributoSubmit);
  ui.atributoTipo.addEventListener('change', renderAtributos);
  ui.atributoCancelBtn.addEventListener('click', resetAtributoForm);

  ui.documentoForm.addEventListener('submit', onDocumentoSubmit);
  ui.documentoTipo.addEventListener('change', onDocumentoTipoChange);
  ui.documentoCancelBtn.addEventListener('click', resetDocumentoForm);
}

function loadState() {
  const fallback = {
    secaoCounter: 1,
    atributoCounter: 1,
    documentoCounter: 1,
    secoes: [],
    atributos: [],
    documentos: [],
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed) return fallback;
    return {
      ...fallback,
      ...parsed,
      secoes: Array.isArray(parsed.secoes) ? parsed.secoes : [],
      atributos: Array.isArray(parsed.atributos) ? parsed.atributos : [],
      documentos: Array.isArray(parsed.documentos) ? parsed.documentos : [],
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function makeId(prefix, key) {
  return `${prefix}_${state[key]++}`;
}

function tipoNome(tipoId) {
  return HARD_TIPOS.find((t) => t.id === tipoId)?.nome || tipoId;
}

// Secoes CRUD
function onSecaoSubmit(e) {
  e.preventDefault();
  const nome = ui.secaoNome.value.trim();
  if (!nome) return;

  const editId = ui.secaoId.value;
  if (editId) {
    const sec = state.secoes.find((s) => s.id === editId);
    if (!sec) return;
    sec.nome = nome;
  } else {
    state.secoes.push({ id: makeId('sec', 'secaoCounter'), nome });
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
}

function deleteSecao(secaoId) {
  const usedByAttr = state.atributos.some((a) => a.secaoId === secaoId);
  if (usedByAttr) {
    alert('Nao pode remover secao em uso por atributos.');
    return;
  }

  state.secoes = state.secoes.filter((s) => s.id !== secaoId);
  saveState();
  renderAll();
}

function resetSecaoForm() {
  ui.secaoId.value = '';
  ui.secaoNome.value = '';
}

// Atributos CRUD
function onAtributoSubmit(e) {
  e.preventDefault();

  const tipoId = ui.atributoTipo.value;
  const nome = ui.atributoNome.value.trim();
  const tipoCampo = ui.atributoTipoCampo.value;
  const secaoId = ui.atributoSecao.value;
  const validador = ui.atributoValidador.value.trim();
  const pesoRaw = ui.atributoPeso.value.trim();
  const mascara = ui.atributoMascara.value.trim();
  if (!tipoId || !nome) return;
  if (!isValidatorSyntaxValid(validador)) {
    alert('Validador invalido. Use: number, unique, max:n, required, nullable, date');
    return;
  }
  if (pesoRaw && !Number.isFinite(Number(pesoRaw))) {
    alert('Peso invalido. Informe um numero decimal.');
    return;
  }
  const peso = pesoRaw === '' ? null : Number(pesoRaw);

  const editId = ui.atributoId.value;
  if (editId) {
    const attr = state.atributos.find((a) => a.id === editId);
    if (!attr) return;
    attr.tipoId = tipoId;
    attr.nome = nome;
    attr.tipoCampo = tipoCampo;
    attr.secaoId = secaoId;
    attr.validador = validador;
    attr.peso = peso;
    attr.mascara = mascara;
  } else {
    state.atributos.push({
      id: makeId('att', 'atributoCounter'),
      tipoId,
      nome,
      tipoCampo,
      secaoId,
      validador,
      peso,
      mascara,
    });
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
  renderAtributos();
}

function deleteAtributo(attrId) {
  state.atributos = state.atributos.filter((a) => a.id !== attrId);
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
}

// Documentos CRUD
function onDocumentoTipoChange() {
  tempDocumentoValores = collectDocumentoCampos();
  renderDocumentoCampos();
}

function onDocumentoSubmit(e) {
  e.preventDefault();

  const titulo = ui.documentoTitulo.value.trim();
  const tipoId = ui.documentoTipo.value;
  if (!titulo || !tipoId) return;

  const valores = collectDocumentoCampos();
  const editId = ui.documentoId.value;
  const validationErrors = validateDocumento(tipoId, valores, editId);
  if (validationErrors.length > 0) {
    alert(validationErrors.join('\n'));
    return;
  }

  if (editId) {
    const doc = state.documentos.find((d) => d.id === editId);
    if (!doc) return;
    doc.titulo = titulo;
    doc.tipoId = tipoId;
    doc.valores = valores;
  } else {
    state.documentos.push({
      id: makeId('doc', 'documentoCounter'),
      titulo,
      tipoId,
      valores,
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
  renderDocumentoCampos();
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

// Render
function renderAll() {
  renderSecoes();
  renderSecaoOptions();
  renderAtributos();
  renderDocumentoCampos();
  renderDocumentos();
}

function renderSecoes() {
  ui.secoesList.innerHTML = '';
  if (state.secoes.length === 0) {
    ui.secoesList.innerHTML = '<li class="empty">Nenhuma secao cadastrada.</li>';
    return;
  }

  for (const sec of state.secoes) {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div>
        <strong>${escapeHtml(sec.nome)}</strong>
      </div>
      <div class="row">
        <button type="button" class="ghost" data-edit="${sec.id}">Editar</button>
        <button type="button" class="danger" data-delete="${sec.id}">Excluir</button>
      </div>
    `;

    li.querySelector('[data-edit]').addEventListener('click', () => editSecao(sec.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteSecao(sec.id));
    ui.secoesList.appendChild(li);
  }
}

function renderSecaoOptions() {
  const current = ui.atributoSecao.value;
  ui.atributoSecao.innerHTML = '<option value="">Sem secao</option>';

  for (const sec of state.secoes) {
    const opt = document.createElement('option');
    opt.value = sec.id;
    opt.textContent = sec.nome;
    ui.atributoSecao.appendChild(opt);
  }

  if (current === '' || state.secoes.some((s) => s.id === current)) {
    ui.atributoSecao.value = current;
  }
}

function renderAtributos() {
  const tipoId = ui.atributoTipo.value;
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);

  ui.atributosList.innerHTML = '';
  if (attrs.length === 0) {
    ui.atributosList.innerHTML = '<li class="empty">Nenhum atributo para este tipo.</li>';
    return;
  }

  for (const attr of attrs) {
    const secao = state.secoes.find((s) => s.id === attr.secaoId);
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div>
        <strong>${escapeHtml(attr.nome)}</strong>
        <small>${escapeHtml(attr.tipoCampo)} | secao: ${escapeHtml(secao?.nome || '-')}</small>
        <small>validador: ${escapeHtml(attr.validador || '-')}</small>
        <small>peso: ${escapeHtml(attr.peso ?? '-')}</small>
        <small>mascara: ${escapeHtml(attr.mascara || '-')}</small>
      </div>
      <div class="row">
        <button type="button" class="ghost" data-edit="${attr.id}">Editar</button>
        <button type="button" class="danger" data-delete="${attr.id}">Excluir</button>
      </div>
    `;

    li.querySelector('[data-edit]').addEventListener('click', () => editAtributo(attr.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteAtributo(attr.id));
    ui.atributosList.appendChild(li);
  }
}

function renderDocumentoCampos() {
  const tipoId = ui.documentoTipo.value;
  ui.documentoCampos.innerHTML = '';

  if (!tipoId) {
    ui.documentoCampos.innerHTML = '<p class="empty">Selecione o tipo para montar os campos.</p>';
    return;
  }

  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  if (attrs.length === 0) {
    ui.documentoCampos.innerHTML = '<p class="empty">Sem atributos para este tipo.</p>';
    return;
  }

  const SEM_SECAO_KEY = '__sem_secao__';
  const grouped = new Map();
  for (const attr of attrs) {
    const secao = state.secoes.find((s) => s.id === attr.secaoId);
    const key = attr.secaoId || SEM_SECAO_KEY;
    const nome = secao?.nome || 'Sem secao';

    if (!grouped.has(key)) grouped.set(key, { nome, attrs: [] });
    grouped.get(key).attrs.push(attr);
  }

  const orderedSections = Array.from(grouped.entries()).sort((a, b) => {
    if (a[0] === SEM_SECAO_KEY) return -1;
    if (b[0] === SEM_SECAO_KEY) return 1;
    return a[1].nome.localeCompare(b[1].nome);
  });

  for (const [, group] of orderedSections) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'section-box';

    const legend = document.createElement('legend');
    legend.textContent = group.nome;
    fieldset.appendChild(legend);

    for (const attr of group.attrs) {
      const label = document.createElement('label');
      label.textContent = attr.nome;

      const input = buildInput(attr, `campo_${attr.id}`, tempDocumentoValores[attr.id] ?? '');
      label.appendChild(input);
      fieldset.appendChild(label);
    }

    ui.documentoCampos.appendChild(fieldset);
  }
}

function buildInput(attr, id, value) {
  const input = document.createElement('input');
  input.id = id;

  if (attr.tipoCampo === 'boolean') {
    input.type = 'checkbox';
    input.checked = Boolean(value);
    return input;
  }

  if (attr.mascara) {
    input.type = 'text';
    input.placeholder = attr.mascara;
    input.value = applyMask(String(value), attr.mascara);
    input.addEventListener('input', () => {
      input.value = applyMask(input.value, attr.mascara);
    });
    return input;
  }

  if (attr.tipoCampo === 'numero') input.type = 'number';
  else if (attr.tipoCampo === 'data') input.type = 'date';
  else input.type = 'text';

  input.value = String(value);
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
    li.className = 'item';
    li.innerHTML = `
      <div>
        <strong>${escapeHtml(doc.titulo)}</strong>
        <small>${escapeHtml(tipoNome(doc.tipoId))}</small>
        <small>${escapeHtml(buildPreview(doc))}</small>
      </div>
      <div class="row">
        <button type="button" class="ghost" data-edit="${doc.id}">Editar</button>
        <button type="button" class="danger" data-delete="${doc.id}">Excluir</button>
      </div>
    `;

    li.querySelector('[data-edit]').addEventListener('click', () => editDocumento(doc.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteDocumento(doc.id));
    ui.documentosList.appendChild(li);
  }
}

function buildPreview(doc) {
  const attrs = state.atributos.filter((a) => a.tipoId === doc.tipoId).slice(0, 3);
  if (attrs.length === 0) return 'Sem atributos';

  return attrs
    .map((a) => {
      const raw = doc.valores[a.id];
      const val = a.tipoCampo === 'boolean' ? (raw ? 'Sim' : 'Nao') : raw || '-';
      return `${a.nome}: ${val}`;
    })
    .join(' | ');
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
    max: null,
    invalid: [],
  };

  if (!raw) return result;

  const tokens = raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  for (const token of tokens) {
    if (token === 'number') {
      result.hasNumber = true;
      continue;
    }
    if (token === 'date') {
      result.hasDate = true;
      continue;
    }
    if (token === 'unique') {
      result.hasUnique = true;
      continue;
    }
    if (token === 'required') {
      result.hasRequired = true;
      continue;
    }
    if (token === 'nullable') {
      result.hasNullable = true;
      continue;
    }
    if (token.startsWith('max:')) {
      const value = Number(token.slice(4));
      if (Number.isFinite(value) && value >= 0) {
        result.max = value;
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

  for (const attr of attrs) {
    const rules = parseValidatorRules(attr.validador || '');
    const raw = valores[attr.id];
    const empty = attr.tipoCampo === 'boolean' ? false : String(raw ?? '').trim() === '';

    if (rules.hasRequired && empty) {
      errors.push(`${attr.nome}: campo obrigatorio`);
      continue;
    }

    if (empty && rules.hasNullable) continue;
    if (empty) continue;

    if (attr.mascara && !matchesMask(String(raw), attr.mascara)) {
      errors.push(`${attr.nome}: valor nao corresponde a mascara ${attr.mascara}`);
      continue;
    }

    if (rules.hasNumber) {
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        errors.push(`${attr.nome}: deve ser numero`);
        continue;
      }
    }

    if (rules.hasDate) {
      if (!isValidDateValue(raw)) {
        errors.push(`${attr.nome}: deve ser uma data valida`);
        continue;
      }
    }

    if (rules.max !== null) {
      if (attr.tipoCampo === 'numero' || rules.hasNumber) {
        const num = Number(raw);
        if (!Number.isFinite(num) || num > rules.max) {
          errors.push(`${attr.nome}: valor maximo ${rules.max}`);
          continue;
        }
      } else if (String(raw).length > rules.max) {
        errors.push(`${attr.nome}: tamanho maximo ${rules.max}`);
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
        errors.push(`${attr.nome}: valor deve ser unico`);
      }
    }
  }

  return errors;
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
