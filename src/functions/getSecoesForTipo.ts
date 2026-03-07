// @ts-nocheck
function getSecoesForTipo(tipoId) {
  if (!tipoId) return [];
  if (!state.tipoSecoes || typeof state.tipoSecoes !== 'object') state.tipoSecoes = {};

  let linked = Array.isArray(state.tipoSecoes[tipoId]) ? state.tipoSecoes[tipoId] : null;
  if (!linked) {
    // Backward compatibility: existing types start linked to all sections.
    linked = state.secoes.map((s) => s.id);
    state.tipoSecoes[tipoId] = linked;
    saveState();
  }

  // Ensure linked sections also include sections already used by this type attributes.
  const attrSectionIds = Array.from(
    new Set(
      state.atributos
        .filter((a) => a.tipoId === tipoId && a.secaoId)
        .map((a) => a.secaoId)
    )
  );
  if (attrSectionIds.length > 0) {
    const merged = Array.from(new Set([...linked, ...attrSectionIds]));
    if (merged.length !== linked.length) {
      linked = merged;
      state.tipoSecoes[tipoId] = linked;
      saveState();
    }
  }

  const validIds = new Set(state.secoes.map((s) => s.id));
  const normalized = linked.filter((id, idx) => validIds.has(id) && linked.indexOf(id) === idx);
  if (normalized.length !== linked.length) {
    state.tipoSecoes[tipoId] = normalized;
    saveState();
  }

  return normalized
    .map((id) => state.secoes.find((s) => s.id === id))
    .filter(Boolean);
}

