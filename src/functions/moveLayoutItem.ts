// @ts-nocheck
function moveLayoutItem(tipoId, attrId, direction) {
  const layout = syncLayoutsForTipo(tipoId);
  const idx = layout.findIndex((l) => l.attrId === attrId);
  if (idx === -1) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= layout.length) return;

  const [item] = layout.splice(idx, 1);
  layout.splice(newIdx, 0, item);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

