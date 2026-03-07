// @ts-nocheck
function getDisplayTarget(field) {
  if (field.tagName === 'SELECT') {
    const dropdown = field
      .closest('.input-field')
      ?.querySelector('input.select-dropdown');
    if (dropdown) return dropdown;
  }
  return field;
}

