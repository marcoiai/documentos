// @ts-nocheck
function applyMask(value, mask) {
  const payload = extractMaskPayload(String(value), mask);
  let out = '';
  let index = 0;

  for (const ch of mask) {
    if (ch === '9') {
      if (index >= payload.length) break;
      out += payload[index++];
      continue;
    }

    if (payload.length > 0) out += ch;
  }

  return out;
}

