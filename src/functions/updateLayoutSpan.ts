// @ts-nocheck
function updateLayoutSpan(tipoId, attrId, span) {
  const layout = syncLayoutsForTipo(tipoId);
  const item = layout.find((l) => l.attrId === attrId);
  if (!item) return;
  item.colSpan = clampColSpan(span);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

