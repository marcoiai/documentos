Object.keys(ui).forEach((key) => {
  if (!ui[key]) ui[key] = createUiStub();
});

let tempDocumentoValores: Record<string, unknown> = {};
let tempDocumentoPdfFlags: Record<string, boolean> = {};
let currentLayoutDrag: { kind: 'section'; key: string } | { kind: 'attr'; attrId: string } | null = null;
let focusedSecaoId: string | null = null;
let relatorioCurrentLayout: LayoutItem[] = [];
let relatorioSavedLayout: LayoutItem[] = [];
let relatorioLayoutWorking: LayoutItem[] = [];
let relatorioLayoutWorkingConfigId = '';
let relatorioLayoutDragAttrId = '';
let relatorioSavedBlockOrder: string[] = [];
let relatorioLayoutBlocksWorking: string[] = [];
let relatorioSavedBlockVisibility: Record<string, boolean> = {};
let relatorioLayoutBlockVisibilityWorking: Record<string, boolean> = {};
let relatorioSavedFooterMode: 'fixed_bottom' | 'after_block' = 'fixed_bottom';
let relatorioSavedFooterAnchor = 'tabela';
let relatorioLayoutFooterModeWorking: 'fixed_bottom' | 'after_block' = 'fixed_bottom';
let relatorioLayoutFooterAnchorWorking = 'tabela';
let relatorioOrdenacaoWorking: Array<{ attrId: string; direcao: 'asc' | 'desc' }> = [];
let relatorioTotalAttrIdsWorking: string[] = [];
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
