// @ts-nocheck
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

