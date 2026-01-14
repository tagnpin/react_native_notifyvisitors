// src/shared/utils/parseParam.ts

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

export { parseParam };

// // src/shared/utils/parseParam.ts

// import { ParamSchema } from '../types/params';

// const parseParam = (rawValue: string, schema: ParamSchema): any => {
//   if (!rawValue && schema.default !== undefined) {
//     return schema.default;
//   }

//   if (!rawValue && schema.required) {
//     throw new Error('Required parameter missing');
//   }

//   switch (schema.type) {
//     case 'string':
//       return rawValue;

//     case 'number': {
//       const n = Number(rawValue);
//       if (isNaN(n)) throw new Error('Invalid number');
//       return n;
//     }

//     case 'boolean':
//       return rawValue === 'true' || rawValue === '1';

//     case 'json':
//       return JSON.parse(rawValue || '{}');

//     case 'array':
//       return JSON.parse(rawValue || '[]');

//     case 'raw':
//       return rawValue;

//     default:
//       return rawValue;
//   }
// };

// export { parseParam };

// const parseValue = (type: ParamType, raw: string) => {
//   if (raw === '' || raw === undefined) return undefined;

//   switch (type) {
//     case 'string':
//       return raw;

//     case 'number':
//       const num = Number(raw);
//       if (isNaN(num)) throw new Error('Invalid number');
//       return num;

//     case 'boolean':
//       if (raw === 'true') return true;
//       if (raw === 'false') return false;
//       throw new Error('Invalid boolean');

//     case 'json':
//     case 'array':
//       return JSON.parse(raw);

//     case 'raw':
//     default:
//       return raw;
//   }
// };

// export { parseValue };
