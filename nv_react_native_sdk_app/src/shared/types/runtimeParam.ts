// src/shared/types/runtimeParam.ts
import { ParamSchema, ParamType, ParamValue } from './params';

export type RuntimeParam = {
  id: string;
  name: string;
  type: ParamType;
  rawValue: string; // always string for copy-paste
  description?: string;
};

export const convertToRuntimeParam = (
  key: string,
  value: ParamValue,
): RuntimeParam => {
  const schema: ParamSchema =
    typeof value === 'object' && value !== null && 'type' in value
      ? (value as ParamSchema)
      : { type: 'raw', default: value };

  return {
    id: key,
    name: key,
    type: schema.type,
    rawValue: schema.default !== undefined ? String(schema.default) : '',
    description: schema.description,
  };
};
