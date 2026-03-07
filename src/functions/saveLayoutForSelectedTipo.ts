// @ts-nocheck
function saveLayoutForSelectedTipo() {
  const tipoId = ui.layoutTipo.value;
  if (!tipoId) return;
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  notify('Layout salvo.');
}

