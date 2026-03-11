async function onDocumentoSubmit(e: Event): Promise<void> {
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
    const estrutura = buildDocumentoEstruturaPayload(savedDoc);
    console.log('[documento:save]', JSON.stringify(estrutura, null, 2));
    try {
      const apiResult = await postDocumentoPayloadToApi(estrutura);
      if (apiResult.sent) {
        console.log('[documento:api] payload enviado com sucesso');
      }
    } catch (error) {
      console.error('[documento:api] erro ao enviar payload', error);
      notify('Documento salvo localmente, mas falhou envio para API.');
    }
  }
  resetDocumentoForm();
  renderAll();
}
