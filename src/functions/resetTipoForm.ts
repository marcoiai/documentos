// @ts-nocheck
function resetTipoForm() {
  ui.tipoId.value = '';
  ui.tipoNome.value = '';
  ui.tipoCabecalho.value = '';
  ui.tipoRodape.value = '';
  renderTipoSecoes();
  closeAppModal(ui.tipoModal);
}

// Secoes CRUD
