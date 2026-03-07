// @ts-nocheck
function resetLayoutForSelectedTipo() {
  const tipoId = ui.layoutTipo.value;
  if (!tipoId) return;
  delete state.layouts[tipoId];
  delete state.layoutSections[tipoId];
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

