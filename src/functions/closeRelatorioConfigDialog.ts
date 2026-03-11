// @ts-nocheck
function closeRelatorioConfigDialog() {
  const dialog = ui.relatorioConfigDialog;
  if (!dialog || typeof dialog.close !== 'function') return;
  if (dialog.open) dialog.close();
}
