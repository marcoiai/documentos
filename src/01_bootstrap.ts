Object.keys(ui).forEach((key) => {
  if (!ui[key]) ui[key] = createUiStub();
});

let tempDocumentoValores: Record<string, unknown> = {};
let tempDocumentoPdfFlags: Record<string, boolean> = {};
let currentLayoutDrag: { kind: 'section'; key: string } | { kind: 'attr'; attrId: string } | null = null;
let focusedSecaoId: string | null = null;

bindEvents();
renderAll();
initRouting();
