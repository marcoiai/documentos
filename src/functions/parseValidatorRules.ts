function parseValidatorRules(raw: string | null | undefined): ValidatorRules {
  const result: ValidatorRules = {
    hasNumber: false,
    hasDate: false,
    hasUnique: false,
    hasRequired: false,
    hasNullable: false,
    requiredIfFieldNames: [],
    max: null,
    invalid: [],
  };

  if (!raw) return result;

  const tokens = raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  for (const token of tokens) {
    const lowered = token.toLowerCase();

    if (lowered === 'number') {
      result.hasNumber = true;
      continue;
    }
    if (lowered === 'date') {
      result.hasDate = true;
      continue;
    }
    if (lowered === 'unique') {
      result.hasUnique = true;
      continue;
    }
    if (lowered === 'required') {
      result.hasRequired = true;
      continue;
    }
    if (lowered === 'nullable') {
      result.hasNullable = true;
      continue;
    }
    if (lowered.startsWith('max:')) {
      const value = Number(token.slice(4));
      if (Number.isFinite(value) && value >= 0) {
        result.max = value;
      } else {
        result.invalid.push(token);
      }
      continue;
    }
    if (lowered.startsWith('required_if:@')) {
      const fieldName = token.slice('required_if:@'.length).trim();
      if (fieldName) {
        result.requiredIfFieldNames.push(fieldName);
      } else {
        result.invalid.push(token);
      }
      continue;
    }
    result.invalid.push(token);
  }

  return result;
}
