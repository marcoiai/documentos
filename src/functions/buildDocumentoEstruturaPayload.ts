// @ts-nocheck
function buildDocumentoEstruturaPayload(savedDoc) {
  const placeholderCtx = buildHeaderFooterPlaceholderContext(
    savedDoc.tipoId,
    savedDoc.valores,
    savedDoc.titulo
  );
  const secoesEstruturadas = buildSectionGroupsForTipo(savedDoc.tipoId, { includeEmptySections: true }).map(
    (group) => ({
      key: group.key,
      nome: group.nome,
      atributos: group.items.map((item) => {
        const attr = item.attr;
        const raw = savedDoc.valores[attr.id];
        return {
          id: attr.id,
          nome: attr.nome,
          tipoCampo: attr.tipoCampo,
          secaoId: attr.secaoId || '',
          colSpan: item.colSpan,
          pdfVisivel: savedDoc.pdfVisivel[attr.id] !== false,
          valorBruto: raw ?? '',
          valorRenderizado: resolveAttrValueForOutput(attr, raw, placeholderCtx),
        };
      }),
    })
  );

  return {
    documento: savedDoc,
    tipo: state.tipos.find((t) => t.id === savedDoc.tipoId) || null,
    secoes: getSecoesForTipo(savedDoc.tipoId),
    atributos: getAtributosByTipo(savedDoc.tipoId),
    layout: state.layouts[savedDoc.tipoId] || [],
    layoutSections: state.layoutSections[savedDoc.tipoId] || [],
    estruturaPorSecao: secoesEstruturadas,
  };
}
