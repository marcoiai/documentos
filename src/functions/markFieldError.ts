// @ts-nocheck
function markFieldError(field, message) {
  if (!field) return;
  const target = getDisplayTarget(field);
  target.classList.add('app-invalid');

  const container = field.closest('.input-field') || field.closest('.doc-field-label');
  if (!container) return;
  container.classList.add('app-field-has-error');

  let messageEl = container.querySelector('.field-error-text');
  if (!messageEl) {
    messageEl = document.createElement('small');
    messageEl.className = 'field-error-text';
    container.appendChild(messageEl);
  }
  messageEl.textContent = message;
}

