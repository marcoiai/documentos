// @ts-nocheck
function refreshTemplatePreviews() {
  const tipoId = ui.documentoTipo.value;
  if (!tipoId) return;

  const valores = collectDocumentoCampos();
  const ctx = buildPlaceholderContext(tipoId, valores, ui.documentoTitulo.value.trim());

  ui.documentoCampos
    .querySelectorAll('[data-template-preview="1"]')
    .forEach((field) => {
      const label = field.closest('label');
      if (!label) return;
      let preview = label.querySelector('.doc-template-preview');
      if (field.dataset.templateKind !== 'text' && field.dataset.templateKind !== 'textarea') {
        if (preview) preview.remove();
        return;
      }

      const source = String(field.value || field.dataset.templateDefault || '');
      if (!source.includes('{{')) {
        if (preview) preview.remove();
        return;
      }

      if (!preview) {
        preview = document.createElement('small');
        preview.className = 'doc-template-preview';
        label.appendChild(preview);
      }
      const resolved = applyPlaceholderTemplate(source, ctx).trim();
      preview.textContent = resolved || '-';
    });

}

