// @ts-nocheck
function deleteDocumento(docId) {
  state.documentos = state.documentos.filter((d) => d.id !== docId);
  saveState();
  renderAll();
}

