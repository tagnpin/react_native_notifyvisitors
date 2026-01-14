// src/shared/types/runtimeParam.ts
import { ParamType } from './params';

export type RuntimeParam = {
  id: string;
  name: string;
  type: ParamType;
  rawValue: string; // always string for copy-paste
  description?: string;
};
