// @ts-nocheck
function renderRelatorioLayoutCanvas(tipoId, configId) {
  ui.relatorioLayoutCanvas.innerHTML = '';
  if (!tipoId) {
    ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Selecione um tipo.</p>';
    return;
  }
  if (!configId) {
    ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Selecione uma configuracao de relatorio.</p>';
    return;
  }

  const config = (state.reportConfigs || []).find((c) => c.id === configId && c.tipoId === tipoId);
  if (!config) {
    ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Configuracao nao encontrada.</p>';
    return;
  }

  if (relatorioLayoutWorkingConfigId !== configId) {
    relatorioLayoutWorkingConfigId = configId;
    relatorioLayoutWorking = buildRelatorioLayoutWorkingFromConfig(tipoId, configId);
    relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(config.totalAttrIds, tipoId);
    relatorioLayoutBlocksWorking = normalizeRelatorioBlockOrder(config.reportBlockOrder);
    relatorioLayoutBlockVisibilityWorking = normalizeRelatorioBlockVisibility(
      config.reportBlockVisibility,
      relatorioLayoutBlocksWorking
    );
    relatorioLayoutBlockSpacerHeightsWorking = normalizeRelatorioBlockSpacerHeights(
      config.reportBlockSpacerHeights,
      relatorioLayoutBlocksWorking
    );
    relatorioLayoutFooterModeWorking = config.reportFooterMode === 'after_block' ? 'after_block' : 'fixed_bottom';
    relatorioLayoutFooterAnchorWorking = ['cabecalho', 'info_geracao', 'tabela'].includes(String(config.reportFooterAnchor || ''))
      ? String(config.reportFooterAnchor)
      : 'tabela';
  } else {
    relatorioLayoutWorking = relatorioLayoutWorking.filter((x) => x && x.attrId);
    relatorioTotalAttrIdsWorking = normalizeRelatorioTotalAttrIds(relatorioTotalAttrIdsWorking, tipoId);
    relatorioLayoutBlocksWorking = normalizeRelatorioBlockOrder(relatorioLayoutBlocksWorking);
    relatorioLayoutBlockVisibilityWorking = normalizeRelatorioBlockVisibility(
      relatorioLayoutBlockVisibilityWorking,
      relatorioLayoutBlocksWorking
    );
    relatorioLayoutBlockSpacerHeightsWorking = normalizeRelatorioBlockSpacerHeights(
      relatorioLayoutBlockSpacerHeightsWorking,
      relatorioLayoutBlocksWorking
    );
    relatorioLayoutFooterModeWorking = relatorioLayoutFooterModeWorking === 'after_block' ? 'after_block' : 'fixed_bottom';
    relatorioLayoutFooterAnchorWorking = ['cabecalho', 'info_geracao', 'tabela'].includes(String(relatorioLayoutFooterAnchorWorking || ''))
      ? relatorioLayoutFooterAnchorWorking
      : 'tabela';
  }
  renderRelatorioLayoutBlockCanvas(tipoId, configId);
  ui.relatorioLayoutFooterMode.value = relatorioLayoutFooterModeWorking;
  ui.relatorioLayoutFooterAnchor.value = relatorioLayoutFooterAnchorWorking;
  ui.relatorioLayoutFooterAnchor.disabled = relatorioLayoutFooterModeWorking !== 'after_block';
  ui.relatorioLayoutFooterMode.onchange = (e) => {
    relatorioLayoutFooterModeWorking = e.target.value === 'after_block' ? 'after_block' : 'fixed_bottom';
    ui.relatorioLayoutFooterAnchor.disabled = relatorioLayoutFooterModeWorking !== 'after_block';
  };
  ui.relatorioLayoutFooterAnchor.onchange = (e) => {
    const value = String(e.target.value || 'tabela');
    relatorioLayoutFooterAnchorWorking = ['cabecalho', 'info_geracao', 'tabela'].includes(value) ? value : 'tabela';
  };

  if (!relatorioLayoutWorking.length) {
    ui.relatorioLayoutCanvas.innerHTML = '<p class="empty">Essa configuracao nao possui atributos selecionados.</p>';
    return;
  }

  const attrs = getAtributosByTipo(tipoId);
  const attrById = new Map(attrs.map((a) => [a.id, a]));
  const grid = document.createElement('div');
  grid.className = 'layout-grid';

  for (let i = 0; i < relatorioLayoutWorking.length; i += 1) {
    const item = relatorioLayoutWorking[i];
    const attr = attrById.get(item.attrId);
    if (!attr) continue;

    const card = document.createElement('div');
    card.className = 'layout-item';
    card.style.gridColumn = `span ${item.colSpan}`;
    card.setAttribute('draggable', 'true');
    card.dataset.reportLayoutAttrId = item.attrId;

    card.innerHTML = `
      <strong>${escapeHtml(attr.nome)}</strong>
      <small>${escapeHtml(attr.tipoCampo)}</small>
      <div class="layout-item-controls">
        <label>
          Largura
          <select class="browser-default" data-report-layout-span="${item.attrId}">
            ${[3, 4, 6, 8, 12].map((v) => `<option value="${v}" ${v === item.colSpan ? 'selected' : ''}>${v}/12</option>`).join('')}
          </select>
        </label>
        <div class="layout-item-actions">
          <button type="button" class="btn-flat btn-small" data-report-layout-up="${item.attrId}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" class="btn-flat btn-small" data-report-layout-down="${item.attrId}" ${i === relatorioLayoutWorking.length - 1 ? 'disabled' : ''}>↓</button>
        </div>
      </div>
    `;

    if (attr.tipoCampo === 'numero') {
      const sumLabel = document.createElement('label');
      sumLabel.className = 'layout-block-visibility';
      sumLabel.style.marginTop = '6px';
      sumLabel.innerHTML = `
        <input type="checkbox" data-report-layout-total="${item.attrId}" ${relatorioTotalAttrIdsWorking.includes(item.attrId) ? 'checked' : ''} />
        <span>Somar no total</span>
      `;
      const sumInput = sumLabel.querySelector(`[data-report-layout-total="${item.attrId}"]`);
      sumInput.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!relatorioTotalAttrIdsWorking.includes(item.attrId)) relatorioTotalAttrIdsWorking.push(item.attrId);
        } else {
          relatorioTotalAttrIdsWorking = relatorioTotalAttrIdsWorking.filter((id) => id !== item.attrId);
        }
      });
      sumInput.addEventListener('mousedown', (e) => e.stopPropagation());
      sumInput.addEventListener('click', (e) => e.stopPropagation());
      card.appendChild(sumLabel);
    }

    card.querySelector(`[data-report-layout-span="${item.attrId}"]`).addEventListener('change', (e) => {
      updateRelatorioLayoutWorkingSpan(item.attrId, e.target.value);
      renderRelatorioLayoutCanvas(tipoId, configId);
    });

    card.querySelector(`[data-report-layout-up="${item.attrId}"]`).addEventListener('click', () => {
      moveRelatorioLayoutWorkingItem(item.attrId, -1);
      renderRelatorioLayoutCanvas(tipoId, configId);
    });

    card.querySelector(`[data-report-layout-down="${item.attrId}"]`).addEventListener('click', () => {
      moveRelatorioLayoutWorkingItem(item.attrId, 1);
      renderRelatorioLayoutCanvas(tipoId, configId);
    });

    card.addEventListener('dragstart', (e) => {
      relatorioLayoutDragAttrId = item.attrId;
      card.classList.add('is-dragging');
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/report-layout-attr', item.attrId);
      }
    });
    card.addEventListener('dragend', () => {
      relatorioLayoutDragAttrId = '';
      card.classList.remove('is-dragging');
      grid.querySelectorAll('.layout-item').forEach((el) => el.classList.remove('drag-over'));
    });
    card.addEventListener('dragover', (e) => {
      const dragged = relatorioLayoutDragAttrId || e.dataTransfer?.getData('text/report-layout-attr');
      if (!dragged || dragged === item.attrId) return;
      e.preventDefault();
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const dragged = relatorioLayoutDragAttrId || e.dataTransfer?.getData('text/report-layout-attr');
      if (!dragged || dragged === item.attrId) return;
      moveRelatorioLayoutWorkingBefore(dragged, item.attrId);
      renderRelatorioLayoutCanvas(tipoId, configId);
    });

    grid.appendChild(card);
  }

  ui.relatorioLayoutCanvas.appendChild(grid);
}
