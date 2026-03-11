// @ts-nocheck
function renderTipoOptions() {
  const prevAtributo = ui.atributoTipo.value;
  const prevDocumento = ui.documentoTipo.value;
  const prevLayout = ui.layoutTipo.value;
  const prevRelatorio = ui.relatorioTipo.value;
  const prevRelatorioLayout = ui.relatorioLayoutTipo.value;

  ui.atributoTipo.innerHTML = '';
  ui.documentoTipo.innerHTML = '<option value="">Selecione...</option>';
  ui.layoutTipo.innerHTML = '';
  ui.relatorioTipo.innerHTML = '';
  ui.relatorioLayoutTipo.innerHTML = '';

  for (const tipo of state.tipos) {
    const optA = document.createElement('option');
    optA.value = tipo.id;
    optA.textContent = tipo.nome;
    ui.atributoTipo.appendChild(optA);

    const optD = document.createElement('option');
    optD.value = tipo.id;
    optD.textContent = tipo.nome;
    ui.documentoTipo.appendChild(optD);

    const optL = document.createElement('option');
    optL.value = tipo.id;
    optL.textContent = tipo.nome;
    ui.layoutTipo.appendChild(optL);

    const optR = document.createElement('option');
    optR.value = tipo.id;
    optR.textContent = String(tipo.nome || '').trim() || inferTipoNome(tipo.id) || tipo.id;
    ui.relatorioTipo.appendChild(optR);

    const optRL = document.createElement('option');
    optRL.value = tipo.id;
    optRL.textContent = String(tipo.nome || '').trim() || inferTipoNome(tipo.id) || tipo.id;
    ui.relatorioLayoutTipo.appendChild(optRL);
  }

  if (state.tipos.some((t) => t.id === prevAtributo)) ui.atributoTipo.value = prevAtributo;
  else if (state.tipos[0]) ui.atributoTipo.value = state.tipos[0].id;

  if (state.tipos.some((t) => t.id === prevDocumento)) ui.documentoTipo.value = prevDocumento;
  else ui.documentoTipo.value = '';

  if (state.tipos.some((t) => t.id === prevLayout)) ui.layoutTipo.value = prevLayout;
  else if (state.tipos[0]) ui.layoutTipo.value = state.tipos[0].id;

  if (state.tipos.some((t) => t.id === prevRelatorio)) ui.relatorioTipo.value = prevRelatorio;
  else if (state.tipos[0]) ui.relatorioTipo.value = state.tipos[0].id;

  if (state.tipos.some((t) => t.id === prevRelatorioLayout)) ui.relatorioLayoutTipo.value = prevRelatorioLayout;
  else if (state.tipos[0]) ui.relatorioLayoutTipo.value = state.tipos[0].id;
}
