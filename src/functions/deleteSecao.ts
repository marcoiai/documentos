// @ts-nocheck
function deleteSecao(secaoId) {
  const usedByAttr = state.atributos.some((a) => a.secaoId === secaoId);
  if (usedByAttr) {
    notify('Nao pode remover secao em uso por atributos.');
    return;
  }

  state.secoes = state.secoes.filter((s) => s.id !== secaoId);
  Object.keys(state.tipoSecoes || {}).forEach((tipoId) => {
    state.tipoSecoes[tipoId] = (state.tipoSecoes[tipoId] || []).filter((id) => id !== secaoId);
  });
  saveState();
  renderAll();
}

