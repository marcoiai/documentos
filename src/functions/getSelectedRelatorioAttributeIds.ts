// @ts-nocheck
function getSelectedRelatorioAttributeIds() {
  return Array.from(ui.relatorioAtributosWrap.querySelectorAll('input[data-relatorio-attr]:checked'))
    .map((el) => el.dataset.relatorioAttr)
    .filter(Boolean);
}
