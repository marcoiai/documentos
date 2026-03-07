// @ts-nocheck
function renderSecoes() {
  ui.secoesList.innerHTML = '';
  if (state.secoes.length === 0) {
    ui.secoesList.innerHTML = '<li class="empty">Nenhuma secao cadastrada.</li>';
    return;
  }

  for (const sec of state.secoes) {
    const linkedTipos = state.tipos
      .filter((tipo) => isSecaoLinkedToTipo(tipo.id, sec.id))
      .map((tipo) => tipo.nome);
    const li = document.createElement('li');
    li.className = `collection-item ${focusedSecaoId === sec.id ? 'section-focused' : ''}`;
    li.dataset.secaoId = sec.id;
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(sec.nome)}</strong>
        <small>Tipos vinculados: ${escapeHtml(linkedTipos.join(', ') || '-')}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-edit="${sec.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${sec.id}">Excluir</button>
      </div>
    `;

    li.querySelector('[data-edit]').addEventListener('click', () => editSecao(sec.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteSecao(sec.id));
    ui.secoesList.appendChild(li);
  }

  if (focusedSecaoId) {
    const target = ui.secoesList.querySelector(`[data-secao-id="${focusedSecaoId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        focusedSecaoId = null;
        target.classList.remove('section-focused');
      }, 1800);
    } else {
      focusedSecaoId = null;
    }
  }
}

