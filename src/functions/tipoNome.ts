// @ts-nocheck
function tipoNome(tipoId) {
  return state.tipos.find((t) => t.id === tipoId)?.nome || tipoId;
}

