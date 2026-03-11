// @ts-nocheck
function renderRelatorioLayoutBlockCanvas(tipoId, configId) {
  ui.relatorioLayoutBlockCanvas.innerHTML = '';
  if (!configId) return;

  const grid = document.createElement('div');
  grid.className = 'layout-grid';

  for (let i = 0; i < relatorioLayoutBlocksWorking.length; i += 1) {
    const key = relatorioLayoutBlocksWorking[i];
    const card = document.createElement('div');
    card.className = 'layout-item';
    card.style.gridColumn = 'span 12';
    card.setAttribute('draggable', 'true');

    card.innerHTML = `
      <small class="layout-drag-handle">Arraste para ordenar</small>
      <strong>${escapeHtml(labelRelatorioBlock(key))}</strong>
      <small>Bloco do relatorio</small>
      <label class="layout-block-visibility">
        <input type="checkbox" data-report-block-visible="${key}" ${relatorioLayoutBlockVisibilityWorking[key] !== false ? 'checked' : ''} />
        <span>Exibir no PDF</span>
      </label>
      <div class="layout-item-actions">
        <button type="button" class="btn-flat btn-small" data-report-block-up="${key}" ${i === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" class="btn-flat btn-small" data-report-block-down="${key}" ${i === relatorioLayoutBlocksWorking.length - 1 ? 'disabled' : ''}>↓</button>
      </div>
    `;

    const visibleInput = card.querySelector(`[data-report-block-visible="${key}"]`);
    visibleInput.addEventListener('change', (e) => {
      relatorioLayoutBlockVisibilityWorking[key] = Boolean(e.target.checked);
    });
    visibleInput.addEventListener('mousedown', (e) => e.stopPropagation());
    visibleInput.addEventListener('click', (e) => e.stopPropagation());

    card.querySelector(`[data-report-block-up="${key}"]`).addEventListener('click', () => {
      moveRelatorioLayoutBlockItem(key, -1);
      renderRelatorioLayoutBlockCanvas(tipoId, configId);
    });

    card.querySelector(`[data-report-block-down="${key}"]`).addEventListener('click', () => {
      moveRelatorioLayoutBlockItem(key, 1);
      renderRelatorioLayoutBlockCanvas(tipoId, configId);
    });

    card.addEventListener('dragstart', (e) => {
      card.classList.add('is-dragging');
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/report-layout-block', key);
      }
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      grid.querySelectorAll('.layout-item').forEach((el) => el.classList.remove('drag-over'));
    });
    card.addEventListener('dragover', (e) => {
      const dragged = e.dataTransfer?.getData('text/report-layout-block');
      if (!dragged || dragged === key) return;
      e.preventDefault();
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const dragged = e.dataTransfer?.getData('text/report-layout-block');
      if (!dragged || dragged === key) return;
      moveRelatorioLayoutBlockBefore(dragged, key);
      renderRelatorioLayoutBlockCanvas(tipoId, configId);
    });

    grid.appendChild(card);
  }

  ui.relatorioLayoutBlockCanvas.appendChild(grid);
}
