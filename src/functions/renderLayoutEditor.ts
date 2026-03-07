// @ts-nocheck
function renderLayoutEditor() {
  const tipoId = ui.layoutTipo.value || state.tipos[0]?.id;
  ui.layoutGridEditor.innerHTML = '';
  if (!tipoId) {
    ui.layoutGridEditor.innerHTML = '<p class="empty">Nenhum tipo cadastrado.</p>';
    return;
  }

  const groups = buildSectionGroupsForTipo(tipoId, { includeEmptySections: true });
  if (groups.length === 0) {
    ui.layoutGridEditor.innerHTML = '<p class="empty">Nenhuma secao cadastrada.</p>';
    return;
  }
  const sectionsWrap = document.createElement('div');
  sectionsWrap.className = 'layout-sections';

  for (const group of groups) {
    const section = document.createElement('div');
    section.className = `layout-section ${group.key === '__sem_secao__' ? 'layout-section-fixed-top' : ''}`;
    section.dataset.layoutSectionKey = group.key;

    if (group.key !== '__sem_secao__') {
      section.setAttribute('draggable', 'true');
      section.addEventListener('dragstart', (e) => {
        section.classList.add('is-dragging');
        currentLayoutDrag = { kind: 'section', key: group.key };
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/layout-section', group.key);
          e.dataTransfer.setData('text/plain', `section:${group.key}`);
        }
      });
      section.addEventListener('dragend', () => {
        section.classList.remove('is-dragging');
        currentLayoutDrag = null;
        sectionsWrap.querySelectorAll('.layout-section').forEach((el) => el.classList.remove('drag-over'));
      });
    }

    section.addEventListener('dragover', (e) => {
      const draggedSectionKey =
        currentLayoutDrag?.kind === 'section'
          ? currentLayoutDrag.key
          : e.dataTransfer?.getData('text/layout-section') ||
            e.dataTransfer?.getData('text/plain')?.replace('section:', '');
      const draggedAttrId =
        currentLayoutDrag?.kind === 'attr'
          ? currentLayoutDrag.attrId
          : e.dataTransfer?.getData('text/layout-attr') ||
            e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
      const draggedAttr =
        draggedAttrId && currentLayoutDrag?.kind === 'attr'
          ? state.atributos.find((a) => a.id === draggedAttrId && a.tipoId === tipoId)
          : null;
      const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
      const hasValidDrag =
        (draggedSectionKey && draggedSectionKey !== group.key) ||
        Boolean(draggedAttrId && fromSectionKey !== group.key);
      if (!hasValidDrag) return;
      e.preventDefault();
      section.classList.add('drag-over');
    });
    section.addEventListener('dragleave', () => section.classList.remove('drag-over'));
    section.addEventListener('drop', (e) => {
      e.preventDefault();
      section.classList.remove('drag-over');
      const draggedKey =
        currentLayoutDrag?.kind === 'section'
          ? currentLayoutDrag.key
          : e.dataTransfer?.getData('text/layout-section') ||
            e.dataTransfer?.getData('text/plain')?.replace('section:', '');
      const draggedAttrId =
        currentLayoutDrag?.kind === 'attr'
          ? currentLayoutDrag.attrId
          : e.dataTransfer?.getData('text/layout-attr') ||
            e.dataTransfer?.getData('text/plain')?.replace('attr:', '');

      if (draggedAttrId) {
        const draggedAttr = state.atributos.find((a) => a.id === draggedAttrId && a.tipoId === tipoId);
        const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
        if (fromSectionKey && fromSectionKey !== group.key) {
          moveAttributeToSection(tipoId, draggedAttrId, group.key);
        }
        return;
      }
      if (draggedKey) {
        moveLayoutSectionBefore(tipoId, draggedKey, group.key);
      }
    });

    section.innerHTML = `
      <div class="layout-section-header">
        <strong>${escapeHtml(group.nome)}</strong>
        ${group.key === '__sem_secao__' ? '<small class="layout-section-fixed">fixa no topo</small>' : '<small>arraste para reordenar</small>'}
      </div>
    `;

    const grid = document.createElement('div');
    grid.className = 'layout-grid';
    const secao = group.key === '__sem_secao__' ? null : state.secoes.find((s) => s.id === group.key);
    if (secao?.cabecalho) {
      const headerBlock = document.createElement('div');
      headerBlock.className = 'layout-section-fullwidth layout-section-fullwidth-header';
      headerBlock.textContent = secao.cabecalho;
      section.appendChild(headerBlock);
    }

    for (let i = 0; i < group.items.length; i += 1) {
      const item = group.items[i];
      const attr = item.attr;
      const card = document.createElement('div');
      card.className = 'layout-item';
      card.style.gridColumn = `span ${item.colSpan}`;
      card.setAttribute('draggable', 'true');
      card.dataset.layoutAttrId = attr.id;

      card.innerHTML = `
        <strong>${escapeHtml(attr.nome)}</strong>
        <small>${escapeHtml(attr.tipoCampo)}</small>
        <div class="layout-item-controls">
          <label>
            Largura
            <select class="browser-default" data-layout-span="${attr.id}">
              ${[3, 4, 6, 8, 12]
                .map((v) => `<option value="${v}" ${v === item.colSpan ? 'selected' : ''}>${v}/12</option>`)
                .join('')}
            </select>
          </label>
          <div class="layout-item-actions">
            <button type="button" class="btn-flat btn-small" data-layout-up="${attr.id}" ${i === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" class="btn-flat btn-small" data-layout-down="${attr.id}" ${i === group.items.length - 1 ? 'disabled' : ''}>↓</button>
          </div>
        </div>
      `;

      const prevItem = group.items[i - 1];
      const nextItem = group.items[i + 1];
      const spanSelect = card.querySelector(`[data-layout-span="${attr.id}"]`);
      spanSelect.addEventListener('change', (e) => updateLayoutSpan(tipoId, attr.id, e.target.value));
      card
        .querySelector(`[data-layout-up="${attr.id}"]`)
        .addEventListener('click', () => prevItem && swapLayoutItems(tipoId, attr.id, prevItem.attr.id));
      card
        .querySelector(`[data-layout-down="${attr.id}"]`)
        .addEventListener('click', () => nextItem && swapLayoutItems(tipoId, attr.id, nextItem.attr.id));

      card.addEventListener('dragstart', (e) => {
        card.classList.add('is-dragging');
        currentLayoutDrag = { kind: 'attr', attrId: attr.id };
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/layout-attr', attr.id);
          e.dataTransfer.setData('text/plain', `attr:${attr.id}`);
        }
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('is-dragging');
        currentLayoutDrag = null;
        grid.querySelectorAll('.layout-item').forEach((el) => el.classList.remove('drag-over'));
      });
      card.addEventListener('dragover', (e) => {
        const draggedId =
          currentLayoutDrag?.kind === 'attr'
            ? currentLayoutDrag.attrId
            : e.dataTransfer?.getData('text/layout-attr') ||
              e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
        if (!draggedId || draggedId === attr.id) return;
        const draggedAttr = state.atributos.find((a) => a.id === draggedId && a.tipoId === tipoId);
        const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
        e.preventDefault();
        if (fromSectionKey === group.key) {
          e.stopPropagation();
          card.classList.add('drag-over');
        }
      });
      card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        const draggedId =
          currentLayoutDrag?.kind === 'attr'
            ? currentLayoutDrag.attrId
            : e.dataTransfer?.getData('text/layout-attr') ||
              e.dataTransfer?.getData('text/plain')?.replace('attr:', '');
        if (!draggedId) return;
        const draggedAttr = state.atributos.find((a) => a.id === draggedId && a.tipoId === tipoId);
        const fromSectionKey = draggedAttr ? sectionKeyFromAttr(draggedAttr) : null;
        if (fromSectionKey === group.key) {
          e.stopPropagation();
          moveLayoutItemBefore(tipoId, draggedId, attr.id);
        } else {
          moveAttributeToSection(tipoId, draggedId, group.key);
        }
      });

      grid.appendChild(card);
    }

    section.appendChild(grid);
    if (secao?.rodape) {
      const footerBlock = document.createElement('div');
      footerBlock.className = 'layout-section-fullwidth layout-section-fullwidth-footer';
      footerBlock.textContent = `Rodape: ${secao.rodape}`;
      section.appendChild(footerBlock);
    }
    sectionsWrap.appendChild(section);
  }

  ui.layoutGridEditor.appendChild(sectionsWrap);
}

