function collectDocumentoPdfFlags(): Record<string, boolean> {
  const tipoId = ui.documentoTipo.value;
  if (!tipoId) return {};

  const atributos = getAtributosByTipo(tipoId);
  const flags: Record<string, boolean> = {};
  for (const attr of atributos) {
    const el = document.getElementById(`campo_pdf_${attr.id}`) as HTMLInputElement | null;
    flags[attr.id] = el ? Boolean(el.checked) : true;
  }
  return flags;
}

// Render
