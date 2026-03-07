// @ts-nocheck
function isSecaoLinkedToTipo(tipoId, secaoId) {
  return getSecoesForTipo(tipoId).some((s) => s.id === secaoId);
}

