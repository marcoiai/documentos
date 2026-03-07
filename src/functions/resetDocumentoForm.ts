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
}

