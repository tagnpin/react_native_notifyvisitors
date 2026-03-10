import { ParamSchema, ParamType } from '../types/params';

const inferType = (value: any): ParamType => {
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'object') return 'json';
  return 'string';
};

const normalizeParams = (
  params?: Record<string, any>,
): Record<string, ParamSchema> => {
  if (!params) return {};

  const normalized: Record<string, ParamSchema> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && 'type' in value) {
      // already ParamSchema
      normalized[key] = value as ParamSchema;
    } else {
      // shorthand → schema
      normalized[key] = {
        type: inferType(value),
        default: value,
      };
    }
  });

  return normalized;
};

const normalizeJSON = (value: any) => {
  if (value == null) return value;

  // If already object/array → perfect
  if (typeof value === 'object') return value;

  // If string, try parsing
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      // Not valid JSON string → return as-is
      return value;
    }
  }

  return value;
};

export { normalizeParams, normalizeJSON };
