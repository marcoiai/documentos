function buildSectionGroupsForTipo(
  tipoId: string,
  options: { includeEmptySections?: boolean } = {}
): SectionGroup[] {
  const { includeEmptySections = false } = options;
  const attrs = getAtributosByTipo(tipoId);
  const layoutItems = syncLayoutsForTipo(tipoId);
  const sectionOrder = syncLayoutSectionsForTipo(tipoId);
  const attrById = new Map(attrs.map((a) => [a.id, a]));
  const groups = new Map<string, SectionGroup>();

  for (const key of sectionOrder) {
    groups.set(key, { key, nome: sectionNameFromKey(key), items: [] });
  }

  for (const item of layoutItems) {
    const attr = attrById.get(item.attrId);
    if (!attr) continue;

    const key = sectionKeyFromAttr(attr);
    if (!groups.has(key)) groups.set(key, { key, nome: sectionNameFromKey(key), items: [] });
    groups.get(key).items.push({
      attr,
      colSpan: clampColSpan(item.colSpan),
    });
  }

  const ordered = sectionOrder
    .map((key) => groups.get(key))
    .filter((g) => g && (includeEmptySections || g.items.length > 0));

  const extra = Array.from(groups.values()).filter(
    (g) => !sectionOrder.includes(g.key) && (includeEmptySections || g.items.length > 0)
  );
  extra.sort((a, b) => a.nome.localeCompare(b.nome));

  return [...ordered, ...extra];
}
