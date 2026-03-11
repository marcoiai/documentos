// @ts-nocheck
function openRelatorioConfigDialog() {
  const dialog = ui.relatorioConfigDialog;
  if (!dialog || typeof dialog.showModal !== 'function') {
    notify('Dialogo nao suportado neste navegador.');
    return;
  }
  renderRelatorioConfigDialogList();
  dialog.showModal();
}
