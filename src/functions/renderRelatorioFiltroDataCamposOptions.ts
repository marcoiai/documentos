// @ts-nocheck
function renderRelatorioFiltroDataCamposOptions(tipoId) {
  const dateAttrs = getAtributosByTipo(tipoId).filter((a) => a.tipoCampo === 'data');
  const prevDe = String(ui.relatorioFiltroDataCampoDe?.value || '');
  const prevAte = String(ui.relatorioFiltroDataCampoAte?.value || '');

  ui.relatorioFiltroDataCampoDe.innerHTML = '<option value="">Sem campo</option>';
  ui.relatorioFiltroDataCampoAte.innerHTML = '<option value="">Sem campo</option>';

  for (const attr of dateAttrs) {
    const optDe = document.createElement('option');
    optDe.value = attr.id;
    optDe.textContent = attr.nome;
    if (attr.id === prevDe) optDe.selected = true;
    ui.relatorioFiltroDataCampoDe.appendChild(optDe);

    const optAte = document.createElement('option');
    optAte.value = attr.id;
    optAte.textContent = attr.nome;
    if (attr.id === prevAte) optAte.selected = true;
    ui.relatorioFiltroDataCampoAte.appendChild(optAte);
  }

  if (!dateAttrs.some((a) => a.id === ui.relatorioFiltroDataCampoDe.value)) {
    ui.relatorioFiltroDataCampoDe.value = '';
  }
  if (!dateAttrs.some((a) => a.id === ui.relatorioFiltroDataCampoAte.value)) {
    ui.relatorioFiltroDataCampoAte.value = '';
  }
}

