// src/qa/inputs/InputValidator.ts

import { InputParameter, InputType } from '../../shared/types/InputTypes';

export type ValidationResult = {
  valid: boolean;
  parsedValue?: any;
  error?: string;
};

const sanitizeJSON = (value: string) =>
  value
    .trim()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');

export const validateInput = (param: InputParameter): ValidationResult => {
  const value = param.rawValue;

  try {
    switch (param.type) {
      case InputType.STRING:
        return { valid: true, parsedValue: value };

      case InputType.INT: {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) throw new Error('Invalid integer');
        return { valid: true, parsedValue: parsed };
      }

      case InputType.DOUBLE: {
        const parsed = Number(value);
        if (isNaN(parsed)) throw new Error('Invalid number');
        return { valid: true, parsedValue: parsed };
      }

      case InputType.BOOLEAN:
        if (value === 'true') return { valid: true, parsedValue: true };
        if (value === 'false') return { valid: true, parsedValue: false };
        throw new Error('Boolean must be true or false');

      case InputType.JSON_OBJECT: {
        const parsed = JSON.parse(sanitizeJSON(value));
        if (typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('Expected JSON object');
        }
        return { valid: true, parsedValue: parsed };
      }

      case InputType.JSON_ARRAY: {
        const parsed = JSON.parse(sanitizeJSON(value));
        if (!Array.isArray(parsed)) {
          throw new Error('Expected JSON array');
        }
        return { valid: true, parsedValue: parsed };
      }

      case InputType.RAW_TEXT:
        return { valid: true, parsedValue: value };

      case InputType.NULL:
        return { valid: true, parsedValue: null };

      case InputType.UNDEFINED:
        return { valid: true, parsedValue: undefined };

      default:
        throw new Error('Unsupported type');
    }
  } catch (e: any) {
    return { valid: false, error: e.message };
  }
};
