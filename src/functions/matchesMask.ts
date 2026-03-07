// @ts-nocheck
function matchesMask(value, mask) {
  if (value.length !== mask.length) return false;

  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === '9') continue;
    if (value[i] !== mask[i]) return false;
  }

  const requiredWildcards = mask.split('').filter((ch) => ch === '9').length;
  const payload = extractMaskPayload(value, mask);
  return payload.length === requiredWildcards;
}

