// @ts-nocheck
function exportRelatorioConfigJson() {
  const cfg = collectRelatorioConfig();
  if (!cfg.tipoId) {
    notify('Selecione um tipo para exportar a configuracao.');
    return;
  }
  if (!cfg.nome) cfg.nome = `config_${tipoNome(cfg.tipoId)}`;

  const payload = {
    exportedAt: new Date().toISOString(),
    config: cfg,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${String(cfg.nome).replace(/\s+/g, '_').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
