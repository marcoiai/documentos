function onAtributoSubmit(e: Event): void {
  e.preventDefault();

  const tipoId = ui.atributoTipo.value;
  const nome = ui.atributoNome.value.trim();
  const tipoCampo = ui.atributoTipoCampo.value as CampoTipo;
  const secaoId = ui.atributoSecao.value;
  const templateTexto = (ui.atributoTemplateTexto.value || '').trim();
  const validador = ui.atributoValidador.value.trim();
  const pesoRaw = ui.atributoPeso.value.trim();
  const mascara = ui.atributoMascara.value.trim();
  if (!tipoId || !nome) return;
  if (!isValidatorSyntaxValid(validador)) {
    notify('Validador invalido. Use: number, unique, max:n, required, nullable, date, required_if:@Nome do Campo');
    return;
  }
  if (pesoRaw && !Number.isFinite(Number(pesoRaw))) {
    notify('Peso invalido. Informe um numero decimal.');
    return;
  }
  const peso = pesoRaw === '' ? null : Number(pesoRaw);

  const editId = ui.atributoId.value;
  const linkedSecoes = getSecoesForTipo(tipoId).map((s) => s.id);
  const safeSecaoId = secaoId && linkedSecoes.includes(secaoId) ? secaoId : '';
  if (editId) {
    const attr = state.atributos.find((a) => a.id === editId);
    if (!attr) return;
    const oldTipoId = attr.tipoId;
    attr.tipoId = tipoId;
    attr.nome = nome;
    attr.tipoCampo = tipoCampo;
    attr.secaoId = safeSecaoId;
    attr.validador = validador;
    attr.peso = peso;
    attr.mascara = mascara;
    attr.templateTexto = tipoCampo === 'texto_placeholder' ? templateTexto : '';
    delete attr.textoBase;
    syncLayoutsForTipo(oldTipoId);
    syncLayoutsForTipo(tipoId);
  } else {
    state.atributos.push({
      id: makeId('att', 'atributoCounter'),
      tipoId,
      nome,
      tipoCampo,
      secaoId: safeSecaoId,
      validador,
      peso,
      mascara,
      templateTexto: tipoCampo === 'texto_placeholder' ? templateTexto : '',
    });
    syncLayoutsForTipo(tipoId);
  }

  saveState();
  resetAtributoForm();
  renderAll();
}
