// @ts-nocheck
function clearDocumentoFieldErrors() {
  clearFieldError(ui.documentoTitulo);
  clearFieldError(ui.documentoTipo);
  ui.documentoForm
    .querySelectorAll('#documentoCampos input, #documentoCampos select')
    .forEach((field) => clearFieldError(field));
}

