// @ts-nocheck
function renderRelatorioAtributosByTipo(tipoId, selectAll = false) {
  const attrs = getAtributosByTipo(tipoId);
  ui.relatorioAtributosWrap.innerHTML = '';
  ui.relatorioFiltroAtributo.innerHTML = '<option value="">Sem filtro</option>';
  ui.relatorioOrdenarAtributo.innerHTML = '<option value="">Sem ordenacao</option>';

  if (attrs.length === 0) {
    ui.relatorioAtributosWrap.innerHTML = '<p class="empty">Sem atributos para este tipo.</p>';
    relatorioOrdenacaoWorking = [];
    relatorioTotalAttrIdsWorking = [];
    renderRelatorioOrdenacaoLista(tipoId);
    relatorioLastResult = { tipoNome: tipoNome(tipoId), columns: [], colSpans: [], blockSpacerHeights: {}, totalValues: [], rows: [] };
    ui.relatorioResumo.textContent = '';
    ui.relatorioTabelaHead.innerHTML = '';
    ui.relatorioTabelaBody.innerHTML = '';
    return;
  }

  const selectedIds = new Set(selectAll ? [] : getSelectedRelatorioAttributeIds());
  relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
  const totalSelected = new Set(relatorioTotalAttrIdsWorking);

  const list = document.createElement('div');
  list.className = 'relatorio-attrs-list';

  for (const attr of attrs) {
    const opt = document.createElement('option');
    opt.value = attr.id;
    opt.textContent = attr.nome;
    ui.relatorioFiltroAtributo.appendChild(opt);

    const sortOpt = document.createElement('option');
    sortOpt.value = attr.id;
    sortOpt.textContent = attr.nome;
    ui.relatorioOrdenarAtributo.appendChild(sortOpt);

    const label = document.createElement('label');
    label.className = 'relatorio-attr-item';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.relatorioAttr = attr.id;
    input.checked = selectAll || selectedIds.size === 0 || selectedIds.has(attr.id);

    const span = document.createElement('span');
    span.textContent = attr.nome;

    label.appendChild(input);
    label.appendChild(span);

    if (attr.tipoCampo === 'numero') {
      const totalWrap = document.createElement('span');
      totalWrap.style.marginLeft = '8px';
      totalWrap.style.display = 'inline-flex';
      totalWrap.style.alignItems = 'center';
      totalWrap.style.gap = '4px';
      totalWrap.innerHTML = `
        <input type="checkbox" data-relatorio-total-attr="${attr.id}" ${totalSelected.has(attr.id) ? 'checked' : ''} />
        <small class="grey-text">Σ</small>
      `;
      const totalInput = totalWrap.querySelector(`input[data-relatorio-total-attr="${attr.id}"]`);
      totalInput.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!relatorioTotalAttrIdsWorking.includes(attr.id)) relatorioTotalAttrIdsWorking.push(attr.id);
        } else {
          relatorioTotalAttrIdsWorking = relatorioTotalAttrIdsWorking.filter((id) => id !== attr.id);
        }
      });
      totalInput.addEventListener('mousedown', (e) => e.stopPropagation());
      totalInput.addEventListener('click', (e) => e.stopPropagation());
      label.appendChild(totalWrap);
    }
    list.appendChild(label);
  }

  ui.relatorioAtributosWrap.appendChild(list);
  ui.relatorioAtributosWrap.querySelectorAll('input[data-relatorio-attr]').forEach((el) => {
    el.addEventListener('change', () => {
      const id = el.dataset.relatorioAttr;
      if (!el.checked && id) {
        relatorioTotalAttrIdsWorking = relatorioTotalAttrIdsWorking.filter((x) => x !== id);
        const totalEl = ui.relatorioAtributosWrap.querySelector(`input[data-relatorio-total-attr="${id}"]`);
        if (totalEl) totalEl.checked = false;
      }
    });
  });
  relatorioOrdenacaoWorking = normalizeRelatorioOrdenacao(relatorioOrdenacaoWorking, tipoId);
  renderRelatorioOrdenacaoLista(tipoId);
  if (!attrs.some((a) => a.id === ui.relatorioOrdenarAtributo.value)) {
    ui.relatorioOrdenarAtributo.value = '';
  }
  refreshMaterializeUI();
}
