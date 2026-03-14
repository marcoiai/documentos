// @ts-nocheck
function editTipo(tipoId) {
  const tipo = state.tipos.find((t) => t.id === tipoId);
  if (!tipo) return;
  ui.tipoId.value = tipo.id;
  ui.tipoNome.value = tipo.nome;
  ui.tipoCabecalho.value = tipo.cabecalho || '';
  ui.tipoRodape.value = tipo.rodape || '';
  renderTipoSecoes();
  refreshMaterializeUI();
  openAppModal(ui.tipoModal);
}
