// @ts-nocheck
function swapLayoutItems(tipoId, attrA, attrB) {
  const layout = syncLayoutsForTipo(tipoId);
  const idxA = layout.findIndex((l) => l.attrId === attrA);
  const idxB = layout.findIndex((l) => l.attrId === attrB);
  if (idxA < 0 || idxB < 0) return;
  [layout[idxA], layout[idxB]] = [layout[idxB], layout[idxA]];

  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

