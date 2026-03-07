// @ts-nocheck
function resolveTemplateTextForOutput(text, ctx) {
  const source = String(text ?? '');
  if (!source) return '';
  if (!source.includes('{{')) return source;
  return applyPlaceholderTemplate(source, ctx);
}

