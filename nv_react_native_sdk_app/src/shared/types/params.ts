// src/shared/types/params.ts

export type ParamType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'json'
  | 'array'
  | 'raw';

export type ParamSchema = {
  type: ParamType;
  required?: boolean;
  default?: any;
  description?: string;

  /** UI hints (optional) */
  label?: string;
  placeholder?: string;

  inputType?: 'text' | 'textarea' | 'switch' | 'dropdown';

  inline?: boolean;
  group?: string;
};

// ✅ NEW: allow raw shorthand
export type ParamValue = ParamSchema | any;

export type ParamsDefinition<T = any> = {
  [K in keyof T]: ParamValue;
};

// export const hasParams = <T>(params?: ParamsDefinition<T>) => {
//   return !!params && Object.keys(params).length > 0;
// };

export const hasParams = <T>(params?: ParamsDefinition<T>): boolean => {
  return !!Object.keys(params ?? {}).length;
};
