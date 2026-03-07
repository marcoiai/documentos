// @ts-nocheck
function syncLayoutSectionsForTipo(tipoId) {
  if (!tipoId) return [];
  if (!state.layoutSections || typeof state.layoutSections !== 'object') state.layoutSections = {};

  const sectionKeys = ['__sem_secao__', ...getSecoesForTipo(tipoId).map((s) => s.id)];
  const existing = Array.isArray(state.layoutSections[tipoId]) ? state.layoutSections[tipoId] : [];
  const normalized = [];
  let changed = existing.length === 0;

  for (const key of existing) {
    if (!sectionKeys.includes(key)) continue;
    if (normalized.includes(key)) continue;
    normalized.push(key);
  }

  for (const key of sectionKeys) {
    if (normalized.includes(key)) continue;
    normalized.push(key);
    changed = true;
  }

  // Keep "Sem secao" pinned at top.
  const semIdx = normalized.indexOf('__sem_secao__');
  if (semIdx > 0) {
    normalized.splice(semIdx, 1);
    normalized.unshift('__sem_secao__');
    changed = true;
  }

  if (normalized.length !== existing.length) changed = true;
  state.layoutSections[tipoId] = normalized;
  if (changed) saveState();
  return normalized;
}

