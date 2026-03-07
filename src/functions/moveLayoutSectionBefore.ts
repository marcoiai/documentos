// @ts-nocheck
function moveLayoutSectionBefore(tipoId, draggedKey, targetKey) {
  if (!draggedKey || !targetKey || draggedKey === targetKey) return;
  if (draggedKey === '__sem_secao__' || targetKey === '__sem_secao__') return;

  const order = syncLayoutSectionsForTipo(tipoId);
  const fromIdx = order.findIndex((k) => k === draggedKey);
  const targetIdx = order.findIndex((k) => k === targetKey);
  if (fromIdx < 0 || targetIdx < 0) return;

  const [dragged] = order.splice(fromIdx, 1);
  const insertAt = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
  order.splice(insertAt, 0, dragged);
  state.layoutSections[tipoId] = order;

  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
}

