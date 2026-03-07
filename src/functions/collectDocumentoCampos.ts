function collectDocumentoCampos(): Record<string, unknown> {
  const tipoId = ui.documentoTipo.value;
  if (!tipoId) return {};

  const atributos = state.atributos.filter((a) => a.tipoId === tipoId);
  const valores: Record<string, unknown> = {};

  for (const attr of atributos) {
    const el = document.getElementById(`campo_${attr.id}`) as HTMLInputElement | HTMLTextAreaElement | null;
    if (!el) continue;
    valores[attr.id] = attr.tipoCampo === 'boolean' ? (el as HTMLInputElement).checked : el.value;
  }

  return valores;
}
