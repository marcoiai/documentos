// @ts-nocheck
function moveLayoutItemBefore(tipoId, draggedAttrId, targetAttrId) {
  if (!draggedAttrId || !targetAttrId || draggedAttrId === targetAttrId) return;

  const layout = syncLayoutsForTipo(tipoId);
  const fromIdx = layout.findIndex((l) => l.attrId === draggedAttrId);
  const targetIdx = layout.findIndex((l) => l.attrId === targetAttrId);
  if (fromIdx < 0 || targetIdx < 0) return;

  const [dragged] = layout.splice(fromIdx, 1);
  const insertAt = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
  layout.splice(insertAt, 0, dragged);

  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

