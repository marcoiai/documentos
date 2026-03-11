// @ts-nocheck
function renderTipos() {
  ui.tiposList.innerHTML = '';
  if (state.tipos.length === 0) {
    ui.tiposList.innerHTML = '<li class="empty">Nenhum tipo cadastrado.</li>';
    return;
  }

  for (const tipo of state.tipos) {
    const cabecalho = String(tipo.cabecalho || '').trim();
    const rodape = String(tipo.rodape || '').trim();
    const preview = (text, max = 90) => {
      if (!text) return '-';
      return text.length <= max ? text : `${text.slice(0, max - 3)}...`;
    };
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(tipo.nome)}</strong>
        <small><strong>Cabecalho:</strong> ${escapeHtml(preview(cabecalho))}</small>
        <small><strong>Rodape:</strong> ${escapeHtml(preview(rodape))}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-edit="${tipo.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${tipo.id}">Excluir</button>
      </div>
    `;
    li.querySelector('[data-edit]').addEventListener('click', () => editTipo(tipo.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteTipo(tipo.id));
    ui.tiposList.appendChild(li);
  }

  renderTipoSecoes();
}
