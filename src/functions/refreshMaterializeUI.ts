// @ts-nocheck
function refreshMaterializeUI() {
  if (!window.M) return;

  document.querySelectorAll('select').forEach((el) => {
    const selectInstance = M.FormSelect.getInstance(el);
    if (selectInstance) selectInstance.destroy();
  });
  M.FormSelect.init(document.querySelectorAll('select'));

  document.querySelectorAll('.tabs').forEach((el) => {
    const tabsInstance = M.Tabs.getInstance(el);
    if (tabsInstance) tabsInstance.destroy();
  });
  M.Tabs.init(document.querySelectorAll('.tabs'));

  M.updateTextFields();
  document.querySelectorAll('textarea.materialize-textarea').forEach((el) => {
    if (M.textareaAutoResize) M.textareaAutoResize(el);
  });
}

