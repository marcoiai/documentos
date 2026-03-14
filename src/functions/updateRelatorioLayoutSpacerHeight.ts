// @ts-nocheck
function updateRelatorioLayoutSpacerHeight(attrId, value) {
  const item = (relatorioLayoutWorking || []).find((x) => x.attrId === attrId);
  if (!item || !isRelatorioSpacerId(attrId)) return;
  item.spacerHeight = clampRelatorioSpacerHeight(value);
}

