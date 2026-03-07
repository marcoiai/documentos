// @ts-nocheck
function extractMaskPayload(value, mask) {
  const literals = new Set(mask.split('').filter((ch) => ch !== '9'));
  return value
    .split('')
    .filter((ch) => !literals.has(ch))
    .join('');
}

