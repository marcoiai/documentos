// @ts-nocheck
function editSecao(secaoId) {
  const sec = state.secoes.find((s) => s.id === secaoId);
  if (!sec) return;
  ui.secaoId.value = sec.id;
  ui.secaoNome.value = sec.nome;
  ui.secaoCabecalho.value = sec.cabecalho || '';
  ui.secaoRodape.value = sec.rodape || '';
  refreshMaterializeUI();
}

