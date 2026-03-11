// @ts-nocheck
function renderRelatorioConfigDialogList() {
  const tipoId = ui.relatorioTipo.value;
  const list = getReportConfigsByTipo(tipoId);
  ui.relatorioConfigList.innerHTML = '';

  if (!list.length) {
    ui.relatorioConfigList.innerHTML = '<li class="collection-item">Nenhuma configuracao salva para este tipo.</li>';
    return;
  }

  for (const cfg of list) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
        <div>
          <strong>${escapeHtml(cfg.nome)}</strong>
          <small class="grey-text" style="display:block;">${escapeHtml(new Date(cfg.createdAt).toLocaleString())}</small>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-flat btn-small" data-load="${cfg.id}">Usar</button>
          <button type="button" class="btn-flat btn-small red-text" data-del="${cfg.id}">Excluir</button>
        </div>
      </div>
    `;

    li.querySelector('[data-load]').addEventListener('click', () => {
      const chosen = (state.reportConfigs || []).find((x) => x.id === cfg.id);
      if (!chosen) return;
      applyRelatorioConfig(chosen);
      closeRelatorioConfigDialog();
      notify('Configuracao aplicada.');
    });

    li.querySelector('[data-del]').addEventListener('click', () => {
      state.reportConfigs = (state.reportConfigs || []).filter((x) => x.id !== cfg.id);
      saveState();
      renderRelatorioConfigSelectOptions(tipoId, '');
      refreshMaterializeUI();
      renderRelatorioConfigDialogList();
      notify('Configuracao removida.');
    });

    ui.relatorioConfigList.appendChild(li);
  }
}
