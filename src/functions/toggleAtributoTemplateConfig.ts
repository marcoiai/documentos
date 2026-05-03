// @ts-nocheck
function toggleAtributoTemplateConfig() {
  const tipoCampo = ui.atributoTipoCampo.value;
  const showTemplate = tipoCampo === 'texto_placeholder';
  const showCurrency = tipoCampo === 'currency';
  if (ui.atributoTemplateWrap) {
    ui.atributoTemplateWrap.style.display = showTemplate ? '' : 'none';
  }
  if (ui.atributoCurrencyWrap) {
    ui.atributoCurrencyWrap.style.display = showCurrency ? '' : 'none';
  }
}
