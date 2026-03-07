// @ts-nocheck
function bindEvents() {
  ui.tipoForm.addEventListener('submit', onTipoSubmit);
  ui.tipoCancelBtn.addEventListener('click', resetTipoForm);

  ui.secaoForm.addEventListener('submit', onSecaoSubmit);
  ui.secaoCancelBtn.addEventListener('click', resetSecaoForm);

  ui.atributoForm.addEventListener('submit', onAtributoSubmit);
  ui.atributoTipo.addEventListener('change', () => {
    renderSecaoOptions();
    renderAtributos();
  });
  ui.atributoTipoCampo.addEventListener('change', toggleAtributoTemplateConfig);
  ui.atributoCancelBtn.addEventListener('click', resetAtributoForm);

  ui.layoutTipo.addEventListener('change', renderLayoutEditor);
  ui.layoutSaveBtn.addEventListener('click', saveLayoutForSelectedTipo);
  ui.layoutResetBtn.addEventListener('click', resetLayoutForSelectedTipo);

  ui.documentoForm.addEventListener('submit', onDocumentoSubmit);
  ui.documentoTipo.addEventListener('change', onDocumentoTipoChange);
  ui.documentoCancelBtn.addEventListener('click', resetDocumentoForm);
  ui.documentoTitulo.addEventListener('input', () => clearFieldError(ui.documentoTitulo));
  ui.documentoTipo.addEventListener('change', () => clearFieldError(ui.documentoTipo));
  ui.documentoForm.addEventListener('input', () => refreshTemplatePreviews());
  ui.documentoForm.addEventListener('change', () => refreshTemplatePreviews());

  window.addEventListener('hashchange', syncTabFromRoute);
  document.querySelectorAll('.tabs .tab a').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) history.replaceState(null, '', href);
    });
  });
}

