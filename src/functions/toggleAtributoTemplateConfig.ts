// @ts-nocheck
function toggleAtributoTemplateConfig() {
  const show = ui.atributoTipoCampo.value === 'texto_placeholder';
  if (ui.atributoTemplateWrap) {
    ui.atributoTemplateWrap.style.display = show ? '' : 'none';
  }
}

