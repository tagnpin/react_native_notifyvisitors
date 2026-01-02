// src/debug/DebugLogsTypes.ts

export type DebugLogsTypes =
  | 'sdk_execution'
  | 'sdk_execution_error'
  | 'sdk_callback'
  | 'observer'
  | 'analytics'
  | 'push'
  | 'lifecycle'
  | 'error';

export type DebugLogType = {
  id: string;
  timestamp: number;
  type: DebugLogsTypes;
  source: string;
  payload: any;
  success?: boolean;
  output?: any;
  message?: string;
};

// export type DebugLog = {
//   id: string;
//   timestamp: number;
//   type: string;
//   input?: any;
//   output?: any;
//   message?: string;
// };
