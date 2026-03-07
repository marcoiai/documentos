// @ts-nocheck
function clearFieldError(field) {
  if (!field) return;
  const target = getDisplayTarget(field);
  target.classList.remove('app-invalid');

  const container = field.closest('.input-field') || field.closest('.doc-field-label');
  if (!container) return;
  container.classList.remove('app-field-has-error');
  const messageEl = container.querySelector('.field-error-text');
  if (messageEl) messageEl.remove();
}

