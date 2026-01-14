import { ParamSchema } from '../types/params';

export const buildPayloadFromSchema = (
  schema: Record<string, ParamSchema>,
): Record<string, any> => {
  const payload: Record<string, any> = {};

  Object.entries(schema).forEach(([key, def]) => {
    let value = def.default;

    if (def.type === 'json' || def.type === 'array') {
      if (typeof value === 'string') {
        value = JSON.parse(value);
      }
    }

    payload[key] = value;
  });

  return payload;
};
