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

export { normalizeJSON };
