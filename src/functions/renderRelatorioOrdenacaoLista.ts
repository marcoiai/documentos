// @ts-nocheck
function renderRelatorioOrdenacaoLista(tipoId) {
  if (!ui.relatorioOrdenacaoLista) return;
  ui.relatorioOrdenacaoLista.innerHTML = '';
  const attrs = getAtributosByTipo(tipoId);
  const attrById = new Map(attrs.map((a) => [a.id, a]));
  relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(relatorioOrdenacaoWorking, tipoId);

  if (!relatorioOrdenacaoWorking.length) {
    ui.relatorioOrdenacaoLista.innerHTML = '<li class="collection-item">Sem ordenacao composta.</li>';
    return;
  }

  for (let i = 0; i < relatorioOrdenacaoWorking.length; i += 1) {
    const item = relatorioOrdenacaoWorking[i];
    const attr = attrById.get(item.attrId);
    if (!attr) continue;
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <div>
          <strong>${escapeHtml(attr.nome)}</strong>
          <small class="grey-text" style="display:block;">${item.direcao === 'desc' ? 'DESC' : 'ASC'}</small>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-flat btn-small" data-sort-toggle="${i}">ASC/DESC</button>
          <button type="button" class="btn-flat btn-small" data-sort-up="${i}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" class="btn-flat btn-small" data-sort-down="${i}" ${i === relatorioOrdenacaoWorking.length - 1 ? 'disabled' : ''}>↓</button>
          <button type="button" class="btn-flat btn-small red-text" data-sort-del="${i}">Remover</button>
        </div>
      </div>
    `;

    li.querySelector(`[data-sort-toggle="${i}"]`).addEventListener('click', () => {
      relatorioOrdenacaoWorking[i].direcao = relatorioOrdenacaoWorking[i].direcao === 'desc' ? 'asc' : 'desc';
      renderRelatorioOrdenacaoLista(tipoId);
    });
    li.querySelector(`[data-sort-up="${i}"]`).addEventListener('click', () => {
      if (i === 0) return;
      const tmp = relatorioOrdenacaoWorking[i - 1];
      relatorioOrdenacaoWorking[i - 1] = relatorioOrdenacaoWorking[i];
      relatorioOrdenacaoWorking[i] = tmp;
      renderRelatorioOrdenacaoLista(tipoId);
    });
    li.querySelector(`[data-sort-down="${i}"]`).addEventListener('click', () => {
      if (i >= relatorioOrdenacaoWorking.length - 1) return;
      const tmp = relatorioOrdenacaoWorking[i + 1];
      relatorioOrdenacaoWorking[i + 1] = relatorioOrdenacaoWorking[i];
      relatorioOrdenacaoWorking[i] = tmp;
      renderRelatorioOrdenacaoLista(tipoId);
    });
    li.querySelector(`[data-sort-del="${i}"]`).addEventListener('click', () => {
      relatorioOrdenacaoWorking.splice(i, 1);
      renderRelatorioOrdenacaoLista(tipoId);
    });

    ui.relatorioOrdenacaoLista.appendChild(li);
  }
}
