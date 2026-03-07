// @ts-nocheck
function deleteTipo(tipoId) {
  const hasAttrs = state.atributos.some((a) => a.tipoId === tipoId);
  const hasDocs = state.documentos.some((d) => d.tipoId === tipoId);
  if (hasAttrs || hasDocs) {
    notify('Nao pode excluir tipo em uso por atributos/documentos.');
    return;
  }

  state.tipos = state.tipos.filter((t) => t.id !== tipoId);
  delete state.layouts[tipoId];
  delete state.layoutSections[tipoId];
  delete state.tipoSecoes[tipoId];

  if (ui.atributoTipo.value === tipoId) ui.atributoTipo.value = '';
  if (ui.documentoTipo.value === tipoId) ui.documentoTipo.value = '';
  if (ui.layoutTipo.value === tipoId) ui.layoutTipo.value = '';

  saveState();
  renderAll();
}

