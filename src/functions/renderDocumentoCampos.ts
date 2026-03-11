// @ts-nocheck
function renderDocumentoCampos() {
  const tipoId = ui.documentoTipo.value;
  ui.documentoCampos.innerHTML = '';

  if (!tipoId) {
    ui.documentoCampos.innerHTML = '<p class="empty">Selecione o tipo para montar os campos.</p>';
    return;
  }

  const isEditingDocumento = Boolean(ui.documentoId.value);
  const groups = buildSectionGroupsForTipo(tipoId, { includeEmptySections: true })
    .filter((group) => group.items.length > 0)
    .filter((group) => {
      if (!isEditingDocumento) return true;
      return group.items.some((item) => {
        const attr = item.attr;
        const value = tempDocumentoValores[attr.id];
        return isAttributeValueFilled(attr, value);
      });
    });
  if (groups.length === 0) {
    ui.documentoCampos.innerHTML = '<p class="empty">Sem atributos para este tipo.</p>';
    return;
  }

  const tipo = state.tipos.find((t) => t.id === tipoId) || null;
  const placeholderCtx = buildHeaderFooterPlaceholderContext(
    tipoId,
    tempDocumentoValores,
    ui.documentoTitulo.value || ''
  );
  const tipoCabecalho = resolveTemplateTextForOutput(tipo?.cabecalho || '', placeholderCtx).trim();
  const tipoRodape = resolveTemplateTextForOutput(tipo?.rodape || '', placeholderCtx).trim();

  if (tipoCabecalho) {
    const topBlock = document.createElement('div');
    topBlock.className = 'doc-section-template';
    topBlock.textContent = tipoCabecalho;
    ui.documentoCampos.appendChild(topBlock);
  }

  for (const group of groups) {
    const isSemSecao = group.key === '__sem_secao__';
    const fieldset = document.createElement(isSemSecao ? 'div' : 'fieldset');
    fieldset.className = isSemSecao ? 'section-box section-box-no-title' : 'section-box';

    if (!isSemSecao) {
      const legend = document.createElement('legend');
      legend.textContent = group.nome;
      fieldset.appendChild(legend);
    }

    const grid = document.createElement('div');
    grid.className = 'doc-grid section-grid';

    for (const item of group.items) {
      const attr = item.attr;
      const wrap = document.createElement('div');
      wrap.className = 'doc-grid-item';
      wrap.style.gridColumn = `span ${item.colSpan || 6}`;

      const fieldTop = document.createElement('div');
      fieldTop.className = 'doc-field-top';
      const fieldName = document.createElement('strong');
      fieldName.className = 'doc-field-name';
      fieldName.textContent = attr.nome;
      const pdfWrap = document.createElement('label');
      pdfWrap.className = 'doc-pdf-toggle';
      const pdfInput = document.createElement('input');
      pdfInput.type = 'checkbox';
      pdfInput.id = `campo_pdf_${attr.id}`;
      pdfInput.checked = tempDocumentoPdfFlags[attr.id] !== false;
      const pdfText = document.createElement('span');
      pdfText.textContent = 'PDF';
      pdfWrap.appendChild(pdfInput);
      pdfWrap.appendChild(pdfText);
      fieldTop.appendChild(fieldName);
      fieldTop.appendChild(pdfWrap);
      wrap.appendChild(fieldTop);

      const label = document.createElement('label');
      label.className = 'doc-field-label';

      const input = buildInput(attr, `campo_${attr.id}`, tempDocumentoValores[attr.id] ?? '');
      label.appendChild(input);
      wrap.appendChild(label);
      grid.appendChild(wrap);
    }

    fieldset.appendChild(grid);
    ui.documentoCampos.appendChild(fieldset);
  }

  if (tipoRodape) {
    const footerBlock = document.createElement('div');
    footerBlock.className = 'doc-section-template doc-section-footer-template';
    footerBlock.textContent = `Rodape: ${tipoRodape}`;
    ui.documentoCampos.appendChild(footerBlock);
  }

  refreshTemplatePreviews();
}
