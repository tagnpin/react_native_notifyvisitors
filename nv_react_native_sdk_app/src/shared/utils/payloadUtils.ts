// src/shared/utils/payloadUtils.ts

import { ParamSchema } from '../types/params';

const buildPayloadFromSchema = (
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
    validateNativeSafePayload(payload);
    payload[key] = value;
  });

  return payload;
};

const validateNativeSafePayload = (payload: Record<string, any>) => {
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'function') {
      throw new Error(`Invalid payload value for "${key}"`);
    }

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      try {
        JSON.stringify(value); // iOS NSDictionary safe check
      } catch {
        throw new Error(`"${key}" contains invalid JSON`);
      }
    }
  }
};

const assertNonEmptyString = (value: any, fieldName: string) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
};

const assertPlainObject = (value: any, fieldName: string) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${fieldName} must be a valid JSON object`);
  }
};

export {
  buildPayloadFromSchema,
  validateNativeSafePayload,
  assertNonEmptyString,
  assertPlainObject,
};
