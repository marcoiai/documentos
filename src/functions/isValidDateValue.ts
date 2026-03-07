// @ts-nocheck
function isValidDateValue(value) {
  if (value === null || value === undefined) return false;
  const text = String(value).trim();
  if (!text) return false;

  // Accepts ISO-like date inputs from <input type="date"> and parseable date strings.
  const parsed = new Date(text);
  return !Number.isNaN(parsed.getTime());
}

