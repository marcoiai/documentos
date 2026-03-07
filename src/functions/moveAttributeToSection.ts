// @ts-nocheck
function moveAttributeToSection(tipoId, attrId, targetSectionKey) {
  if (!attrId) return;
  const attr = state.atributos.find((a) => a.id === attrId && a.tipoId === tipoId);
  if (!attr) return;

  const nextSecaoId = targetSectionKey === '__sem_secao__' ? '' : targetSectionKey;
  if ((attr.secaoId || '') === nextSecaoId) return;

  attr.secaoId = nextSecaoId;
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
  notify('Atributo movido de secao.');
}

