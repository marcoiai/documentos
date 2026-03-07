// @ts-nocheck
function renderTipos() {
  ui.tiposList.innerHTML = '';
  if (state.tipos.length === 0) {
    ui.tiposList.innerHTML = '<li class="empty">Nenhum tipo cadastrado.</li>';
    return;
  }

  for (const tipo of state.tipos) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(tipo.nome)}</strong>
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

