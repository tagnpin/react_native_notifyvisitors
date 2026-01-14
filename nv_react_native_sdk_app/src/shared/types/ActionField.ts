// src/shared/types/ActionField.ts

//import { InputType } from './InputTypes';

import { InputType } from '../../qa/inputs/InputTypes';

export type ActionField = {
  key: string; // payload key
  label: string; // UI label
  type: InputType;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  description?: string;
};
