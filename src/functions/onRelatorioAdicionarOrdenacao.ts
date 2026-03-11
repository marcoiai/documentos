// @ts-nocheck
function onRelatorioAdicionarOrdenacao() {
  const tipoId = ui.relatorioTipo.value;
  if (!tipoId) return;
  const attrId = String(ui.relatorioOrdenarAtributo.value || '');
  if (!attrId) {
    notify('Selecione um atributo para ordenar.');
    return;
  }
  const direcao = ui.relatorioOrdenarDirecao.value === 'desc' ? 'desc' : 'asc';
  relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(
    [...relatorioOrdenacaoWorking.filter((x) => x.attrId !== attrId), { attrId, direcao }],
    tipoId
  );
  renderRelatorioOrdenacaoLista(tipoId);
}
