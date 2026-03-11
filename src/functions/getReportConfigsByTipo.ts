// @ts-nocheck
function getReportConfigsByTipo(tipoId) {
  return (state.reportConfigs || []).filter((cfg) => String(cfg.tipoId) === String(tipoId));
}
