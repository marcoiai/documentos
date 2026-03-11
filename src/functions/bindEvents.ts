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

  ui.relatorioTipo.addEventListener('change', onRelatorioTipoChange);
  ui.relatorioConfigSelect.addEventListener('change', onRelatorioConfigSelectChange);
  ui.relatorioSalvarConfigBtn.addEventListener('click', saveRelatorioConfig);
  ui.relatorioSelecionarConfigBtn.addEventListener('click', openRelatorioConfigDialog);
  ui.relatorioExportConfigBtn.addEventListener('click', exportRelatorioConfigJson);
  ui.relatorioDialogCloseBtn.addEventListener('click', closeRelatorioConfigDialog);
  ui.relatorioSalvarLayoutBtn.addEventListener('click', saveRelatorioLayout);
  ui.relatorioGerarBtn.addEventListener('click', generateRelatorio);
  ui.relatorioCsvBtn.addEventListener('click', exportRelatorioCsv);
  ui.relatorioPdfBtn.addEventListener('click', exportRelatorioPdf);
  ui.relatorioOrdenarAdicionarBtn.addEventListener('click', onRelatorioAdicionarOrdenacao);

  ui.relatorioLayoutTipo.addEventListener('change', onRelatorioLayoutTipoChange);
  ui.relatorioLayoutConfig.addEventListener('change', onRelatorioLayoutConfigChange);
  ui.relatorioLayoutSaveBtn.addEventListener('click', saveRelatorioLayoutEditorConfig);
  ui.relatorioLayoutResetBtn.addEventListener('click', resetRelatorioLayoutEditorConfig);

  window.addEventListener('hashchange', syncTabFromRoute);
  document.querySelectorAll('.tabs .tab a').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) history.replaceState(null, '', href);
    });
  });
}
