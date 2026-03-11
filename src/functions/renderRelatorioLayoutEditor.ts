// @ts-nocheck
function renderRelatorioLayoutEditor(tipoId) {
  ui.relatorioLayoutEditor.innerHTML = '';
  if (!tipoId) return;

  if (!relatorioCurrentLayout.length) {
    ui.relatorioLayoutEditor.innerHTML = '<p class="empty">Selecione atributos para montar o layout do relatorio.</p>';
    return;
  }

  const attrs = getAtributosByTipo(tipoId);
  const attrById = new Map(attrs.map((a) => [a.id, a]));

  for (let i = 0; i < relatorioCurrentLayout.length; i += 1) {
    const item = relatorioCurrentLayout[i];
    const attr = attrById.get(item.attrId);
    if (!attr) continue;

    const row = document.createElement('div');
    row.className = 'relatorio-layout-row';

    const name = document.createElement('strong');
    name.textContent = attr.nome;

    const controls = document.createElement('div');
    controls.className = 'relatorio-layout-controls';

    const spanSelect = document.createElement('select');
    spanSelect.className = 'browser-default';
    [3, 4, 6, 8, 12].forEach((n) => {
      const opt = document.createElement('option');
      opt.value = String(n);
      opt.textContent = `Largura ${n}`;
      if (Number(item.colSpan) === n) opt.selected = true;
      spanSelect.appendChild(opt);
    });
    spanSelect.addEventListener('change', () => {
      updateRelatorioLayoutSpan(item.attrId, spanSelect.value);
    });

    const upBtn = document.createElement('button');
    upBtn.type = 'button';
    upBtn.className = 'btn-flat btn-small';
    upBtn.textContent = '↑';
    upBtn.disabled = i === 0;
    upBtn.addEventListener('click', () => moveRelatorioLayoutItem(item.attrId, -1));

    const downBtn = document.createElement('button');
    downBtn.type = 'button';
    downBtn.className = 'btn-flat btn-small';
    downBtn.textContent = '↓';
    downBtn.disabled = i === relatorioCurrentLayout.length - 1;
    downBtn.addEventListener('click', () => moveRelatorioLayoutItem(item.attrId, 1));

    controls.appendChild(spanSelect);
    controls.appendChild(upBtn);
    controls.appendChild(downBtn);

    row.appendChild(name);
    row.appendChild(controls);
    ui.relatorioLayoutEditor.appendChild(row);
  }
}
