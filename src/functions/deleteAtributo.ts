// @ts-nocheck
function deleteAtributo(attrId) {
  state.atributos = state.atributos.filter((a) => a.id !== attrId);
  Object.keys(state.layouts || {}).forEach((tipoId) => syncLayoutsForTipo(tipoId));
  for (const doc of state.documentos) {
    delete doc.valores[attrId];
  }
  saveState();
  renderAll();
}

