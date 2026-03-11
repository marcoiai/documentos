// @ts-nocheck
function renderRelatorioConfigSelectOptions(tipoId, preferredId = '') {
  if (!ui.relatorioConfigSelect) return;
  const configs = getReportConfigsByTipo(tipoId);
  const prev = String(preferredId || ui.relatorioConfigSelect.value || '');
  ui.relatorioConfigSelect.innerHTML = '';

  if (!configs.length) {
    ui.relatorioConfigSelect.innerHTML = '<option value="">Sem configuracoes salvas</option>';
    ui.relatorioConfigSelect.value = '';
    return;
  }

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Selecione uma configuracao';
  ui.relatorioConfigSelect.appendChild(placeholder);

  for (const cfg of configs) {
    const opt = document.createElement('option');
    opt.value = cfg.id;
    opt.textContent = cfg.nome;
    if (cfg.id === prev) opt.selected = true;
    ui.relatorioConfigSelect.appendChild(opt);
  }

  if (!configs.some((c) => c.id === ui.relatorioConfigSelect.value)) {
    ui.relatorioConfigSelect.value = '';
  }
}
