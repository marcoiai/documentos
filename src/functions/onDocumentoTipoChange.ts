// @ts-nocheck
function onDocumentoTipoChange() {
  tempDocumentoValores = collectDocumentoCampos();
  tempDocumentoPdfFlags = collectDocumentoPdfFlags();
  clearDocumentoFieldErrors();
  renderDocumentoCampos();
  refreshTemplatePreviews();
}

