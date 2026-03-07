// @ts-nocheck
function toggleTipoSecao(tipoId, secaoId) {
  if (!tipoId || !secaoId) return;
  const current = getSecoesForTipo(tipoId).map((s) => s.id);
  if (current.includes(secaoId)) {
    state.tipoSecoes[tipoId] = current.filter((id) => id !== secaoId);
    // Also detach attributes that were using the removed section.
    state.atributos
      .filter((a) => a.tipoId === tipoId && a.secaoId === secaoId)
      .forEach((a) => {
        a.secaoId = '';
      });
  } else {
    state.tipoSecoes[tipoId] = [...current, secaoId];
  }

  syncLayoutSectionsForTipo(tipoId);
  saveState();
  renderAll();
}

// Tipos CRUD
