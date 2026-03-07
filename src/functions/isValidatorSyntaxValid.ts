function isValidatorSyntaxValid(raw: string | null | undefined): boolean {
  if (!raw) return true;
  const parsed = parseValidatorRules(raw);
  return parsed.invalid.length === 0;
}
