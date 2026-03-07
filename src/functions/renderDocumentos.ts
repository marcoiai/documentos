// @ts-nocheck
function renderDocumentos() {
  ui.documentosList.innerHTML = '';
  if (state.documentos.length === 0) {
    ui.documentosList.innerHTML = '<li class="empty">Nenhum documento cadastrado.</li>';
    return;
  }

  for (const doc of state.documentos) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(doc.titulo)}</strong>
        <small>${escapeHtml(tipoNome(doc.tipoId))}</small>
        <small>${escapeHtml(buildPreview(doc))}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-small blue darken-1 white-text" data-pdf="${doc.id}">PDF</button>
        <button type="button" class="btn-flat btn-small" data-edit="${doc.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${doc.id}">Excluir</button>
      </div>
    `;

    li.querySelector('[data-pdf]').addEventListener('click', () => exportDocumentoPdf(doc.id));
    li.querySelector('[data-edit]').addEventListener('click', () => editDocumento(doc.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteDocumento(doc.id));
    ui.documentosList.appendChild(li);
  }
}

