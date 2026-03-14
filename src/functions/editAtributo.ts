// @ts-nocheck
function editAtributo(attrId) {
  const attr = state.atributos.find((a) => a.id === attrId);
  if (!attr) return;
  ui.atributoId.value = attr.id;
  ui.atributoTipo.value = attr.tipoId;
  renderSecaoOptions();
  ui.atributoNome.value = attr.nome;
  ui.atributoTipoCampo.value = attr.tipoCampo;
  ui.atributoSecao.value = attr.secaoId || '';
  ui.atributoValidador.value = attr.validador || '';
  ui.atributoPeso.value = attr.peso ?? '';
  ui.atributoMascara.value = attr.mascara || '';
  ui.atributoTemplateTexto.value = attr.templateTexto || '';
  toggleAtributoTemplateConfig();
  refreshMaterializeUI();
  renderAtributos();
  openAppModal(ui.atributoModal);
}
