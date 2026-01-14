// src/shared/utils/resolveParams.ts
import { ParamSchema } from '../types/params';

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

export { resolveParams };
