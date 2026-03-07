// @ts-nocheck
function onSecaoSubmit(e) {
  e.preventDefault();
  const nome = ui.secaoNome.value.trim();
  const cabecalho = (ui.secaoCabecalho.value || '').trim();
  const rodape = (ui.secaoRodape.value || '').trim();
  if (!nome) return;

  const editId = ui.secaoId.value;
  if (editId) {
    const sec = state.secoes.find((s) => s.id === editId);
    if (!sec) return;
    sec.nome = nome;
    sec.cabecalho = cabecalho;
    sec.rodape = rodape;
  } else {
    state.secoes.push({
      id: makeId('sec', 'secaoCounter'),
      nome,
      cabecalho,
      rodape,
    });
  }

  saveState();
  resetSecaoForm();
  renderAll();
}

