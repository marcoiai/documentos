// @ts-nocheck
function isAttributeValueFilled(attr, value) {
  if (attr.tipoCampo === 'boolean') return value === true;
  if (value === null || value === undefined) return false;
  return String(value).trim() !== '';
}

