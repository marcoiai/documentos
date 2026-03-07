// @ts-nocheck
function renderTipoSecoes() {
  ui.tipoSecoesList.innerHTML = '';
  const editingTipoId = ui.tipoId.value;

  if (!editingTipoId) {
    ui.tipoSecoesWrap.querySelector('small').textContent =
      'Ao editar um tipo, as seções aparecem aqui.';
    return;
  }

  ui.tipoSecoesWrap.querySelector('small').textContent =
    'Secoes do tipo (vincule/desvincule e edite):';

  if (state.secoes.length === 0) {
    ui.tipoSecoesList.innerHTML = '<li class="empty">Nenhuma secao cadastrada.</li>';
    return;
  }

  for (const secao of state.secoes) {
    const linked = isSecaoLinkedToTipo(editingTipoId, secao.id);
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(secao.nome)}</strong>
        <small>${linked ? 'Vinculada ao tipo' : 'Nao vinculada'}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-link-secao="${secao.id}">
          ${linked ? 'Desvincular' : 'Vincular'}
        </button>
        <button type="button" class="btn-flat btn-small" data-edit-secao="${secao.id}">Editar</button>
      </div>
    `;
    li.querySelector('[data-link-secao]').addEventListener('click', () => {
      toggleTipoSecao(editingTipoId, secao.id);
    });
    li.querySelector('[data-edit-secao]').addEventListener('click', () => {
      focusSecaoCard(secao.id);
    });
    ui.tipoSecoesList.appendChild(li);
  }
}

