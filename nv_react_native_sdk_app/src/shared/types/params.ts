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
};

// ✅ NEW: allow raw shorthand
export type ParamValue = ParamSchema | any;

export type ParamsDefinition<T = any> = {
  [K in keyof T]: ParamValue;
};
