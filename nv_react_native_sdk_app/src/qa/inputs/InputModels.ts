// src/qa/inputs/InputModels.ts

import { InputParameter } from '../../shared/types/InputTypes';

export interface InputPlaygroundState {
  inputs: InputParameter[];
  lastExecutedPayload?: Record<string, any>;
}
