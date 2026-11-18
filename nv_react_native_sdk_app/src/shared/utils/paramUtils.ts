// src/shared/utils/paramUtils.ts

import { ParamSchema } from '../types/params';

const parseParam = (rawValue: any, schema: ParamSchema): any => {
  // Default handling
  if (
    (rawValue === undefined || rawValue === null || rawValue === '') &&
    schema.default !== undefined
  ) {
    return schema.default;
  }

  if (
    (rawValue === undefined || rawValue === null || rawValue === '') &&
    schema.required
  ) {
    throw new Error('Required parameter missing');
  }

  switch (schema.type) {
    case 'string':
      return String(rawValue ?? '');

    case 'number': {
      const n = Number(rawValue);
      if (Number.isNaN(n)) throw new Error('Invalid number');
      return n;
    }

    case 'boolean':
      if (rawValue === true || rawValue === false) return rawValue;
      return rawValue === 'true' || rawValue === '1';

    case 'json': {
      if (typeof rawValue === 'object') return rawValue;
      try {
        return JSON.parse(rawValue || '{}');
      } catch {
        throw new Error('Invalid JSON object');
      }
    }

    case 'array': {
      if (Array.isArray(rawValue)) return rawValue;
      try {
        const parsed = JSON.parse(rawValue || '[]');
        if (!Array.isArray(parsed)) throw new Error();
        return parsed;
      } catch {
        throw new Error('Invalid JSON array');
      }
    }

    case 'raw':
      return rawValue;

    default:
      return rawValue;
  }
};

const resolveParams = (
  schema?: Record<string, ParamSchema>,
  overrides?: Record<string, any>, // QA / runtime overrides
) => {
  const payload: Record<string, any> = {};

  if (!schema) return payload;

  for (const key of Object.keys(schema)) {
    const def = schema[key];
    const value =
      overrides?.[key] ?? def.default ?? (def.required ? undefined : null);

    if (def.required && value === undefined) {
      throw new Error(`Missing required param: ${key}`);
    }

    payload[key] = value;
  }

  return payload;
};

export { parseParam, resolveParams };
