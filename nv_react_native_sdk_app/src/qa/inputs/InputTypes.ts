// src/qa/inputs/InputTypes.ts

export enum InputType {
  STRING = 'string',
  INT = 'int',
  DOUBLE = 'double',
  BOOLEAN = 'boolean',
  JSON_OBJECT = 'json_object',
  JSON_ARRAY = 'json_array',
  RAW_TEXT = 'raw_text',
  NULL = 'null',
  UNDEFINED = 'undefined',
}

export type InputParameter = {
  id: string;
  name: string;
  type: InputType;
  rawValue: string;
  description?: string; // optional helper text
};
