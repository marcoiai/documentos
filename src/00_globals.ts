const STORAGE_KEY = 'documentos_app_v2';

const state: AppState = loadState();
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
} as Record<string, any>;
