// @ts-nocheck
function renderRelatorioLayoutConfigOptions(tipoId) {
  const configs = getReportConfigsByTipo(tipoId);
  const prev = ui.relatorioLayoutConfig.value;
  ui.relatorioLayoutConfig.innerHTML = '';

  if (!configs.length) {
    ui.relatorioLayoutConfig.innerHTML = '<option value="">Sem configuracoes</option>';
    ui.relatorioLayoutConfig.value = '';
    return;
  }

  for (const cfg of configs) {
    const opt = document.createElement('option');
    opt.value = cfg.id;
    opt.textContent = cfg.nome;
    if (cfg.id === prev) opt.selected = true;
    ui.relatorioLayoutConfig.appendChild(opt);
  }

  if (!configs.some((c) => c.id === ui.relatorioLayoutConfig.value)) {
    ui.relatorioLayoutConfig.value = configs[0].id;
  }
}
