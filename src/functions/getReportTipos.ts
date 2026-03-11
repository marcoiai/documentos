// @ts-nocheck
function getReportTipos() {
  if (Array.isArray(state.tipos) && state.tipos.length > 0) {
    return state.tipos.map((tipo) => ({
      ...tipo,
      id: String(tipo.id || ''),
      nome: String(tipo.nome || '').trim() || inferTipoNome(tipo.id),
      cabecalho: String(tipo.cabecalho || ''),
      rodape: String(tipo.rodape || ''),
    }));
  }

  const inferredIds = Array.from(
    new Set([
      ...state.atributos.map((a) => a.tipoId).filter(Boolean),
      ...state.documentos.map((d) => d.tipoId).filter(Boolean),
      ...Object.keys(state.layouts || {}),
      ...Object.keys(state.layoutSections || {}),
      ...Object.keys(state.tipoSecoes || {}),
    ])
  );

  return inferredIds.map((id) => ({
    id,
    nome: inferTipoNome(id),
    cabecalho: '',
    rodape: '',
  }));
}
