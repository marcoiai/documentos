// @ts-nocheck
function openPendingEditFromUrl() {
  const params = new URLSearchParams(window.location.search);

  const editTipoId = params.get('editTipo');
  if (editTipoId && ui.tipoModal instanceof Element) {
    editTipo(editTipoId);
    params.delete('editTipo');
  }

  const editSecaoId = params.get('editSecao');
  if (editSecaoId && ui.secaoModal instanceof Element) {
    editSecao(editSecaoId);
    params.delete('editSecao');
  }

  const editAtributoId = params.get('editAtributo');
  if (editAtributoId && ui.atributoModal instanceof Element) {
    editAtributo(editAtributoId);
    params.delete('editAtributo');
  }

  const editDocumentoId = params.get('editDocumento');
  if (editDocumentoId && ui.documentoModal instanceof Element) {
    editDocumento(editDocumentoId);
    params.delete('editDocumento');
  }

  const nextSearch = params.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash || ''}`;
  history.replaceState(null, '', nextUrl);
}
