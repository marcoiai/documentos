function onDocumentoSubmit(e: Event): void {
  e.preventDefault();
  clearDocumentoFieldErrors();

  const titulo = ui.documentoTitulo.value.trim();
  const tipoId = ui.documentoTipo.value;
  let hasFormError = false;
  if (!titulo) {
    markFieldError(ui.documentoTitulo, 'Titulo obrigatorio');
    hasFormError = true;
  }
  if (!tipoId) {
    markFieldError(ui.documentoTipo, 'Selecione um tipo');
    hasFormError = true;
  }
  if (hasFormError) return;

  const valores = collectDocumentoCampos();
  const pdfVisivel = collectDocumentoPdfFlags();
  const editId = ui.documentoId.value;
  const validationErrors = validateDocumento(tipoId, valores, editId);
  if (validationErrors.length > 0) {
    applyDocumentoFieldErrors(validationErrors);
    notify(validationErrors.map((e) => e.summary).join('<br>'));
    return;
  }

  let savedDoc: Documento | null = null;
  if (editId) {
    const doc = state.documentos.find((d) => d.id === editId);
    if (!doc) return;
    doc.titulo = titulo;
    doc.tipoId = tipoId;
    doc.valores = valores;
    doc.pdfVisivel = pdfVisivel;
    savedDoc = doc;
  } else {
    const newDoc: Documento = {
      id: makeId('doc', 'documentoCounter'),
      titulo,
      tipoId,
      valores,
      pdfVisivel,
    };
    state.documentos.push(newDoc);
    savedDoc = newDoc;
  }

  saveState();
  if (savedDoc) {
    const estrutura = {
      documento: savedDoc,
      tipo: state.tipos.find((t) => t.id === savedDoc.tipoId) || null,
      secoes: getSecoesForTipo(savedDoc.tipoId),
      atributos: getAtributosByTipo(savedDoc.tipoId),
      layout: state.layouts[savedDoc.tipoId] || [],
      layoutSections: state.layoutSections[savedDoc.tipoId] || [],
    };
    console.log('[documento:save]', JSON.stringify(estrutura, null, 2));
  }
  resetDocumentoForm();
  renderAll();
}
