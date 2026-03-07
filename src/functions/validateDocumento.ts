function validateDocumento(
  tipoId: string,
  valores: Record<string, unknown>,
  editingDocId: string
): ValidationError[] {
  const errors: ValidationError[] = [];
  const attrs = state.atributos.filter((a) => a.tipoId === tipoId);
  const attrsByName = new Map(
    attrs.map((a) => [String(a.nome || '').trim().toLowerCase(), a])
  );

  for (const attr of attrs) {
    const rules = parseValidatorRules(attr.validador || '');
    const raw = valores[attr.id];
    const empty = !isAttributeValueFilled(attr, raw);

    if (rules.hasRequired && empty) {
      errors.push({
        attrId: attr.id,
        summary: `${attr.nome}: campo obrigatorio`,
        message: 'Campo obrigatorio',
      });
      continue;
    }

    if (rules.requiredIfFieldNames.length > 0 && empty) {
      const shouldBeRequired = rules.requiredIfFieldNames.some((refName) => {
        const refAttr = attrsByName.get(refName.trim().toLowerCase());
        if (!refAttr) return false;
        return isAttributeValueFilled(refAttr, valores[refAttr.id]);
      });
      if (shouldBeRequired) {
        errors.push({
          attrId: attr.id,
          summary: `${attr.nome}: campo obrigatorio pois outro campo referenciado foi preenchido`,
          message: 'Obrigatorio por dependencia',
        });
        continue;
      }
    }

    if (empty && rules.hasNullable) continue;
    if (empty) continue;

    if (attr.mascara && !matchesMask(String(raw), attr.mascara)) {
      errors.push({
        attrId: attr.id,
        summary: `${attr.nome}: valor nao corresponde a mascara ${attr.mascara}`,
        message: `Nao corresponde a mascara ${attr.mascara}`,
      });
      continue;
    }

    if (rules.hasNumber) {
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        errors.push({
          attrId: attr.id,
          summary: `${attr.nome}: deve ser numero`,
          message: 'Deve ser numero',
        });
        continue;
      }
    }

    if (rules.hasDate) {
      if (!isValidDateValue(raw)) {
        errors.push({
          attrId: attr.id,
          summary: `${attr.nome}: deve ser uma data valida`,
          message: 'Data invalida',
        });
        continue;
      }
    }

    if (rules.max !== null) {
      if (attr.tipoCampo === 'numero' || rules.hasNumber) {
        const num = Number(raw);
        if (!Number.isFinite(num) || num > rules.max) {
          errors.push({
            attrId: attr.id,
            summary: `${attr.nome}: valor maximo ${rules.max}`,
            message: `Valor maximo ${rules.max}`,
          });
          continue;
        }
      } else if (String(raw).length > rules.max) {
        errors.push({
          attrId: attr.id,
          summary: `${attr.nome}: tamanho maximo ${rules.max}`,
          message: `Tamanho maximo ${rules.max}`,
        });
        continue;
      }
    }

    if (rules.hasUnique) {
      const collision = state.documentos.some((doc) => {
        if (doc.id === editingDocId) return false;
        if (doc.tipoId !== tipoId) return false;
        return String(doc.valores[attr.id] ?? '') === String(raw ?? '');
      });
      if (collision) {
        errors.push({
          attrId: attr.id,
          summary: `${attr.nome}: valor deve ser unico`,
          message: 'Valor deve ser unico',
        });
      }
    }
  }

  return errors;
}
