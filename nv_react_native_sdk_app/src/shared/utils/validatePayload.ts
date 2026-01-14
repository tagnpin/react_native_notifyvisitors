// src/shared/utils/validatePayload.ts

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

export { validateNativeSafePayload, assertNonEmptyString, assertPlainObject };
