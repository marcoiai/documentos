// @ts-nocheck
function moveSectionAttributesToSection(tipoId, sourceSectionKey, targetSectionKey) {
  if (!sourceSectionKey || !targetSectionKey) return;
  if (sourceSectionKey === targetSectionKey) return;

  const sourceSecaoId = sourceSectionKey === '__sem_secao__' ? '' : sourceSectionKey;
  const targetSecaoId = targetSectionKey === '__sem_secao__' ? '' : targetSectionKey;
  const toMove = state.atributos.filter(
    (a) => a.tipoId === tipoId && (a.secaoId || '') === sourceSecaoId
  );
  if (toMove.length === 0) return;

  for (const attr of toMove) attr.secaoId = targetSecaoId;
  syncLayoutsForTipo(tipoId);
  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderLayoutEditor();
  if (ui.documentoTipo.value === tipoId) renderDocumentoCampos();
  refreshMaterializeUI();
  notify('Secao movida para outra secao.');
}

