// @ts-nocheck
function focusSecaoCard(secaoId) {
  if (!(ui.secaoModal instanceof Element)) {
    window.location.href = `secoes.html?editSecao=${encodeURIComponent(secaoId)}`;
    return;
  }

  focusedSecaoId = secaoId;
  editSecao(secaoId);
}
