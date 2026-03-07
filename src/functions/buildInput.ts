// @ts-nocheck
function buildInput(attr, id, value) {
  let input = document.createElement('input');
  input.id = id;

  if (attr.tipoCampo === 'boolean') {
    input.type = 'checkbox';
    input.checked = Boolean(value);
    input.addEventListener('change', () => clearFieldError(input));
    return input;
  }

  if (attr.tipoCampo === 'textarea') {
    input = document.createElement('textarea');
    input.id = id;
    input.className = 'materialize-textarea';
    input.value = String(value || '');
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
    return input;
  }

  if (attr.tipoCampo === 'textarea_template') {
    input = document.createElement('textarea');
    input.id = id;
    input.className = 'materialize-textarea';
    input.value = String(value || '');
    input.dataset.templatePreview = '1';
    input.dataset.templateKind = 'textarea';
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
    return input;
  }

  if (attr.tipoCampo === 'texto_placeholder') {
    input = document.createElement('textarea');
    input.id = id;
    input.className = 'materialize-textarea';
    input.value = String(value || attr.templateTexto || '');
    input.dataset.templatePreview = '1';
    input.dataset.templateKind = 'textarea';
    input.dataset.templateDefault = String(attr.templateTexto || '');
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
    return input;
  }

  if (attr.tipoCampo === 'assinatura') {
    input.type = 'text';
    input.value = String(value || '');
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
    return input;
  }

  if (attr.mascara) {
    input.type = 'text';
    input.value = applyMask(String(value), attr.mascara);
    input.addEventListener('input', () => {
      input.value = applyMask(input.value, attr.mascara);
      clearFieldError(input);
    });
    input.addEventListener('change', () => clearFieldError(input));
    return input;
  }

  if (attr.tipoCampo === 'numero') input.type = 'number';
  else if (attr.tipoCampo === 'data') input.type = 'date';
  else input.type = 'text';

  input.value = String(value);
  input.addEventListener('input', () => clearFieldError(input));
  input.addEventListener('change', () => clearFieldError(input));
  return input;
}

