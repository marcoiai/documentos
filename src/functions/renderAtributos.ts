// @ts-nocheck
function renderAtributos() {
  const tipoId = ui.atributoTipo.value;
  const attrs = getAtributosByTipo(tipoId);

  ui.atributosList.innerHTML = '';
  if (attrs.length === 0) {
    ui.atributosList.innerHTML = '<li class="empty">Nenhum atributo para este tipo.</li>';
    return;
  }

  for (const attr of attrs) {
    const secao = state.secoes.find((s) => s.id === attr.secaoId);
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div class="item-content">
        <strong>${escapeHtml(attr.nome)}</strong>
        <small>${escapeHtml(attr.tipoCampo)} | secao: ${escapeHtml(secao?.nome || '-')}</small>
        <small>validador: ${escapeHtml(attr.validador || '-')}</small>
        <small>peso: ${escapeHtml(attr.peso ?? '-')}</small>
        <small>mascara: ${escapeHtml(attr.mascara || '-')}</small>
        <small>template: ${escapeHtml(attr.templateTexto || '-')}</small>
      </div>
      <div class="item-actions">
        <button type="button" class="btn-flat btn-small" data-edit="${attr.id}">Editar</button>
        <button type="button" class="btn-small red darken-1 white-text" data-delete="${attr.id}">Excluir</button>
      </div>
    `;

    li.querySelector('[data-edit]').addEventListener('click', () => editAtributo(attr.id));
    li.querySelector('[data-delete]').addEventListener('click', () => deleteAtributo(attr.id));
    ui.atributosList.appendChild(li);
  }
}

