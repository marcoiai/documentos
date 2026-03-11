// @ts-nocheck
function moveRelatorioLayoutItem(attrId, direction) {
  const idx = (relatorioCurrentLayout || []).findIndex((x) => x.attrId === attrId);
  if (idx < 0) return;
  const target = idx + Number(direction || 0);
  if (target < 0 || target >= relatorioCurrentLayout.length) return;

  const tmp = relatorioCurrentLayout[idx];
  relatorioCurrentLayout[idx] = relatorioCurrentLayout[target];
  relatorioCurrentLayout[target] = tmp;

  renderRelatorioLayoutEditor(ui.relatorioTipo.value);
}
