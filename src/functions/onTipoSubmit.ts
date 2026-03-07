// @ts-nocheck
function onTipoSubmit(e) {
  e.preventDefault();
  const nome = ui.tipoNome.value.trim();
  const cabecalho = (ui.tipoCabecalho.value || '').trim();
  const rodape = (ui.tipoRodape.value || '').trim();
  if (!nome) return;

  const editId = ui.tipoId.value;
  if (editId) {
    const tipo = state.tipos.find((t) => t.id === editId);
    if (!tipo) return;
    tipo.nome = nome;
    tipo.cabecalho = cabecalho;
    tipo.rodape = rodape;
  } else {
    const id = makeId('tipo', 'tipoCounter');
    state.tipos.push({ id, nome, cabecalho, rodape });
    state.tipoSecoes[id] = state.secoes.map((s) => s.id);
  }

  saveState();
  resetTipoForm();
  renderAll();
}

