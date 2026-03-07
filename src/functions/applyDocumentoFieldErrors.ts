// @ts-nocheck
function applyDocumentoFieldErrors(errors) {
  for (const error of errors) {
    const field = document.getElementById(`campo_${error.attrId}`);
    if (!field) continue;
    markFieldError(field, error.message);
  }
}

