// @ts-nocheck
function isRelatorioDateOperator(operador) {
  return ['date_on', 'date_from', 'date_to', 'date_between'].includes(String(operador || ''));
}

function updateRelatorioFiltroUiByAttr() {
  const tipoId = String(ui.relatorioTipo?.value || '');
  const filtroAttrId = String(ui.relatorioFiltroAtributo?.value || '');
  const attr = getAtributosByTipo(tipoId).find((a) => a.id === filtroAttrId);
  const isDateAttr = attr?.tipoCampo === 'data';
  const operador = String(ui.relatorioFiltroOperador?.value || 'contains');
  const dataModo = String(ui.relatorioFiltroDataModo?.value || 'valor');
  const valueWrap = ui.relatorioFiltroValor?.closest?.('.input-field');

  if (isDateAttr) {
    renderRelatorioFiltroDataCamposOptions(tipoId);
    const showDataCampos = operador === 'date_between';
    const useCampos = showDataCampos && dataModo === 'campos';

    if (valueWrap) valueWrap.style.display = 'none';
    if (ui.relatorioFiltroDataWrap) ui.relatorioFiltroDataWrap.style.display = useCampos ? 'none' : 'flex';
    if (ui.relatorioFiltroDataCamposWrap) ui.relatorioFiltroDataCamposWrap.style.display = showDataCampos ? '' : 'none';

    if (!isRelatorioDateOperator(operador) && operador !== 'empty' && operador !== 'not_empty') {
      ui.relatorioFiltroOperador.value = 'date_between';
    }
    return;
  }

  if (valueWrap) valueWrap.style.display = '';
  if (ui.relatorioFiltroDataWrap) ui.relatorioFiltroDataWrap.style.display = 'none';
  if (ui.relatorioFiltroDataCamposWrap) ui.relatorioFiltroDataCamposWrap.style.display = 'none';
  if (isRelatorioDateOperator(operador)) {
    ui.relatorioFiltroOperador.value = 'contains';
  }
}
